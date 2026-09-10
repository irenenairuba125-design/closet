-- Run this once in the Supabase SQL Editor (Project -> SQL Editor -> New query)
-- AFTER you've run `npx prisma migrate dev` (so the "Profile" table exists).
--
-- Supabase Auth writes new users into its own `auth.users` table, which
-- Prisma does not manage. This trigger copies the fields our app needs
-- into the public "Profile" table the moment someone signs up, so Prisma
-- can join orders to a user without ever touching the auth schema.

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public."Profile" (id, email, "firstName", "lastName")
  values (
    new.id,
    new.email,
    new.raw_user_meta_data ->> 'first_name',
    new.raw_user_meta_data ->> 'last_name'
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ============================================================================
-- Row Level Security
-- ============================================================================
-- Supabase exposes every public table over its auto-generated REST API
-- (PostgREST) to anyone holding the anon/authenticated key — and that key is
-- public, it ships in the browser bundle (NEXT_PUBLIC_SUPABASE_ANON_KEY).
-- Without RLS, a visitor could call the REST endpoint directly and read
-- every row in "Profile"/"Order" even though this app's own UI never does
-- that. Our Next.js server (API routes, server components) reads the
-- database through Prisma using DATABASE_URL — Supabase's pooled Postgres
-- connection — which connects as a role that bypasses RLS, so none of this
-- changes how the app itself behaves. RLS only locks down the direct
-- PostgREST/anon-key path.

alter table public."Profile" enable row level security;
alter table public."Admin" enable row level security;
alter table public."Product" enable row level security;
alter table public."Order" enable row level security;
alter table public."OrderItem" enable row level security;
alter table public."NewsletterSubscriber" enable row level security;

-- security definer: runs as the function owner, so it can read "Admin"
-- even though "Admin" itself is locked down below (avoids policy recursion).
create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (select 1 from public."Admin" a where a.id = auth.uid());
$$;

-- Profile: a tenant can only ever see/edit their own row. Admins can see all.
create policy "profile_select_own_or_admin" on public."Profile"
  for select using (id = auth.uid() or public.is_admin());
create policy "profile_update_own" on public."Profile"
  for update using (id = auth.uid()) with check (id = auth.uid());

-- Admin: nobody reads this over the anon/authenticated API except admins
-- checking their own membership. There's no insert/update/delete policy at
-- all, so the REST API can never grant admin — only the SQL below can.
create policy "admin_select_admin_only" on public."Admin"
  for select using (public.is_admin());

-- Product: public storefront read; only admins can write.
create policy "product_public_read" on public."Product"
  for select using (true);
create policy "product_admin_insert" on public."Product"
  for insert with check (public.is_admin());
create policy "product_admin_update" on public."Product"
  for update using (public.is_admin());
create policy "product_admin_delete" on public."Product"
  for delete using (public.is_admin());

-- Order: a tenant only sees/creates their own orders. Admins see and manage all.
create policy "order_select_own_or_admin" on public."Order"
  for select using ("userId" = auth.uid() or public.is_admin());
create policy "order_insert_own" on public."Order"
  for insert with check ("userId" = auth.uid());
create policy "order_admin_update" on public."Order"
  for update using (public.is_admin());

-- OrderItem: follows its parent Order's visibility.
create policy "orderitem_select_own_or_admin" on public."OrderItem"
  for select using (
    exists (
      select 1 from public."Order" o
      where o.id = "orderId" and (o."userId" = auth.uid() or public.is_admin())
    )
  );

-- NewsletterSubscriber: anyone can subscribe (public form); only admins can list them.
create policy "newsletter_insert_public" on public."NewsletterSubscriber"
  for insert with check (true);
create policy "newsletter_select_admin" on public."NewsletterSubscriber"
  for select using (public.is_admin());

-- ============================================================================
-- Bootstrapping the first admin
-- ============================================================================
-- There's no signup flow or API endpoint that can grant admin — by design,
-- so the REST API can never be used to self-promote. Run this once per
-- admin, after they've signed up normally through the storefront's login
-- page, replacing the email:
--
--   insert into public."Admin" (id)
--   select id from public."Profile" where email = 'owner@example.com';
