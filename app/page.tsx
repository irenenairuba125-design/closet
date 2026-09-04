"use client";
import { useState, useMemo, useEffect } from "react";

const C: any = {
  Men: ["photo-1596755094514-f87e34085b2c","photo-1551537482-f2075a1d41f2","photo-1594938298603-c8148c4dae35","photo-1521572163474-6864f9cf17ab","photo-1556821840-3a63f95609a7","photo-1594633312681-425c7b97ccd1","photo-1551028719-00167b16eac5","photo-1591195853828-11db59a44f6b"],
  Women: ["photo-1595777457583-95e059d581b8","photo-1583496661160-fb5886a0aaaa","photo-1598550476439-6845435fcea5","photo-1490481651871-ab68de25d43d","photo-1591369822096-ffd140ec948f","photo-1434389677669-e08b4cac3105","photo-1541099649105-f69ad21f3246","photo-1581044777550-4cfa60707c03"],
  Unisex: ["photo-1521572163474-6864f9cf17ab","photo-1544923246-77307dd654cb","photo-1594633312681-425c7b97ccd1","photo-1556821840-3a63f95609a7","photo-1591195853828-11db59a44f6b","photo-1596755094514-f87e34085b2c"],
  Sports: ["photo-1571902943202-507ec2618e8f","photo-1517438476312-10d79c077509","photo-1506629903106-0650d349b7b9","photo-1551537482-f2075a1d41f2","photo-1591195853828-11db59a44f6b","photo-1556821840-3a63f95609a7"]
};

const make = (sec:string, n:number) => Array.from({length:n},(_,i)=>({
  id:`${sec}${i}`, name:`${sec} ${["Classic Shirt","Denim Jacket","Cargo Pants","Hoodie","Blazer","Minimal Dress","Cotton Tee","Wool Coat","Linen Shirt","Pleated Skirt"][i%10]} ${i+1}`,
  price:35000+i*5500, old:50000+i*8000, desc:"Premium cloth - 100% cotton, perfect fit. Delivered countrywide.",
  img:`https://images.unsplash.com/${C[sec][i % C[sec].length]}?w=500`,
  save:`SAVE ${22+i%18}%`, section:sec
}));

const PRODUCTS = [...make("Men",24),...make("Women",24),...make("Unisex",24),...make("Sports",24)];
const FALLBACK_BG = "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=1400";
const SPORTS_BG = "https://images.unsplash.com/photo-1517438476312-10d79c077509?w=1200";

// YOUR FIXED LINKS
const GITHUB_URL = "https://github.com/irenenairuba125-design";
const LINKEDIN_URL = "https://www.linkedin.com/in/nairuba-irene-735399432";
const X_URL = "https://x.com/NairubaIrene";

export default function Page(){
  const [view,setView]=useState("home"); 
  const [sec,setSec]=useState("All"); 
  const [cart,setCart]=useState<any[]>([]);
  const [open,setOpen]=useState(false);
  const [selected,setSelected]=useState<any>(null);
  const [history,setHistory]=useState<string[]>(["home"]);
  const [user,setUser]=useState<any>(null);
  const [pending,setPending]=useState<any>(null);
  const [fName,setFName]=useState(""); const [lName,setLName]=useState("");
  const [email,setEmail]=useState(""); const [pwd,setPwd]=useState("");
  const [agree,setAgree]=useState(false); const [authMode,setAuthMode]=useState("create");
  const [showSearch,setShowSearch]=useState(false);
  const [q,setQ]=useState(""); const [results,setResults]=useState<any[]>([]);

  useEffect(()=>{ const s=localStorage.getItem("ic_user"); if(s) setUser(JSON.parse(s)); },[]);

  const filtered = useMemo(()=>{
    if(view==="sports"||sec==="Sports") return PRODUCTS.filter(p=>p.section==="Sports").slice(0,24);
    if(sec==="Men") return PRODUCTS.filter(p=>p.section==="Men").slice(0,24);
    if(sec==="Women") return PRODUCTS.filter(p=>p.section==="Women").slice(0,24);
    if(sec==="Unisex") return PRODUCTS.filter(p=>p.section==="Unisex").slice(0,24);
    if(view==="trending") return [...PRODUCTS.slice(0,6),...PRODUCTS.slice(24,30),...PRODUCTS.slice(48,54),...PRODUCTS.slice(72,78)].slice(0,24);
    return [...PRODUCTS.slice(0,6),...PRODUCTS.slice(24,30),...PRODUCTS.slice(48,54),...PRODUCTS.slice(72,78)].slice(0,24);
  },[sec,view]);

  const pushView = (v:string)=>{ setHistory(h=>[...h, v]); };
  const change=(s:string,v:string="shop")=>{
    if(!user && v!=="home" && v!=="auth" && v!=="search"){ setPending({s,v}); setView("auth"); pushView("auth"); setOpen(false); return; }
    setSec(s);setView(v);pushView(v);setOpen(false);window.scrollTo(0,0);
  };
  const goBack = ()=>{
    if(history.length>1){
      const prev = history[history.length-2];
      setHistory(h=>h.slice(0,-1));
      if(prev==="home"){ setView("home"); setSec("All"); }
      else if(["shop","sports","trending","search","product","cart","auth"].includes(prev)){ setView(prev); }
      else setView("home");
    } else { setView("home"); setSec("All"); }
    window.scrollTo(0,0);
  };
  const doSearch = (txt:string)=>{
    setQ(txt);
    if(!txt.trim()){ setResults([]); return; }
    const r = PRODUCTS.filter(p=> p.name.toLowerCase().includes(txt.toLowerCase()) || p.section.toLowerCase().includes(txt.toLowerCase()));
    setResults(r); setView("search"); pushView("search"); setOpen(false);
  };
  const createAccount = ()=>{
    if(!fName||!lName||!email||!pwd){ alert("Fill First Name, Last Name, Email, Password"); return; }
    if(!agree){ alert("Agree Terms"); return; }
    const u={name:`${fName} ${lName}`, email};
    setUser(u); localStorage.setItem("ic_user", JSON.stringify(u));
    if(pending){ setSec(pending.s); setView(pending.v); pushView(pending.v); setPending(null);} else { setView("shop"); pushView("shop"); }
  };
  const googleLogin = ()=>{
    const u={name: fName || "Google User", email: email || "google@user.com"};
    setUser(u); localStorage.setItem("ic_user", JSON.stringify(u));
    if(pending){ setSec(pending.s); setView(pending.v); pushView(pending.v); setPending(null);} else { setView("shop"); pushView("shop"); }
  };
  const openProduct=(p:any)=>{ if(!user){ setPending({s:p.section,v:"shop"}); setSelected(p); setView("auth"); pushView("auth"); return;} setSelected(p); setView("product"); pushView("product"); setOpen(false); };

  const isSports = view==="sports"||sec==="Sports";
  const headerBg = isSports ? `linear-gradient(rgba(20,40,70,0.78), rgba(20,40,70,0.78)), url(${SPORTS_BG})` : `linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.35)), url(${FALLBACK_BG})`;
  const cartTotal = cart.reduce((a,b)=>a+b.price,0);

  const BackBar = ({label="Back"}:any) => (
    <div className="bg-white border-bottom px-3 py-2 d-flex align-items-center gap-2 sticky-top" style={{top:62,zIndex:150}}>
      <button onClick={goBack} className="btn btn-sm btn-outline-dark rounded-pill px-3 fw-bold" style={{fontSize:12}}>← {label}</button>
      <small className="text-secondary" style={{fontSize:11}}><span onClick={()=>{setView("home"); setSec("All")}} style={{cursor:"pointer"}}>Home</span> / <span style={{fontWeight:700,color:"#000"}}>{view.toUpperCase()} {sec!=="All" ? `/ ${sec}` : ""}</span></small>
      <small className="ms-auto"><a href={GITHUB_URL} target="_blank" style={{color:"#000",fontWeight:700,fontSize:11}}>GitHub: irenenairuba125-design</a></small>
    </div>
  );

  const Footer = () => (
    <footer className="bg-black text-white mt-4 pt-4 pb-3 px-4">
      <div className="container-fluid">
        <div className="row g-3">
          <div className="col-12 col-md-4"><h6 className="fw-bold" style={{fontFamily:"serif"}}>IRENE'S CLOSET</h6><small className="text-secondary">Premium clothes • Wear Confidence</small><div className="mt-2"><a href={GITHUB_URL} target="_blank" className="text-white small" style={{textDecoration:"underline"}}>github.com/irenenairuba125-design</a></div></div>
          <div className="col-6 col-md-2"><small className="fw-bold d-block mb-2">Links</small><div className="small d-flex flex-column gap-1"><a href={GITHUB_URL} target="_blank" className="text-secondary text-decoration-none">GitHub</a><a href={LINKEDIN_URL} target="_blank" className="text-secondary text-decoration-none">LinkedIn</a><a href={X_URL} target="_blank" className="text-secondary text-decoration-none">X.com</a></div></div>
          <div className="col-6 col-md-2"><small className="fw-bold d-block mb-2">Shop</small><div className="small text-secondary d-flex flex-column gap-1"><span onClick={()=>change("All","shop")} style={{cursor:"pointer"}}>Shop</span><span onClick={()=>change("Men","shop")} style={{cursor:"pointer"}}>Men</span><span onClick={()=>change("Women","shop")} style={{cursor:"pointer"}}>Women</span></div></div>
          <div className="col-12 col-md-4 text-md-end"><small className="fw-bold d-block">Account</small><small className="text-secondary">{user?`Hi ${user.name}`:"Not signed in"}</small><br/><button onClick={goBack} className="btn btn-sm btn-outline-light rounded-pill mt-2">← Back</button> <button onClick={()=>{setView("home"); setSec("All")}} className="btn btn-sm btn-light rounded-pill mt-2">Home</button></div>
        </div>
        <div className="border-top border-secondary mt-3 pt-3 text-center"><small className="text-secondary">© 2026 Irene's Closet • GitHub: irenenairuba125-design • <a href={GITHUB_URL} target="_blank" className="text-secondary">View Code</a></small></div>
      </div>
    </footer>
  );

  return(
    <div style={{background:"#fff"}}>
      <nav className="d-flex justify-content-between align-items-center px-3 py-3 bg-white sticky-top border-bottom" style={{zIndex:200}}>
        <div className="d-flex align-items-center gap-2">
          <span onClick={()=>setOpen(!open)} style={{cursor:"pointer",fontSize:26,fontWeight:900}}>{open?"✕":"☰"}</span>
          <div className="d-flex align-items-center gap-2" onClick={()=>{setView("home"); setSec("All"); setHistory(["home"])}} style={{cursor:"pointer"}}>
            <div className="bg-black text-white d-flex justify-content-center align-items-center fw-bold" style={{width:36,height:36,borderRadius:8}}>👗</div>
            <span className="fw-bold" style={{fontSize:11}}>IRENE'S CLOSET</span>
          </div>
        </div>
        <div className="d-none d-md-flex gap-3 small fw-bold">
          <span onClick={()=>change("All","shop")} style={{cursor:"pointer"}}>SHOP ▾</span>
          <span onClick={()=>change("Men","shop")} style={{cursor:"pointer"}}>MEN</span>
          <span onClick={()=>change("Women","shop")} style={{cursor:"pointer"}}>WOMEN</span>
          <span onClick={()=>change("Unisex","shop")} style={{cursor:"pointer"}}>UNISEX</span>
          <span onClick={()=>change("Sports","sports")} style={{cursor:"pointer"}}>SPORTS</span>
          <span onClick={()=>change("All","trending")} style={{cursor:"pointer",color:"#FF6A00"}}>TRENDING</span>
        </div>
        <div className="d-flex align-items-center gap-2">
          <a href={GITHUB_URL} target="_blank" className="d-none d-md-block btn btn-sm btn-outline-dark rounded-pill" style={{fontSize:10}}>GitHub</a>
          <span onClick={()=>setShowSearch(!showSearch)} style={{cursor:"pointer",fontSize:18}}>🔍</span>
          <span onClick={()=>{setView("cart"); pushView("cart")}} style={{cursor:"pointer",fontWeight:900}}>🛒 {cart.length}</span>
        </div>
      </nav>

      {showSearch && (
        <div className="bg-white border-bottom p-3 sticky-top" style={{top:62,zIndex:199}}>
          <div className="d-flex gap-2">
            <input value={q} onChange={e=>setQ(e.target.value)} onKeyDown={e=>e.key==="Enter"&&doSearch(q)} placeholder="Search products..." className="form-control rounded-pill" style={{border:"1.5px solid #000"}}/>
            <button onClick={()=>doSearch(q)} className="btn btn-dark rounded-pill px-4 fw-bold btn-sm">Search</button>
          </div>
        </div>
      )}

      {open && (
        <div className="position-fixed bg-white w-100" style={{top:62, left:0, zIndex:199, height:"calc(100vh - 62px)", overflowY:"auto"}}>
          <div className="p-4">
            <div className="border-bottom py-3" onClick={()=>change("All","shop")} style={{cursor:"pointer"}}><h5 className="m-0" style={{fontWeight:900, color:"#000"}}>SHOP</h5></div>
            <div className="d-flex justify-content-between align-items-center border-bottom py-3" onClick={()=>change("Men","shop")} style={{cursor:"pointer"}}><h5 className="m-0" style={{fontWeight:900, color:"#000"}}>MEN</h5><span>⌄</span></div>
            <div className="d-flex justify-content-between align-items-center border-bottom py-3" onClick={()=>change("Women","shop")} style={{cursor:"pointer"}}><h5 className="m-0" style={{fontWeight:900, color:"#000"}}>WOMEN</h5><span>⌄</span></div>
            <div className="d-flex justify-content-between align-items-center border-bottom py-3" onClick={()=>change("Unisex","shop")} style={{cursor:"pointer"}}><h5 className="m-0" style={{fontWeight:900, color:"#000"}}>UNISEX</h5><span>⌄</span></div>
            <div className="d-flex justify-content-between align-items-center border-bottom py-3" onClick={()=>change("Sports","sports")} style={{cursor:"pointer"}}><h5 className="m-0" style={{fontWeight:900, color:"#000"}}>SPORTS</h5><span>⌄</span></div>
            <div className="py-3 border-bottom" onClick={()=>change("All","trending")} style={{cursor:"pointer"}}><h5 className="m-0" style={{fontWeight:900, color:"#FF6A00"}}>TRENDING</h5></div>
            <div className="mt-4">
              {!user ? <>
                <p onClick={()=>{setAuthMode("signin"); setView("auth"); pushView("auth"); setOpen(false)}} className="fw-bold mb-2" style={{cursor:"pointer",fontSize:14}}>SIGN IN</p>
                <p onClick={()=>{setAuthMode("create"); setView("auth"); pushView("auth"); setOpen(false)}} className="fw-bold" style={{cursor:"pointer",fontSize:14}}>CREATE ACCOUNT</p>
              </>:<p onClick={()=>{setUser(null); localStorage.removeItem("ic_user"); setView("home"); setOpen(false)}} style={{cursor:"pointer"}}>LOGOUT - {user.name}</p>}
              <div className="mt-4 p-3 bg-light rounded"><small className="fw-bold d-block mb-2">My GitHub</small><a href={GITHUB_URL} target="_blank" className="btn btn-dark btn-sm rounded-pill w-100">irenenairuba125-design ↗</a><div className="mt-2 d-flex gap-2"><a href={LINKEDIN_URL} target="_blank" className="btn btn-outline-dark btn-sm rounded-pill">LinkedIn</a><a href={X_URL} target="_blank" className="btn btn-outline-dark btn-sm rounded-pill">X</a></div></div>
            </div>
          </div>
        </div>
      )}

      {view==="home" && (
        <>
          <div className="container-fluid p-0">
            <div className="row g-0 align-items-stretch" style={{maxHeight:"85vh", overflow:"hidden"}}>
              <div className="col-12 col-lg-5 px-3 px-lg-5 py-4 d-flex flex-column justify-content-center" style={{minHeight:"42vh"}}>
                <small className="fw-bold" style={{letterSpacing:4, color:"#FF6A00", fontSize:10}}>NEW COLLECTION 2026</small>
                <h1 className="fw-bold mt-2 mb-2" style={{fontFamily:"serif", fontSize:"clamp(28px,4.5vw,52px)", lineHeight:0.9, color:"#111"}}>FIND YOUR<br/><span style={{fontStyle:"italic", fontWeight:400}}>PERFECT</span><br/>STYLE</h1>
                <p className="text-secondary" style={{maxWidth:380, fontSize:13, marginBottom:16}}>Premium dresses, shirts, trousers & athletic wear — delivered countrywide across Uganda.</p>
                <div className="d-flex gap-2">
                  <button onClick={()=>change("All","shop")} className="btn btn-dark rounded-pill fw-bold" style={{fontSize:12, padding:"10px 20px"}}>SHOP NOW →</button>
                  <button onClick={()=>change("All","trending")} className="btn btn-outline-dark rounded-pill fw-bold" style={{fontSize:12, padding:"10px 20px"}}>TRENDING</button>
                </div>
                <small className="mt-2" style={{fontSize:11}}><a href={GITHUB_URL} target="_blank" style={{color:"#000",fontWeight:700}}>GitHub: irenenairuba125-design</a></small>
              </div>
              <div className="col-12 col-lg-7" style={{background:"#F5F1EB", maxHeight:"55vh", overflow:"hidden"}}>
                <img src="https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=800&q=80" alt="Cloth" className="w-100" style={{objectFit:"cover", height:"100%", maxHeight:"55vh", minHeight:"38vh", display:"block"}}/>
              </div>
            </div>
          </div>
          <div className="container-fluid px-3 py-3 text-center" style={{background:"#FFFBF7"}}><small style={{letterSpacing:4,color:"#FF6A00", fontSize:10}}>WEAR YOUR CONFIDENCE</small></div>
          <div className="container-fluid px-3 py-4"><div className="d-flex justify-content-between align-items-center"><h5 className="fw-bold m-0">TRENDING NOW</h5><button onClick={()=>change("All","trending")} className="btn btn-sm btn-outline-dark rounded-pill">View All →</button></div><div className="row g-2 mt-3">{filtered.slice(0,8).map(p=><div key={p.id} className="col-6 col-md-3"><div className="border" style={{cursor:"pointer"}} onClick={()=>openProduct(p)}><img src={p.img} className="w-100" style={{aspectRatio:"1",objectFit:"cover"}} alt=""/><div className="p-2"><small className="fw-bold" style={{fontSize:11}}>{p.name}</small><br/><small className="fw-bold">Shs {p.price.toLocaleString()}</small><button onClick={(e)=>{e.stopPropagation(); if(!user){setView("auth"); pushView("auth");}else setCart([...cart,p])}} className="btn btn-dark w-100 btn-sm rounded-0 mt-2" style={{fontSize:11}}>Add to Cart</button></div></div></div>)}</div></div>
          <Footer/>
        </>
      )}

      {(view==="shop"||view==="sports"||view==="trending") && (
        <>
          <BackBar label="Back to Home"/>
          <div className="text-center py-4 d-flex flex-column justify-content-center align-items-center px-3" style={{minHeight:200,backgroundImage:headerBg,backgroundSize:"cover",backgroundPosition:"center"}}>
            <h1 className="fw-bold text-white" style={{fontFamily:"serif",fontSize:"clamp(26px,6vw,42px)"}}>{isSports?"SPORTS":view==="trending"?"TRENDING NOW":sec==="All"?"SHOP COLLECTION":sec.toUpperCase()}</h1>
          </div>
          <div className="container-fluid px-3 py-4"><div className="row"><div className="col-12 col-md-2 mb-3"><small className="fw-bold">Section</small><div className="mt-2 small d-flex flex-row flex-md-column gap-2 overflow-auto"><span onClick={()=>change("All","shop")} style={{cursor:"pointer", fontWeight: sec==="All"?"900":"400"}}>All</span><span onClick={()=>change("Men","shop")} style={{cursor:"pointer", fontWeight: sec==="Men"?"900":"400"}}>Men</span><span onClick={()=>change("Women","shop")} style={{cursor:"pointer", fontWeight: sec==="Women"?"900":"400"}}>Women</span><span onClick={()=>change("Unisex","shop")} style={{cursor:"pointer", fontWeight: sec==="Unisex"?"900":"400"}}>Unisex</span><span onClick={()=>change("Sports","sports")} style={{cursor:"pointer", fontWeight: sec==="Sports"?"900":"400"}}>Sports</span><span onClick={()=>change("All","trending")} style={{cursor:"pointer",color:"#FF6A00"}}>Trending</span></div><button onClick={goBack} className="btn btn-sm btn-outline-dark rounded-pill mt-3 w-100">← Go Back</button><a href={GITHUB_URL} target="_blank" className="btn btn-sm btn-dark rounded-pill mt-2 w-100">GitHub ↗</a></div><div className="col-12 col-md-10"><div className="row g-2">{filtered.map(p=><div key={p.id} className="col-6 col-md-4 col-lg-3"><div className="border h-100 bg-white position-relative" style={{cursor:"pointer"}} onClick={()=>openProduct(p)}><span className="bg-warning small fw-bold px-2 py-1 m-1 rounded-2 position-absolute" style={{fontSize:8,zIndex:2}}>{p.save}</span><img src={p.img} className="w-100" style={{aspectRatio:"1",objectFit:"cover"}} alt=""/><div className="p-2"><small className="fw-bold d-block" style={{height:32,fontSize:11}}>{p.name}</small><small className="fw-bold">Shs {p.price.toLocaleString()}</small><button onClick={(e)=>{e.stopPropagation(); setCart([...cart,p])}} className="btn btn-dark w-100 btn-sm rounded-0 mt-2" style={{fontSize:11}}>Add to Cart</button></div></div></div>)}</div></div></div></div>
          <Footer/>
        </>
      )}

      {view==="product" && selected && (
        <>
          <BackBar label="Back to Shop"/>
          <div className="container-fluid px-3 py-4">
            <div className="d-flex gap-2 mb-3"><button onClick={goBack} className="btn btn-sm btn-outline-dark rounded-pill">← Previous</button><button onClick={()=>{setView("home"); setSec("All")}} className="btn btn-sm btn-dark rounded-pill">Home</button></div>
            <div className="row g-4"><div className="col-12 col-md-6"><img src={selected.img} className="w-100 rounded" style={{aspectRatio:"1",objectFit:"cover"}} alt=""/></div><div className="col-12 col-md-6"><small style={{color:"#FF6A00", letterSpacing:3}}>{selected.section}</small><h2 className="fw-bold mt-2" style={{fontFamily:"serif"}}>{selected.name}</h2><h4 className="fw-bold mt-3">Shs {selected.price.toLocaleString()}</h4><p className="text-secondary mt-2 small">{selected.desc}</p><button onClick={()=>{setCart([...cart,selected]); setView("cart"); pushView("cart")}} className="btn btn-dark rounded-pill px-4 py-2 fw-bold w-100 mt-3">Add to Cart</button><button onClick={goBack} className="btn btn-outline-dark rounded-pill w-100 mt-2">← Go Back</button><small className="d-block mt-3"><a href={GITHUB_URL} target="_blank" style={{color:"#000"}}>View on GitHub: irenenairuba125-design</a></small></div></div>
          </div>
          <Footer/>
        </>
      )}

      {view==="cart" && (
        <>
          <BackBar label="Back to Shop"/>
          <div className="container-fluid px-3 py-4" style={{minHeight:"70vh"}}>
            <div className="d-flex gap-2 mb-3"><button onClick={goBack} className="btn btn-sm btn-outline-dark rounded-pill">← Back</button><button onClick={()=>{setView("home"); setSec("All")}} className="btn btn-sm btn-dark rounded-pill">Home</button></div>
            <h3 className="fw-bold">Your Cart - {cart.length} items</h3>
            {cart.length===0 ? <div className="text-center py-5"><p>Empty</p><button onClick={()=>change("All","shop")} className="btn btn-dark rounded-pill">Shop Now</button></div> : (<div className="row g-4 mt-2"><div className="col-12 col-md-8">{cart.map((c,i)=><div key={i} className="d-flex gap-3 border p-2 mb-2 align-items-center"><img src={c.img} style={{width:60,height:60,objectFit:"cover"}} alt=""/><div className="flex-fill"><small className="fw-bold">{c.name}</small><br/><small>Shs {c.price.toLocaleString()}</small></div><button onClick={()=>setCart(cart.filter((_,idx)=>idx!==i))} className="btn btn-sm btn-outline-danger">X</button></div>)}</div><div className="col-12 col-md-4"><div className="border p-3 rounded"><h6 className="fw-bold">Total: Shs {cartTotal.toLocaleString()}</h6><button className="btn btn-dark w-100 rounded-pill mt-2">Checkout</button><button onClick={goBack} className="btn btn-outline-dark w-100 rounded-pill mt-2">← Back</button></div></div></div>)}
          </div>
          <Footer/>
        </>
      )}

      {view==="search" && (
        <>
          <BackBar label="Back"/>
          <div className="container-fluid px-3 py-4" style={{minHeight:"70vh"}}><div className="d-flex gap-2 mb-3"><button onClick={goBack} className="btn btn-sm btn-outline-dark rounded-pill">← Back</button><button onClick={()=>{setView("home"); setSec("All")}} className="btn btn-sm btn-dark rounded-pill">Home</button></div><h5>Search: "{q}" - {results.length} found</h5>{results.length===0 ? <div className="text-center py-5"><p>No results for "{q}"</p><button onClick={goBack} className="btn btn-outline-dark rounded-pill">← Go Back</button></div> : <div className="row g-2 mt-3">{results.map(p=><div key={p.id} className="col-6 col-md-3"><div className="border"><img src={p.img} className="w-100" style={{aspectRatio:"1",objectFit:"cover"}} alt=""/><div className="p-2"><small className="fw-bold">{p.name}</small><br/><small>Shs {p.price.toLocaleString()}</small><button onClick={()=>setCart([...cart,p])} className="btn btn-dark w-100 btn-sm mt-2">Add to Cart</button></div></div></div>)}</div>}</div>
          <Footer/>
        </>
      )}

      {view==="auth" && (
        <>
          <BackBar label="Back to Home"/>
          <div className="container-fluid d-flex justify-content-center" style={{minHeight:"90vh",background:"#fff"}}>
            <div className="w-100" style={{maxWidth:420,padding:"20px"}}>
              <div className="text-center"><div style={{fontSize:40}}>👗</div><h6 className="fw-bold">IRENE'S CLOSET</h6><small><a href={GITHUB_URL} target="_blank" style={{color:"#000",fontSize:11}}>github.com/irenenairuba125-design</a></small></div>
              <h1 className="text-center fw-bold mt-2" style={{fontFamily:"serif",fontSize:30}}>{authMode==="create"?"CREATE ACCOUNT":"SIGN IN"}</h1>
              <button onClick={googleLogin} className="btn w-100 mt-3 d-flex align-items-center justify-content-center gap-2" style={{border:"1.5px solid #000",borderRadius:50,padding:12,fontWeight:800,fontSize:12}}><img src="https://www.svgrepo.com/show/475656/google-color.svg" style={{width:18}} alt=""/> CONTINUE WITH GOOGLE</button>
              <div className="d-flex align-items-center gap-2 my-3"><div style={{height:1,background:"#ddd",flex:1}}></div><small className="fw-bold text-secondary" style={{fontSize:11}}>OR REGISTER WITH EMAIL</small><div style={{height:1,background:"#ddd",flex:1}}></div></div>
              <div className="row g-2"><div className="col-6"><small className="fw-bold text-secondary" style={{fontSize:11}}>FIRST NAME</small><input value={fName} onChange={e=>setFName(e.target.value)} className="form-control rounded-0 mt-1" style={{border:"1px solid #999",padding:11}}/></div><div className="col-6"><small className="fw-bold text-secondary" style={{fontSize:11}}>LAST NAME</small><input value={lName} onChange={e=>setLName(e.target.value)} className="form-control rounded-0 mt-1" style={{border:"1px solid #999",padding:11}}/></div><div className="col-12 mt-2"><small className="fw-bold text-secondary" style={{fontSize:11}}>EMAIL</small><input value={email} onChange={e=>setEmail(e.target.value)} className="form-control rounded-0 mt-1" style={{border:"1px solid #999",padding:11}}/></div><div className="col-12 mt-2"><small className="fw-bold text-secondary" style={{fontSize:11}}>PASSWORD</small><input type="password" value={pwd} onChange={e=>setPwd(e.target.value)} className="form-control rounded-0 mt-1" style={{border:"1px solid #999",padding:11}}/></div><div className="col-12 mt-3 d-flex gap-2"><input type="checkbox" checked={agree} onChange={e=>setAgree(e.target.checked)}/><small style={{fontSize:11}}>I agree to <b><u>Terms</u></b> and <b><u>Privacy</u></b></small></div><div className="col-12 mt-3"><button onClick={createAccount} className="btn btn-dark w-100 rounded-0 fw-bold" style={{padding:12}}>{authMode==="create"?"CREATE ACCOUNT →":"SIGN IN →"}</button><div className="d-flex gap-2 mt-2"><button onClick={goBack} className="btn btn-outline-dark w-50 rounded-0">← Back</button><button onClick={()=>{setView("home"); setSec("All")}} className="btn btn-dark w-50 rounded-0">Home</button></div><p className="text-center mt-3 small"><a href={GITHUB_URL} target="_blank" style={{color:"#000",fontWeight:700}}>GitHub: irenenairuba125-design ↗</a></p></div></div>
            </div>
          </div>
          <Footer/>
        </>
      )}

      <style jsx global>{`body{overflow-x:hidden;margin:0} img{max-width:100%} @media(max-width:576px){.btn{padding:8px 12px !important; font-size:12px !important}}`}</style>
    </div>
  );
}
