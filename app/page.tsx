"use client";
import { useState, useMemo, useEffect } from "react";

const C: any = {
  Men: ["photo-1596755094514-f87e34085b2c","photo-1551537482-f2075a1d41f2","photo-1594938298603-c8148c4dae35","photo-1521572163474-6864f9cf17ab","photo-1556821840-3a63f95609a7","photo-1594633312681-425c7b97ccd1","photo-1551028719-00167b16eac5","photo-1591195853828-11db59a44f6b"],
  Women: ["photo-1595777457583-95e059d581b8","photo-1583496661160-fb5886a0aaaa","photo-1598550476439-6845435fcea5","photo-1490481651871-ab68de25d43d","photo-1591369822096-ffd140ec948f","photo-1434389677669-e08b4cac3105","photo-1541099649105-f69ad21f3246","photo-1581044777550-4cfa60707c03"],
  Unisex: ["photo-1521572163474-6864f9cf17ab","photo-1544923246-77307dd654cb","photo-1594633312681-425c7b97ccd1","photo-1556821840-3a63f95609a7","photo-1591195853828-11db59a44f6b","photo-1596755094514-f87e34085b2c"],
  Sports: ["photo-1571902943202-507ec2618e8f","photo-1517438476312-10d79c077509","photo-1506629903106-0650d349b7b9","photo-1551537482-f2075a1d41f2","photo-1591195853828-11db59a44f6b","photo-1556821840-3a63f95609a7"]
};

const make = (sec:string, n:number) => Array.from({length:n},(_,i)=>({
  id:`${sec}${i}`, name:`${sec} ${["Silk 100% Limited Collection","Classic Shirt","Denim Jacket","Cargo Pants","Hoodie","Blazer","Minimal Dress","Cotton Tee","Wool Coat","Pleated Skirt"][i%10]} ${i+1}`,
  price:35000+i*5500, desc:"Premium cloth - 100% cotton, perfect fit. Delivered countrywide. Haven Brand.",
  img:`https://images.unsplash.com/${C[sec][i % C[sec].length]}?w=600&q=80&auto=format&fit=crop`,
  section:sec
}));

const PRODUCTS = [...make("Men",24),...make("Women",24),...make("Unisex",24),...make("Sports",24)];
const SIZES = ["M","L","XL","2XL","3XL","4XL"];

const HERO_CLOTH_IMAGE = "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=1200&q=80&auto=format&fit=crop";

export default function Page(){
  const [view,setView]=useState("home");
  const [sec,setSec]=useState("All");
  const [cart,setCart]=useState<any[]>([]);
  const [open,setOpen]=useState(false);
  const [selected,setSelected]=useState<any>(null);
  const [history,setHistory]=useState<string[]>(["home"]);
  const [user,setUser]=useState<any>(null);
  const [fName,setFName]=useState(""); const [lName,setLName]=useState("");
  const [email,setEmail]=useState(""); const [pwd,setPwd]=useState("");
  const [agree,setAgree]=useState(false);
  const [size,setSize]=useState("M");
  const [qty,setQty]=useState(1);

  useEffect(()=>{ const s=localStorage.getItem("ic_user"); if(s) setUser(JSON.parse(s)); },[]);

  const filtered = useMemo(()=>{
    if(sec==="Men") return PRODUCTS.filter(p=>p.section==="Men");
    if(sec==="Women") return PRODUCTS.filter(p=>p.section==="Women");
    if(sec==="Unisex") return PRODUCTS.filter(p=>p.section==="Unisex");
    if(view==="sports"||sec==="Sports") return PRODUCTS.filter(p=>p.section==="Sports");
    if(view==="trending") return PRODUCTS.slice(0,24);
    return PRODUCTS.slice(0,24);
  },[sec,view]);

  const pushView = (v:string)=> setHistory(h=>[...h, v]);
  const change=(s:string,v:string="shop")=>{ setSec(s);setView(v);pushView(v);setOpen(false);window.scrollTo(0,0); };
  const goBack = ()=>{ if(history.length>1){ const prev=history[history.length-2]; setHistory(h=>h.slice(0,-1)); setView(prev); } else setView("home"); window.scrollTo(0,0); };
  const openProduct = (p:any)=>{ setSelected(p); setSize("M"); setQty(1); setView("product"); pushView("product"); window.scrollTo(0,0); };
  const addToCart = (buyNow=false)=>{ if(!selected) return; const item = {...selected, size, qty}; setCart([...cart, item]); if(buyNow){ setView("cart"); pushView("cart"); } else { alert(`Added ${selected.name} Size:${size} Qty:${qty}`); } };
  const createAccount = ()=>{ if(!fName||!lName||!email||!pwd){ alert("Fill all fields"); return; } if(!agree){ alert("Agree Terms"); return; } const u={name:`${fName} ${lName}`, email}; setUser(u); localStorage.setItem("ic_user", JSON.stringify(u)); setView("home"); };
  const googleLogin = ()=>{ setUser({name:"Google User"}); setView("home"); };
  const handleCheckout = ()=>{ if(!user){ setView("auth"); pushView("auth"); return; } alert("Checkout successful!"); setCart([]); setView("home"); };

  const BackLink = () => (<div className="px-3 py-3"><span onClick={goBack} style={{cursor:"pointer", fontSize:14, fontWeight:500}}>{"<--"} back</span></div>);
  const Footer = () => (<footer className="bg-black text-white mt-5 pt-5 pb-4 px-4"><div className="container-fluid"><div className="row g-4"><div className="col-12 col-md-5"><h6 className="fw-bold" style={{fontFamily:"serif"}}>IRENE'S CLOSET</h6><small className="text-secondary">Premium dresses, shirts, trousers & athletic wear.<br/>Wear Your Confidence • Countrywide delivery</small></div><div className="col-6 col-md-3"><small className="fw-bold d-block mb-2">Shop</small><div className="small text-secondary d-flex flex-column gap-1"><span onClick={()=>change("All","shop")} style={{cursor:"pointer"}}>Shop</span><span onClick={()=>change("Men","shop")} style={{cursor:"pointer"}}>Men</span><span onClick={()=>change("Women","shop")} style={{cursor:"pointer"}}>Women</span><span onClick={()=>change("Unisex","shop")} style={{cursor:"pointer"}}>Unisex</span><span onClick={()=>change("Sports","sports")} style={{cursor:"pointer"}}>Sports</span></div></div><div className="col-6 col-md-4"><small className="fw-bold d-block mb-2">Socials</small><div className="small text-secondary d-flex flex-column gap-1"><span>Instagram</span><span>TikTok</span><span>WhatsApp</span><span>Facebook</span></div></div></div><div className="border-top border-secondary mt-4 pt-3 text-center"><small className="text-secondary">© 2026 Irene's Closet</small></div></div></footer>);

  return(
    <div style={{background:"#fff"}}>
      <nav className="d-flex justify-content-between align-items-center px-3 py-3 bg-white sticky-top border-bottom" style={{zIndex:200}}>
        <div className="d-flex align-items-center gap-2"><span onClick={()=>setOpen(!open)} style={{cursor:"pointer",fontSize:26,fontWeight:900}}>{open?"✕":"☰"}</span><div className="d-flex align-items-center gap-2" onClick={()=>{setView("home"); setHistory(["home"])}} style={{cursor:"pointer"}}><div className="bg-black text-white d-flex justify-content-center align-items-center fw-bold" style={{width:36,height:36,borderRadius:8}}>👗</div><span className="fw-bold" style={{fontSize:11}}>IRENE'S CLOSET</span></div></div>
        <div className="d-none d-md-flex gap-3 small fw-bold"><span onClick={()=>change("All","shop")} style={{cursor:"pointer"}}>SHOP ▾</span><span onClick={()=>change("Men","shop")} style={{cursor:"pointer"}}>MEN</span><span onClick={()=>change("Women","shop")} style={{cursor:"pointer"}}>WOMEN</span><span onClick={()=>change("Unisex","shop")} style={{cursor:"pointer"}}>UNISEX</span><span onClick={()=>change("Sports","sports")} style={{cursor:"pointer"}}>SPORTS</span><span onClick={()=>change("All","trending")} style={{cursor:"pointer", color:"#FF6A00"}}>TRENDING</span></div>
        <div className="d-flex align-items-center gap-3"><span onClick={()=>{setView("cart"); pushView("cart")}} style={{cursor:"pointer",fontWeight:900}}>🛒 {cart.length}</span></div>
      </nav>
      {open && (<div className="position-fixed bg-white w-100" style={{top:62, left:0, zIndex:199, height:"calc(100vh - 62px)"}}><div className="p-4"><div className="py-3 border-bottom" onClick={()=>change("All","shop")} style={{cursor:"pointer",fontWeight:900}}>SHOP</div><div className="py-3 border-bottom" onClick={()=>change("Men","shop")} style={{cursor:"pointer",fontWeight:900}}>MEN</div><div className="py-3 border-bottom" onClick={()=>change("Women","shop")} style={{cursor:"pointer",fontWeight:900}}>WOMEN</div><div className="py-3 border-bottom" onClick={()=>change("Unisex","shop")} style={{cursor:"pointer",fontWeight:900}}>UNISEX</div><div className="py-3 border-bottom" onClick={()=>change("Sports","sports")} style={{cursor:"pointer",fontWeight:900}}>SPORTS</div><div className="py-3" onClick={()=>change("All","trending")} style={{cursor:"pointer",fontWeight:900,color:"#FF6A00"}}>TRENDING</div></div></div>)}

      {view==="home" && (
        <>
          <div className="container-fluid p-0">
            <div className="row g-0 align-items-stretch" style={{minHeight:"55vh"}}>
              <div className="col-12 col-lg-5 px-4 py-4 d-flex flex-column justify-content-center" style={{minHeight:"35vh"}}>
                <small className="fw-bold" style={{letterSpacing:3,color:"#FF6A00",fontSize:10}}>NEW COLLECTION 2026</small>
                <h1 className="fw-bold mt-2 mb-2" style={{fontFamily:"serif", fontSize:"clamp(28px,4.5vw,50px)", lineHeight:0.9}}>FIND YOUR<br/><span style={{fontStyle:"italic",fontWeight:400}}>PERFECT</span><br/>STYLE</h1>
                <p className="text-secondary" style={{fontSize:13, maxWidth:360}}>Tour freely - no account needed to view products. Account only for checkout.</p>
                <div className="d-flex gap-2 mt-2">
                  <button onClick={()=>change("All","shop")} className="btn btn-dark rounded-pill fw-bold" style={{fontSize:12,padding:"10px 20px"}}>SHOP NOW →</button>
                  <button onClick={()=>change("All","trending")} className="btn btn-outline-dark rounded-pill fw-bold" style={{fontSize:12,padding:"10px 20px"}}>TRENDING</button>
                </div>
              </div>
              <div className="col-12 col-lg-7" style={{background:"#F5F1EB", minHeight:"400px", height:"60vh"}}>
                <img src={HERO_CLOTH_IMAGE} alt="clothes collection" className="w-100 h-100" style={{objectFit:"cover", objectPosition:"center top", height:"100%", minHeight:"400px", display:"block"}}/>
              </div>
            </div>
          </div>
          <div className="container-fluid px-3 py-4"><h5 className="fw-bold">TRENDING NOW</h5><div className="row g-2 mt-3">{filtered.slice(0,8).map(p=>(<div key={p.id} className="col-6 col-md-3"><div className="border" style={{cursor:"pointer"}} onClick={()=>openProduct(p)}><img src={p.img} className="w-100" style={{aspectRatio:"4/5",objectFit:"cover", objectPosition:"top center"}} alt=""/><div className="p-2"><small className="fw-bold" style={{fontSize:11}}>{p.name}</small><br/><small>Shs {p.price.toLocaleString()}</small></div></div></div>))}</div></div>
          <Footer/>
        </>
      )}
      {(view==="shop"||view==="sports"||view==="trending") && (<><BackLink/><div className="container-fluid px-3 py-4"><div className="row g-2">{filtered.map(p=>(<div key={p.id} className="col-6 col-md-3"><div className="border h-100" style={{cursor:"pointer"}} onClick={()=>openProduct(p)}><div className="position-relative"><img src={p.img} className="w-100" style={{aspectRatio:"4/5",objectFit:"cover", objectPosition:"top center"}} alt=""/><span className="position-absolute top-0 start-0 m-1 badge bg-warning text-dark" style={{fontSize:9}}>SAVE 22%</span></div><div className="p-2"><small className="fw-bold d-block" style={{fontSize:11,height:32, overflow:"hidden"}}>{p.name}</small><small>Shs {p.price.toLocaleString()}</small></div></div></div>))}</div></div><Footer/></>)}
      {view==="product" && selected && (<><BackLink/><div className="container-fluid px-3 py-3"><div className="row g-4"><div className="col-12 col-md-6"><img src={selected.img} className="w-100 rounded" style={{aspectRatio:"4/5",objectFit:"cover", objectPosition:"top center"}} alt=""/></div><div className="col-12 col-md-6"><h3 className="fw-bold" style={{fontFamily:"serif", lineHeight:1.1}}>{selected.name}</h3><h5 className="fw-bold mt-2">Shs {selected.price.toLocaleString()}</h5><p className="text-secondary small mt-2">{selected.desc}</p><div className="mt-3"><div className="row g-2" style={{maxWidth:340}}>{SIZES.map(s=>(<div key={s} className="col-3 col-md-2"><button onClick={()=>setSize(s)} style={{width:"100%", height:42, borderRadius:12, border: size===s? "2px solid #000":"1px solid #ccc", background: size===s? "#000":"#fff", color: size===s? "#fff":"#000", fontWeight:700}}>{s}</button></div>))}</div></div><div className="mt-4 d-flex gap-2" style={{maxWidth:420}}><div className="d-flex align-items-center bg-light border" style={{height:44}}><button onClick={()=>setQty(q=>Math.max(1,q-1))} className="btn px-3">-</button><span className="px-2 fw-bold">{qty}</span><button onClick={()=>setQty(q=>q+1)} className="btn px-3">+</button></div><button onClick={()=>addToCart(false)} className="btn btn-dark flex-fill fw-bold d-flex align-items-center justify-content-center gap-2" style={{height:44}}>Add to cart</button></div><button onClick={()=>addToCart(true)} className="btn w-100 mt-2 fw-bold" style={{height:48, background:"#000", color:"#fff", maxWidth:420}}>Buy it now</button><div className="mt-3"><span onClick={goBack} style={{cursor:"pointer",fontSize:14}}>{"<--"} back</span></div></div></div></div><Footer/></>)}
      {view==="cart" && (<><BackLink/><div className="container-fluid px-3 py-3" style={{minHeight:"60vh"}}><h4 className="fw-bold">Cart - {cart.length} items</h4>{cart.length===0? <div className="text-center py-5"><p>Empty</p><button onClick={()=>change("All","shop")} className="btn btn-dark rounded-pill">Shop Now</button></div> : (<div className="row g-3 mt-2"><div className="col-12 col-md-8">{cart.map((c,i)=><div key={i} className="d-flex gap-3 border p-2 mb-2 align-items-center"><img src={c.img} style={{width:60,height:60,objectFit:"cover"}} alt=""/><div className="flex-fill"><small className="fw-bold">{c.name}</small><br/><small>Size:{c.size} Qty:{c.qty} - Shs {(c.price*c.qty).toLocaleString()}</small></div><button onClick={()=>setCart(cart.filter((_,idx)=>idx!==i))} className="btn btn-sm btn-outline-danger">X</button></div>)}</div><div className="col-12 col-md-4"><div className="border p-3 rounded"><h6 className="fw-bold">Total: Shs {cart.reduce((a,b)=>a+(b.price*b.qty),0).toLocaleString()}</h6><button onClick={handleCheckout} className="btn btn-dark w-100 rounded-pill mt-2">Checkout</button></div></div></div>)}</div><Footer/></>)}
      {view==="auth" && (<><BackLink/><div className="container-fluid d-flex justify-content-center" style={{minHeight:"75vh"}}><div style={{maxWidth:420,width:"100%",padding:"20px"}}><div className="text-center"><div style={{fontSize:32}}>👗</div><h6 className="fw-bold">IRENE'S CLOSET</h6><h1 className="fw-bold mt-2" style={{fontFamily:"serif",fontSize:32}}>CREATE ACCOUNT</h1></div><button onClick={googleLogin} className="btn w-100 mt-4 d-flex justify-content-center align-items-center gap-2" style={{border:"1.5px solid #000",borderRadius:50,padding:12,fontWeight:700,fontSize:12}}><img src="https://www.svgrepo.com/show/475656/google-color.svg" style={{width:18}} alt=""/> CONTINUE WITH GOOGLE</button><div className="row g-2 mt-3"><div className="col-6"><small style={{fontSize:11,fontWeight:700}}>FIRST NAME</small><input value={fName} onChange={e=>setFName(e.target.value)} className="form-control rounded-0 mt-1" style={{border:"1px solid #999",padding:10}}/></div><div className="col-6"><small style={{fontSize:11,fontWeight:700}}>LAST NAME</small><input value={lName} onChange={e=>setLName(e.target.value)} className="form-control rounded-0 mt-1" style={{border:"1px solid #999",padding:10}}/></div><div className="col-12 mt-2"><small style={{fontSize:11,fontWeight:700}}>EMAIL</small><input value={email} onChange={e=>setEmail(e.target.value)} className="form-control rounded-0 mt-1" style={{border:"1px solid #999",padding:10}}/></div><div className="col-12 mt-2"><small style={{fontSize:11,fontWeight:700}}>PASSWORD</small><input type="password" value={pwd} onChange={e=>setPwd(e.target.value)} className="form-control rounded-0 mt-1" style={{border:"1px solid #999",padding:10}}/></div><div className="col-12 mt-3 d-flex gap-2"><input type="checkbox" checked={agree} onChange={e=>setAgree(e.target.checked)}/><small style={{fontSize:11}}>I agree to Terms and Privacy</small></div><div className="col-12 mt-3"><button onClick={createAccount} className="btn btn-dark w-100 rounded-0 fw-bold" style={{padding:12}}>CREATE ACCOUNT →</button></div></div></div></div><Footer/></>)}
      <style jsx global>{`body{margin:0;overflow-x:hidden} img{max-width:100%}`}</style>
    </div>
  );
}
