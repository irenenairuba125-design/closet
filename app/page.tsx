"use client";
import { useState, useMemo } from "react";

const C: any = {
  Men: ["photo-1596755094514-f87e34085b2c","photo-1551537482-f2075a1d41f2","photo-1594938298603-c8148c4dae35","photo-1521572163474-6864f9cf17ab","photo-1556821840-3a63f95609a7","photo-1594633312681-425c7b97ccd1","photo-1551028719-00167b16eac5","photo-1591195853828-11db59a44f6b"],
  Women: ["photo-1595777457583-95e059d581b8","photo-1583496661160-fb5886a0aaaa","photo-1598550476439-6845435fcea5","photo-1490481651871-ab68de25d43d","photo-1591369822096-ffd140ec948f","photo-1434389677669-e08b4cac3105","photo-1541099649105-f69ad21f3246","photo-1581044777550-4cfa60707c03"],
  Unisex: ["photo-1521572163474-6864f9cf17ab","photo-1544923246-77307dd654cb","photo-1594633312681-425c7b97ccd1","photo-1556821840-3a63f95609a7","photo-1591195853828-11db59a44f6b","photo-1596755094514-f87e34085b2c"],
  Sports: ["photo-1571902943202-507ec2618e8f","photo-1517438476312-10d79c077509","photo-1506629903106-0650d349b7b9","photo-1551537482-f2075a1d41f2","photo-1591195853828-11db59a44f6b","photo-1556821840-3a63f95609a7"]
};

const make = (sec:string, n:number) => Array.from({length:n},(_,i)=>({
  id:`${sec}${i}`, name:`${sec} ${["Classic Shirt","Denim Jacket","Cargo Pants","Hoodie","Blazer","Minimal Dress","Cotton Tee","Wool Coat","Linen Shirt","Pleated Skirt"][i%10]} ${i+1}`,
  price:35000+i*5500, old:50000+i*8000,
  img:`https://images.unsplash.com/${C[sec][i % C[sec].length]}?w=500`,
  save:`SAVE ${22+i%18}%`, section:sec
}));

const PRODUCTS = [...make("Men",24),...make("Women",24),...make("Unisex",24),...make("Sports",24)];
const FALLBACK_BG = "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=1400";
const SPORTS_BG = "https://images.unsplash.com/photo-1517438476312-10d79c077509?w=1200";

export default function Page(){
  const [view,setView]=useState("home"); 
  const [sec,setSec]=useState("All"); 
  const [cart,setCart]=useState<any[]>([]);
  const [open,setOpen]=useState(false); // for 3 lines menu

  const filtered = useMemo(()=>{
    if(view==="sports"||sec==="Sports") return PRODUCTS.filter(p=>p.section==="Sports").slice(0,24);
    if(sec==="Men") return PRODUCTS.filter(p=>p.section==="Men").slice(0,24);
    if(sec==="Women") return PRODUCTS.filter(p=>p.section==="Women").slice(0,24);
    if(sec==="Unisex") return PRODUCTS.filter(p=>p.section==="Unisex").slice(0,24);
    if(view==="trending") return [...PRODUCTS.slice(0,6),...PRODUCTS.slice(24,30),...PRODUCTS.slice(48,54),...PRODUCTS.slice(72,78)].slice(0,24);
    return [...PRODUCTS.slice(0,6),...PRODUCTS.slice(24,30),...PRODUCTS.slice(48,54),...PRODUCTS.slice(72,78)].slice(0,24);
  },[sec,view]);

  const change=(s:string,v:string="shop")=>{setSec(s);setView(v);setOpen(false);window.scrollTo(0,0);};
  const isSports = view==="sports"||sec==="Sports";
  const headerBg = isSports ? `linear-gradient(rgba(20,40,70,0.78), rgba(20,40,70,0.78)), url(${SPORTS_BG})` : `linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.35)), url(${FALLBACK_BG})`;

  const Footer = () => (
    <footer className="bg-black text-white mt-5 pt-5 pb-3 px-4">
      <div className="container-fluid">
        <div className="row g-4">
          <div className="col-12 col-md-4">
            <h5 className="fw-bold" style={{fontFamily:"serif"}}>IRENE&apos;S CLOSET</h5>
            <p className="fw-bold mb-1">Wear Confidence.</p>
            <small className="text-secondary">Premium dresses, shirts, trousers & athletic wear — picked for fit, finish, and feel. Delivered countrywide across Uganda.</small>
          </div>
          <div className="col-6 col-md-2"><small className="fw-bold d-block mb-2">Shop</small><div className="small text-secondary d-flex flex-column gap-1"><span onClick={()=>change("All","shop")} style={{cursor:"pointer"}}>Shop</span><span onClick={()=>change("Men","shop")} style={{cursor:"pointer"}}>Men</span><span onClick={()=>change("Women","shop")} style={{cursor:"pointer"}}>Women</span><span onClick={()=>change("Unisex","shop")} style={{cursor:"pointer"}}>Unisex</span><span onClick={()=>change("Sports","sports")} style={{cursor:"pointer"}}>Sports</span><span onClick={()=>change("All","trending")} style={{cursor:"pointer"}}>New Arrivals</span></div></div>
          <div className="col-6 col-md-2"><small className="fw-bold d-block mb-2">Help</small><div className="small text-secondary d-flex flex-column gap-1"><span>FAQ</span><span>Privacy Policy</span><span>Contact Us (Get in Touch)</span></div></div>
          <div className="col-12 col-md-4"><small className="fw-bold d-block mb-2">Follow Us</small><div className="d-flex gap-2"><span className="bg-white text-black rounded-circle d-flex justify-content-center align-items-center" style={{width:30,height:30}}>f</span><span className="bg-white text-black rounded-circle d-flex justify-content-center align-items-center" style={{width:30,height:30}}>IG</span><span className="bg-white text-black rounded-circle d-flex justify-content-center align-items-center" style={{width:30,height:30}}>X</span></div></div>
        </div>
        <div className="border-top border-secondary mt-4 pt-3 text-center"><small className="text-secondary">© 2026 Irene&apos;s Closet. All rights reserved.</small></div>
      </div>
    </footer>
  );

  return(
    <div style={{background:"#fff"}}>
      {/* NAV WITH 3 LINES */}
      <nav className="d-flex justify-content-between align-items-center px-3 py-3 bg-white sticky-top border-bottom" style={{zIndex:200}}>
        <div className="d-flex align-items-center gap-2" onClick={()=>change("All","home")} style={{cursor:"pointer"}}><div className="bg-black text-white d-flex justify-content-center align-items-center fw-bold" style={{width:36,height:36,borderRadius:8}}>👗</div><span className="fw-bold" style={{fontSize:11}}>IRENE&apos;S CLOSET</span></div>
        <div className="d-none d-md-flex gap-3 small fw-bold"><span onClick={()=>change("All","shop")} style={{cursor:"pointer"}}>SHOP ▾</span><span onClick={()=>change("Men","shop")} style={{cursor:"pointer"}}>MEN</span><span onClick={()=>change("Women","shop")} style={{cursor:"pointer"}}>WOMEN</span><span onClick={()=>change("Unisex","shop")} style={{cursor:"pointer"}}>UNISEX</span><span onClick={()=>change("Sports","sports")} style={{cursor:"pointer"}}>SPORTS</span><span onClick={()=>change("All","trending")} style={{cursor:"pointer",color:"#FF6A00"}}>TRENDING</span></div>
        <div className="d-flex align-items-center gap-3">
          <span className="d-none d-md-block">🛒 {cart.length}</span>
          <span className="d-md-none" style={{cursor:"pointer", fontSize:26}} onClick={()=>setOpen(!open)}>{open ? "✕" : "☰"}</span>
          <span className="d-none d-md-block" style={{cursor:"pointer", fontSize:22}} onClick={()=>setOpen(!open)}>{open ? "✕" : "☰"}</span>
        </div>
      </nav>

      {/* MOBILE DRAWER LIKE YOUR SCREENSHOT */}
      {open && (
        <div className="position-fixed bg-white w-100" style={{top:58, left:0, zIndex:199, height:"calc(100vh - 58px)", overflowY:"auto"}}>
          <div className="p-4">
            <div className="d-flex justify-content-between border-bottom py-3" style={{cursor:"pointer"}} onClick={()=>change("All","shop")}><h5 className="fw-bold">SHOP</h5></div>
            <div className="d-flex justify-content-between align-items-center border-bottom py-3" style={{cursor:"pointer"}} onClick={()=>change("Men","shop")}><h5 className="fw-bold m-0">MEN</h5><span>⌄</span></div>
            <div className="d-flex justify-content-between align-items-center border-bottom py-3" style={{cursor:"pointer"}} onClick={()=>change("Women","shop")}><h5 className="fw-bold m-0">WOMEN</h5><span>⌄</span></div>
            <div className="d-flex justify-content-between align-items-center border-bottom py-3" style={{cursor:"pointer"}} onClick={()=>change("Unisex","shop")}><h5 className="fw-bold m-0">UNISEX</h5><span>⌄</span></div>
            <div className="d-flex justify-content-between align-items-center border-bottom py-3" style={{cursor:"pointer"}} onClick={()=>change("Sports","sports")}><h5 className="fw-bold m-0">SPORTS</h5><span>⌄</span></div>
            <div className="py-3 border-bottom" style={{cursor:"pointer"}} onClick={()=>change("All","trending")}><h5 className="fw-bold m-0" style={{color:"#FF6A00"}}>TRENDING</h5></div>
            <div className="mt-5 pt-3 border-top">
              <p className="fw-bold text-secondary mb-2" style={{letterSpacing:1}}>SIGN IN</p>
              <p className="fw-bold text-secondary" style={{letterSpacing:1}}>CREATE ACCOUNT</p>
              <div className="mt-4 d-flex gap-2 text-secondary"><span>🔍</span><small>Search products...</small></div>
            </div>
          </div>
        </div>
      )}

      {view==="home" && (
        <>
          {/* PRIME WEAR HERO - CLOTH IMAGE */}
          <div className="prime-hero">
            <div className="container-fluid p-0">
              <div className="row g-0 align-items-center" style={{minHeight:"92vh"}}>
                <div className="col-12 col-lg-5 px-4 px-lg-5 py-5">
                  <small className="fw-bold" style={{letterSpacing:4, color:"#FF6A00", fontSize:11}}>NEW COLLECTION 2026</small>
                  <h1 className="fw-bold mt-3" style={{fontFamily:"serif", fontSize:"clamp(40px,5vw,64px)", lineHeight:0.9, color:"#111"}}>FIND YOUR<br/><span style={{fontStyle:"italic", fontWeight:400}}>PERFECT</span><br/>STYLE</h1>
                  <p className="text-secondary mt-3" style={{maxWidth:400}}>Premium dresses, shirts, trousers & athletic wear — delivered countrywide across Uganda.</p>
                  <div className="d-flex gap-2 mt-4 flex-wrap">
                    <button onClick={()=>change("All","shop")} className="btn btn-dark rounded-pill px-5 py-3 fw-bold">SHOP NOW →</button>
                    <button onClick={()=>change("All","trending")} className="btn btn-outline-dark rounded-pill px-4 py-3 fw-bold">TRENDING</button>
                  </div>
                </div>
                <div className="col-12 col-lg-7 position-relative" style={{background:"#F5F1EB", minHeight:"92vh"}}>
                  <img src="https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=900" alt="Cloth Cover" className="w-100 h-100 position-absolute top-0 start-0" style={{objectFit:"cover", minHeight:"92vh"}}/>
                  <div className="d-none d-lg-block position-absolute bg-white p-3 shadow rounded-3" style={{bottom:30, left:30, width:210}}>
                    <div className="d-flex gap-2"><img src="https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=100" style={{width:50,height:50,objectFit:"cover", borderRadius:8}} alt=""/><div><small className="fw-bold d-block" style={{fontSize:11}}>Minimal Dress</small><small className="fw-bold">Shs 52,000</small></div></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="container-fluid px-3 py-5 text-center" style={{background:"#FFFBF7"}}><small style={{letterSpacing:4,color:"#FF6A00"}}>WEAR YOUR CONFIDENCE</small><div className="row mt-4 g-3"><div className="col-4"><div className="fw-bold">🚚</div><small className="fw-bold">Countrywide</small><br/><small className="text-secondary" style={{fontSize:10}}>Delivered fast</small></div><div className="col-4"><div className="fw-bold">✨</div><small className="fw-bold">Premium Fit</small><br/><small className="text-secondary" style={{fontSize:10}}>Style that speaks</small></div><div className="col-4"><div className="fw-bold">💳</div><small className="fw-bold">Pay on Delivery</small><br/><small className="text-secondary" style={{fontSize:10}}>Cash / Mobile</small></div></div></div>

          <div className="container-fluid px-3 py-4"><h5 className="fw-bold">TRENDING NOW</h5><p className="small text-secondary">Curated for confidence — timeless pieces stitched to elevate your everyday.</p><div className="row g-2 mt-2">{filtered.slice(0,8).map(p=><div key={p.id} className="col-6 col-md-3"><div className="border"><img src={p.img} className="w-100" style={{aspectRatio:"1",objectFit:"cover"}} alt=""/><div className="p-2"><small className="fw-bold" style={{fontSize:11}}>{p.name}</small><br/><small className="fw-bold">Shs {p.price.toLocaleString()}</small><button onClick={()=>setCart([...cart,p])} className="btn btn-dark w-100 btn-sm rounded-0 mt-2">Add to Cart</button></div></div></div>)}</div><div className="text-center mt-3"><button onClick={()=>change("All","trending")} className="btn btn-outline-dark rounded-pill px-4">View All Trending</button></div></div>
          <Footer/>
        </>
      )}

      {(view==="shop"||view==="sports"||view==="trending") && (
        <>
          <div className="text-center py-5 d-flex flex-column justify-content-center align-items-center px-3" style={{minHeight:380,backgroundImage:headerBg,backgroundSize:"cover",backgroundPosition:"center"}}>
            <h1 className="fw-bold text-white" style={{fontFamily:"serif",fontSize:"clamp(32px,7vw,56px)"}}>{isSports?"SPORTS":view==="trending"?"TRENDING NOW":sec==="All"?"SHOP COLLECTION":sec.toUpperCase()}</h1>
            <p className="text-white mt-2" style={{maxWidth:600}}>{isSports?"Built For Performance — Power in every stitch, confidence in every move.":view==="trending"?"Dare to stand out — most-loved looks, chosen for you.":sec==="Unisex"?"Genderless silhouettes — Own your style, no limits.":"Handpicked styles to elevate your everyday — confidence stitched in every piece."}</p>
          </div>
          <div className="container-fluid px-3 py-4"><div className="row"><div className="col-12 col-md-2 mb-3"><small className="fw-bold">Section</small><div className="mt-2 small d-flex flex-row flex-md-column gap-2 overflow-auto" style={{whiteSpace:"nowrap"}}><span onClick={()=>change("All","shop")} style={{cursor:"pointer"}}>All Products</span><span onClick={()=>change("Men","shop")} style={{cursor:"pointer"}}>Men</span><span onClick={()=>change("Women","shop")} style={{cursor:"pointer"}}>Women</span><span onClick={()=>change("Unisex","shop")} style={{cursor:"pointer"}}>Unisex</span><span onClick={()=>change("Sports","sports")} style={{cursor:"pointer"}}>Sports</span><span onClick={()=>change("All","trending")} style={{cursor:"pointer",color:"#FF6A00"}}>Trending</span></div></div><div className="col-12 col-md-10"><small className="mb-3 d-block">{filtered.length} Products • Curated for confidence</small><div className="row g-2">{filtered.map(p=><div key={p.id} className="col-6 col-md-4 col-lg-3"><div className="border h-100 bg-white position-relative"><span className="bg-warning small fw-bold px-2 py-1 m-1 rounded-2 position-absolute" style={{fontSize:9,zIndex:2}}>{p.save}</span><img src={p.img} className="w-100" style={{aspectRatio:"1",objectFit:"cover"}} alt=""/><div className="p-2"><small className="fw-bold d-block" style={{height:32,fontSize:11}}>{p.name}</small><small className="fw-bold">Shs {p.price.toLocaleString()}</small><button onClick={()=>setCart([...cart,p])} className="btn btn-dark w-100 btn-sm rounded-0 mt-2">Add to Cart</button></div></div></div>)}</div><div className="text-center mt-4"><button onClick={()=>change("All","home")} className="btn btn-outline-dark rounded-0">← Back Home</button></div></div></div></div>
          <Footer/>
        </>
      )}

      <style jsx global>{`
        body{overflow-x:hidden}
        @media (max-width:576px){
          .prime-hero .row{ min-height:auto !important; }
          .prime-hero img{ position:relative !important; min-height:60vh !important; }
        }
      `}</style>
    </div>
  );
}
