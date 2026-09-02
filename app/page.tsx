"use client";
import { useState, useMemo } from "react";

const PRODUCTS = [
  { id:1, name:"Birkenstock Boston clogs", price:120000, old:360000, cat:"Boots", gender:"Men", style:"Casual Wear", img:"https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500", save:"SAVE 67%" },
  { id:2, name:"Puma Speedcat OG", price:150000, old:250000, cat:"Sports", gender:"Men", style:"Streetwear Essentials", img:"https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500", save:"SAVE 40%" },
  { id:3, name:"Puma Speedcat Ballet Lace", price:190000, old:270000, cat:"Women's Sneakers", gender:"Women", style:"Streetwear Essentials", img:"https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=500", save:"SAVE 30%" },
  { id:4, name:"Adidas Samba OG", price:220000, old:370000, cat:"Men's Sneakers", gender:"Men", style:"Casual Wear", img:"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500", save:"SAVE 41%" },
  { id:5, name:"Nike SB Force 58", price:250000, old:350000, cat:"Sports", gender:"Unisex", style:"Sports", img:"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500", save:"SAVE 29%" },
  { id:6, name:"Air Jordan 9 Retro", price:180000, old:250000, cat:"Men's Sneakers", gender:"Men", style:"Smart & Stylish", img:"https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=500", save:"SAVE 28%" },
  { id:7, name:"Nike Air Jordan 1 Low x Travis", price:180000, old:250000, cat:"Men's Sneakers", gender:"Men", style:"Streetwear Essentials", img:"https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=500", save:"SAVE 28%" },
  { id:8, name:"Clarks Originals Wallabee", price:185000, old:200000, cat:"Boots", gender:"Men", style:"Smart & Stylish", img:"https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500", save:"SAVE 8%" },
  { id:9, name:"Silk Slip Dress", price:180000, old:250000, cat:"Women's Sneakers", gender:"Women", style:"Casual Wear", img:"https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=500", save:"SAVE 28%" },
];

export default function Page(){
  const [view, setView] = useState("home");
  const [gender, setGender] = useState("All");
  const [cat, setCat] = useState("All");
  const [styleFilter, setStyleFilter] = useState("All");
  const [cart, setCart] = useState<any[]>([]);
  const [email, setEmail] = useState("");

  const filtered = useMemo(()=>{
    let f = PRODUCTS;
    if(gender!=="All") f=f.filter(p=>p.gender===gender);
    if(cat!=="All") f=f.filter(p=>p.cat===cat);
    if(styleFilter!=="All") f=f.filter(p=>p.style===styleFilter);
    return f;
  }, [gender, cat, styleFilter]);

  return(
    <div style={{background:"#fff"}}>
      {/* NAV - IRENE'S CLOSET ICON */}
      <nav className="d-flex justify-content-between align-items-center px-4 py-3 bg-white sticky-top border-bottom" style={{zIndex:30}}>
        <div className="d-flex align-items-center gap-2" onClick={()=>{setView("home"); setGender("All"); setCat("All");}} style={{cursor:"pointer"}}>
          <div className="bg-black text-white d-flex align-items-center justify-content-center fw-bold" style={{width:"38px", height:"38px", borderRadius:"8px"}}>👗</div>
          <div style={{lineHeight:"1"}}><div className="fw-bold" style={{fontSize:"12px"}}>IRENE'S CLOSET</div><div style={{fontSize:"8px"}}>cloth store</div></div>
        </div>
        <div className="d-none d-lg-flex gap-4 small fw-bold">
          <span onClick={()=>{setView("shop"); setGender("All");}} style={{cursor:"pointer"}}>SHOP ▾</span>
          <span onClick={()=>{setView("shop"); setGender("Men");}} style={{cursor:"pointer"}}>MEN ▾</span>
          <span onClick={()=>{setView("shop"); setGender("Women");}} style={{cursor:"pointer"}}>WOMEN ▾</span>
          <span onClick={()=>{setView("shop"); setGender("Unisex");}} style={{cursor:"pointer"}}>UNISEX ▾</span>
          <span style={{cursor:"pointer"}}>SPORTS ▾</span>
          <span onClick={()=>setView("shop")} style={{cursor:"pointer", color:"#FF6A00"}}>TRENDING</span>
        </div>
        <div>🛒 {cart.length}</div>
      </nav>

      {view==="home" && (
        <>
          {/* HERO - PRIME WEAR STYLE */}
          <div style={{background:"#B8AEA3", minHeight:"88vh", position:"relative", overflow:"hidden"}} className="d-flex flex-column align-items-center justify-content-center text-center p-4">
            <h1 className="fw-bold text-white" style={{fontFamily:"serif", fontSize:"clamp(48px, 8vw, 80px)"}}>IRENE'S CLOSET</h1>
            <p className="text-white mt-2" style={{maxWidth:"520px"}}>Premium dresses, boots, and minimal essentials — delivered countrywide.</p>
            <button onClick={()=>setView("shop")} className="btn bg-white rounded-pill px-5 py-3 fw-bold mt-3">SHOP COLLECTION</button>
            <div className="mt-5"><small className="text-white" style={{letterSpacing:"4px"}}>SHOP BY DEPARTMENT</small>
              <div className="d-flex gap-2 mt-3 flex-wrap justify-content-center">
                {["MEN","WOMEN","UNISEX","SPORTS"].map(l=><button key={l} onClick={()=>{setGender(l==="MEN"?"Men":l==="WOMEN"?"Women":"Unisex"); setView("shop");}} className="btn rounded-pill px-4 btn-sm" style={{background:"rgba(0,0,0,0.3)", color:"white", border:"1px solid rgba(255,255,255,0.5)", backdropFilter:"blur(8px)"}}>{l}</button>)}
              </div>
            </div>
          </div>

          {/* SHOP BY CATEGORY - DOWN PART */}
          <div className="container-fluid px-4 py-5">
            <h4 className="fw-bold">Shop By Category</h4>
            <p className="small text-secondary">Explore our curated selection of premium essentials and future-forward gear.</p>
            <div className="row g-3 mt-2">
              {[
                {name:"Men's Sneakers", img:PRODUCTS[0].img},
                {name:"Women's Sneakers", img:PRODUCTS[2].img},
                {name:"Boots", img:PRODUCTS[0].img},
                {name:"Sports", img:PRODUCTS[1].img},
              ].map(c=>(
                <div key={c.name} className="col-6 col-md-3">
                  <div className="position-relative" style={{height:"220px", backgroundImage:`url(${c.img})`, backgroundSize:"cover", borderRadius:"12px"}}>
                    <div className="position-absolute bottom-0 start-0 p-3 w-100" style={{background:"linear-gradient(transparent, rgba(0,0,0,0.7))", borderRadius:"0 0 12px 12px"}}>
                      <div className="text-white fw-bold small">{c.name}</div><div className="text-white small">{c.name}</div>
                      <button onClick={()=>{setCat(c.name); setView("shop");}} className="btn btn-sm btn-light rounded-pill mt-1" style={{fontSize:"10px"}}>Explore</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CURATED COLLECTIONS */}
          <div className="container-fluid px-4 py-4">
            <h4 className="fw-bold">Curated Collections</h4>
            <div className="row g-3 mt-2">
              {[
                {name:"Streetwear Essentials", img:PRODUCTS[1].img},
                {name:"Smart & Stylish", img:PRODUCTS[5].img},
                {name:"Casual Wear", img:PRODUCTS[3].img},
              ].map(c=>(
                <div key={c.name} className="col-md-4">
                  <div className="position-relative" style={{height:"280px", backgroundImage:`url(${c.img})`, backgroundSize:"cover", borderRadius:"12px"}}>
                    <div className="position-absolute bottom-0 start-0 p-4">
                      <div className="text-white fw-bold">{c.name}</div><div className="text-white small">{c.name}</div>
                      <button onClick={()=>{setStyleFilter(c.name); setView("shop");}} className="btn btn-sm btn-dark rounded-pill mt-2">View Collection</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* TRENDING NOW */}
          <div className="container-fluid px-4 py-5">
            <div className="d-flex justify-content-between align-items-center">
              <div><small style={{letterSpacing:"3px"}}>Fresh Drops • Auto-Updated</small><h4 className="fw-bold mt-1">TRENDING NOW</h4></div>
              <button onClick={()=>setView("shop")} className="btn btn-sm btn-outline-dark rounded-0">VIEW ALL TRENDING</button>
            </div>
            <div className="row g-3 mt-3">
              {PRODUCTS.slice(0,8).map(p=>(
                <div key={p.id} className="col-6 col-md-3">
                  <div className="border bg-white">
                    <div className="position-relative"><img src={p.img} className="w-100" style={{aspectRatio:"1", objectFit:"cover", background:"#fafafa"}} alt=""/>{p.save && <span className="position-absolute top-0 start-0 bg-warning small fw-bold px-2 py-1 m-1 rounded-2" style={{fontSize:"10px"}}>{p.save}</span>}</div>
                    <div className="p-2">
                      <small className="fw-bold d-block" style={{height:"36px"}}>{p.name}</small>
                      <div className="d-flex gap-2 align-items-center mt-1"><small className="fw-bold">Shs {p.price.toLocaleString()}</small>{p.old && <small className="text-secondary text-decoration-line-through">Shs {p.old.toLocaleString()}</small>}</div>
                      <button onClick={()=>setCart([...cart, p])} className="btn btn-dark w-100 rounded-0 btn-sm mt-2">Add to Cart</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {view==="shop" && (
        <>
          <div className="text-center py-5" style={{background:"#F8F8F8"}}>
            <h1 className="fw-bold" style={{fontFamily:"serif"}}>{cat!=="All"? cat.toUpperCase() : styleFilter!=="All"? styleFilter.toUpperCase() : gender!=="All"? `${gender.toUpperCase()} CLOTHES` : "SHOP COLLECTION"}</h1>
            <p className="text-secondary">{gender==="Unisex"? "Genderless silhouettes for everyone." : "Premium essentials — delivered countrywide."}</p>
          </div>
          <div className="container-fluid px-4 py-4">
            <div className="row">
              <div className="col-md-2">
                <div className="mb-3"><small className="fw-bold">Section</small><div className="small mt-2 d-grid gap-1"><span onClick={()=>{setGender("All"); setCat("All");}} style={{cursor:"pointer", fontWeight:gender==="All"&&cat==="All"?"bold":""}}>All Products</span><span onClick={()=>{setGender("Men"); setCat("All");}} style={{cursor:"pointer", fontWeight:gender==="Men"?"bold":""}}>Men</span><span onClick={()=>{setGender("Women");}} style={{cursor:"pointer"}}>Women</span><span onClick={()=>{setGender("Unisex");}} style={{cursor:"pointer"}}>Unisex</span><span>Sports</span><span>Trending</span></div></div>
                <button onClick={()=>setView("home")} className="btn btn-sm btn-outline-dark rounded-0 w-100">← Back Home</button>
              </div>
              <div className="col-md-10">
                <div className="d-flex justify-content-between mb-3"><small>{filtered.length} Products</small><small>Sort by: Newest ▾</small></div>
                <div className="row g-3">
                  {filtered.map(p=>(
                    <div key={p.id} className="col-6 col-md-4">
                      <div className="border"><div className="position-relative"><img src={p.img} className="w-100" style={{aspectRatio:"1", objectFit:"cover"}} alt=""/>{p.save && <span className="position-absolute top-0 start-0 bg-warning small fw-bold px-2 py-1 m-1 rounded-2" style={{fontSize:"10px"}}>{p.save}</span>}</div><div className="p-2"><small className="fw-bold">{p.name}</small><br/><small className="fw-bold">Shs {p.price.toLocaleString()}</small><button onClick={()=>setCart([...cart, p])} className="btn btn-dark w-100 btn-sm rounded-0 mt-2">Add to Cart</button></div></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* JOIN THE CLUB + FOOTER - SAME AS MENS SHOES */}
      <div className="mt-4">
        <div className="py-5 text-center" style={{background:"#F6F6F6", borderTop:"1px solid #eee"}}>
          <h5 className="fw-bold">Join The Club</h5>
          <p className="small text-secondary mx-auto" style={{maxWidth:"500px"}}>Subscribe to our newsletter to receive exclusive offers, early access to new collections, and style tips straight to your inbox.</p>
          <div className="d-flex justify-content-center gap-2 mt-3 px-3">
            <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Enter your email address" className="form-control rounded-pill" style={{maxWidth:"350px"}}/>
            <button onClick={()=>{if(email){alert("Subscribed!"); setEmail("");}}} className="btn btn-dark rounded-pill px-4">Subscribe</button>
          </div>
        </div>
        <div className="container-fluid px-5 py-5">
          <div className="row small">
            <div className="col-md-3"><div className="fw-bold">👗 IRENE'S CLOSET</div><div className="fw-bold mt-3">WEAR IRENE.</div><div className="text-secondary mt-2">Premium dresses, shirts, trousers — picked for fit, finish, and feel. Delivered countrywide across Uganda.</div></div>
            <div className="col-md-2"><div className="fw-bold">SHOP</div><div className="text-secondary mt-3 d-grid gap-1"><span onClick={()=>{setGender("Men"); setView("shop");}} style={{cursor:"pointer"}}>Men</span><span onClick={()=>{setGender("Women"); setView("shop");}} style={{cursor:"pointer"}}>Women</span><span>Unisex</span><span>Sports</span><span>New Arrivals</span></div></div>
            <div className="col-md-3"><div className="fw-bold">HELP</div><div className="text-secondary mt-3 d-grid gap-1">FAQ<br/>Privacy Policy<br/>Contact Us (Get in Touch)</div></div>
            <div className="col-md-4"><div className="fw-bold">FOLLOW US</div><div className="mt-3">📷 🎵 📘</div><div className="mt-4 small text-secondary">© 2026 Irene's Closet. All rights reserved.<br/>Designed for Excellence.</div></div>
          </div>
        </div>
      </div>
    </div>
  );
}
