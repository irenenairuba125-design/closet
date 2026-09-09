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
