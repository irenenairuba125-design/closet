"use client";
import { useState, useMemo } from "react";

const PRODUCTS = [
  // MEN - 8 clothes
  { id:1, name:"Black Formal Shirt", price:65000, old:95000, img:"https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500", save:"SAVE 32%", gender:"Men", section:"Men", style:"Smart & Stylish", trending:true },
  { id:2, name:"Blue Denim Jacket", price:120000, old:180000, img:"https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=500", save:"SAVE 33%", gender:"Men", section:"Men", style:"Streetwear Essentials", trending:true },
  { id:3, name:"Khaki Cargo Trousers", price:80000, old:110000, img:"https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500", save:"SAVE 27%", gender:"Men", section:"Men", style:"Casual Wear", trending:true },
  { id:4, name:"White Polo T-Shirt", price:45000, old:65000, img:"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500", save:"SAVE 31%", gender:"Men", section:"Men", style:"Casual Wear", trending:true },
  { id:5, name:"Grey Hoodie", price:90000, old:130000, img:"https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500", save:"SAVE 31%", gender:"Men", section:"Men", style:"Streetwear Essentials", trending:true },
  { id:6, name:"Navy Blazer", price:185000, old:250000, img:"https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500", save:"SAVE 26%", gender:"Men", section:"Men", style:"Smart & Stylish", trending:true },
  { id:7, name:"Beige Chino Pants", price:75000, old:100000, img:"https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500", save:"SAVE 25%", gender:"Men", section:"Men", style:"Casual Wear", trending:true },
  { id:8, name:"Black Leather Jacket", price:220000, old:320000, img:"https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500", save:"SAVE 31%", gender:"Men", section:"Men", style:"Streetwear Essentials", trending:true },
  // WOMEN - 8 clothes
  { id:9, name:"Black Minimal Dress", price:85000, old:120000, img:"https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500", save:"SAVE 29%", gender:"Women", section:"Women", style:"Smart & Stylish", trending:true },
  { id:10, name:"Beige Pleated Skirt", price:65000, old:90000, img:"https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=500", save:"SAVE 28%", gender:"Women", section:"Women", style:"Casual Wear", trending:true },
  { id:11, name:"White Linen Shirt", price:55000, old:80000, img:"https://images.unsplash.com/photo-1598550476439-6845435fcea5?w=500", save:"SAVE 31%", gender:"Women", section:"Women", style:"Casual Wear", trending:true },
  { id:12, name:"Silk Slip Dress", price:150000, old:220000, img:"https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=500", save:"SAVE 32%", gender:"Women", section:"Women", style:"Smart & Stylish", trending:true },
  { id:13, name:"Oversized Blazer Women", price:130000, old:180000, img:"https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=500", save:"SAVE 28%", gender:"Women", section:"Women", style:"Smart & Stylish", trending:true },
  { id:14, name:"Cream Knit Sweater", price:75000, old:110000, img:"https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=500", save:"SAVE 32%", gender:"Women", section:"Women", style:"Casual Wear", trending:true },
  { id:15, name:"High Waist Jeans", price:90000, old:130000, img:"https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500", save:"SAVE 31%", gender:"Women", section:"Women", style:"Streetwear Essentials", trending:true },
  { id:16, name:"Satin Blouse", price:70000, old:100000, img:"https://images.unsplash.com/photo-1598550476439-6845435fcea5?w=500", save:"SAVE 30%", gender:"Women", section:"Women", style:"Smart & Stylish", trending:true },
  // UNISEX - 8 clothes
  { id:17, name:"Oversized Cotton Tee", price:35000, old:50000, img:"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500", save:"SAVE 30%", gender:"Unisex", section:"Unisex", style:"Casual Wear", trending:true },
  { id:18, name:"Utility Cargo Pants", price:85000, old:120000, img:"https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500", save:"SAVE 29%", gender:"Unisex", section:"Unisex", style:"Streetwear Essentials", trending:true },
  { id:19, name:"Fleece Hoodie", price:95000, old:140000, img:"https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500", save:"SAVE 32%", gender:"Unisex", section:"Unisex", style:"Streetwear Essentials", trending:true },
  { id:20, name:"Denim Overshirt", price:110000, old:160000, img:"https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=500", save:"SAVE 31%", gender:"Unisex", section:"Unisex", style:"Casual Wear", trending:true },
  { id:21, name:"Linen Shorts", price:50000, old:75000, img:"https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=500", save:"SAVE 33%", gender:"Unisex", section:"Unisex", style:"Casual Wear", trending:true },
  { id:22, name:"Wool Blend Coat", price:250000, old:350000, img:"https://images.unsplash.com/photo-1544923246-77307dd654cb?w=500", save:"SAVE 29%", gender:"Unisex", section:"Unisex", style:"Smart & Stylish", trending:true },
  { id:23, name:"Striped Shirt", price:60000, old:85000, img:"https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500", save:"SAVE 29%", gender:"Unisex", section:"Unisex", style:"Smart & Stylish", trending:true },
  { id:24, name:"Relaxed Fit Trousers", price:80000, old:110000, img:"https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500", save:"SAVE 27%", gender:"Unisex", section:"Unisex", style:"Casual Wear", trending:true },
  // SPORTS - 8 clothes
  { id:25, name:"Performance Tank Top", price:40000, old:60000, img:"https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=500", save:"SAVE 33%", gender:"Unisex", section:"Sports", style:"Sports", trending:true },
  { id:26, name:"Training Joggers", price:70000, old:100000, img:"https://images.unsplash.com/photo-1517438476312-10d79c077509?w=500", save:"SAVE 30%", gender:"Men", section:"Sports", style:"Sports", trending:true },
  { id:27, name:"Sports Bra Set", price:65000, old:95000, img:"https://images.unsplash.com/photo-1506629903106-0650d349b7b9?w=500", save:"SAVE 32%", gender:"Women", section:"Sports", style:"Sports", trending:true },
  { id:28, name:"Windbreaker Jacket", price:110000, old:160000, img:"https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=500", save:"SAVE 31%", gender:"Unisex", section:"Sports", style:"Sports", trending:true },
  { id:29, name:"Gym Shorts", price:45000, old:65000, img:"https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=500", save:"SAVE 31%", gender:"Men", section:"Sports", style:"Sports", trending:true },
  { id:30, name:"Yoga Leggings", price:60000, old:85000, img:"https://images.unsplash.com/photo-1506629903106-0650d349b7b9?w=500", save:"SAVE 29%", gender:"Women", section:"Sports", style:"Sports", trending:true },
  { id:31, name:"Track Jacket", price:95000, old:140000, img:"https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500", save:"SAVE 32%", gender:"Unisex", section:"Sports", style:"Sports", trending:true },
  { id:32, name:"Compression Tee", price:50000, old:75000, img:"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500", save:"SAVE 33%", gender:"Men", section:"Sports", style:"Sports", trending:true },
];

export default function Page(){
  const [view, setView] = useState("home");
  const [section, setSection] = useState("All Products");
  const [gender, setGender] = useState("All");
  const [cart, setCart] = useState<any[]>([]);
  const [email, setEmail] = useState("");
  const [show, setShow] = useState(16);

  const filtered = useMemo(()=>{
    if(view==="trending") return PRODUCTS.filter(p=>p.trending);
    if(view==="sports") return PRODUCTS.filter(p=>p.section==="Sports");
    if(section==="All Products") return PRODUCTS;
    if(section==="Men") return PRODUCTS.filter(p=>p.gender==="Men" || p.section==="Men");
    if(section==="Women") return PRODUCTS.filter(p=>p.gender==="Women");
    if(section==="Unisex") return PRODUCTS.filter(p=>p.section==="Unisex");
    if(section==="Sports") return PRODUCTS.filter(p=>p.section==="Sports");
    if(section==="Trending") return PRODUCTS.filter(p=>p.trending);
    return PRODUCTS;
  }, [section, view]);

  const display = filtered.slice(0, show);
  const title = view==="trending"? "Trending Now" : view==="sports"? "Sports" : section==="All Products"? "Shop Collection" : section;
  const subtitle = view==="trending"? "The hottest clothes in the store right now." : view==="sports"? "Built for performance on every surface." : section==="Unisex"? "Genderless silhouettes for everyone." : "Premium dresses, shirts, trousers — delivered countrywide.";

  const changePage = (sec:string, v:string="shop")=>{
    setSection(sec);
    setView(v);
    setShow(16);
    window.scrollTo(0,0);
  };

  return(
    <div style={{background:"#fff"}}>
      <nav className="d-flex justify-content-between align-items-center px-3 px-md-4 py-3 bg-white sticky-top border-bottom" style={{zIndex:50}}>
        <div className="d-flex align-items-center gap-2" onClick={()=>changePage("All Products","home")} style={{cursor:"pointer"}}>
          <div className="bg-black text-white d-flex align-items-center justify-content-center fw-bold" style={{width:"36px", height:"36px", borderRadius:"8px"}}>👗</div>
          <span className="fw-bold" style={{fontSize:"11px"}}>IRENE'S CLOSET</span>
        </div>
        <div className="d-none d-md-flex gap-4 small fw-bold">
          <span onClick={()=>changePage("All Products","shop")} style={{cursor:"pointer"}}>SHOP ▾</span>
          <span onClick={()=>changePage("Men","shop")} style={{cursor:"pointer", borderBottom:section==="Men" && view==="shop"?"2px solid black":"none"}}>MEN ▾</span>
          <span onClick={()=>changePage("Women","shop")} style={{cursor:"pointer"}}>WOMEN ▾</span>
          <span onClick={()=>changePage("Unisex","shop")} style={{cursor:"pointer"}}>UNISEX ▾</span>
          <span onClick={()=>changePage("Sports","sports")} style={{cursor:"pointer", borderBottom:view==="sports"?"2px solid black":"none"}}>SPORTS ▾</span>
          <span onClick={()=>changePage("Trending","trending")} style={{cursor:"pointer", color:"#FF6A00"}}>TRENDING</span>
        </div>
        <div className="d-flex gap-2"><span className="d-md-none" onClick={()=>changePage("All Products","shop")} style={{cursor:"pointer"}}>☰</span><span>🛒 {cart.length}</span></div>
      </nav>

      {view==="home" && (
        <>
          <div style={{background:"#CFC8BF", minHeight:"85vh"}} className="d-flex flex-column align-items-center justify-content-center text-center p-4">
            <h1 className="fw-bold text-white" style={{fontFamily:"serif", fontSize:"clamp(40px, 8vw, 78px)"}}>IRENE'S CLOSET</h1>
            <p className="text-white mt-2" style={{maxWidth:"520px"}}>Premium dresses, trousers, minimal essentials — delivered countrywide.</p>
            <button onClick={()=>changePage("All Products","shop")} className="btn bg-white rounded-pill px-5 py-3 fw-bold mt-3">SHOP COLLECTION</button>
            <div className="mt-5"><small className="text-white" style={{letterSpacing:"4px", fontSize:"10px"}}>SHOP BY DEPARTMENT</small>
              <div className="d-flex gap-2 mt-3 flex-wrap justify-content-center">
                {["MEN","WOMEN","UNISEX","SPORTS"].map(l=><button key={l} onClick={()=>changePage(l==="MEN"?"Men":l==="WOMEN"?"Women":l==="SPORTS"?"Sports":"Unisex", l==="SPORTS"?"sports":"shop")} className="btn rounded-pill px-4 py-2 small fw-bold" style={{background:"rgba(0,0,0,0.3)", color:"white", border:"1px solid rgba(255,255,255,0.5)"}}>{l}</button>)}
              </div>
            </div>
          </div>

          <div className="container-fluid px-3 px-md-4 py-5">
            <h4 className="fw-bold">Shop By Category</h4>
            <p className="small text-secondary">Explore our curated selection of premium essentials and future-forward gear.</p>
            <div className="row g-3 mt-2">
              {[
                {name:"Men's Clothes", sec:"Men"},
                {name:"Women's Clothes", sec:"Women"},
                {name:"Unisex", sec:"Unisex"},
                {name:"Sports", sec:"Sports", v:"sports"},
              ].map((c:any)=>(
                <div key={c.name} className="col-6 col-md-3">
                  <div onClick={()=>changePage(c.sec, c.v||"shop")} style={{height:"200px", background:"#f5f5f5", borderRadius:"12px", backgroundImage:`url(${PRODUCTS.find(p=>p.section===c.sec)?.img})`, backgroundSize:"cover", cursor:"pointer"}} className="position-relative">
                    <div className="position-absolute bottom-0 p-3 w-100" style={{background:"linear-gradient(transparent, rgba(0,0,0,0.6))", borderRadius:"0 0 12px 12px"}}><div className="text-white fw-bold small">{c.name}</div><span className="badge bg-white text-black mt-1" style={{fontSize:"9px"}}>Explore</span></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="container-fluid px-3 px-md-4 py-4">
            <div className="d-flex justify-content-between"><div><small style={{letterSpacing:"3px", fontSize:"10px"}}>Fresh Drops • Auto-Updated</small><h4 className="fw-bold">TRENDING NOW</h4></div><button onClick={()=>changePage("Trending","trending")} className="btn btn-sm btn-outline-dark rounded-0">VIEW ALL TRENDING</button></div>
            <div className="row g-3 mt-3">{PRODUCTS.slice(0,8).map(p=><div key={p.id} className="col-6 col-md-3"><div className="border"><img src={p.img} className="w-100" style={{aspectRatio:"1", objectFit:"cover"}} alt=""/><div className="p-2"><small className="fw-bold" style={{fontSize:"11px"}}>{p.name}</small><br/><small className="fw-bold">Shs {p.price.toLocaleString()}</small><button onClick={()=>setCart([...cart,p])} className="btn btn-dark w-100 btn-sm rounded-0 mt-2">Add to Cart</button></div></div></div>)}</div>
          </div>
        </>
      )}

      {(view==="shop" || view==="trending" || view==="sports") && (
        <>
          <div className="text-center py-5" style={{background:"#F8F8F8"}}>
            <h1 className="fw-bold" style={{fontFamily:"serif", fontSize:"42px"}}>{title.toUpperCase()}</h1>
            <p className="text-secondary small">{subtitle}</p>
          </div>
          <div className="container-fluid px-3 px-md-4 py-4">
            <div className="row">
              <div className="col-12 col-md-2 mb-3">
                <small className="fw-bold">Section</small>
                <div className="mt-2 small d-flex flex-row flex-md-column gap-2 overflow-auto" style={{whiteSpace:"nowrap"}}>
                  <span onClick={()=>changePage("All Products","shop")} style={{cursor:"pointer", fontWeight:section==="All Products"?"bold":""}}>All Products</span>
                  <span onClick={()=>changePage("Men","shop")} style={{cursor:"pointer", fontWeight:section==="Men"&&view==="shop"?"bold":""}}>Men</span>
                  <span onClick={()=>changePage("Women","shop")} style={{cursor:"pointer", fontWeight:section==="Women"?"bold":""}}>Women</span>
                  <span onClick={()=>changePage("Unisex","shop")} style={{cursor:"pointer", fontWeight:section==="Unisex"?"bold":""}}>Unisex</span>
                  <span onClick={()=>changePage("Sports","sports")} style={{cursor:"pointer", fontWeight:view==="sports"?"bold":""}}>Sports</span>
                  <span onClick={()=>changePage("Trending","trending")} style={{cursor:"pointer", fontWeight:view==="trending"?"bold":"", color:"#FF6A00"}}>Trending</span>
                  <span>New Arrivals</span>
                </div>
                <div className="mt-4 d-none d-md-block"><small className="fw-bold">Gender</small><div className="mt-2 small text-secondary">Men<br/>Women<br/><small>Filters across all sections</small></div></div>
              </div>
              <div className="col-12 col-md-10">
                <div className="d-flex justify-content-between mb-3"><small>{filtered.length} Products</small><small>Sort by: Newest ▾</small></div>
                <div className="row g-2 g-md-3">
                  {display.map(p=>(
                    <div key={p.id} className="col-6 col-md-4 col-lg-3">
                      <div className="border position-relative bg-white">
                        {p.save && <span className="position-absolute top-0 start-0 bg-warning small fw-bold px-2 py-1 m-1 rounded-2" style={{fontSize:"9px", zIndex:2}}>{p.save}</span>}
                        <img src={p.img} className="w-100" style={{aspectRatio:"1", objectFit:"cover"}} alt=""/>
                        <div className="p-2"><small className="fw-bold d-block" style={{height:"30px", fontSize:"11px"}}>{p.name}</small><div className="d-flex gap-1"><small className="fw-bold">Shs {p.price.toLocaleString()}</small>{p.old && <small className="text-secondary text-decoration-line-through" style={{fontSize:"10px"}}>Shs {p.old.toLocaleString()}</small>}</div><button onClick={()=>setCart([...cart,p])} className="btn btn-dark w-100 btn-sm rounded-0 mt-2">Add to Cart</button></div>
                      </div>
                    </div>
                  ))}
                </div>
                {show < filtered.length && <div className="text-center mt-4"><button onClick={()=>setShow(show+8)} className="btn btn-outline-dark rounded-pill px-4">Load More ({filtered.length-show} remaining)</button></div>}
                <div className="text-center mt-3"><button onClick={()=>changePage("All Products","home")} className="btn btn-sm btn-outline-dark rounded-0">← Back Home</button></div>
              </div>
            </div>
          </div>
        </>
      )}

      <div className="mt-4">
        <div className="py-5 text-center" style={{background:"#F6F6F6"}}>
          <h5 className="fw-bold">Join The Club</h5>
          <p className="small text-secondary mx-auto px-3" style={{maxWidth:"500px"}}>Subscribe to our newsletter to receive exclusive offers, early access to new collections, and style tips straight to your inbox.</p>
          <div className="d-flex justify-content-center gap-2 mt-3 px-3"><input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Enter your email address" className="form-control rounded-pill" style={{maxWidth:"350px"}}/><button onClick={()=>{if(email){alert("Subscribed!"); setEmail("");}}} className="btn btn-dark rounded-pill px-4">Subscribe</button></div>
        </div>
        <div className="container-fluid px-3 px-md-5 py-4 border-top">
          <div className="row small g-3"><div className="col-12 col-md-3"><div className="fw-bold">👗 IRENE'S CLOSET</div><div className="fw-bold mt-2">WEAR IRENE.</div><div className="text-secondary mt-2">Premium dresses, shirts, trousers — picked for fit, finish, and feel. Delivered countrywide across Uganda.</div></div><div className="col-6 col-md-2"><div className="fw-bold">SHOP</div><div className="text-secondary mt-2 d-grid gap-1"><span onClick={()=>changePage("Men","shop")} style={{cursor:"pointer"}}>Men</span><span onClick={()=>changePage("Women","shop")} style={{cursor:"pointer"}}>Women</span><span onClick={()=>changePage("Unisex","shop")} style={{cursor:"pointer"}}>Unisex</span><span onClick={()=>changePage("Sports","sports")} style={{cursor:"pointer"}}>Sports</span><span>New Arrivals</span></div></div><div className="col-6 col-md-3"><div className="fw-bold">HELP</div><div className="text-secondary mt-2">FAQ<br/>Privacy Policy<br/>Contact Us</div></div><div className="col-12 col-md-4"><div className="fw-bold">FOLLOW US</div><div className="mt-2">📷 🎵 📘</div><div className="mt-2 small text-secondary">© 2026 Irene's Closet. All rights reserved.</div></div></div>
        </div>
      </div>
    </div>
  );
}
