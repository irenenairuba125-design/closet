"use client";
import { useState, useMemo } from "react";

const PRODUCTS = [
  { id:1, name:"Birkenstock Boston clogs", price:120000, old:360000, img:"https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500", save:"SAVE 67%", gender:"Unisex", style:"Casual Wear" },
  { id:2, name:"Puma Speedcat OG", price:150000, old:250000, img:"https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500", save:"SAVE 40%", gender:"Unisex", style:"Streetwear Essentials" },
  { id:3, name:"Adidas Samba OG", price:220000, old:370000, img:"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500", save:"SAVE 41%", gender:"Men", style:"Smart & Stylish" },
  { id:4, name:"Nike SB Force 58", price:250000, old:350000, img:"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500", save:"SAVE 29%", gender:"Unisex", style:"Sports" },
  { id:5, name:"Air Jordan 9 Retro", price:180000, old:250000, img:"https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=500", save:"", gender:"Men", style:"Streetwear Essentials" },
  { id:6, name:"Nike Dunk Low", price:150000, old:200000, img:"https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=500", save:"SAVE 25%", gender:"Women", style:"Casual Wear" },
  { id:7, name:"Clarks Wallabee", price:185000, old:200000, img:"https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500", save:"SAVE 8%", gender:"Men", style:"Smart & Stylish" },
  { id:8, name:"Silk Slip Dress", price:180000, old:250000, img:"https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=500", save:"SAVE 28%", gender:"Women", style:"Casual Wear" },
  { id:9, name:"Graphic Hoodie", price:95000, old:140000, img:"https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500", save:"SAVE 32%", gender:"Unisex", style:"Streetwear Essentials" },
];

export default function Page(){
  const [view, setView] = useState("home"); // home, shop
  const [gender, setGender] = useState("All");
  const [styleFilter, setStyleFilter] = useState("All");
  const [cart, setCart] = useState<any[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [email, setEmail] = useState("");
  const [search, setSearch] = useState("");

  const filtered = useMemo(()=>{
    return PRODUCTS.filter(p=>
      (gender==="All" || p.gender===gender) &&
      (styleFilter==="All" || p.style===styleFilter) &&
      p.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [gender, styleFilter, search]);

  const bannerTitle = gender==="All"? "Shop Collection" : `${gender}`;
  const bannerSub = gender==="Unisex"? "Genderless silhouettes for everyone." : gender==="All"? "Premium sneakers, boots, and athletic footwear — delivered countrywide." : `From Clean ${gender} silhouettes to classic essentials.`;

  return(
    <div style={{background:"#fff", minHeight:"100vh"}}>
      {/* NAV - ICONE IRENE'S CLOSET */}
      <nav className="d-flex justify-content-between align-items-center px-4 py-2 bg-white sticky-top border-bottom" style={{zIndex:100}}>
        <div className="d-flex align-items-center gap-2" onClick={()=>{setView("home"); setGender("All");}} style={{cursor:"pointer"}}>
          <div className="bg-black text-white d-flex align-items-center justify-content-center" style={{width:"42px", height:"42px", borderRadius:"8px"}}>
            <span style={{fontSize:"20px"}}>👗</span>
          </div>
          <div style={{lineHeight:"1.1"}}>
            <div className="fw-bold" style={{fontSize:"13px", letterSpacing:"1px"}}>IRENE'S CLOSET</div>
            <div style={{fontSize:"8px", letterSpacing:"2px"}}>IC. EST 2024</div>
          </div>
        </div>
        <div className="d-none d-md-flex gap-4 small fw-bold">
          <span onClick={()=>{setView("shop"); setGender("All");}} style={{cursor:"pointer", borderBottom: view==="shop" && gender==="All"?"2px solid black":"none"}}>SHOP ▾</span>
          <span onClick={()=>{setView("shop"); setGender("Men");}} style={{cursor:"pointer", borderBottom: gender==="Men"?"2px solid black":"none"}}>MEN ▾</span>
          <span onClick={()=>{setView("shop"); setGender("Women");}} style={{cursor:"pointer", borderBottom: gender==="Women"?"2px solid black":"none"}}>WOMEN ▾</span>
          <span onClick={()=>{setView("shop"); setGender("Unisex");}} style={{cursor:"pointer", borderBottom: gender==="Unisex"?"2px solid black":"none"}}>UNISEX ▾</span>
          <span onClick={()=>{setView("shop"); setGender("All"); setStyleFilter("Sports");}} style={{cursor:"pointer"}}>SPORTS ▾</span>
          <span onClick={()=>{setView("shop"); setGender("All");}} style={{cursor:"pointer", color:"#FF6A00"}}>TRENDING</span>
        </div>
        <div className="d-flex gap-3 align-items-center">
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search" className="form-control form-control-sm rounded-pill" style={{width:"100px"}}/>
          <span onClick={()=>setShowCart(!showCart)} style={{cursor:"pointer"}}>🛒 {cart.length}</span>
          <span>👤</span>
        </div>
      </nav>

      {/* CART POPUP */}
      {showCart && (
        <div className="position-fixed top-0 end-0 bg-white border shadow p-3" style={{zIndex:200, width:"320px", minHeight:"100vh"}}>
          <div className="d-flex justify-content-between"><h6>Cart ({cart.length})</h6><button onClick={()=>setShowCart(false)} className="btn btn-sm">X</button></div>
          {cart.map((c,i)=><div key={i} className="d-flex justify-content-between border-bottom py-2"><small>{c.name}</small><small>Shs {c.price.toLocaleString()}</small></div>)}
          <div className="fw-bold mt-3">Total: Shs {cart.reduce((a,b)=>a+b.price,0).toLocaleString()}</div>
          <button onClick={()=>{alert("Order placed!"); setCart([]); setShowCart(false);}} className="btn btn-dark w-100 rounded-0 mt-3">PAY NOW</button>
        </div>
      )}

      {view==="home" && (
        <div style={{background:"#B8B0A6", minHeight:"88vh", position:"relative", overflow:"hidden"}}>
          <div className="position-absolute w-100 h-100 d-none d-md-block" style={{top:0}}>
            <img src={PRODUCTS[0].img} className="position-absolute rounded-3 shadow-sm" style={{width:"105px", left:"31%", top:"11%", transform:"rotate(-8deg)"}} alt=""/>
            <img src={PRODUCTS[1].img} className="position-absolute rounded-3 shadow-sm" style={{width:"115px", left:"50%", top:"4%", transform:"translateX(-50%)"}} alt=""/>
            <img src={PRODUCTS[2].img} className="position-absolute rounded-3 shadow-sm" style={{width:"110px", right:"29%", top:"16%"}} alt=""/>
            <img src={PRODUCTS[3].img} className="position-absolute rounded-3 shadow-sm" style={{width:"105px", left:"27%", top:"31%"}} alt=""/>
            <img src={PRODUCTS[4].img} className="position-absolute rounded-3 shadow-sm" style={{width:"105px", right:"23%", top:"33%"}} alt=""/>
            <img src={PRODUCTS[5].img} className="position-absolute rounded-3 shadow-sm" style={{width:"100px", left:"20%", top:"52%"}} alt=""/>
            <img src={PRODUCTS[6].img} className="position-absolute rounded-3 shadow-sm" style={{width:"105px", right:"19%", top:"53%"}} alt=""/>
            <img src={PRODUCTS[7].img} className="position-absolute rounded-3 shadow-sm" style={{width:"110px", left:"24%", bottom:"15%"}} alt=""/>
            <img src={PRODUCTS[8].img} className="position-absolute rounded-3 shadow-sm" style={{width:"115px", right:"23%", bottom:"10%"}} alt=""/>
          </div>
          <div className="position-relative d-flex flex-column align-items-center justify-content-center text-center" style={{minHeight:"88vh", zIndex:10}}>
            <h1 className="fw-bold text-white" style={{fontFamily:"serif", fontSize:"clamp(45px, 8vw, 80px)"}}>IRENE'S CLOSET</h1>
            <p className="text-white mt-2 px-3" style={{maxWidth:"520px"}}>Premium dresses, boots, and minimal essentials — delivered countrywide.</p>
            <button onClick={()=>{setView("shop"); setGender("All");}} className="btn bg-white rounded-pill px-5 py-3 fw-bold mt-3">SHOP COLLECTION</button>
            <div className="mt-5">
              <small className="text-white" style={{letterSpacing:"4px"}}>SHOP BY DEPARTMENT</small>
              <div className="d-flex gap-2 mt-3 flex-wrap justify-content-center">
                {[
                  {label:"MEN", val:"Men"},
                  {label:"WOMEN", val:"Women"},
                  {label:"UNISEX", val:"Unisex"},
                  {label:"SPORTS", val:"All"},
                ].map(d=>(
                  <button key={d.label} onClick={()=>{setGender(d.val); setView("shop");}} className="btn rounded-pill px-4 btn-sm" style={{background:"rgba(0,0,0,0.35)", color:"white", border:"1px solid rgba(255,255,255,0.6)", backdropFilter:"blur(8px)"}}>{d.label}</button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {view==="shop" && (
        <>
          <div className="text-center py-5" style={{background:"#F8F8F8"}}>
            <h1 className="fw-bold" style={{fontFamily:"serif", fontSize:"44px"}}>{bannerTitle.toUpperCase()}</h1>
            <p className="text-secondary">{bannerSub}</p>
          </div>
          <div className="container-fluid px-4 py-4">
            <div className="row">
              <div className="col-md-2">
                <div className="mb-4"><div className="d-flex justify-content-between"><small className="fw-bold">Section</small><small>^</small></div>
                  <div className="mt-2 small d-grid gap-2">
                    <span onClick={()=>{setGender("All"); setStyleFilter("All");}} style={{cursor:"pointer", fontWeight:gender==="All"?"bold":""}}>All Products</span>
                    <span onClick={()=>setGender("Men")} style={{cursor:"pointer", fontWeight:gender==="Men"?"bold":""}}>Men</span>
                    <span onClick={()=>setGender("Women")} style={{cursor:"pointer", fontWeight:gender==="Women"?"bold":""}}>Women</span>
                    <span onClick={()=>setGender("Unisex")} style={{cursor:"pointer", fontWeight:gender==="Unisex"?"bold":""}}>Unisex</span>
                    <span>Sports</span><span>Trending</span><span>New Arrivals</span>
                  </div>
                </div>
                <div className="mb-4"><small className="fw-bold">Style</small>
                  <div className="mt-2 small d-grid gap-1">
                    <span onClick={()=>setStyleFilter("All")} style={{cursor:"pointer", fontWeight:styleFilter==="All"?"bold":""}}>All Styles</span>
                    <span onClick={()=>setStyleFilter("Streetwear Essentials")} style={{cursor:"pointer", fontWeight:styleFilter==="Streetwear Essentials"?"bold":""}}>Streetwear Essentials</span>
                    <span onClick={()=>setStyleFilter("Smart & Stylish")} style={{cursor:"pointer", fontWeight:styleFilter==="Smart & Stylish"?"bold":""}}>Smart & Stylish</span>
                    <span onClick={()=>setStyleFilter("Casual Wear")} style={{cursor:"pointer", fontWeight:styleFilter==="Casual Wear"?"bold":""}}>Casual Wear</span>
                  </div>
                </div>
                <button onClick={()=>{setView("home");}} className="btn btn-sm btn-outline-dark rounded-0 w-100 mt-3">← Home</button>
              </div>
              <div className="col-md-10">
                <div className="d-flex justify-content-between mb-3"><small>{filtered.length} Products</small><small>Sort by: Newest ▾</small></div>
                <div className="row g-3">
                  {filtered.map(p=>(
                    <div key={p.id} className="col-6 col-md-4">
                      <div className="border" style={{background:"#FAFAFA"}}>
                        <div className="position-relative">
                          {p.save && <span className="position-absolute top-0 start-0 bg-warning small fw-bold px-2 py-1 m-2 rounded-2" style={{fontSize:"10px"}}>{p.save}</span>}
                          <img src={p.img} className="w-100" style={{aspectRatio:"1", objectFit:"cover"}} alt=""/>
                        </div>
                        <div className="p-2 bg-white">
                          <small className="fw-bold d-block" style={{height:"35px"}}>{p.name}</small>
                          <div className="d-flex gap-2"><small className="fw-bold">Shs {p.price.toLocaleString()}</small>{p.old && <small className="text-secondary text-decoration-line-through">Shs {p.old.toLocaleString()}</small>}</div>
                          <button onClick={()=>setCart([...cart, p])} className="btn btn-dark w-100 rounded-0 mt-2 btn-sm">Add to Cart</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      <div className="mt-4">
        <div className="py-4 text-center" style={{background:"#F6F6F6"}}>
          <h5 className="fw-bold">Join The Club</h5>
          <p className="small text-secondary mx-auto" style={{maxWidth:"500px"}}>Subscribe to our newsletter to receive exclusive offers, early access to new collections, and style tips straight to your inbox.</p>
          <div className="d-flex justify-content-center gap-2 mt-2">
            <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Enter your email address" className="form-control rounded-pill" style={{maxWidth:"340px"}}/>
            <button onClick={()=>{if(email){alert(`Subscribed ${email}!`); setEmail("");} else alert("Enter email");}} className="btn btn-dark rounded-pill px-4">Subscribe</button>
          </div>
        </div>
        <div className="container-fluid px-4 py-5">
          <div className="row small">
            <div className="col-md-3"><div className="d-flex gap-2 align-items-center"><div className="bg-black text-white d-flex align-items-center justify-content-center" style={{width:"28px", height:"28px", borderRadius:"6px"}}>👗</div><span className="fw-bold">IRENE'S CLOSET</span></div><div className="fw-bold mt-3">WEAR IRENE.</div><div className="text-secondary mt-2">Premium dresses, shirts, trousers — picked for fit, finish, and feel. Delivered countrywide across Uganda.</div></div>
            <div className="col-md-2"><div className="fw-bold">SHOP</div><div className="text-secondary mt-3 d-grid gap-1"><span onClick={()=>{setGender("Men"); setView("shop");}} style={{cursor:"pointer"}}>Men</span><span onClick={()=>{setGender("Women"); setView("shop");}} style={{cursor:"pointer"}}>Women</span><span onClick={()=>{setGender("Unisex"); setView("shop");}} style={{cursor:"pointer"}}>Unisex</span><span>Sports</span><span>New Arrivals</span></div></div>
            <div className="col-md-3"><div className="fw-bold">HELP</div><div className="text-secondary mt-3 d-grid gap-1"><span>FAQ</span><span>Privacy Policy</span><span>Contact Us</span></div></div>
            <div className="col-md-4"><div className="fw-bold">FOLLOW US</div><div className="mt-3 d-flex gap-3 fs-5"><span>📷</span><span>🎵</span><span>📘</span></div><div className="mt-3 small text-secondary">© 2026 Irene's Closet. All rights reserved.<br/>Designed for Excellence.</div></div>
          </div>
        </div>
      </div>
    </div>
  );
}
