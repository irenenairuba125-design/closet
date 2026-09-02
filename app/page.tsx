"use client";
import { useState, useMemo } from "react";

const MEN_IMGS = ["photo-1596755094514-f87e34085b2c","photo-1551537482-f2075a1d41f2","photo-1594938298603-c8148c4dae35","photo-1521572163474-6864f9cf17ab","photo-1556821840-3a63f95609a7","photo-1594633312681-425c7b97ccd1"];
const WOMEN_IMGS = ["photo-1595777457583-95e059d581b8","photo-1583496661160-fb5886a0aaaa","photo-1598550476439-6845435fcea5","photo-1490481651871-ab68de25d43d","photo-1591369822096-ffd140ec948f","photo-1541099649105-f69ad21f3246"];
const UNISEX_IMGS = ["photo-1521572163474-6864f9cf17ab","photo-1594633312681-425c7b97ccd1","photo-1556821840-3a63f95609a7","photo-1544923246-77307dd654cb","photo-1591195853828-11db59a44f6b"];
const SPORTS_IMGS = ["photo-1571902943202-507ec2618e8f","photo-1517438476312-10d79c077509","photo-1506629903106-0650d349b7b9","photo-1551537482-f2075a1d41f2","photo-1591195853828-11db59a44f6b"];

const makeProducts = (prefix:string, section:string, gender:string, count:number, imgs:string[]) => {
  return Array.from({length: count}, (_, i) => ({
    id: `${prefix}-${i}`,
    name: `${section} ${["Shirt","Jacket","Trousers","Hoodie","Blazer","Dress","Tee","Coat"][i%8]} ${i+1}`,
    price: 40000 + (i*7000),
    old: 60000 + (i*10000),
    img: `https://images.unsplash.com/${imgs[i%imgs.length]}?w=500`,
    save: `SAVE ${20 + (i%15)}%`,
    gender, section, trending: true
  }));
};

const PRODUCTS = [
  ...makeProducts("M", "Men", "Men", 19, MEN_IMGS),
  ...makeProducts("W", "Women", "Women", 19, WOMEN_IMGS),
  ...makeProducts("U", "Unisex", "Unisex", 19, UNISEX_IMGS),
  ...makeProducts("S", "Sports", "Sports", 19, SPORTS_IMGS),
];

const HOME_BG = "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=1400";
const SPORTS_BG = "https://images.unsplash.com/photo-1517438476312-10d79c077509?w=1200";

export default function Page(){
  const [view, setView] = useState("home");
  const [section, setSection] = useState("All Products");
  const [cart, setCart] = useState<any[]>([]);
  const [email, setEmail] = useState("");

  const filtered = useMemo(()=>{
    if(view==="trending") return PRODUCTS.slice(0, 19);
    if(view==="sports" || section==="Sports") return PRODUCTS.filter(p=>p.section==="Sports").slice(0,19);
    if(section==="All Products") return PRODUCTS.slice(0, 19);
    return PRODUCTS.filter(p=>p.section===section).slice(0,19);
  }, [section, view]);

  const changePage = (sec:string, v:string="shop")=>{
    setSection(sec); setView(v); window.scrollTo(0,0);
  };

  const getHeaderBg = () => {
    if(view==="sports" || section==="Sports"){
      return { backgroundImage: `linear-gradient(rgba(20,40,70,0.75), rgba(20,40,70,0.75)), url(${SPORTS_BG})` };
    }
    // HOME, MEN, WOMEN, UNISEX = SAME BACKGROUND
    return { backgroundImage: `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.45)), url(${HOME_BG})` };
  };

  const getTitle = () => {
    if(view==="sports" || section==="Sports") return "SPORTS";
    if(view==="trending") return "TRENDING NOW";
    if(section==="All Products") return "SHOP COLLECTION";
    return section.toUpperCase();
  };
  const getSub = () => {
    if(view==="sports" || section==="Sports") return "Built For Performance On Every Surface.";
    if(view==="trending") return "The hottest clothes in the store right now.";
    if(section==="Unisex") return "Genderless silhouettes for everyone.";
    return "Premium dresses, shirts, trousers — delivered countrywide.";
  };

  return(
    <div style={{background:"#fff"}}>
      {/* NAV RESPONSIVE */}
      <nav className="d-flex justify-content-between align-items-center px-3 px-md-4 py-3 bg-white sticky-top border-bottom" style={{zIndex:50}}>
        <div className="d-flex align-items-center gap-2" onClick={()=>{changePage("All Products","home");}} style={{cursor:"pointer"}}>
          <div className="bg-black text-white d-flex align-items-center justify-content-center fw-bold" style={{width:"36px", height:"36px", borderRadius:"8px"}}>👗</div>
          <span className="fw-bold d-none d-md-block" style={{fontSize:"11px"}}>IRENE'S CLOSET</span>
        </div>
        <div className="d-flex gap-2 gap-md-4 small fw-bold align-items-center" style={{fontSize:"12px"}}>
          <span onClick={()=>changePage("All Products","shop")} style={{cursor:"pointer"}}>SHOP ▾</span>
          <span onClick={()=>changePage("Men","shop")} style={{cursor:"pointer", borderBottom: section==="Men" && view==="shop"?"2px solid black":"none"}}>MEN</span>
          <span onClick={()=>changePage("Women","shop")} style={{cursor:"pointer", borderBottom: section==="Women"?"2px solid black":"none"}}>WOMEN</span>
          <span className="d-none d-md-block" onClick={()=>changePage("Unisex","shop")} style={{cursor:"pointer"}}>UNISEX</span>
          <span onClick={()=>changePage("Sports","sports")} style={{cursor:"pointer", borderBottom: view==="sports"?"2px solid black":"none"}}>SPORTS</span>
          <span onClick={()=>changePage("All Products","trending")} style={{cursor:"pointer", color:"#FF6A00"}}>TRENDING</span>
        </div>
        <div className="d-flex gap-2"><span>🛒 {cart.length}</span></div>
      </nav>

      {view==="home" && (
        <>
          <div style={{minHeight:"92vh", backgroundImage: `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.4)), url(${HOME_BG})`, backgroundSize:"cover", backgroundPosition:"center"}} className="d-flex flex-column align-items-center justify-content-center text-center p-3">
            <h1 className="fw-bold text-white" style={{fontFamily:"serif", fontSize:"clamp(36px, 9vw, 86px)"}}>IRENE'S CLOSET</h1>
            <p className="text-white mt-2 px-2" style={{maxWidth:"600px", fontSize:"clamp(14px, 2.5vw, 18px)"}}>Premium dresses, shirts, trousers — delivered countrywide.</p>
            <button onClick={()=>changePage("All Products","shop")} className="btn bg-white rounded-pill px-4 px-md-5 py-2 py-md-3 fw-bold mt-3">SHOP COLLECTION</button>
            <div className="mt-4 mt-md-5">
              <small className="text-white" style={{letterSpacing:"4px", fontSize:"10px"}}>SHOP BY DEPARTMENT</small>
              <div className="d-flex gap-2 mt-3 flex-wrap justify-content-center">
                {["MEN","WOMEN","UNISEX","SPORTS"].map(l=>(
                  <button key={l} onClick={()=>changePage(l==="MEN"?"Men":l==="WOMEN"?"Women":l==="SPORTS"?"Sports":"Unisex", l==="SPORTS"?"sports":"shop")} className="btn rounded-pill px-3 py-2 fw-bold" style={{background:"rgba(0,0,0,0.35)", color:"white", border:"1px solid rgba(255,255,255,0.5)", fontSize:"11px"}}>{l}</button>
                ))}
              </div>
            </div>
          </div>

          <div className="container-fluid px-3 px-md-4 py-4 py-md-5">
            <h4 className="fw-bold">Shop By Category</h4>
            <div className="row g-2 g-md-3 mt-2">
              {[
                {name:"Men's Clothes", sec:"Men"},
                {name:"Women's Clothes", sec:"Women"},
                {name:"Unisex", sec:"Unisex"},
                {name:"Sports", sec:"Sports", v:"sports"},
              ].map((c:any)=>(
                <div key={c.name} className="col-6 col-md-3">
                  <div onClick={()=>changePage(c.sec, c.v||"shop")} style={{height:"180px", backgroundImage:`url(${PRODUCTS.find(p=>p.section===c.sec)?.img})`, backgroundSize:"cover", borderRadius:"12px", cursor:"pointer"}} className="position-relative">
                    <div className="position-absolute bottom-0 p-2 p-md-3 w-100" style={{background:"linear-gradient(transparent, rgba(0,0,0,0.7))", borderRadius:"0 0 12px 12px"}}><div className="text-white fw-bold small">{c.name}</div><span className="badge bg-white text-black mt-1" style={{fontSize:"9px"}}>Explore</span></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="container-fluid px-3 px-md-4 py-4">
            <div className="d-flex justify-content-between align-items-center"><div><small style={{letterSpacing:"3px", fontSize:"10px"}}>Fresh Drops</small><h4 className="fw-bold">TRENDING NOW</h4></div><button onClick={()=>changePage("All Products","trending")} className="btn btn-sm btn-outline-dark rounded-0">VIEW ALL</button></div>
            <div className="row g-2 g-md-3 mt-2">{PRODUCTS.slice(0,8).map(p=><div key={p.id} className="col-6 col-md-3"><div className="border"><img src={p.img} className="w-100" style={{aspectRatio:"1", objectFit:"cover"}} alt=""/><div className="p-2"><small className="fw-bold" style={{fontSize:"11px"}}>{p.name}</small><br/><small className="fw-bold">Shs {p.price.toLocaleString()}</small><button onClick={()=>setCart([...cart,p])} className="btn btn-dark w-100 btn-sm rounded-0 mt-2">Add to Cart</button></div></div></div>)}</div>
          </div>
        </>
      )}

      {(view==="shop" || view==="sports" || view==="trending") && (
        <>
          <div className="text-center py-5 d-flex flex-column justify-content-center align-items-center px-3" style={{minHeight:"380px", backgroundSize:"cover", backgroundPosition:"center", ...getHeaderBg()}}>
            <h1 className="fw-bold text-white" style={{fontFamily:"serif", fontSize:"clamp(32px, 7vw, 56px)", letterSpacing:"2px"}}>{getTitle()}</h1>
            <p className="text-white mt-2" style={{fontSize:"clamp(12px, 3vw, 16px)"}}>{getSub()}</p>
          </div>

          <div className="container-fluid px-3 px-md-4 py-3 py-md-4">
            <div className="row">
              <div className="col-12 col-md-2 mb-3">
                <small className="fw-bold">Section</small>
                <div className="mt-2 small d-flex flex-row flex-md-column gap-2 gap-md-2 overflow-auto" style={{whiteSpace:"nowrap"}}>
                  <span onClick={()=>changePage("All Products","shop")} style={{cursor:"pointer", fontWeight:section==="All Products"&&view==="shop"?"bold":""}}>All Products</span>
                  <span onClick={()=>changePage("Men","shop")} style={{cursor:"pointer", fontWeight:section==="Men"&&view==="shop"?"bold":""}}>Men</span>
                  <span onClick={()=>changePage("Women","shop")} style={{cursor:"pointer", fontWeight:section==="Women"?"bold":""}}>Women</span>
                  <span onClick={()=>changePage("Unisex","shop")} style={{cursor:"pointer", fontWeight:section==="Unisex"?"bold":""}}>Unisex</span>
                  <span onClick={()=>changePage("Sports","sports")} style={{cursor:"pointer", fontWeight:view==="sports"?"bold":""}}>Sports</span>
                  <span onClick={()=>changePage("All Products","trending")} style={{cursor:"pointer", fontWeight:view==="trending"?"bold":"", color:"#FF6A00"}}>Trending</span>
                </div>
              </div>
              <div className="col-12 col-md-10">
                <div className="d-flex justify-content-between mb-3"><small>{filtered.length} Products</small><small>Sort by: Newest ▾</small></div>
                <div className="row g-2 g-md-3">
                  {filtered.map(p=>(
                    <div key={p.id} className="col-6 col-md-4 col-lg-3">
                      <div className="border position-relative bg-white h-100">
                        {p.save && <span className="position-absolute top-0 start-0 bg-warning small fw-bold px-2 py-1 m-1 rounded-2" style={{fontSize:"9px", zIndex:2}}>{p.save}</span>}
                        <img src={p.img} className="w-100" style={{aspectRatio:"1", objectFit:"cover"}} alt=""/>
                        <div className="p-2"><small className="fw-bold d-block" style={{height:"30px", fontSize:"11px"}}>{p.name}</small><div className="d-flex gap-1"><small className="fw-bold">Shs {p.price.toLocaleString()}</small></div><button onClick={()=>setCart([...cart,p])} className="btn btn-dark w-100 btn-sm rounded-0 mt-2">Add to Cart</button></div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="text-center mt-4"><button onClick={()=>changePage("All Products","home")} className="btn btn-sm btn-outline-dark rounded-0">← Back Home</button></div>
              </div>
            </div>
          </div>
        </>
      )}

      <div className="mt-4">
        <div className="py-4 py-md-5 text-center" style={{background:"#F6F6F6"}}>
          <h5 className="fw-bold">Join The Club</h5>
          <p className="small text-secondary mx-auto px-3" style={{maxWidth:"500px"}}>Subscribe for exclusive offers and early access.</p>
          <div className="d-flex justify-content-center gap-2 mt-3 px-3"><input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Enter email" className="form-control rounded-pill" style={{maxWidth:"300px"}}/><button onClick={()=>{if(email){alert("Subscribed!"); setEmail("");}}} className="btn btn-dark rounded-pill px-3 px-md-4">Subscribe</button></div>
        </div>
        <div className="container-fluid px-3 px-md-5 py-4 border-top"><div className="row small g-3"><div className="col-12 col-md-3"><div className="fw-bold">👗 IRENE'S CLOSET</div><div className="text-secondary mt-2 small">Premium dresses, shirts, trousers — delivered countrywide.</div></div><div className="col-6 col-md-2"><div className="fw-bold">SHOP</div><div className="mt-2 d-grid gap-1 small"><span onClick={()=>changePage("Men","shop")} style={{cursor:"pointer"}}>Men</span><span onClick={()=>changePage("Women","shop")} style={{cursor:"pointer"}}>Women</span><span onClick={()=>changePage("Unisex","shop")} style={{cursor:"pointer"}}>Unisex</span><span onClick={()=>changePage("Sports","sports")} style={{cursor:"pointer"}}>Sports</span></div></div><div className="col-6 col-md-3"><div className="fw-bold">HELP</div><div className="small mt-2">FAQ<br/>Privacy<br/>Contact</div></div><div className="col-12 col-md-4"><div className="fw-bold">FOLLOW US</div><div className="mt-2 small">© 2026 Irene's Closet</div></div></div></div>
      </div>
    </div>
  );
}
