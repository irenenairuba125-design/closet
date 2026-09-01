"use client";
import { useState, useMemo } from "react";

const ALL_PRODUCTS = [
  { id:1, name:"Black Minimal Dress", price:85000, cat:"Dresses", img:"https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=700", stock:2 },
  { id:2, name:"Beige Linen Trousers", price:75000, cat:"Trousers", img:"https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=700", stock:5 },
  { id:3, name:"White Oversized Shirt", price:55000, cat:"Shirts", img:"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=700", stock:15 },
  { id:4, name:"Cotton Tee", price:35000, cat:"T-Shirts", img:"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=700", stock:20 },
  { id:5, name:"Denim Jacket", price:120000, cat:"Jackets", img:"https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=700", stock:3 },
  { id:6, name:"Silk Slip Dress", price:95000, cat:"Dresses", img:"https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=700", stock:8 },
  { id:7, name:"Black Formal Trousers", price:80000, cat:"Trousers", img:"https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=700", stock:10 },
  { id:8, name:"Graphic T-Shirt", price:40000, cat:"T-Shirts", img:"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=700", stock:25 },
];

const SHIPPING_ZONES = [
  { id:1, area:"Central Kampala", fee:5000, days:"Same day" },
  { id:2, area:"Makindye, Kansanga", fee:10000, days:"24h" },
  { id:3, area:"Ntinda, Kisaasi", fee:10000, days:"24h" },
  { id:4, area:"Outside Kampala", fee:20000, days:"2-3 days" },
];

export default function Page() {
  const [mainView, setMainView] = useState("login");
  const [adminTab, setAdminTab] = useState("dashboard");
  const [products] = useState(ALL_PRODUCTS);
  const [orders, setOrders] = useState([
    { id: "ORD-123456", customer: "John Doe", total: 95000, status: "PAID" },
    { id: "ORD-123457", customer: "Sarah K.", total: 120000, status: "PROCESSING" },
  ]);
  const [customers, setCustomers] = useState<any[]>([
    { id:1, name:"John Doe", phone:"772123456", email:"john@gmail.com", orders:1 },
    { id:2, name:"Sarah K.", phone:"701987654", email:"sarah@gmail.com", orders:2 },
  ]);
  const [cart, setCart] = useState<any[]>([]);
  const [shipping, setShipping] = useState(SHIPPING_ZONES[0]);
  const [user, setUser] = useState<any>(null);
  const [loginForm, setLoginForm] = useState({ name:"", phone:"", email:"" });
  const [search, setSearch] = useState("");

  const filtered = useMemo(()=> products.filter(p=> p.name.toLowerCase().includes(search.toLowerCase())), [search, products]);
  const handleLogin = () => {
    if(!loginForm.name ||!loginForm.phone ||!loginForm.email) return alert("Please fill all fields");
    const newUser = { id: Date.now(),...loginForm };
    setUser(newUser);
    setCustomers([...customers, { id: Date.now(), name: loginForm.name, phone: loginForm.phone, email: loginForm.email, orders: 0 }]);
    setMainView("home");
  };
  const cartTotal = cart.reduce((a,b)=>a+b.price,0);
  const finalTotal = cartTotal + (cart.length? shipping.fee : 0);
  const salesData = [
    { month: "Jan", sales: 450000 }, { month: "Feb", sales: 680000 },
    { month: "Mar", sales: 520000 }, { month: "Apr", sales: 890000 },
    { month: "May", sales: orders.reduce((a,b)=>a+b.total,0) },
  ];
  const maxSale = Math.max(...salesData.map(d=>d.sales));

  return (
    <div style={{background:"#FFFEFB", minHeight:"100vh"}}>
      <nav className="navbar bg-white border-bottom px-3 py-2 sticky-top">
        <span className="fw-bold" style={{letterSpacing:"6px"}}>IRENE'S CLOSET.</span>
        <div className="d-flex gap-1">
          <input className="form-control form-control-sm rounded-0" placeholder="Search" value={search} onChange={e=>setSearch(e.target.value)} style={{width:"120px"}}/>
          {user && <><button onClick={()=>setMainView("home")} className="btn btn-sm btn-dark rounded-0">Home</button><button onClick={()=>setMainView("cart")} className="btn btn-sm btn-dark rounded-0">Cart({cart.length})</button></>}
          <button onClick={()=>{setMainView("admin"); setAdminTab("dashboard");}} className="btn btn-sm btn-outline-dark rounded-0">Admin</button>
        </div>
      </nav>

      {mainView==="login" && (
        <div className="d-flex align-items-center" style={{minHeight:"92vh", background:"linear-gradient(135deg, #000000 0%, #2D2D2D 50%, #C8B6A6 100%)"}}>
          <div className="container"><div className="row justify-content-center g-4">
            <div className="col-md-5 text-white p-4">
              <div className="border border-white d-inline-block px-3 py-1 mb-3" style={{fontSize:"11px", letterSpacing:"3px"}}>EST. 2024 • KAMPALA</div>
              <h1 className="display-4 fw-bold">IRENE'S<br/><span style={{color:"#C8B6A6"}}>CLOSET.</span></h1>
              <p className="mt-3 text-white-50">Minimal essentials curated by Irene. Same day delivery in Kampala.</p>
            </div>
            <div className="col-md-5"><div className="bg-white p-4 shadow-lg">
              <h3 className="fw-bold text-center" style={{letterSpacing:"5px"}}>LOGIN</h3>
              <p className="text-secondary small text-center">Name + Phone + Email</p>
              <div className="mb-2"><label className="small fw-bold">FULL NAME *</label><input className="form-control rounded-0 py-2" value={loginForm.name} onChange={e=>setLoginForm({...loginForm, name:e.target.value})}/></div>
              <div className="mb-2"><label className="small fw-bold">PHONE *</label><div className="input-group"><span className="input-group-text bg-black text-white rounded-0">+256</span><input className="form-control rounded-0 py-2" value={loginForm.phone} onChange={e=>setLoginForm({...loginForm, phone:e.target.value})}/></div></div>
              <div className="mb-3"><label className="small fw-bold">EMAIL *</label><input className="form-control rounded-0 py-2" value={loginForm.email} onChange={e=>setLoginForm({...loginForm, email:e.target.value})}/></div>
              <button onClick={handleLogin} className="btn btn-dark w-100 rounded-0 py-2 fw-bold">LOGIN →</button>
            </div></div>
          </div></div>
        </div>
      )}

      {user && mainView==="home" && (
        <div className="container py-4">
          <div className="bg-black text-white p-3 mb-3"><h4 className="mb-0">WELCOME {user.name.toUpperCase()}</h4><small>{user.email} | +256 {user.phone}</small></div>
          <div className="row g-3">{filtered.map(p=><div key={p.id} className="col-6 col-md-3"><div className="card border-0 shadow-sm"><img src={p.img} className="w-100" style={{aspectRatio:"3/4", objectFit:"cover"}} alt=""/><div className="card-body p-2"><h6 className="fw-bold small">{p.name}</h6><div className="d-flex justify-content-between align-items-center"><span className="fw-bold small">UGX {p.price.toLocaleString()}</span><button onClick={()=>setCart([...cart, p])} className="btn btn-dark btn-sm rounded-0">Add</button></div></div></div></div>)}</div>
        </div>
      )}

      {user && mainView==="cart" && (
        <div className="container py-4"><h4>Cart ({cart.length})</h4><div className="row g-3 mt-2"><div className="col-md-8">{cart.map((p,i)=><div key={i} className="border p-2 mb-2 bg-white d-flex gap-2"><img src={p.img} style={{width:"60px", height:"80px", objectFit:"cover"}}/><div className="flex-fill d-flex justify-content-between"><div><h6 className="small">{p.name}</h6><small>UGX {p.price}</small></div><button onClick={()=>setCart(cart.filter((_,idx)=>idx!==i))} className="btn btn-sm btn-outline-danger rounded-0">X</button></div></div>)}</div><div className="col-md-4"><div className="bg-white border p-3"><select className="form-select rounded-0" value={shipping.id} onChange={e=>setShipping(SHIPPING_ZONES.find(z=>z.id===Number(e.target.value))!)}>{SHIPPING_ZONES.map(z=><option key={z.id} value={z.id}>{z.area} - {z.fee} UGX</option>)}</select><div className="d-flex justify-content-between fw-bold mt-3"><span>Total</span><span>UGX {finalTotal}</span></div><button onClick={()=>{alert(`Order for ${user.name} placed!`); setCart([]); setMainView("home");}} className="btn btn-dark w-100 rounded-0 mt-3">PAY NOW</button></div></div></div></div>
      )}

      {mainView==="admin" && (
        <div className="container-fluid p-3"><div className="row"><div className="col-md-2"><div className="bg-white border p-2 d-grid gap-2"><button onClick={()=>setAdminTab("dashboard")} className={`btn rounded-0 ${adminTab==="dashboard"?"btn-dark":"btn-outline-dark"}`}>Dashboard</button><button onClick={()=>setAdminTab("charts")} className={`btn rounded-0 ${adminTab==="charts"?"btn-dark":"btn-outline-dark"}`}>📊 Charts</button><button onClick={()=>setAdminTab("customers")} className={`btn rounded-0 ${adminTab==="customers"?"btn-dark":"btn-outline-dark"}`}>👥 Customers ({customers.length})</button></div></div><div className="col-md-10">
          {adminTab==="dashboard" && (<><div className="row g-2 mb-3"><div className="col-4"><div className="bg-white border p-3"><h3>{products.length}</h3><small>Products</small></div></div><div className="col-4"><div className="bg-black text-white p-3"><h3>{orders.length}</h3><small>Orders</small></div></div><div className="col-4"><div className="bg-white border p-3"><h3>{customers.length}</h3><small>Customers</small></div></div></div><div className="bg-white border p-3"><table className="table"><thead className="table-dark"><tr><th>ID</th><th>Customer</th><th>Total</th><th>Status</th></tr></thead><tbody>{orders.map(o=><tr key={o.id}><td>{o.id}</td><td>{o.customer}</td><td>{o.total}</td><td>{o.status}</td></tr>)}</tbody></table></div></>)}
          {adminTab==="charts" && (<div className="bg-white border p-3"><h5 className="fw-bold">📊 Monthly Sales</h5><div className="d-flex align-items-end gap-2 mt-4" style={{height:"200px"}}>{salesData.map(d=><div key={d.month} className="flex-fill text-center"><div className="bg-black mx-auto" style={{height:`${(d.sales/maxSale)*150}px`, width:"70%"}}></div><small className="d-block mt-2">{d.month}</small></div>)}</div></div>)}
          {adminTab==="customers" && (<div className="bg-white border p-3"><h5>👥 Customers - Your Beautiful List</h5><table className="table mt-3"><thead className="table-dark"><tr><th>Name</th><th>Phone</th><th>Email</th></tr></thead><tbody>{customers.map(c=><tr key={c.id}><td className="fw-bold">{c.name}</td><td>+256 {c.phone}</td><td>{c.email}</td></tr>)}</tbody></table><div className="bg-black text-white p-2 mt-3"><small>Current login: {user? `${user.name} - +256${user.phone}` : "Guest Admin"}</small></div></div>)}
        </div></div></div>
      )}
    </div>
  );
}
