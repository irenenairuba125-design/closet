"use client";
import { useState, useMemo } from "react";

const ALL_PRODUCTS = [
  { id:1, name:"Black Minimal Dress", price:85000, cat:"Dresses", category:"Dresses", img:"https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=700", stock:2, brand:"Irene", material:"Cotton", reviews:[] },
  { id:2, name:"Beige Linen Trousers", price:75000, cat:"Trousers", category:"Trousers", img:"https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=700", stock:5, brand:"Irene", material:"Linen", reviews:[] },
  { id:3, name:"White Oversized Shirt", price:55000, cat:"Shirts", category:"Shirts", img:"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=700", stock:15, brand:"Irene", material:"Cotton", reviews:[] },
  { id:4, name:"Cotton Tee", price:35000, cat:"T-Shirts", category:"T-Shirts", img:"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=700", stock:20, brand:"Irene", material:"Cotton", reviews:[] },
  { id:5, name:"Denim Jacket", price:120000, cat:"Jackets", category:"Jackets", img:"https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=700", stock:3, brand:"Irene", material:"Denim", reviews:[] },
  { id:6, name:"Silk Slip Dress", price:95000, cat:"Dresses", category:"Dresses", img:"https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=700", stock:8, brand:"Irene", material:"Silk", reviews:[] },
  { id:7, name:"Black Formal Trousers", price:80000, cat:"Trousers", category:"Trousers", img:"https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=700", stock:10, brand:"Irene", material:"Polyester", reviews:[] },
  { id:8, name:"Graphic T-Shirt", price:40000, cat:"T-Shirts", category:"T-Shirts", img:"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=700", stock:25, brand:"Irene", material:"Cotton", reviews:[] },
];

const SHIPPING_ZONES = [
  { id:1, area:"Central Kampala", fee:5000, days:"Same day" },
  { id:2, area:"Makindye, Kansanga", fee:10000, days:"24h" },
  { id:3, area:"Ntinda, Kisaasi", fee:10000, days:"24h" },
  { id:4, area:"Outside Kampala", fee:20000, days:"2-3 days" },
];

const initialOrders = [
  { id: "ORD-123456", customer: "John Doe", total: 95000, status: "PAID" },
  { id: "ORD-123457", customer: "Sarah K.", total: 120000, status: "PROCESSING" },
];

export default function Page() {
  const [mainView, setMainView] = useState("login");
  const [adminTab, setAdminTab] = useState("dashboard");
  const [products] = useState(ALL_PRODUCTS);
  const [orders, setOrders] = useState(initialOrders);
  const [customers, setCustomers] = useState<any[]>([
    { id:1, name:"John Doe", phone:"772123456", email:"john@gmail.com", orders:1 },
    { id:2, name:"Sarah K.", phone:"701987654", email:"sarah@gmail.com", orders:2 },
  ]);
  const [cart, setCart] = useState<any[]>([]);
  const [shipping, setShipping] = useState(SHIPPING_ZONES[0]);
  const [user, setUser] = useState<any>(null);
  const [loginForm, setLoginForm] = useState({ name:"", phone:"", email:"" });
  const [search, setSearch] = useState("");

  const filtered = useMemo(()=> products.filter(p=> p.name.toLowerCase().includes(search.toLowerCase()) || p.cat.toLowerCase().includes(search.toLowerCase())), [search, products]);
  const handleLogin = () => {
    if(!loginForm.name ||!loginForm.phone ||!loginForm.email) return alert("Please fill Name, Phone, Email");
    const newUser = { id: Date.now(),...loginForm };
    setUser(newUser);
    setCustomers([...customers, { id: Date.now(), name: loginForm.name, phone: loginForm.phone, email: loginForm.email, orders: 0 }]);
    setMainView("home");
  };
  const cartTotal = cart.reduce((a,b)=>a+b.price,0);
  const finalTotal = cartTotal + (cart.length? shipping.fee : 0);
  const salesData = [
    { month: "Jan", sales: 450000 },
    { month: "Feb", sales: 680000 },
    { month: "Mar", sales: 520000 },
    { month: "Apr", sales: 890000 },
    { month: "May", sales: orders.reduce((a,b)=>a+b.total,0) },
  ];
  const maxSale = Math.max(...salesData.map(d=>d.sales));

  return (
    <div style={{background:"#FFFEFB", minHeight:"100vh"}}>
      <nav className="navbar bg-white border-bottom px-3 py-2 sticky-top">
        <span className="fw-bold" style={{letterSpacing:"6px", cursor:"pointer"}} onClick={()=> user && setMainView("home")}>IRENE'S CLOSET.</span>
        <div className="d-flex gap-1 align-items-center">
          <input className="form-control form-control-sm rounded-0" placeholder="Search" value={search} onChange={e=>setSearch(e.target.value)} style={{width:"150px"}}/>
          {user && <><button onClick={()=>setMainView("home")} className="btn btn-sm btn-dark rounded-0">Home</button><button onClick={()=>setMainView("cart")} className="btn btn-sm btn-dark rounded-0">Cart({cart.length})</button></>}
          {user? <span className="btn btn-sm btn-dark rounded-0">Hi {user.name.split(" ")[0]}</span> : null}
          <button onClick={()=>{setMainView("admin"); setAdminTab("dashboard");}} className="btn btn-sm btn-outline-dark rounded-0">Admin</button>
        </div>
      </nav>

      {mainView==="login" && (
        <div className="d-flex justify-content-center align-items-center" style={{minHeight:"92vh", background:"linear-gradient(135deg, #000000 0%, #2D2D2D 50%, #C8B6A6 100%)"}}>
          <div className="container"><div className="row justify-content-center align-items-center g-4">
            <div className="col-md-5 text-white p-5">
              <div className="border border-white d-inline-block px-3 py-1 mb-4" style={{letterSpacing:"4px", fontSize:"11px"}}>EST. 2024 • KAMPALA</div>
              <h1 className="display-4 fw-bold" style={{lineHeight:"0.9"}}>IRENE'S<br/><span style={{color:"#C8B6A6"}}>CLOSET.</span></h1>
              <p className="mt-4" style={{color:"#ccc", fontSize:"18px"}}>Minimal essentials curated by Irene in Kampala. Login to shop dresses, trousers, tees.</p>
            </div>
            <div className="col-md-5"><div className="bg-white p-5 shadow-lg">
              <div className="text-center mb-4"><h3 className="fw-bold" style={{letterSpacing:"6px"}}>LOGIN</h3><p className="text-secondary small">Enter Name + Phone + Email to continue</p></div>
              <div className="mb-3"><label className="small fw-bold">FULL NAME *</label><input className="form-control rounded-0 py-3" placeholder="Sarah Nakato" value={loginForm.name} onChange={e=>setLoginForm({...loginForm, name:e.target.value})}/></div>
              <div className="mb-3"><label className="small fw-bold">PHONE NUMBER *</label><div className="input-group"><span className="input-group-text bg-black text-white rounded-0">+256</span><input className="form-control rounded-0 py-3" placeholder="771234567" value={loginForm.phone} onChange={e=>setLoginForm({...loginForm, phone:e.target.value})}/></div></div>
              <div className="mb-4"><label className="small fw-bold">EMAIL *</label><input className="form-control rounded-0 py-3" placeholder="sarah@gmail.com" value={loginForm.email} onChange={e=>setLoginForm({...loginForm, email:e.target.value})}/></div>
              <button onClick={handleLogin} className="btn btn-dark w-100 rounded-0 py-3 fw-bold" style={{letterSpacing:"2px"}}>LOGIN →</button>
            </div></div>
          </div></div>
        </div>
      )}

      {user && mainView==="home" && (
        <div className="container py-4">
          <div className="bg-black text-white p-4 mb-4 d-flex justify-content-between align-items-center"><div><h2 className="mb-0">WELCOME {user.name.toUpperCase()}</h2><small>{user.email} | +256 {user.phone}</small></div></div>
          <div className="row g-3">
            {filtered.map(p=><div key={p.id} className="col-6 col-md-3"><div className="card border-0 shadow-sm h-100"><div className="position-relative"><img src={p.img} className="w-100" style={{aspectRatio:"3/4", objectFit:"cover"}} alt=""/><span className="position-absolute top-0 start-0 bg-black text-white px-2 py-1" style={{fontSize:"10px"}}>{p.cat}</span>{p.stock<5 && <span className="position-absolute bottom-0 start-0 bg-danger text-white w-100 text-center py-1" style={{fontSize:"10px"}}>LOW STOCK: {p.stock} LEFT</span>}</div><div className="card-body"><h6 className="fw-bold">{p.name}</h6><div className="d-flex justify-content-between align-items-center mt-2"><span className="fw-bold">UGX {p.price.toLocaleString()}</span><button onClick={()=>setCart([...cart, p])} className="btn btn-dark btn-sm rounded-0">Add</button></div></div></div></div>)}
          </div>
        </div>
      )}

      {user && mainView==="cart" && (
        <div className="container py-4"><h3>Cart ({cart.length}) - {user.name}</h3><div className="row g-4 mt-1"><div className="col-md-8">{cart.map((p,i)=><div key={i} className="border p-3 mb-2 bg-white d-flex gap-3"><img src={p.img} style={{width:"70px", height:"90px", objectFit:"cover"}}/><div className="flex-fill d-flex justify-content-between"><div><h6>{p.name}</h6><small>UGX {p.price.toLocaleString()}</small></div><button onClick={()=>setCart(cart.filter((_,idx)=>idx!==i))} className="btn btn-sm btn-outline-danger rounded-0">Remove</button></div></div>)}{cart.length===0 && <p>Cart empty - <button onClick={()=>setMainView("home")} className="btn btn-dark rounded-0">Shop Now</button></p>}</div><div className="col-md-4"><div className="bg-white border p-4"><h5>Summary</h5><select className="form-select rounded-0 mt-3" value={shipping.id} onChange={e=>setShipping(SHIPPING_ZONES.find(z=>z.id===Number(e.target.value))!)}>{SHIPPING_ZONES.map(z=><option key={z.id} value={z.id}>{z.area} - {z.fee} UGX</option>)}</select><hr/><div className="d-flex justify-content-between fw-bold mt-2"><span>Total</span><span>UGX {finalTotal.toLocaleString()}</span></div><button onClick={()=>{alert(`Order for ${user.name} - UGX ${finalTotal} placed!`); setCart([]); setMainView("home");}} className="btn btn-dark w-100 rounded-0 mt-3 py-3">PAY NOW</button></div></div></div></div>
      )}

      {mainView==="admin" && (
        <div className="container-fluid px-4 py-4"><div className="row"><div className="col-md-2 mb-4"><div className="bg-white border p-3"><small className="text-secondary fw-bold">ADMIN MENU</small><div className="d-grid gap-2 mt-3"><button onClick={()=>setAdminTab("dashboard")} className={`btn rounded-0 text-start ${adminTab==="dashboard"?"btn-dark":"btn-outline-dark"}`}>Dashboard</button><button onClick={()=>setAdminTab("charts")} className={`btn rounded-0 text-start ${adminTab==="charts"?"btn-dark":"btn-outline-dark"}`}>📊 Charts</button><button onClick={()=>setAdminTab("customers")} className={`btn rounded-0 text-start ${adminTab==="customers"?"btn-dark":"btn-outline-dark"}`}>👥 Customers ({customers.length})</button></div></div></div><div className="col-md-10">
          {adminTab==="dashboard" && (<><div className="row g-3 mb-4"><div className="col-6 col-lg-3"><div className="bg-white border p-4"><small>TOTAL PRODUCTS</small><h2>{products.length}</h2></div></div><div className="col-6 col-lg-3"><div className="bg-black text-white p-4"><small>TOTAL ORDERS</small><h2>{orders.length}</h2></div></div><div className="col-6 col-lg-3"><div className="bg-white border p-4"><small>CUSTOMERS</small><h2>{customers.length}</h2></div></div></div><div className="bg-white border p-4"><table className="table"><thead className="table-dark"><tr><th>ID</th><th>Customer</th><th>Total</th><th>Status</th></tr></thead><tbody>{orders.map(o=><tr key={o.id}><td>{o.id}</td><td>{o.customer}</td><td>UGX {o.total.toLocaleString()}</td><td><span className="badge bg-dark">{o.status}</span></td></tr>)}</tbody></table></div></>)}
          {adminTab==="charts" && (<div><h3 className="fw-bold mb-4">📊 Charts - Beautify</h3><div className="bg-white border p-4"><h6 className="fw-bold mb-4">MONTHLY SALES</h6><div className="d-flex align-items-end gap-2" style={{height:"250px"}}>{salesData.map(d=>(<div key={d.month} className="flex-fill text-center"><div className="bg-black mx-auto" style={{height:`${(d.sales/maxSale)*180}px`, minHeight:"20px", width:"60%"}}></div><small className="fw-bold d-block mt-2">{d.month}</small></div>))}</div></div></div>)}
          {adminTab==="customers" && (<div className="bg-white border p-4"><h4 className="fw-bold">👥 Customers ({customers.length})</h4><table className="table mt-3"><thead className="table-dark"><tr><th>Name</th><th>Phone</th><th>Email</th></tr></thead><tbody>{customers.map(c=><tr key={c.id}><td className="fw-bold">{c.name}</td><td>+256 {c.phone}</td><td>{c.email}</td></tr>)}</tbody></table></div>)}
        </div></div></div>
      )}
    </div>
  );
}
