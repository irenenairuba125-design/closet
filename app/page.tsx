"use client";
import { useState } from "react";

const ALL = [
  { id:1, name:"Black Minimal Dress", price:85000, old:120000, cat:"Dresses", gender:"Women", img:"https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500", save:"SAVE 29%" },
  { id:2, name:"Beige Linen Trousers", price:75000, old:100000, cat:"Trousers", gender:"Women", img:"https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500", save:"SAVE 25%" },
  { id:3, name:"White Oversized Shirt", price:55000, old:80000, cat:"Shirts", gender:"Unisex", img:"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500", save:"SAVE 31%" },
  { id:4, name:"Cotton Tee", price:35000, old:50000, cat:"T-Shirts", gender:"Unisex", img:"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500", save:"SAVE 30%" },
  { id:5, name:"Denim Jacket", price:120000, old:180000, cat:"Jackets", gender:"Men", img:"https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=500", save:"SAVE 33%" },
  { id:6, name:"Black Formal Shirt", price:65000, old:95000, cat:"Shirts", gender:"Men", img:"https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500", save:"SAVE 32%" },
  { id:7, name:"Khaki Cargo Trousers", price:80000, old:110000, cat:"Trousers", gender:"Men", img:"https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500", save:"SAVE 27%" },
  { id:8, name:"Grey Hoodie", price:90000, old:130000, cat:"Jackets", gender:"Men", img:"https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500", save:"SAVE 31%" },
];

export default function Page(){
  const [view, setView] = useState("home");
  const [dept, setDept] = useState("All");
  const [cart, setCart] = useState<any[]>([]);
  const [email, setEmail] = useState("");

  const filtered = dept==="All"? ALL : ALL.filter(p=>p.gender===dept);

  return(
    <div style={{background:"#fff"}}>
      {/* NAV - SHORT LOGO IC. */}
      <nav className="d-flex justify-content-between align-items-center px-4 py-3 bg-white border-bottom sticky-top">
        <div className="d-flex gap-2 align-items-center" style={{cursor:"pointer"}} onClick={()=>setView("home")}>
          <div className="bg-black text-white d-flex align-items-center justify-content-center" style={{width:"38px", height:"38px", borderRadius:"8px", fontWeight:"bold"}}>IC.</div>
          <div style={{lineHeight:"1"}}><div className="fw-bold" style={{fontSize:"14px", letterSpacing:"1px"}}>IRENE'S CLOSET</div><div style={{fontSize:"9px"}}>EST. 2024 • KAMPALA</div></div>
        </div>
        <div className="d-none d-md-flex gap-4 small fw-bold">
          <span onClick={()=>{setDept("All"); setView("home");}} style={{cursor:"pointer"}}>SHOP</span>
          <span onClick={()=>{setDept("Men"); setView("mens");}} style={{cursor:"pointer", borderBottom:dept==="Men"?"2px solid black":"none"}}>MEN</span>
          <span onClick={()=>{setDept("Women"); setView("mens");}} style={{cursor:"pointer"}}>WOMEN</span>
          <span onClick={()=>{setDept("Unisex"); setView("mens");}} style={{cursor:"pointer"}}>UNISEX</span>
          <span style={{color:"#FF6A00"}}>TRENDING</span>
        </div>
        <div>🛒 {cart.length}</div>
      </nav>

      {view==="home" && (
        <>
          {/* HERO WITH CIRCLES - SHORT DESIGN */}
          <div style={{background:"#CFC8BF", minHeight:"80vh", position:"relative"}} className="d-flex flex-column align-items-center justify-content-center p-4 text-center">
            <h1 className="fw-bold text-white" style={{fontFamily:"serif", fontSize:"70px", letterSpacing:"3px"}}>IC.</h1>
            <p className="text-white">Premium dresses, trousers, minimal essentials — delivered countrywide.</p>
            <button onClick={()=>setView("mens")} className="btn bg-white rounded-pill px-5 py-3 fw-bold mt-3">SHOP COLLECTION</button>

            <div className="mt-4">
              <small className="text-white" style={{letterSpacing:"3px"}}>SHOP BY DEPARTMENT</small>
              <div className="d-flex gap-3 mt-3 justify-content-center flex-wrap">
                {[
                  {name:"Men", img:ALL[4].img},
                  {name:"Women", img:ALL[0].img},
                  {name:"Unisex", img:ALL[2].img},
                  {name:"Sports", img:ALL[1].img},
                ].map(d=>(
                  <div key={d.name} onClick={()=>{setDept(d.name); setView("mens");}} style={{cursor:"pointer"}} className="text-center">
                    <img src={d.img} className="rounded-circle border border-3 border-white shadow" style={{width:"85px", height:"85px", objectFit:"cover"}} alt=""/>
                    <div className="small fw-bold text-white mt-1">{d.name}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* TRENDING CIRCLE IMAGES */}
            <div className="d-flex gap-2 mt-4">
              {ALL.slice(0,5).map(p=> <img key={p.id} src={p.img} style={{width:"60px", height:"60px", borderRadius:"50%", objectFit:"cover", border:"2px solid white"}} alt=""/>)}
            </div>
          </div>

          {/* TRENDING WITH SAVE % */}
          <div className="container-fluid px-4 py-5">
            <div className="d-flex justify-content-between"><h5 className="fw-bold">TRENDING NOW</h5><button onClick={()=>setView("mens")} className="btn btn-sm btn-outline-dark rounded-0">VIEW ALL</button></div>
            <div className="row g-3 mt-1">
              {ALL.slice(0,4).map(p=>(
                <div key={p.id} className="col-6 col-md-3">
                  <div className="border">
                    <div className="position-relative">
                      <img src={p.img} className="w-100" style={{aspectRatio:"1", objectFit:"cover"}} alt=""/>
                      <span className="position-absolute top-0 start-0 bg-warning small fw-bold px-2 py-1">{p.save}</span>
                    </div>
                    <div className="p-2">
                      <div className="small fw-bold">{p.name}</div>
                      <div className="d-flex gap-2"><small className="fw-bold">UGX {p.price.toLocaleString()}</small><small className="text-secondary text-decoration-line-through">UGX {p.old.toLocaleString()}</small></div>
                      <button onClick={()=>setCart([...cart, p])} className="btn btn-dark btn-sm w-100 rounded-0 mt-2">Add to Cart</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {view==="mens" && (
        <>
          <div style={{height:"220px", background:"#111"}} className="d-flex flex-column align-items-center justify-content-center text-white">
            <h1 className="fw-bold" style={{fontFamily:"serif"}}>{dept.toUpperCase()} CLOTHES</h1>
            <p className="small">From Clean Shirts To Classic Jackets.</p>
          </div>
          <div className="container-fluid px-4 py-4">
            <div className="row">
              <div className="col-md-2"><small className="fw-bold">SECTION</small><div className="mt-2 small d-grid gap-1"><span onClick={()=>setDept("All")} style={{cursor:"pointer"}} className={dept==="All"?"fw-bold":""}>All Products</span><span onClick={()=>setDept("Men")} className={dept==="Men"?"fw-bold":""} style={{cursor:"pointer"}}>Men (5)</span><span onClick={()=>setDept("Women")} className={dept==="Women"?"fw-bold":""} style={{cursor:"pointer"}}>Women</span><span>Unisex</span><span>Trending</span></div></div>
              <div className="col-md-10">
                <div className="d-flex justify-content-between mb-3"><small>{filtered.length} Products</small><small>Sort by: Newest</small></div>
                <div className="row g-3">
                  {filtered.map(p=>(
                    <div key={p.id} className="col-6 col-md-4">
                      <span className="bg-warning small fw-bold px-2 py-1">{p.save}</span>
                      <img src={p.img} className="w-100 mt-1" style={{aspectRatio:"1", objectFit:"cover", background:"#f5f5f5"}} alt=""/>
                      <div className="small fw-bold mt-1">{p.name}</div>
                      <small className="fw-bold">UGX {p.price.toLocaleString()}</small>
                      <button onClick={()=>setCart([...cart, p])} className="btn btn-dark btn-sm w-100 rounded-0 mt-1">Add to Cart</button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* FOOTER WITH SUBSCRIBE */}
      <div className="mt-4">
        <div className="py-3 d-flex justify-content-center gap-2" style={{background:"#f9f9f9", borderTop:"1px solid #eee"}}>
          <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Enter your email address" className="form-control rounded-pill" style={{maxWidth:"300px"}}/>
          <button onClick={()=>{alert("Subscribed!"); setEmail("");}} className="btn btn-dark rounded-pill px-4">SUBSCRIBE</button>
        </div>
        <div className="container-fluid px-4 py-4 bg-white border-top">
          <div className="row small">
            <div className="col-md-3"><div className="fw-bold">IC.</div><div className="fw-bold mt-2">WEAR IRENE.</div><div className="text-secondary mt-2">Premium dresses, shirts, trousers — picked for fit, finish, and feel. Delivered countrywide across Uganda.</div></div>
            <div className="col-md-3"><div className="fw-bold">SHOP</div><div className="text-secondary mt-2">Men<br/>Women<br/>Unisex<br/>Sports</div></div>
            <div className="col-md-3"><div className="fw-bold">HELP</div><div className="text-secondary mt-2">FAQ<br/>Privacy Policy<br/>Contact Us</div></div>
            <div className="col-md-3"><div className="fw-bold">FOLLOW US</div><div className="mt-2">📷 🎵 📘</div></div>
          </div>
        </div>
      </div>
    </div>
  );
}
