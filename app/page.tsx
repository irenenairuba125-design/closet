"use client";
import { useState, useMemo, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  section: string;
  sizes: string[];
};

type CartItem = Product & { size: string; qty: number };

const SIZES = ["M", "L", "XL", "2XL", "3XL", "4XL"];
const DEPT_IMG: Record<string, string> = {
  Men: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500&q=80&auto=format&fit=crop",
  Women: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&q=80&auto=format&fit=crop",
  Unisex: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80&auto=format&fit=crop",
  Sports: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=500&q=80&auto=format&fit=crop",
};
const DEPARTMENTS = [
  { key: "Men", label: "Men", view: "shop" },
  { key: "Women", label: "Women", view: "shop" },
  { key: "Unisex", label: "Unisex", view: "shop" },
  { key: "Sports", label: "Sports", view: "sports" },
];

const HERO_CLOTH_IMAGE = "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=1200&q=80&auto=format&fit=crop";

const BackLink = ({ goBack }: { goBack: () => void }) => (<div className="px-3 py-3"><span onClick={goBack} style={{ cursor: "pointer", fontSize: 14, fontWeight: 500 }}>{"<--"} back</span></div>);

const Newsletter = () => {
  const [nEmail, setNEmail] = useState("");
  const [sent, setSent] = useState(false);
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nEmail) return;
    await fetch("/api/newsletter", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: nEmail }) });
    setSent(true);
  };
  return (
    <div style={{ background: "#F5F1EB" }} className="px-4 py-5 mt-5">
      <div className="container-fluid text-center" style={{ maxWidth: 520 }}>
        <small className="fw-bold" style={{ letterSpacing: 3, color: "#FF6A00", fontSize: 10 }}>STAY IN THE LOOP</small>
        <h3 className="fw-bold mt-2" style={{ fontFamily: "'Playfair Display', serif" }}>Join The Closet</h3>
        <p className="text-secondary small">Get first access to new drops, restocks & member-only offers.</p>
        {sent ? (<div className="fw-bold mt-2"><i className="bi bi-check-circle me-2" />Thanks &mdash; you&apos;re on the list.</div>) : (
          <form className="d-flex gap-2 justify-content-center flex-wrap mt-3" onSubmit={submit}>
            <input required type="email" value={nEmail} onChange={e => setNEmail(e.target.value)} placeholder="Enter your email" className="form-control" style={{ maxWidth: 280, border: "1px solid #000", borderRadius: 50, padding: "10px 18px", fontSize: 13 }} />
            <button type="submit" className="btn btn-dark rounded-pill fw-bold" style={{ fontSize: 12, padding: "10px 22px" }}>SUBSCRIBE</button>
          </form>
        )}
      </div>
    </div>
  );
};

const Footer = ({ change }: { change: (s: string, v?: string) => void }) => (<><Newsletter /><footer className="bg-black text-white pt-5 pb-4 px-4"><div className="container-fluid"><div className="row g-4"><div className="col-12 col-md-4"><div className="d-flex align-items-center gap-2 mb-2"><div className="bg-white text-black d-flex justify-content-center align-items-center fw-bold" style={{ width: 32, height: 32, borderRadius: 8, fontFamily: "'Playfair Display', serif", fontSize: 13 }}>IC</div><h6 className="fw-bold mb-0" style={{ fontFamily: "'Playfair Display', serif" }}>IRENE&apos;S CLOSET</h6></div><small className="text-secondary">Premium dresses, shirts, trousers & athletic wear.<br />Wear Your Confidence • Countrywide delivery</small></div><div className="col-6 col-md-2"><small className="fw-bold d-block mb-2">SHOP</small><div className="small text-secondary d-flex flex-column gap-2"><span onClick={() => change("All", "shop")} style={{ cursor: "pointer" }}>Shop All</span><span onClick={() => change("Men", "shop")} style={{ cursor: "pointer" }}>Men</span><span onClick={() => change("Women", "shop")} style={{ cursor: "pointer" }}>Women</span><span onClick={() => change("Unisex", "shop")} style={{ cursor: "pointer" }}>Unisex</span><span onClick={() => change("Sports", "sports")} style={{ cursor: "pointer" }}>Sports</span><span onClick={() => change("All", "trending")} style={{ cursor: "pointer" }}>Trending</span></div></div><div className="col-6 col-md-3"><small className="fw-bold d-block mb-2">HELP</small><div className="small text-secondary d-flex flex-column gap-2"><span style={{ cursor: "pointer" }}>FAQ</span><span style={{ cursor: "pointer" }}>Shipping & Returns</span><span style={{ cursor: "pointer" }}>Privacy Policy</span><span style={{ cursor: "pointer" }}>Contact Us</span></div></div><div className="col-12 col-md-3"><small className="fw-bold d-block mb-2">FOLLOW US</small><div className="d-flex gap-3" style={{ fontSize: 20 }}><i className="bi bi-instagram" style={{ cursor: "pointer" }} /><i className="bi bi-tiktok" style={{ cursor: "pointer" }} /><i className="bi bi-whatsapp" style={{ cursor: "pointer" }} /><i className="bi bi-facebook" style={{ cursor: "pointer" }} /></div></div></div><div className="border-top border-secondary mt-4 pt-3 d-flex flex-column flex-md-row justify-content-between align-items-center gap-2 text-center"><small className="text-secondary">© 2026 Irene&apos;s Closet. All rights reserved.</small><small className="text-secondary fst-italic">Wear Your Confidence.</small></div></div></footer></>);

export default function Page() {
  const supabase = useMemo(() => createClient(), []);
  const [products, setProducts] = useState<Product[]>([]);
  const [view, setView] = useState("home");
  const [sec, setSec] = useState("All");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Product | null>(null);
  const [history, setHistory] = useState<string[]>(["home"]);
  const [user, setUser] = useState<{ id: string; email: string; name: string } | null>(null);
  const [authMode, setAuthMode] = useState<"signup" | "signin">("signup");
  const [authError, setAuthError] = useState("");
  const [authMsg, setAuthMsg] = useState("");
  const [fName, setFName] = useState(""); const [lName, setLName] = useState("");
  const [email, setEmail] = useState(""); const [pwd, setPwd] = useState("");
  const [agree, setAgree] = useState(false);
  const [size, setSize] = useState("M");
  const [qty, setQty] = useState(1);

  useEffect(() => {
    fetch("/api/products").then(r => r.json()).then(setProducts).catch(() => {});
  }, []);

  useEffect(() => {
    const toUser = (u: any) => u ? {
      id: u.id,
      email: u.email,
      name: [u.user_metadata?.first_name, u.user_metadata?.last_name].filter(Boolean).join(" ") || u.email,
    } : null;

    supabase.auth.getUser().then(({ data }) => setUser(toUser(data.user)));
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => setUser(toUser(session?.user)));
    return () => sub.subscription.unsubscribe();
  }, [supabase]);

  const filtered = useMemo(() => {
    if (sec === "Men") return products.filter(p => p.section === "Men");
    if (sec === "Women") return products.filter(p => p.section === "Women");
    if (sec === "Unisex") return products.filter(p => p.section === "Unisex");
    if (view === "sports" || sec === "Sports") return products.filter(p => p.section === "Sports");
    if (view === "trending") return products.slice(0, 24);
    return products.slice(0, 24);
  }, [sec, view, products]);

  const pushView = (v: string) => setHistory(h => [...h, v]);
  const change = (s: string, v: string = "shop") => { setSec(s); setView(v); pushView(v); setOpen(false); window.scrollTo(0, 0); };
  const goBack = () => { if (history.length > 1) { const prev = history[history.length - 2]; setHistory(h => h.slice(0, -1)); setView(prev); } else setView("home"); window.scrollTo(0, 0); };
  const openProduct = (p: Product) => { setSelected(p); setSize("M"); setQty(1); setView("product"); pushView("product"); window.scrollTo(0, 0); };
  const addToCart = (buyNow = false) => { if (!selected) return; const item = { ...selected, size, qty }; setCart([...cart, item]); if (buyNow) { setView("cart"); pushView("cart"); } else { alert(`Added ${selected.name} Size:${size} Qty:${qty}`); } };

  const resetAuthFields = () => { setFName(""); setLName(""); setEmail(""); setPwd(""); setAgree(false); setAuthError(""); setAuthMsg(""); };

  const createAccount = async () => {
    if (!fName || !lName || !email || !pwd) { setAuthError("Fill all fields"); return; }
    if (!agree) { setAuthError("Agree Terms"); return; }
    setAuthError(""); setAuthMsg("");
    const { data, error } = await supabase.auth.signUp({
      email, password: pwd,
      options: { data: { first_name: fName, last_name: lName } },
    });
    if (error) { setAuthError(error.message); return; }
    if (data.session) { setView("home"); resetAuthFields(); }
    else { setAuthMsg("Check your email to confirm your account, then sign in."); setAuthMode("signin"); }
  };

  const signIn = async () => {
    if (!email || !pwd) { setAuthError("Enter email and password"); return; }
    setAuthError("");
    const { error } = await supabase.auth.signInWithPassword({ email, password: pwd });
    if (error) { setAuthError(error.message); return; }
    resetAuthFields();
    const { isAdmin } = await fetch("/api/auth/role").then(r => r.json());
    if (isAdmin) { window.location.href = "/admin"; return; }
    setView("home");
  };

  const googleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
  };

  const signOut = async () => {
    if (!user || !confirm(`Sign out ${user.name}?`)) return;
    await supabase.auth.signOut();
  };

  const handleCheckout = async () => {
    if (!user) { setView("auth"); pushView("auth"); return; }
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: cart.map(c => ({ productId: c.id, size: c.size, qty: c.qty })) }),
    });
    if (!res.ok) { const e = await res.json().catch(() => ({})); alert(e.error || "Checkout failed"); return; }
    alert("Checkout successful!");
    setCart([]); setView("home");
  };

  return (
    <div style={{ background: "#fff" }}>
      <nav className="d-flex justify-content-between align-items-center px-3 py-3 bg-white sticky-top border-bottom" style={{ zIndex: 200 }}>
        <div className="d-flex align-items-center gap-2"><span onClick={() => setOpen(!open)} style={{ cursor: "pointer", fontSize: 22 }}><i className={open ? "bi bi-x-lg" : "bi bi-list"} /></span><div className="d-flex align-items-center gap-2" onClick={() => { setView("home"); setHistory(["home"]) }} style={{ cursor: "pointer" }}><div className="bg-black text-white d-flex justify-content-center align-items-center fw-bold" style={{ width: 36, height: 36, borderRadius: 8, fontFamily: "'Playfair Display', serif" }}>IC</div><span className="fw-bold" style={{ fontSize: 11, letterSpacing: 1 }}>IRENE&apos;S CLOSET</span></div></div>
        <div className="d-none d-md-flex gap-3 small fw-bold"><span onClick={() => change("All", "shop")} style={{ cursor: "pointer" }}>SHOP</span><span onClick={() => change("Men", "shop")} style={{ cursor: "pointer" }}>MEN</span><span onClick={() => change("Women", "shop")} style={{ cursor: "pointer" }}>WOMEN</span><span onClick={() => change("Unisex", "shop")} style={{ cursor: "pointer" }}>UNISEX</span><span onClick={() => change("Sports", "sports")} style={{ cursor: "pointer" }}>SPORTS</span><span onClick={() => change("All", "trending")} style={{ cursor: "pointer", color: "#FF6A00" }}>TRENDING</span></div>
        <div className="d-flex align-items-center gap-3">
          <span onClick={() => { if (user) { signOut(); return; } setView("auth"); pushView("auth"); }} style={{ cursor: "pointer", fontSize: 19 }} title={user ? `${user.name} (tap to sign out)` : "Sign in"}><i className={user ? "bi bi-person-check-fill" : "bi bi-person"} /></span>
          <span onClick={() => { setView("cart"); pushView("cart") }} className="d-flex align-items-center gap-1" style={{ cursor: "pointer", fontWeight: 700, fontSize: 19 }}><i className="bi bi-bag" /><small className="fw-bold" style={{ fontSize: 12 }}>{cart.length}</small></span>
        </div>
      </nav>
      {open && (<div className="position-fixed bg-white w-100" style={{ top: 62, left: 0, zIndex: 199, height: "calc(100vh - 62px)" }}><div className="p-4"><div className="py-3 border-bottom" onClick={() => change("All", "shop")} style={{ cursor: "pointer", fontWeight: 900 }}>SHOP</div><div className="py-3 border-bottom" onClick={() => change("Men", "shop")} style={{ cursor: "pointer", fontWeight: 900 }}>MEN</div><div className="py-3 border-bottom" onClick={() => change("Women", "shop")} style={{ cursor: "pointer", fontWeight: 900 }}>WOMEN</div><div className="py-3 border-bottom" onClick={() => change("Unisex", "shop")} style={{ cursor: "pointer", fontWeight: 900 }}>UNISEX</div><div className="py-3 border-bottom" onClick={() => change("Sports", "sports")} style={{ cursor: "pointer", fontWeight: 900 }}>SPORTS</div><div className="py-3 border-bottom" onClick={() => change("All", "trending")} style={{ cursor: "pointer", fontWeight: 900, color: "#FF6A00" }}>TRENDING</div><div className="py-3" onClick={() => { if (!user) { setView("auth"); pushView("auth"); } setOpen(false); }} style={{ cursor: "pointer", fontWeight: 900 }}>{user ? `HI, ${user.name.split(" ")[0].toUpperCase()}` : "SIGN IN"}</div></div></div>)}

      {view === "home" && (
        <>
          <div className="container-fluid p-0">
            <div className="row g-0 align-items-stretch" style={{ minHeight: "55vh" }}>
              <div className="col-12 col-lg-5 px-4 py-4 d-flex flex-column justify-content-center" style={{ minHeight: "35vh" }}>
                <small className="fw-bold" style={{ letterSpacing: 3, color: "#FF6A00", fontSize: 10 }}>NEW COLLECTION 2026</small>
                <h1 className="fw-bold mt-2 mb-2" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px,4.5vw,50px)", lineHeight: 0.9 }}>FIND YOUR<br /><span style={{ fontStyle: "italic", fontWeight: 400 }}>PERFECT</span><br />STYLE</h1>
                <p className="text-secondary" style={{ fontSize: 13, maxWidth: 360 }}>Tour freely - no account needed to view products. Account only for checkout.</p>
                <div className="d-flex gap-2 mt-2">
                  <button onClick={() => change("All", "shop")} className="btn btn-dark rounded-pill fw-bold" style={{ fontSize: 12, padding: "10px 20px" }}>SHOP NOW →</button>
                  <button onClick={() => change("All", "trending")} className="btn btn-outline-dark rounded-pill fw-bold" style={{ fontSize: 12, padding: "10px 20px" }}>TRENDING</button>
                </div>
                <div className="d-flex gap-3 mt-4 flex-wrap">
                  <small className="d-flex align-items-center gap-2 text-secondary" style={{ fontSize: 11 }}><i className="bi bi-truck" />Countrywide delivery</small>
                  <small className="d-flex align-items-center gap-2 text-secondary" style={{ fontSize: 11 }}><i className="bi bi-gem" />Premium fabrics</small>
                  <small className="d-flex align-items-center gap-2 text-secondary" style={{ fontSize: 11 }}><i className="bi bi-shield-check" />Secure checkout</small>
                </div>
              </div>
              <div className="col-12 col-lg-7" style={{ background: "#F5F1EB", minHeight: "400px", height: "60vh" }}>
                <img src={HERO_CLOTH_IMAGE} alt="clothes collection" className="w-100 h-100" style={{ objectFit: "cover", objectPosition: "center top", height: "100%", minHeight: "400px", display: "block" }} />
              </div>
            </div>
          </div>

          <div className="container-fluid px-3 py-5">
            <small className="fw-bold" style={{ letterSpacing: 3, color: "#FF6A00", fontSize: 10 }}>CURATED FOR YOU</small>
            <h5 className="fw-bold mt-1">SHOP BY DEPARTMENT</h5>
            <div className="row g-2 mt-2">
              {DEPARTMENTS.map(d => (
                <div key={d.key} className="col-6 col-md-3">
                  <div className="dept-card position-relative" style={{ cursor: "pointer", aspectRatio: "3/4", overflow: "hidden", borderRadius: 12 }} onClick={() => change(d.key, d.view)}>
                    <img src={DEPT_IMG[d.key]} alt={d.label} className="w-100 h-100" style={{ objectFit: "cover", objectPosition: "top center" }} />
                    <div className="position-absolute bottom-0 start-0 w-100 p-3" style={{ background: "linear-gradient(transparent, rgba(0,0,0,.65))" }}>
                      <span className="text-white fw-bold" style={{ fontSize: 14, fontFamily: "'Playfair Display', serif" }}>{d.label}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="container-fluid px-3 pb-5">
            <div className="d-flex justify-content-between align-items-end flex-wrap gap-2">
              <div>
                <span className="badge rounded-pill mb-2" style={{ background: "#FFF1E6", color: "#FF6A00", fontSize: 10, fontWeight: 700, letterSpacing: 1 }}>FRESH DROPS • AUTO-UPDATED</span>
                <h5 className="fw-bold mb-0">TRENDING NOW</h5>
              </div>
              <span onClick={() => change("All", "trending")} className="fw-bold small" style={{ cursor: "pointer", color: "#FF6A00" }}>VIEW ALL TRENDING →</span>
            </div>
            <div className="row g-2 mt-2">{filtered.slice(0, 8).map(p => (<div key={p.id} className="col-6 col-md-3"><div className="product-card border h-100" style={{ cursor: "pointer" }} onClick={() => openProduct(p)}><div className="position-relative overflow-hidden"><img src={p.image} className="w-100" style={{ aspectRatio: "4/5", objectFit: "cover", objectPosition: "top center" }} alt="" /></div><div className="p-2"><small className="fw-bold d-block" style={{ fontSize: 11, height: 32, overflow: "hidden" }}>{p.name}</small><small>Shs {p.price.toLocaleString()}</small></div></div></div>))}</div>
          </div>
          <Footer change={change} />
        </>
      )}
      {(view === "shop" || view === "sports" || view === "trending") && (<><BackLink goBack={goBack} /><div className="container-fluid px-3 py-4"><h5 className="fw-bold mb-3">{sec === "All" ? (view === "trending" ? "TRENDING NOW" : "ALL PRODUCTS") : sec.toUpperCase()}</h5><div className="row g-2">{filtered.map(p => (<div key={p.id} className="col-6 col-md-3"><div className="product-card border h-100" style={{ cursor: "pointer" }} onClick={() => openProduct(p)}><div className="position-relative overflow-hidden"><img src={p.image} className="w-100" style={{ aspectRatio: "4/5", objectFit: "cover", objectPosition: "top center" }} alt="" /><span className="position-absolute top-0 start-0 m-2 badge rounded-pill" style={{ fontSize: 9, background: "#FF6A00", color: "#fff" }}>SAVE 22%</span></div><div className="p-2"><small className="fw-bold d-block" style={{ fontSize: 11, height: 32, overflow: "hidden" }}>{p.name}</small><small>Shs {p.price.toLocaleString()}</small></div></div></div>))}</div></div><Footer change={change} /></>)}
      {view === "product" && selected && (<><BackLink goBack={goBack} /><div className="container-fluid px-3 py-3"><div className="row g-4"><div className="col-12 col-md-6"><img src={selected.image} className="w-100 rounded" style={{ aspectRatio: "4/5", objectFit: "cover", objectPosition: "top center" }} alt="" /></div><div className="col-12 col-md-6"><h3 className="fw-bold" style={{ fontFamily: "'Playfair Display', serif", lineHeight: 1.1 }}>{selected.name}</h3><h5 className="fw-bold mt-2">Shs {selected.price.toLocaleString()}</h5><p className="text-secondary small mt-2">{selected.description}</p><div className="mt-3"><div className="row g-2" style={{ maxWidth: 340 }}>{(selected.sizes?.length ? selected.sizes : SIZES).map(s => (<div key={s} className="col-3 col-md-2"><button onClick={() => setSize(s)} style={{ width: "100%", height: 42, borderRadius: 12, border: size === s ? "2px solid #000" : "1px solid #ccc", background: size === s ? "#000" : "#fff", color: size === s ? "#fff" : "#000", fontWeight: 700 }}>{s}</button></div>))}</div></div><div className="mt-4 d-flex gap-2" style={{ maxWidth: 420 }}><div className="d-flex align-items-center bg-light border" style={{ height: 44 }}><button onClick={() => setQty(q => Math.max(1, q - 1))} className="btn px-3">-</button><span className="px-2 fw-bold">{qty}</span><button onClick={() => setQty(q => q + 1)} className="btn px-3">+</button></div><button onClick={() => addToCart(false)} className="btn btn-dark flex-fill fw-bold d-flex align-items-center justify-content-center gap-2" style={{ height: 44 }}>Add to cart</button></div><button onClick={() => addToCart(true)} className="btn w-100 mt-2 fw-bold" style={{ height: 48, background: "#000", color: "#fff", maxWidth: 420 }}>Buy it now</button><div className="mt-3"><span onClick={goBack} style={{ cursor: "pointer", fontSize: 14 }}>{"<--"} back</span></div></div></div></div><Footer change={change} /></>)}
      {view === "cart" && (<><BackLink goBack={goBack} /><div className="container-fluid px-3 py-3" style={{ minHeight: "60vh" }}><h4 className="fw-bold">Cart - {cart.length} items</h4>{cart.length === 0 ? <div className="text-center py-5"><p>Empty</p><button onClick={() => change("All", "shop")} className="btn btn-dark rounded-pill">Shop Now</button></div> : (<div className="row g-3 mt-2"><div className="col-12 col-md-8">{cart.map((c, i) => <div key={i} className="d-flex gap-3 border p-2 mb-2 align-items-center"><img src={c.image} style={{ width: 60, height: 60, objectFit: "cover" }} alt="" /><div className="flex-fill"><small className="fw-bold">{c.name}</small><br /><small>Size:{c.size} Qty:{c.qty} - Shs {(c.price * c.qty).toLocaleString()}</small></div><button onClick={() => setCart(cart.filter((_, idx) => idx !== i))} className="btn btn-sm btn-outline-danger">X</button></div>)}</div><div className="col-12 col-md-4"><div className="border p-3 rounded"><h6 className="fw-bold">Total: Shs {cart.reduce((a, b) => a + (b.price * b.qty), 0).toLocaleString()}</h6><button onClick={handleCheckout} className="btn btn-dark w-100 rounded-pill mt-2">Checkout</button></div></div></div>)}</div><Footer change={change} /></>)}
      {view === "auth" && (<><BackLink goBack={goBack} /><div className="container-fluid d-flex justify-content-center" style={{ minHeight: "75vh" }}><div style={{ maxWidth: 420, width: "100%", padding: "20px" }}><div className="text-center"><div className="bg-black text-white d-inline-flex justify-content-center align-items-center fw-bold mb-2" style={{ width: 48, height: 48, borderRadius: 10, fontFamily: "'Playfair Display', serif", fontSize: 18 }}>IC</div><h6 className="fw-bold">IRENE&apos;S CLOSET</h6><h1 className="fw-bold mt-2" style={{ fontFamily: "'Playfair Display', serif", fontSize: 32 }}>{authMode === "signup" ? "CREATE ACCOUNT" : "SIGN IN"}</h1></div><button onClick={googleLogin} className="btn w-100 mt-4 d-flex justify-content-center align-items-center gap-2" style={{ border: "1.5px solid #000", borderRadius: 50, padding: 12, fontWeight: 700, fontSize: 12 }}><img src="https://www.svgrepo.com/show/475656/google-color.svg" style={{ width: 18 }} alt="" /> CONTINUE WITH GOOGLE</button>
        {authMsg && <div className="alert alert-success mt-3 py-2 small">{authMsg}</div>}
        {authError && <div className="alert alert-danger mt-3 py-2 small">{authError}</div>}
        {authMode === "signup" ? (
          <div className="row g-2 mt-3">
            <div className="col-6"><small style={{ fontSize: 11, fontWeight: 700 }}>FIRST NAME</small><input value={fName} onChange={e => setFName(e.target.value)} className="form-control rounded-0 mt-1" style={{ border: "1px solid #999", padding: 10 }} /></div>
            <div className="col-6"><small style={{ fontSize: 11, fontWeight: 700 }}>LAST NAME</small><input value={lName} onChange={e => setLName(e.target.value)} className="form-control rounded-0 mt-1" style={{ border: "1px solid #999", padding: 10 }} /></div>
            <div className="col-12 mt-2"><small style={{ fontSize: 11, fontWeight: 700 }}>EMAIL</small><input value={email} onChange={e => setEmail(e.target.value)} className="form-control rounded-0 mt-1" style={{ border: "1px solid #999", padding: 10 }} /></div>
            <div className="col-12 mt-2"><small style={{ fontSize: 11, fontWeight: 700 }}>PASSWORD</small><input type="password" value={pwd} onChange={e => setPwd(e.target.value)} className="form-control rounded-0 mt-1" style={{ border: "1px solid #999", padding: 10 }} /></div>
            <div className="col-12 mt-3 d-flex gap-2"><input type="checkbox" checked={agree} onChange={e => setAgree(e.target.checked)} /><small style={{ fontSize: 11 }}>I agree to Terms and Privacy</small></div>
            <div className="col-12 mt-3"><button onClick={createAccount} className="btn btn-dark w-100 rounded-0 fw-bold" style={{ padding: 12 }}>CREATE ACCOUNT →</button></div>
            <div className="col-12 mt-3 text-center small">Already have an account? <span onClick={() => { setAuthMode("signin"); setAuthError(""); setAuthMsg(""); }} style={{ cursor: "pointer", fontWeight: 700 }}>Sign in</span></div>
          </div>
        ) : (
          <div className="row g-2 mt-3">
            <div className="col-12"><small style={{ fontSize: 11, fontWeight: 700 }}>EMAIL</small><input value={email} onChange={e => setEmail(e.target.value)} className="form-control rounded-0 mt-1" style={{ border: "1px solid #999", padding: 10 }} /></div>
            <div className="col-12 mt-2"><small style={{ fontSize: 11, fontWeight: 700 }}>PASSWORD</small><input type="password" value={pwd} onChange={e => setPwd(e.target.value)} className="form-control rounded-0 mt-1" style={{ border: "1px solid #999", padding: 10 }} /></div>
            <div className="col-12 mt-3"><button onClick={signIn} className="btn btn-dark w-100 rounded-0 fw-bold" style={{ padding: 12 }}>SIGN IN →</button></div>
            <div className="col-12 mt-3 text-center small">Need an account? <span onClick={() => { setAuthMode("signup"); setAuthError(""); setAuthMsg(""); }} style={{ cursor: "pointer", fontWeight: 700 }}>Create one</span></div>
          </div>
        )}
      </div></div><Footer change={change} /></>)}
      <style jsx global>{`
        body{margin:0;overflow-x:hidden;font-family:'Inter',sans-serif}
        img{max-width:100%}
        .product-card{transition:box-shadow .25s ease, transform .25s ease}
        .product-card:hover{box-shadow:0 10px 24px rgba(0,0,0,.12);transform:translateY(-3px)}
        .product-card img{transition:transform .35s ease}
        .product-card:hover img{transform:scale(1.05)}
        .dept-card{transition:box-shadow .25s ease, transform .25s ease}
        .dept-card:hover{box-shadow:0 10px 24px rgba(0,0,0,.18);transform:translateY(-3px)}
        .dept-card img{transition:transform .35s ease}
        .dept-card:hover img{transform:scale(1.06)}
        ::selection{background:#FF6A00;color:#fff}
      `}</style>
    </div>
  );
}
