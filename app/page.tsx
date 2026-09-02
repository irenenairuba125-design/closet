"use client";
import { useState, useMemo } from "react";

const PRODUCTS = [
  { id:1, name:"Birkenstock Boston clogs", price:120000, old:360000, img:"https://images.unsplash.com/photo-1603808033587-9359428479d5?w=500", save:"SAVE 67%", gender:"Men", section:"Men", style:"Casual Wear", trending:true },
  { id:2, name:"Puma Speedcat OG", price:150000, old:250000, img:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500", save:"SAVE 40%", gender:"Men", section:"Men", style:"Streetwear Essentials", trending:true },
  { id:3, name:"Puma Speedcat Ballet Lace", price:190000, old:250000, img:"https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=500", save:"SAVE 24%", gender:"Women", section:"Women", style:"Streetwear Essentials", trending:true },
  { id:4, name:"Adidas Samba OG", price:220000, old:370000, img:"https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=500", save:"SAVE 41%", gender:"Unisex", section:"Unisex", style:"Casual Wear", trending:true },
  { id:5, name:"Nike SB Force 58", price:250000, old:350000, img:"https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500", save:"SAVE 29%", gender:"Unisex", section:"Sports", style:"Sports", trending:true },
  { id:6, name:"Air Jordan 9 Retro University Gold", price:180000, old:250000, img:"https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=500", save:"", gender:"Men", section:"Men", style:"Smart & Stylish", trending:true },
  { id:7, name:"Nike Air Jordan 1 Low x Travis Scott", price:180000, old:250000, img:"https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500", save:"SAVE 28%", gender:"Men", section:"Men", style:"Streetwear Essentials", trending:true },
  { id:8, name:"Clarks Originals Wallabee", price:185000, old:200000, img:"https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500", save:"SAVE 8%", gender:"Men", section:"Men", style:"Smart & Stylish", trending:true },
  { id:9, name:"Nike Dunk Low", price:150000, old:200000, img:"https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=500", save:"SAVE 25%", gender:"Women", section:"Women", style:"Casual Wear", trending:true },
  { id:10, name:"Nike Air Zoom Mercurial Superfly 9 Elite FG", price:105000, old:140000, img:"https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=500", save:"SAVE 25%", gender:"Men", section:"Sports", style:"Sports", trending:true },
  { id:11, name:"Nike Air Zoom Mercurial Superfly 10 Elite FG", price:110000, old:150000, img:"https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=500", save:"", gender:"Men", section:"Sports", style:"Sports", trending:true },
  { id:12, name:"Nike Phantom Air Zoom GT2 Elite FG", price:110000, old:150000, img:"https://images.unsplash.com/photo-1543508282-6319a3e2621f?w=500", save:"SAVE 27%", gender:"Men", section:"Sports", style:"Sports", trending:true },
  { id:13, name:"Beige Linen Trousers", price:75000, old:100000, img:"https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500", save:"SAVE 25%", gender:"Women", section:"Women", style:"Casual Wear", trending:false },
  { id:14, name:"Silk Slip Dress", price:180000, old:250000, img:"https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=500", save:"SAVE 28%", gender:"Women", section:"Women", style:"Smart & Stylish", trending:true },
  { id:15, name:"Graphic Hoodie", price:95000, old:140000, img:"https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500", save:"SAVE 32%", gender:"Unisex", section:"Unisex", style:"Streetwear Essentials", trending:true },
  { id:16, name:"White Oversized Shirt", price:55000, old:80000, img:"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500", save:"SAVE 31%", gender:"Unisex", section:"Unisex", style:"Casual Wear", trending:true },
];

export default function Page(){
  const [view, setView] = useState("home"); // home, shop, trending
  const [section, setSection] = useState("All");
  const [gender, setGender] = useState("All");
  const [styleF, setStyleF] = useState("All");
  const [cart, setCart] = useState<any[]>([]);
  const [email, setEmail] = useState("");
  const [loadMore, setLoadMore] = useState(false);

  const filtered = useMemo(()=>{
    let f = PRODUCTS;
    if(section!=="All"){
      if(section==="Trending") f=f.filter(p=>p.trending);
      else if(section==="All Products") f=f;
      else f=f.filter(p=>p.section===section || p.gender===section);
    }
    if(gender!=="All") f=f.filter(p=>p.gender===gender);
    if(styleF!=="All") f=f.filter(p=>p.style===styleF);
    return f;
  }, [section, gender, styleF]);

  const trendingProducts = PRODUCTS.filter(p=>p.trending);
  const displayTrending = loadMore? trendingProducts : trendingProducts.slice(0,12);

  return(
    <div style={{background:"#fff"}}>
      {/* NAV - RESPONSIVE + IRENE ICON */}
      <nav className="d-flex justify-content-between align-items-center px-3 px-md-4 py-3 bg-white sticky-top border-bottom" style={{zIndex:50}}>
        <div className="d-flex align-items-center gap-2" onClick={()=>{setView("home"); setSection("All"); setGender("All");}} style={{cursor:"pointer"}}>
          <div className="bg-black text-white d-flex align-items-center justify-content-center fw-bold" style={{width:"36px", height:"36px", borderRadius:"8px"}}>👗</div>
          <span className="fw-bold" style={{fontSize:"11px", letterSpacing:"1px"}}>IRENE'S CLOSET</span>
        </div>
        <div className="d-none d-md-flex gap-3 gap-lg-4 small fw-bold">
          <span onClick={()=>{setView("shop"); setSection("All Products"); setGender("All");}} style={{cursor:"pointer"}}>SHOP ▾</span>
          <span onClick={()=>{setView("shop"); setSection("Men"); setGender("Men");}} style={{cursor:"pointer", borderBottom: section==="Men"?"2px solid black":"none"}}>MEN ▾</span>
          <span onClick={()=>{setView("shop"); setSection("Women"); setGender("Women");}} style={{cursor:"pointer"}}>WOMEN ▾</span>
          <span onClick={()=>{setView("shop"); setSection("Unisex");}} style={{cursor:"pointer"}}>UNISEX ▾</span>
          <span onClick={()=>{setView("shop"); setSection("Sports");}} style={{cursor:"pointer"}}>SPORTS ▾</span>
          <span onClick={()=>setView("trending")} style={{cursor:"pointer", color:"#FF6A00", borderBottom: view==="trending"?"2px solid #FF6A00":"none"}}>TRENDING</span>
        </div>
        <div className="d-flex gap-2 align-items-center">
          <button onClick={()=>setView("shop")} className="btn btn-sm d-md-none">☰</button>
          <span style={{cursor:"pointer"}}>🛒 {cart.length}</span>
        </div>
      </nav>

      {/* HOME - RESPONSIVE BEAUTIFIED */}
      {view==="home" && (
        <>
          <div style={{background:"#B8AEA3", minHeight:"85vh"}} className="d-flex flex-column align-items-center justify-content-center text-center p-3 p-md-5">
            <h1 className="fw-bold text-white" style={{fontFamily:"serif", fontSize:"clamp(40px, 8vw, 78px)"}}>IRENE'S CLOSET</h1>
            <p className="text-white mt-2 px-2" style={{maxWidth:"520px", fontSize:"clamp(14px, 2.5vw, 18px)"}}>Premium dresses, boots, and minimal essentials — delivered countrywide.</p>
            <button onClick={()=>setView("shop")} className="btn bg-white rounded-pill px-4 px-md-5 py-2 py-md-3 fw-bold mt-3">SHOP COLLECTION</button>
            <div className="mt-4 mt-md-5">
              <small className="text-white" style={{letterSpacing:"4px", fontSize:"10px"}}>SHOP BY DEPARTMENT</small>
              <div className="d-flex gap-2 mt-3 flex-wrap justify-content-center">
                {["MEN","WOMEN","UNISEX","SPORTS"].map(l=>(
                  <button key={l} onClick={()=>{setSection(l==="MEN"?"Men":l==="WOMEN"?"Women":l==="SPORTS"?"Sports":"Unisex"); setView("shop");}} className="btn rounded-pill px-3 px-md-4 py-2 small fw-bold" style={{background:"rgba(0,0,0,0.3)", color:"white", border:"1px solid rgba(255,255,255,0.5)", backdropFilter:"blur(8px)", fontSize:"12px"}}>{l}</button>
                ))}
              </div>
            </div>
          </div>

          <div className="container-fluid px-3 px-md-4 py-4 py-md-5">
            <h4 className="fw-bold">Shop By Category</h4>
            <p className="small text-secondary">Explore our curated selection of premium essentials and future-forward gear.</p>
            <div className="row g-2 g-md-3 mt-2">
              {[
                {name:"Men's Sneakers", img:PRODUCTS[0].img, sec:"Men"},
                {name:"Women's Sneakers", img:PRODUCTS[2].img, sec:"Women"},
                {name:"Boots", img:PRODUCTS[7].img, sec:"Men"},
                {name:"Sports", img:PRODUCTS[4].img, sec:"Sports"},
              ].map(c=>(
                <div key={c.name} className="col-6 col-md-3">
                  <div onClick={()=>{setSection(c.sec); setView("shop");}} className="position-relative" style={{height:"180px", backgroundImage:`url(${c.img})`, backgroundSize:"cover", borderRadius:"12px", cursor:"pointer"}}>
                    <div className="position-absolute bottom-0 start-0 p-2 p-md-3 w-100" style={{background:"linear-gradient(transparent, rgba(0,0,0,0.7))", borderRadius:"0 0 12px 12px"}}>
                      <div className="text-white fw-bold" style={{fontSize:"12px"}}>{c.name}</div>
                      <span className="badge bg-white text-black mt-1" style={{fontSize:"9px"}}>Explore</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="container-fluid px-3 px-md-4 py-4">
            <h4 className="fw-bold">Curated Collections</h4>
            <div className="row g-2 g-md-3 mt-2">
              {[
                {name:"Streetwear Essentials", img:PRODUCTS[1].img},
                {name:"Smart & Stylish", img:PRODUCTS[5].img},
                {name:"Casual Wear", img:PRODUCTS[3].img},
              ].map(c=>(
                <div key={c.name} className="col-12 col-md-4">
                  <div onClick={()=>{setStyleF(c.name); setView("shop");}} className="position-relative" style={{height:"220px", backgroundImage:`url(${c.img})`, backgroundSize:"cover", borderRadius:"12px", cursor:"pointer"}}>
                    <div className="position-absolute bottom-0 start-0 p-3 p-md-4"><div className="text-white fw-bold">{c.name}</div><button className="btn btn-sm btn-light rounded-pill mt-2" style={{fontSize:"10px"}}>View Collection</button></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="container-fluid px-3 px-md-4 py-4">
            <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
              <div><small style={{letterSpacing:"3px", fontSize:"10px"}}>Fresh Drops • Auto-Updated</small><h4 className="fw-bold">TRENDING NOW</h4></div>
              <button onClick={()=>setView("trending")} className="btn btn-sm btn-outline-dark rounded-0">VIEW ALL TRENDING</button>
            </div>
            <div className="row g-2 g-md-3 mt-3">
              {PRODUCTS.slice(0,8).map(p=>(
                <div key={p.id} className="col-6 col-md-3">
                  <div className="border"><img src={p.img} className="w-100" style={{aspectRatio:"1", objectFit:"cover"}} alt=""/><div className="p-2"><small className="fw-bold d-block" style={{height:"32px", fontSize:"11px"}}>{p.name}</small><small className="fw-bold">Shs {p.price.toLocaleString()}</small><button onClick={()=>setCart([...cart, p])} className="btn btn-dark w-100 btn-sm rounded-0 mt-2">Add to Cart</button></div></div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* SHOP PAGE - 7+ IMAGES, ALL BUTTONS WORK */}
      {view==="shop" && (
        <>
          <div className="text-center py-4 py-md-5" style={{background:"#F8F8F8"}}>
            <h1 className="fw-bold" style={{fontFamily:"serif", fontSize:"clamp(28px, 5vw, 44px)"}}>{section==="All"||section==="All Products"? "SHOP COLLECTION" : section.toUpperCase()}</h1>
            <p className="text-secondary small px-3">{section==="Unisex"? "Genderless silhouettes for everyone." : "Premium essentials — delivered countrywide."}</p>
          </div>
          <div className="container-fluid px-3 px-md-4 py-3 py-md-4">
            <div className="row">
              <div className="col-12 col-md-2 mb-3 mb-md-0">
                <div className="d-flex flex-row flex-md-column gap-3 overflow-auto">
                  <div><small className="fw-bold">Section</small><div className="mt-2 small d-flex flex-row flex-md-column gap-2">
                    <span onClick={()=>{setSection("All Products"); setGender("All"); setStyleF("All");}} style={{cursor:"pointer", fontWeight:section==="All Products"?"bold":"", whiteSpace:"nowrap"}}>All Products</span>
                    <span onClick={()=>{setSection("Men"); setGender("Men");}} style={{cursor:"pointer", fontWeight:section==="Men"?"bold":"", whiteSpace:"nowrap"}}>Men</span>
                    <span onClick={()=>{setSection("Women"); setGender("Women");}} style={{cursor:"pointer", fontWeight:section==="Women"?"bold":"", whiteSpace:"nowrap"}}>Women</span>
                    <span onClick={()=>{setSection("Unisex"); setGender("Unisex");}} style={{cursor:"pointer", fontWeight:section==="Unisex"?"bold":"", whiteSpace:"nowrap"}}>Unisex</span>
                    <span onClick={()=>{setSection("Sports");}} style={{cursor:"pointer", fontWeight:section==="Sports"?"bold":"", whiteSpace:"nowrap"}}>Sports</span>
                    <span onClick={()=>{setView("trending");}} style={{cursor:"pointer", color:"#FF6A00", fontWeight:"bold", whiteSpace:"nowrap"}}>Trending</span>
                  </div></div>
                </div>
                <button onClick={()=>setView("home")} className="btn btn-sm btn-outline-dark rounded-0 w-100 mt-3 d-none d-md-block">← Home</button>
              </div>
              <div className="col-12 col-md-10">
                <div className="d-flex justify-content-between mb-3"><small>{filtered.length} Products</small><small>Sort by: Newest ▾</small></div>
                <div className="row g-2 g-md-3">
                  {filtered.map(p=>(
                    <div key={p.id} className="col-6 col-md-4 col-lg-3">
                      <div className="border position-relative">
                        {p.save && <span className="position-absolute top-0 start-0 bg-warning small fw-bold px-2 py-1 m-1 rounded-2" style={{fontSize:"9px", zIndex:2}}>{p.save}</span>}
                        <img src={p.img} className="w-100" style={{aspectRatio:"1", objectFit:"cover"}} alt=""/>
                        <div className="p-2"><small className="fw-bold d-block" style={{height:"30px", fontSize:"11px"}}>{p.name}</small><div><small className="fw-bold">Shs {p.price.toLocaleString()}</small></div><button onClick={()=>setCart([...cart, p])} className="btn btn-dark w-100 btn-sm rounded-0 mt-2">Add to Cart</button></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* TRENDING PAGE - DESIGN LIKE SCREENSHOT */}
      {view==="trending" && (
        <>
          <div className="text-center py-4 py-md-5" style={{background:"#F8F8F8"}}>
            <h1 className="fw-bold" style={{fontFamily:"serif", fontSize:"clamp(32px, 5vw, 48px)"}}>Trending Now</h1>
            <p className="text-secondary">The hottest shoes in the store right now.</p>
          </div>
          <div className="container-fluid px-3 px-md-4 py-3">
            <div className="row">
              <div className="col-12 col-md-2 mb-3">
                <div><small className="fw-bold">Section</small><div className="mt-2 small d-grid gap-1">
                  <span onClick={()=>{setView("shop"); setSection("All Products");}} style={{cursor:"pointer"}}>All Products</span>
                  <span onClick={()=>{setView("shop"); setSection("Men");}} style={{cursor:"pointer"}}>Men</span>
                  <span onClick={()=>{setView("shop"); setSection("Women");}} style={{cursor:"pointer"}}>Women</span>
                  <span onClick={()=>{setView("shop"); setSection("Unisex");}} style={{cursor:"pointer"}}>Unisex</span>
                  <span onClick={()=>{setView("shop"); setSection("Sports");}} style={{cursor:"pointer"}}>Sports</span>
                  <span style={{fontWeight:"bold", color:"black"}}>Trending</span>
                  <span>New Arrivals</span>
                </div></div>
                <div className="mt-4"><small className="fw-bold">Gender</small><div className="mt-2 small text-secondary">Men<br/>Women<br/><small>Filters across all sections — e.g. all Men's products regardless of category.</small></div></div>
                <div className="mt-4"><small className="fw-bold">Style</small><div className="mt-2 small text-secondary"><span onClick={()=>{setStyleF("All");}} style={{cursor:"pointer"}}>All Styles</span><br/><span onClick={()=>{setStyleF("Streetwear Essentials"); setView("shop");}} style={{cursor:"pointer"}}>Streetwear Essentials</span><br/>Smart & Stylish<br/>Casual Wear</div></div>
              </div>
              <div className="col-12 col-md-10">
                <div className="d-flex justify-content-between mb-3"><small>{trendingProducts.length} Products</small><small>Sort by: Newest ▾</small></div>
                <div className="row g-2 g-md-3">
                  {displayTrending.map(p=>(
                    <div key={p.id} className="col-6 col-md-4 col-lg-3">
                      <div className="border position-relative bg-white">
                        {p.save && <span className="position-absolute top-0 start-0 bg-warning small fw-bold px-2 py-1 m-1 rounded-2" style={{fontSize:"9px", zIndex:2}}>{p.save}</span>}
                        <img src={p.img} className="w-100" style={{aspectRatio:"1", objectFit:"cover", background:"#fafafa"}} alt=""/>
                        <div className="p-2">
                          <small className="fw-bold d-block" style={{height:"32px", fontSize:"11px"}}>{p.name}</small>
                          <div className="d-flex gap-2 align-items-center"><small className="fw-bold">Shs {p.price.toLocaleString()}</small>{p.old && <small className="text-secondary text-decoration-line-through" style={{fontSize:"10px"}}>Shs {p.old.toLocaleString()}</small>}</div>
                          <button onClick={()=>setCart([...cart, p])} className="btn btn-dark w-100 btn-sm rounded-0 mt-2">Add to Cart</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {!loadMore && trendingProducts.length>12 && (
                  <div className="text-center mt-4">
                    <button onClick={()=>setLoadMore(true)} className="btn btn-outline-dark rounded-pill px-4">Load More ({trendingProducts.length-12} remaining)</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}

      {/* FOOTER */}
      <div className="mt-4">
        <div className="py-4 py-md-5 text-center" style={{background:"#F6F6F6"}}>
          <h5 className="fw-bold">Join The Club</h5>
          <p className="small text-secondary mx-auto px-3" style={{maxWidth:"500px"}}>Subscribe to our newsletter to receive exclusive offers, early access to new collections, and style tips straight to your inbox.</p>
          <div className="d-flex justify-content-center gap-2 mt-3 px-3">
            <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Enter your email address" className="form-control rounded-pill" style={{maxWidth:"350px"}}/>
            <button onClick={()=>{if(email){alert("Subscribed!"); setEmail("");}}} className="btn btn-dark rounded-pill px-4">Subscribe</button>
          </div>
        </div>
        <div className="container-fluid px-3 px-md-5 py-4">
          <div className="row small g-3">
            <div className="col-12 col-md-3"><div className="fw-bold">👗 IRENE'S CLOSET</div><div className="fw-bold mt-3">WEAR IRENE.</div><div className="text-secondary mt-2">Premium dresses, shirts, trousers — picked for fit, finish, and feel. Delivered countrywide across Uganda.</div></div>
            <div className="col-6 col-md-2"><div className="fw-bold">SHOP</div><div className="text-secondary mt-2 d-grid gap-1"><span onClick={()=>{setSection("Men"); setView("shop");}} style={{cursor:"pointer"}}>Men</span><span onClick={()=>{setSection("Women"); setView("shop");}} style={{cursor:"pointer"}}>Women</span><span onClick={()=>{setSection("Unisex"); setView("shop");}} style={{cursor:"pointer"}}>Unisex</span><span>Sports</span><span>New Arrivals</span></div></div>
            <div className="col-6 col-md-3"><div className="fw-bold">HELP</div><div className="text-secondary mt-2 d-grid gap-1">FAQ<br/>Privacy Policy<br/>Contact Us (Get in Touch)</div></div>
            <div className="col-12 col-md-4"><div className="fw-bold">FOLLOW US</div><div className="mt-2">📷 🎵 📘</div><div className="mt-3 small text-secondary">© 2026 Irene's Closet. All rights reserved.<br/>Designed for Excellence.</div></div>
          </div>
        </div>
      </div>
    </div>
  );
}
