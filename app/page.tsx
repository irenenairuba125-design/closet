"use client";
import { useState, useMemo } from "react";

const PRODUCTS = [
  { id:1, name:"Black Minimal Dress", price:85000, old:120000, cat:"Dresses", gender:"Women", img:"https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600", tag:"SAVE 29%" },
  { id:2, name:"Beige Linen Trousers", price:75000, old:100000, cat:"Trousers", gender:"Women", img:"https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600", tag:"SAVE 25%" },
  { id:3, name:"White Oversized Shirt", price:55000, old:80000, cat:"Shirts", gender:"Unisex", img:"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600", tag:"SAVE 31%" },
  { id:4, name:"Cotton Tee", price:35000, old:50000, cat:"T-Shirts", gender:"Unisex", img:"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600", tag:"SAVE 30%" },
  { id:5, name:"Denim Jacket", price:120000, old:180000, cat:"Jackets", gender:"Men", img:"https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=600", tag:"SAVE 33%" },
  { id:6, name:"Silk Slip Dress", price:95000, old:140000, cat:"Dresses", gender:"Women", img:"https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600", tag:"SAVE 32%" },
  { id:7, name:"Black Formal Trousers", price:80000, old:110000, cat:"Trousers", gender:"Men", img:"https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600", tag:"SAVE 27%" },
  { id:8, name:"Graphic T-Shirt", price:40000, old:60000, cat:"T-Shirts", gender:"Unisex", img:"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600", tag:"SAVE 33%" },
];

export default function Page(){
  const [view, setView] = useState("home");
  const [gender, setGender] = useState("All");
  const [cart, setCart] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  
  const filtered = useMemo(()=> PRODUCTS.filter(p=> (gender==="All" || p.gender===gender) && p.name.toLowerCase().includes(search.toLowerCase())), [gender, search]);

  return(
    <div style={{background:"#fff", minHeight:"100vh", fontFamily:"system-ui"}}>
      {/* TOP NAV LIKE PRIME WEAR */}
      <nav className="border-bottom sticky-top bg-white" style={{zIndex:1000}}>
        <div className="container-fluid px-4 py-2 d-flex justify-content-between align-items-center">
          <div className="d-flex gap-4 align-items-center">
            <span className="fw-bold" style={{letterSpacing:"2px", fontSize:"20px"}}>👗 IRENE'S CLOSET</span>
            <div className="d-none d-md-flex gap-3 small">
              <span className="fw-bold border-bottom border-black" style={{cursor:"pointer"}} onClick={()=>setView("home")}>Shop</span>
              <span style={{cursor:"pointer"}} onClick={()=>{setGender("Men"); setView("shop");}}>Men</span>
              <span style={{cursor:"pointer"}} onClick={()=>{setGender("Women"); setView("shop");}}>Women</span>
              <span style={{cursor:"pointer"}} onClick={()=>{setGender("Unisex"); setView("shop");}}>Unisex</span>
              <span style={{cursor:"pointer"}}>Sports</span>
              <span style={{cursor:"pointer"}}>Trending</span>
            </div>
          </div>
          <div className="d-flex gap-2 align-items-center">
            <input className="form-control form-control-sm rounded-pill" placeholder="Search" value={search} onChange={e=>setSearch(e.target.value)} style={{width:"120px"}}/>
            <span>🛒 {cart.length}</span>
            <button onClick={()=>setView(view==="admin"?"home":"admin")} className="btn btn-sm btn-outline-dark rounded-0">Admin</button>
          </div>
        </div>
      </nav>

      {view==="home" && (
        <>
          {/* HERO LIKE PRIME WEAR */}
          <div className="container-fluid px-4 py-5" style={{background:"#F8F8F8"}}>
            <div className="row align-items-center">
              <div className="col-md-6">
                <h1 className="display-3 fw-bold" style={{lineHeight:"0.9"}}>IRENE'S<br/>CLOSET</h1>
                <p className="mt-3 text-secondary" style={{maxWidth:"400px"}}>Premium dresses, trousers, and minimal essentials — curated for fit, finish, and feel. Delivered countrywide.</p>
                <button onClick={()=>setView("shop")} className="btn btn-dark rounded-0 px-4 py-3 mt-3">Shop Collection →</button>
              </div>
              <div className="col-md-6 text-center">
                <img src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=600" style={{width:"90%", maxHeight:"400px", objectFit:"cover", borderRadius:"20px"}} alt=""/>
              </div>
            </div>
          </div>

          {/* SHOP BY DEPARTMENT - CIRCLES */}
          <div className="container-fluid px-4 py-5">
            <h5 className="fw-bold mb-4">Shop By Department</h5>
            <div className="d-flex gap-4 overflow-auto pb-3">
              {[
                {name:"Men", img:"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300"},
                {name:"Women", img:"https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=300"},
                {name:"Unisex", img:"https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=300"},
                {name:"Sports", img:"https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=300"},
              ].map(d=>(
                <div key={d.name} className="text-center" style={{minWidth:"140px", cursor:"pointer"}} onClick={()=>{setGender(d.name); setView("shop");}}>
                  <img src={d.img} className="rounded-circle" style={{width:"120px", height:"120px", objectFit:"cover", border:"2px solid #000"}} alt=""/>
                  <p className="fw-bold mt-2 small">{d.name}</p>
                </div>
              ))}
            </div>
          </div>

          {/* SHOP BY CATEGORY - CIRCLES */}
          <div className="container-fluid px-4 py-3">
            <h5 className="fw-bold mb-4">Shop By Category</h5>
            <p className="text-secondary small">Explore our curated selection of premium essentials and future-forward gear.</p>
            <div className="d-flex gap-4 overflow-auto pb-3 mt-3">
              {[
                {name:"Dresses", img:"https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=300"},
                {name:"Trousers", img:"https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=300"},
                {name:"T-Shirts", img:"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300"},
                {name:"Jackets", img:"https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=300"},
              ].map(c=>(
                <div key={c.name} className="text-center" style={{minWidth:"160px"}}>
                  <div className="position-relative">
                    <img src={c.img} className="rounded-circle" style={{width:"140px", height:"140px", objectFit:"cover"}} alt=""/>
                    <span className="position-absolute bottom-0 start-50 translate-middle-x bg-black text-white px-2 py-1 small rounded-pill" style={{fontSize:"10px"}}>Explore</span>
                  </div>
                  <p className="fw-bold mt-3 small">{c.name}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CURATED COLLECTIONS */}
          <div className="container-fluid px-4 py-4">
            <h5 className="fw-bold mb-3">Curated Collections</h5>
            <div className="row g-3">
              <div className="col-md-4"><div className="p-4 text-white" style={{background:"#000", minHeight:"180px"}}><small>STREETWEAR ESSENTIALS</small><h4 className="mt-5">Streetwear Essentials</h4><button className="btn btn-outline-light btn-sm rounded-0 mt-2">View Collection</button></div></div>
              <div className="col-md-4"><div className="p-4" style={{background:"#C8B6A6", minHeight:"180px"}}><small>SMART & STYLISH</small><h4 className="mt-5">Smart & Stylish</h4><button className="btn btn-outline-dark btn-sm rounded-0 mt-2">View Collection</button></div></div>
              <div className="col-md-4"><div className="p-4 text-white" style={{background:"#444", minHeight:"180px"}}><small>CASUAL WEAR</small><h4 className="mt-5">Casual Wear</h4><button className="btn btn-outline-light btn-sm rounded-0 mt-2">View Collection</button></div></div>
            </div>
          </div>

          {/* TRENDING NOW - LIKE PRIME WEAR */}
          <div className="container-fluid px-4 py-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="fw-bold">TRENDING NOW • Fresh Drops</h5>
              <button onClick={()=>setView("shop")} className="btn btn-sm btn-outline-dark rounded-0">VIEW ALL TRENDING</button>
            </div>
            <div className="row g-3">
              {PRODUCTS.slice(0,4).map(p=>(
                <div key={p.id} className="col-6 col-md-3">
                  <div className="border">
                    <div className="position-relative">
                      <img src={p.img} className="w-100" style={{aspectRatio:"1", objectFit:"cover"}} alt=""/>
                      <span className="position-absolute top-0 start-0 bg-danger text-white px-2 py-1" style={{fontSize:"10px"}}>{p.tag}</span>
                      <button onClick={()=>setCart([...cart, p])} className="position-absolute bottom-0 end-0 btn btn-dark btn-sm rounded-0 m-2">Add to Cart</button>
                    </div>
                    <div className="p-2">
                      <p className="small fw-bold mb-1">{p.name}</p>
                      <div className="d-flex gap-2"><span className="fw-bold small">UGX {p.price.toLocaleString()}</span><span className="text-secondary small text-decoration-line-through">UGX {p.old.toLocaleString()}</span></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* FOOTER LIKE PRIME WEAR */}
          <div className="bg-black text-white p-5 mt-5">
            <div className="row">
              <div className="col-md-4"><h4 className="fw-bold">IRENE'S CLOSET</h4><p className="small text-white-50 mt-3">Wear Irene. Premium dresses, trousers, and minimal essentials — picked for fit, finish, and feel. Delivered countrywide across Uganda.</p></div>
              <div className="col-md-8"><div className="d-flex gap-5"><div><small className="fw-bold">Shop</small><div className="small mt-2 text-white-50">Dresses<br/>Trousers<br/>T-Shirts<br/>Jackets</div></div><div><small className="fw-bold">Help</small><div className="small mt-2 text-white-50">FAQ<br/>Privacy Policy<br/>Contact Us</div></div></div></div>
            </div>
            <div className="border-top border-secondary mt-4 pt-3 small text-white-50">© 2026 Irene's Closet. All rights reserved. Designed for Excellence</div>
          </div>
        </>
      )}

      {view==="shop" && (
        <div className="container-fluid px-4 py-4">
          <div className="row">
            <div className="col-md-3"><div className="border p-3"><h6 className="fw-bold">Filters</h6><div className="mt-3"><small className="fw-bold">Gender</small><div className="d-grid gap-1 mt-2"><button onClick={()=>setGender("All")} className={`btn btn-sm rounded-0 ${gender==="All"?"btn-dark":"btn-outline-dark"}`}>All Products</button><button onClick={()=>setGender("Men")} className={`btn btn-sm rounded-0 ${gender==="Men"?"btn-dark":"btn-outline-dark"}`}>Men</button><button onClick={()=>setGender("Women")} className={`btn btn-sm rounded-0 ${gender==="Women"?"btn-dark":"btn-outline-dark"}`}>Women</button><button onClick={()=>setGender("Unisex")} className={`btn btn-sm rounded-0 ${gender==="Unisex"?"btn-dark":"btn-outline-dark"}`}>Unisex</button></div></div></div></div>
            <div className="col-md-9">
              <div className="d-flex justify-content-between mb-3"><h5>{gender} - {filtered.length} Products</h5><button onClick={()=>setView("home")} className="btn btn-sm btn-dark rounded-0">Back Home</button></div>
              <div className="row g-3">{filtered.map(p=>(
                <div key={p.id} className="col-6 col-md-4"><div className="border"><div className="position-relative"><img src={p.img} className="w-100" style={{aspectRatio:"1", objectFit:"cover"}} alt=""/><span className="position-absolute top-0 start-0 bg-danger text-white px-2 py-1" style={{fontSize:"10px"}}>{p.tag}</span></div><div className="p-2"><p className="small fw-bold">{p.name}</p><div className="d-flex justify-content-between align-items-center"><div><span className="fw-bold small">UGX {p.price.toLocaleString()}</span><br/><span className="text-secondary small text-decoration-line-through">UGX {p.old.toLocaleString()}</span></div><button onClick={()=>setCart([...cart, p])} className="btn btn-dark btn-sm rounded-0">Add</button></div></div></div></div>
              ))}</div>
            </div>
          </div>
        </div>
      )}

      {view==="admin" && (
        <div className="container p-4"><h4>Admin - {cart.length} items in cart</h4><div className="bg-white border p-3 mt-3"><h6>Cart</h6>{cart.map((c,i)=><div key={i} className="d-flex justify-content-between border-bottom py-1"><small>{c.name}</small><small>UGX {c.price}</small></div>)}<h5 className="mt-3">Total: UGX {cart.reduce((a,b)=>a+b.price,0).toLocaleString()}</h5></div><button onClick={()=>setView("home")} className="btn btn-dark rounded-0 mt-3">Back to Shop</button></div>
      )}
    </div>
  );
}
