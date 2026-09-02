"use client";
import { useState } from "react";

const PRODUCTS = [
  { id:1, name:"Black Minimal Dress", price:85000, old:120000, img:"https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400", tag:"SAVE 29%" },
  { id:2, name:"Beige Linen Trousers", price:75000, old:100000, img:"https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400", tag:"SAVE 25%" },
  { id:3, name:"White Oversized Shirt", price:55000, old:80000, img:"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400", tag:"SAVE 31%" },
  { id:4, name:"Cotton Tee", price:35000, old:50000, img:"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400", tag:"SAVE 30%" },
  { id:5, name:"Denim Jacket", price:120000, old:180000, img:"https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=400", tag:"SAVE 33%" },
  { id:6, name:"Silk Slip Dress", price:95000, old:140000, img:"https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400", tag:"SAVE 32%" },
  { id:7, name:"Black Formal Trousers", price:80000, old:110000, img:"https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400", tag:"SAVE 27%" },
  { id:8, name:"Graphic T-Shirt", price:40000, old:60000, img:"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400", tag:"SAVE 33%" },
];

export default function Page(){
  const [cart, setCart] = useState<any[]>([]);
  const [dept, setDept] = useState("All");

  return(
    <div style={{background:"#fff", minHeight:"100vh"}}>
      {/* HERO EXACT LIKE PRIME WEAR SCREENSHOT */}
      <div style={{background:"#CFC8BF", minHeight:"92vh", position:"relative", overflow:"hidden"}}>
        {/* NAV */}
        <nav className="d-flex justify-content-between align-items-center px-4 py-3 position-relative" style={{zIndex:10}}>
          <div className="d-flex align-items-center gap-2">
            <div style={{lineHeight:"1"}}><div className="fw-bold" style={{fontSize:"14px"}}>👗 IRENE'S CLOSET</div><div style={{fontSize:"8px", letterSpacing:"2px"}}>cloth store</div></div>
          </div>
          <div className="d-none d-md-flex gap-4 small fw-bold" style={{letterSpacing:"1px"}}>
            <span>SHOP ▾</span><span>MEN ▾</span><span>WOMEN ▾</span><span>UNISEX ▾</span><span>SPORTS ▾</span><span style={{color:"#FF6A00"}}>TRENDING</span>
          </div>
          <div className="d-flex gap-3"><span>🔍</span><span>🛒 {cart.length}</span><span>👤</span></div>
        </nav>

        {/* CENTER TEXT */}
        <div className="text-center position-relative" style={{zIndex:5, marginTop:"60px"}}>
          <h1 className="fw-bold" style={{fontFamily:"serif", fontSize:"clamp(40px, 8vw, 90px)", color:"white", letterSpacing:"2px", textShadow:"0 2px 10px rgba(0,0,0,0.2)"}}>IRENE'S CLOSET</h1>
          <p className="text-white mt-3 mx-auto" style={{maxWidth:"500px", fontSize:"18px"}}>Premium dresses, trousers, and minimal essentials — delivered countrywide.</p>
          <button className="btn bg-white text-black rounded-pill px-5 py-3 fw-bold mt-4" style={{letterSpacing:"1px"}}>SHOP COLLECTION</button>

          <div className="mt-5"><small className="text-white" style={{letterSpacing:"4px"}}>SHOP BY DEPARTMENT</small>
            <div className="d-flex justify-content-center gap-2 mt-3 flex-wrap">
              {["MEN","WOMEN","UNISEX","SPORTS"].map(d=>(
                <button key={d} onClick={()=>setDept(d)} className="btn btn-sm rounded-pill px-4" style={{background: dept===d? "black" : "rgba(0,0,0,0.2)", color:"white", border:"1px solid white", backdropFilter:"blur(5px)"}}>{d}</button>
              ))}
            </div>
          </div>
        </div>

        {/* CLOTHES IN CIRCLE LIKE SHOES - 8 ITEMS AROUND */}
        <div className="position-absolute top-0 start-0 w-100 h-100" style={{pointerEvents:"none"}}>
          {/* Top Left */}
          <img src={PRODUCTS[0].img} className="position-absolute rounded-3 shadow" style={{width:"110px", height:"110px", objectFit:"cover", left:"28%", top:"18%", transform:"rotate(-10deg)"}} alt=""/>
          {/* Top Center */}
          <img src={PRODUCTS[1].img} className="position-absolute rounded-3 shadow" style={{width:"130px", height:"130px", objectFit:"cover", left:"50%", top:"12%", transform:"translateX(-50%) rotate(5deg)"}} alt=""/>
          {/* Top Right */}
          <img src={PRODUCTS[2].img} className="position-absolute rounded-3 shadow" style={{width:"110px", height:"110px", objectFit:"cover", right:"28%", top:"20%", transform:"rotate(10deg)"}} alt=""/>
          {/* Middle Left */}
          <img src={PRODUCTS[3].img} className="position-absolute rounded-3 shadow" style={{width:"115px", height:"115px", objectFit:"cover", left:"18%", top:"45%", transform:"rotate(-5deg)"}} alt=""/>
          {/* Middle Right */}
          <img src={PRODUCTS[4].img} className="position-absolute rounded-3 shadow" style={{width:"120px", height:"120px", objectFit:"cover", right:"18%", top:"42%", transform:"rotate(8deg)"}} alt=""/>
          {/* Bottom Left */}
          <img src={PRODUCTS[5].img} className="position-absolute rounded-3 shadow" style={{width:"110px", height:"110px", objectFit:"cover", left:"20%", bottom:"25%", transform:"rotate(-8deg)"}} alt=""/>
          {/* Bottom Center */}
          <img src={PRODUCTS[6].img} className="position-absolute rounded-3 shadow" style={{width:"125px", height:"125px", objectFit:"cover", left:"50%", bottom:"10%", transform:"translateX(-50%) rotate(-3deg)"}} alt=""/>
          {/* Bottom Right */}
          <img src={PRODUCTS[7].img} className="position-absolute rounded-3 shadow" style={{width:"110px", height:"110px", objectFit:"cover", right:"20%", bottom:"22%", transform:"rotate(12deg)"}} alt=""/>

          {/* CENTER MODEL SILHOUETTE - Fashion */}
          <div className="position-absolute top-50 start-50 translate-middle" style={{fontSize:"120px", opacity:0.9, zIndex:2}}>🕴️</div>
        </div>
      </div>

      {/* TRENDING SECTION BELOW LIKE PRIME WEAR */}
      <div className="container-fluid px-4 py-5">
        <div className="d-flex justify-content-between align-items-center">
          <h5 className="fw-bold">TRENDING NOW</h5>
          <small className="border-bottom border-black">VIEW ALL TRENDING</small>
        </div>
        <div className="row g-3 mt-2">
          {PRODUCTS.map(p=>(
            <div key={p.id} className="col-6 col-md-3">
              <div className="border position-relative">
                <img src={p.img} className="w-100" style={{aspectRatio:"1", objectFit:"cover"}} alt=""/>
                <span className="position-absolute top-0 start-0 bg-black text-white px-2 py-1" style={{fontSize:"10px"}}>{p.tag}</span>
                <div className="p-2">
                  <p className="small fw-bold mb-1">{p.name}</p>
                  <div className="d-flex gap-2 align-items-center">
                    <span className="fw-bold small">UGX {p.price.toLocaleString()}</span>
                    <span className="small text-secondary text-decoration-line-through">UGX {p.old.toLocaleString()}</span>
                  </div>
                  <button onClick={()=>setCart([...cart, p])} className="btn btn-dark btn-sm w-100 rounded-0 mt-2">Add to Cart</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FOOTER */}
      <div className="bg-black text-white p-4 text-center">
        <h5 className="fw-bold" style={{letterSpacing:"4px"}}>IRENE'S CLOSET</h5>
        <small className="text-white-50">Premium minimal essentials • Kampala • UGX • © 2026</small>
      </div>
    </div>
  );
}
