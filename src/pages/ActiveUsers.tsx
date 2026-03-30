import { useState, useCallback, useRef, useEffect } from "react";
import { Search, Phone, Mail, UserPlus, X, Wifi, WifiOff, ChevronDown, Monitor, ChevronUp, ChevronsUpDown } from "lucide-react";

// ── Types ────────────────────────────────────────────────────────────────────
type DeviceType = "High" | "Average" | "Low";

interface Device {
  deviceId: string;
  version: string;
  type: DeviceType;
}

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: "online" | "offline";
  avatar: string;
  lastActive: Date;
  device: Device;
}

type FilterType = "all" | "online" | "offline";
type SortKey = "name" | "status" | "device";

// ── Seed Data ────────────────────────────────────────────────────────────────
const SEED_USERS: User[] = [
  { id:"USR001",name:"John Doe",          email:"john.doe@smartguide.com",          phone:"+63 912 345 6789",status:"online", avatar:"JD",lastActive:new Date(Date.now()-2*60000),    device:{deviceId:"SGD-1001",version:"2.1.0",type:"High"} },
  { id:"USR002",name:"Jane Smith",         email:"jane.smith@smartguide.com",         phone:"+63 917 234 5678",status:"online", avatar:"JS",lastActive:new Date(Date.now()-5*60000),    device:{deviceId:"SGD-1002",version:"1.8.3",type:"Average"} },
  { id:"USR003",name:"Mike Johnson",       email:"mike.johnson@smartguide.com",       phone:"+63 905 876 5432",status:"offline",avatar:"MJ",lastActive:new Date(Date.now()-2*3600000), device:{deviceId:"SGD-1003",version:"3.0.1",type:"High"} },
  { id:"USR004",name:"Sarah Williams",     email:"sarah.williams@smartguide.com",     phone:"+63 919 111 2233",status:"online", avatar:"SW",lastActive:new Date(Date.now()-60000),     device:{deviceId:"SGD-1004",version:"1.5.7",type:"Low"} },
  { id:"USR005",name:"Robert Brown",       email:"robert.brown@smartguide.com",       phone:"+63 918 999 0011",status:"offline",avatar:"RB",lastActive:new Date(Date.now()-6*3600000), device:{deviceId:"SGD-1005",version:"2.4.2",type:"Average"} },
  { id:"USR006",name:"Emily Davis",        email:"emily.davis@smartguide.com",        phone:"+63 906 321 9876",status:"online", avatar:"ED",lastActive:new Date(Date.now()-10*60000),  device:{deviceId:"SGD-1006",version:"2.0.0",type:"High"} },
  { id:"USR007",name:"Alex Martinez",      email:"alex.martinez@smartguide.com",      phone:"+63 921 654 3210",status:"offline",avatar:"AM",lastActive:new Date(Date.now()-12*3600000),device:{deviceId:"SGD-1007",version:"1.3.5",type:"Low"} },
  { id:"USR008",name:"Linda Walker",       email:"linda.walker@smartguide.com",       phone:"+63 909 456 7890",status:"online", avatar:"LW",lastActive:new Date(Date.now()-3*60000),   device:{deviceId:"SGD-1008",version:"3.1.2",type:"High"} },
  { id:"USR009",name:"David Rodriguez",    email:"david.rodriguez@smartguide.com",    phone:"+63 916 789 0123",status:"online", avatar:"DR",lastActive:new Date(Date.now()-4*60000),   device:{deviceId:"SGD-1009",version:"2.2.4",type:"Average"} },
  { id:"USR010",name:"Jennifer Taylor",    email:"jennifer.taylor@smartguide.com",    phone:"+63 922 012 3456",status:"offline",avatar:"JT",lastActive:new Date(Date.now()-8*3600000), device:{deviceId:"SGD-1010",version:"1.9.0",type:"Average"} },
  { id:"USR011",name:"Christopher Lee",    email:"christopher.lee@smartguide.com",    phone:"+63 913 345 6780",status:"online", avatar:"CL",lastActive:new Date(Date.now()-7*60000),   device:{deviceId:"SGD-1011",version:"2.6.1",type:"High"} },
  { id:"USR012",name:"Maria Anderson",     email:"maria.anderson@smartguide.com",     phone:"+63 907 890 1234",status:"online", avatar:"MA",lastActive:new Date(Date.now()-15*60000),  device:{deviceId:"SGD-1012",version:"1.4.8",type:"Low"} },
  { id:"USR013",name:"James Thomas",       email:"james.thomas@smartguide.com",       phone:"+63 920 567 8901",status:"offline",avatar:"JT",lastActive:new Date(Date.now()-4*3600000), device:{deviceId:"SGD-1013",version:"2.3.3",type:"Average"} },
  { id:"USR014",name:"Patricia Jackson",   email:"patricia.jackson@smartguide.com",   phone:"+63 915 234 5679",status:"online", avatar:"PJ",lastActive:new Date(Date.now()-60000),     device:{deviceId:"SGD-1014",version:"3.2.0",type:"High"} },
  { id:"USR015",name:"Michael White",      email:"michael.white@smartguide.com",      phone:"+63 908 901 2345",status:"offline",avatar:"MW",lastActive:new Date(Date.now()-10*3600000),device:{deviceId:"SGD-1015",version:"1.7.6",type:"Low"} },
  { id:"USR016",name:"Nancy Lewis",        email:"nancy.lewis@smartguide.com",        phone:"+63 914 678 9012",status:"online", avatar:"NL",lastActive:new Date(Date.now()-6*60000),   device:{deviceId:"SGD-1016",version:"2.5.9",type:"Average"} },
  { id:"USR017",name:"Daniel Martin",      email:"daniel.martin@smartguide.com",      phone:"+63 923 456 7891",status:"online", avatar:"DM",lastActive:new Date(Date.now()-2*60000),   device:{deviceId:"SGD-1017",version:"3.0.7",type:"High"} },
  { id:"USR018",name:"Sandra Thompson",    email:"sandra.thompson@smartguide.com",    phone:"+63 911 123 4568",status:"offline",avatar:"ST",lastActive:new Date(Date.now()-14*3600000),device:{deviceId:"SGD-1018",version:"1.6.2",type:"Low"} },
  { id:"USR019",name:"Kevin Clark",        email:"kevin.clark@smartguide.com",        phone:"+63 918 890 1235",status:"online", avatar:"KC",lastActive:new Date(Date.now()-8*60000),   device:{deviceId:"SGD-1019",version:"2.8.4",type:"High"} },
  { id:"USR020",name:"Lisa Lewis",         email:"lisa.lewis@smartguide.com",         phone:"+63 905 567 8902",status:"offline",avatar:"LL",lastActive:new Date(Date.now()-9*3600000), device:{deviceId:"SGD-1020",version:"1.2.1",type:"Low"} },
];

const GRADIENTS = [
  "linear-gradient(135deg,#667eea,#764ba2)","linear-gradient(135deg,#f093fb,#f5576c)",
  "linear-gradient(135deg,#4facfe,#00f2fe)","linear-gradient(135deg,#43e97b,#38f9d7)",
  "linear-gradient(135deg,#fa709a,#fee140)","linear-gradient(135deg,#a18cd1,#fbc2eb)",
  "linear-gradient(135deg,#fda085,#f6d365)","linear-gradient(135deg,#84fab0,#8fd3f4)",
];
const avatarGrad = (id: string) => GRADIENTS[parseInt(id.replace(/\D/g,""),10) % GRADIENTS.length];
const fmtAgo = (date: Date) => {
  const d=Date.now()-date.getTime(),m=Math.floor(d/60000),h=Math.floor(d/3600000);
  if(m<1)return"Just now"; if(m<60)return`${m}m ago`; if(h<24)return`${h}h ago`;
  return`${Math.floor(d/86400000)}d ago`;
};
const mkAvatar = (name: string) => name.split(" ").map(n=>n[0]?.toUpperCase()??"").slice(0,2).join("");

const typeColor: Record<DeviceType, { bg: string; text: string }> = {
  High:    { bg:"rgba(18,184,134,0.15)", text:"#12b886" },
  Average: { bg:"rgba(251,191,36,0.15)", text:"#fbbf24" },
  Low:     { bg:"rgba(239,68,68,0.15)",  text:"#ef4444" },
};

// ── Add User Modal ─────────────────────────────────────────────────────────
interface AddModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (u: Omit<User,"lastActive">) => string | null;
}
function AddModal({ isOpen, onClose, onSubmit }: AddModalProps) {
  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [phone,setPhone]=useState("");
  const [status,setStatus]=useState<"online"|"offline">("online");
  const [deviceId,setDeviceId]=useState("");
  const [version,setVersion]=useState("");
  const [deviceType,setDeviceType]=useState<DeviceType>("Average");
  const [err,setErr]=useState("");
  const ref = useRef<HTMLInputElement>(null);

  useEffect(()=>{
    if(isOpen){
      setName("");setEmail("");setPhone("");setStatus("online");
      setDeviceId("");setVersion("");setDeviceType("Average");setErr("");
      setTimeout(()=>ref.current?.focus(),80);
    }
  },[isOpen]);

  if(!isOpen)return null;

  const handle = () => {
    if(!name.trim()) return setErr("Full name is required.");
    if(!email.trim()||!email.includes("@")) return setErr("Please enter a valid email.");
    if(!deviceId.trim()) return setErr("Device ID is required.");
    if(!version.trim()) return setErr("Device version is required.");
    const newId = `USR${String(Math.floor(Math.random()*9000)+1000)}`;
    const e = onSubmit({
      id:newId, name:name.trim(), email:email.trim(),
      phone:phone.trim()||"—", status, avatar:mkAvatar(name.trim()),
      device:{ deviceId:deviceId.trim(), version:version.trim(), type:deviceType }
    });
    if(e){ setErr(e); return; }
    onClose();
  };

  const iS = { background:"#0d1117", border:"1px solid rgba(255,255,255,0.08)" };
  const iC = "w-full px-3 py-2 rounded-xl text-sm text-white placeholder-white/30 outline-none transition-all focus:border-red-500/60 focus:ring-1 focus:ring-red-500/20";

  return(<>
    <div className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm" onClick={onClose} style={{animation:"aufade .15s ease"}}/>
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[201] w-full max-w-md rounded-2xl overflow-hidden shadow-2xl" style={{background:"#161b22",border:"1px solid rgba(255,255,255,0.1)",animation:"aumodal .2s cubic-bezier(.34,1.56,.64,1)"}}>
      <div className="flex items-center justify-between px-5 py-4 border-b" style={{borderColor:"rgba(255,255,255,0.08)",background:"#0d1117"}}>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-red-500/20 flex items-center justify-center"><UserPlus size={14} className="text-red-400"/></div>
          <span className="text-sm font-bold text-white">Add New User</span>
        </div>
        <button onClick={onClose} className="w-7 h-7 rounded-lg flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all"><X size={14}/></button>
      </div>

      <div className="p-5 flex flex-col gap-3">
        <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest">User Info</p>
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-bold text-white/50 uppercase tracking-wider">Full Name <span className="text-red-400">*</span></label>
          <input ref={ref} className={iC} style={iS} placeholder="e.g. Alex Johnson" value={name} onChange={e=>setName(e.target.value)}/>
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-bold text-white/50 uppercase tracking-wider">Email <span className="text-red-400">*</span></label>
          <input className={iC} style={iS} type="email" placeholder="user@smartguide.com" value={email} onChange={e=>setEmail(e.target.value)}/>
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-bold text-white/50 uppercase tracking-wider">Phone</label>
          <input className={iC} style={iS} placeholder="+63 9XX XXX XXXX" value={phone} onChange={e=>setPhone(e.target.value)}/>
        </div>

        <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest mt-1">Device Info</p>
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold text-white/50 uppercase tracking-wider">Device ID <span className="text-red-400">*</span></label>
            <input className={iC} style={iS} placeholder="e.g. SGD-2001" value={deviceId} onChange={e=>setDeviceId(e.target.value)}/>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold text-white/50 uppercase tracking-wider">Version <span className="text-red-400">*</span></label>
            <input className={iC} style={iS} placeholder="e.g. 2.0.0" value={version} onChange={e=>setVersion(e.target.value)}/>
          </div>
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-bold text-white/50 uppercase tracking-wider">Device Quality</label>
          <div className="flex gap-2">
            {(["High","Average","Low"] as DeviceType[]).map(t=>(
              <button key={t} onClick={()=>setDeviceType(t)} className="flex-1 py-2 rounded-xl text-xs font-bold transition-all"
                style={{background:deviceType===t?typeColor[t].bg:"rgba(255,255,255,0.05)",border:`1px solid ${deviceType===t?typeColor[t].text+"60":"rgba(255,255,255,0.08)"}`,color:deviceType===t?typeColor[t].text:"rgba(255,255,255,0.4)"}}>
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-bold text-white/50 uppercase tracking-wider">Status</label>
          <div className="flex gap-2">
            {(["online","offline"] as const).map(s=>(
              <button key={s} onClick={()=>setStatus(s)} className="flex-1 py-2 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2"
                style={{background:status===s?s==="online"?"rgba(18,184,134,0.2)":"rgba(239,68,68,0.15)":"rgba(255,255,255,0.05)",border:`1px solid ${status===s?s==="online"?"rgba(18,184,134,0.5)":"rgba(239,68,68,0.4)":"rgba(255,255,255,0.08)"}`,color:status===s?s==="online"?"#12b886":"#ef4444":"rgba(255,255,255,0.4)"}}>
                {s==="online"?<Wifi size={13}/>:<WifiOff size={13}/>}{s.charAt(0).toUpperCase()+s.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {err&&<p className="text-xs text-red-400 font-semibold">{err}</p>}
      </div>

      <div className="flex justify-end gap-2 px-5 py-4 border-t" style={{borderColor:"rgba(255,255,255,0.08)",background:"#0d1117"}}>
        <button onClick={onClose} className="px-4 py-2 rounded-xl text-sm font-semibold text-white/60 hover:text-white hover:bg-white/10 transition-all border" style={{borderColor:"rgba(255,255,255,0.1)"}}>Cancel</button>
        <button onClick={handle} className="px-5 py-2 rounded-xl text-sm font-bold text-white flex items-center gap-2 hover:opacity-90 transition-all" style={{background:"linear-gradient(135deg,#ef4444,#dc2626)",boxShadow:"0 4px 14px rgba(239,68,68,0.3)"}}><UserPlus size={13}/>Add User</button>
      </div>
    </div>
  </>);
}

// ── Device Badge (read-only) ───────────────────────────────────────────────
function DeviceCell({ device }: { device: Device }) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold w-fit"
        style={{background:"rgba(129,140,248,0.1)",border:"1px solid rgba(129,140,248,0.25)",color:"#818cf8"}}>
        <Monitor size={11}/>
        <span style={{fontFamily:"'JetBrains Mono',monospace"}}>{device.deviceId}</span>
      </div>
      <div className="flex items-center gap-1.5 ml-0.5">
        <span className="text-[10px] px-1.5 py-0.5 rounded font-semibold" style={{background:typeColor[device.type].bg,color:typeColor[device.type].text}}>{device.type}</span>
        <span className="text-[10px] text-white/25" style={{fontFamily:"'JetBrains Mono',monospace"}}>v{device.version}</span>
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────
export default function ActiveUsersPage() {
  const [users,setUsers] = useState<User[]>(SEED_USERS);
  const [filter,setFilter] = useState<FilterType>("all");
  const [query,setQuery] = useState("");
  const [modal,setModal] = useState(false);
  const [sort,setSort] = useState<{key:SortKey;dir:"asc"|"desc"}>({key:"name",dir:"asc"});

  const online  = users.filter(u=>u.status==="online").length;
  const offline = users.filter(u=>u.status==="offline").length;

  const handleSort = (key: SortKey) => {
    setSort(s => s.key===key ? {...s,dir:s.dir==="asc"?"desc":"asc"} : {key,dir:"asc"});
  };

  const toggleStatus = useCallback((id:string) => {
    setUsers(p=>p.map(u=>u.id===id?{...u,status:u.status==="online"?"offline":"online",lastActive:new Date()}:u));
  },[]);

  const addUser = useCallback((u: Omit<User,"lastActive">): string|null => {
    if(users.some(x=>x.email.toLowerCase()===u.email.toLowerCase())) return "Email already exists.";
    if(users.some(x=>x.device.deviceId===u.device.deviceId)) return "Device ID already in use.";
    setUsers(p=>[...p,{...u,lastActive:new Date()}]);
    return null;
  },[users]);

  const visible = users
    .filter(u=>{
      if(filter!=="all"&&u.status!==filter)return false;
      const q=query.toLowerCase();
      return!q||u.name.toLowerCase().includes(q)||u.email.toLowerCase().includes(q)||u.phone.includes(q)||u.id.toLowerCase().includes(q)||u.device.deviceId.toLowerCase().includes(q);
    })
    .sort((a,b)=>{
      const dir = sort.dir==="asc"?1:-1;
      if(sort.key==="name")   return a.name.localeCompare(b.name)*dir;
      if(sort.key==="status") return a.status.localeCompare(b.status)*dir;
      if(sort.key==="device") return a.device.deviceId.localeCompare(b.device.deviceId)*dir;
      return 0;
    });

  const SortIcon = ({k}:{k:SortKey}) => sort.key===k
    ? sort.dir==="asc" ? <ChevronUp size={11}/> : <ChevronDown size={11}/>
    : <ChevronsUpDown size={11} className="opacity-30"/>;

  return(
    <div className="w-full" style={{fontFamily:"'Plus Jakarta Sans',sans-serif"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500&display=swap');
        @keyframes aufade{from{opacity:0}to{opacity:1}}
        @keyframes aumodal{from{opacity:0;transform:translate(-50%,-46%) scale(.95)}to{opacity:1;transform:translate(-50%,-50%) scale(1)}}
        @keyframes pulseGreen{0%{box-shadow:0 0 0 0 rgba(18,184,134,.5)}70%{box-shadow:0 0 0 5px rgba(18,184,134,0)}100%{box-shadow:0 0 0 0 rgba(18,184,134,0)}}
        .au-row:hover td{background:rgba(255,255,255,0.025)!important;}
        .au-row{transition:background 0.12s;}
        .status-pulse{animation:pulseGreen 2s infinite;}
        .sort-th:hover{color:rgba(255,255,255,0.8)!important;cursor:pointer;}
        ::-webkit-scrollbar{height:4px;width:4px;background:transparent;}
        ::-webkit-scrollbar-thumb{background:rgba(255,255,255,0.1);border-radius:4px;}
      `}</style>

      <header className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 px-4 pt-2">
        <div>
          <h2 className="text-lg font-bold text-white tracking-wide">Active Users</h2>
          <p className="text-white/40 text-xs font-medium mt-0.5">Manage users and their assigned devices</p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {[{label:"Total",count:users.length,color:"#818cf8"},{label:"Online",count:online,color:"#12b886"},{label:"Offline",count:offline,color:"#ef4444"}].map(s=>(
            <div key={s.label} className="px-3 py-1.5 rounded-full text-xs font-bold" style={{background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.08)",color:s.color}}>
              {s.count} <span className="text-white/30 font-medium">{s.label}</span>
            </div>
          ))}
        </div>
      </header>

      <div className="flex flex-col gap-4 pb-6 px-4">
        <div className="flex flex-wrap gap-3 items-center p-3 rounded-2xl" style={{background:"#161b22",border:"1px solid rgba(255,255,255,0.07)"}}>
          <div className="relative flex-1 min-w-[180px]">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-red-400 pointer-events-none"/>
            <input className="w-full pl-9 pr-8 py-2 rounded-xl text-sm text-white placeholder-white/30 outline-none" style={{background:"#0d1117",border:"1px solid rgba(255,255,255,0.08)",fontFamily:"inherit"}}
              placeholder="Search name, email, ID or device..." value={query} onChange={e=>setQuery(e.target.value)}/>
            {query&&<button onClick={()=>setQuery("")} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/70 transition-colors"><X size={13}/></button>}
          </div>
          <div className="flex gap-2">
            {(["all","online","offline"] as FilterType[]).map(f=>{
              const active=filter===f; const c={all:"#818cf8",online:"#12b886",offline:"#ef4444"};
              return(<button key={f} onClick={()=>setFilter(f)} className="px-3 py-2 rounded-xl text-xs font-bold transition-all" style={{background:active?`${c[f]}22`:"rgba(255,255,255,0.04)",border:`1px solid ${active?c[f]+"60":"rgba(255,255,255,0.08)"}`,color:active?c[f]:"rgba(255,255,255,0.45)",fontFamily:"inherit"}}>
                {f==="all"?"All":f.charAt(0).toUpperCase()+f.slice(1)} ({f==="all"?users.length:f==="online"?online:offline})
              </button>);
            })}
          </div>
          <button onClick={()=>setModal(true)} className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white hover:opacity-90 transition-all sm:ml-auto" style={{background:"linear-gradient(135deg,#ef4444,#dc2626)",boxShadow:"0 2px 12px rgba(239,68,68,.3)",fontFamily:"inherit"}}>
            <UserPlus size={13}/> Add User
          </button>
        </div>

        <div className="rounded-2xl overflow-hidden" style={{border:"1px solid rgba(255,255,255,0.07)"}}>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse" style={{minWidth:700}}>
              <thead>
                <tr style={{background:"#0d1117",borderBottom:"1px solid rgba(255,255,255,0.08)"}}>
                  {[
                    {label:"User",    key:"name"   as SortKey},
                    {label:"Contact", key:null},
                    {label:"Status",  key:"status" as SortKey},
                    {label:"Device",  key:"device" as SortKey},
                  ].map(col=>(
                    <th key={col.label} onClick={col.key?()=>handleSort(col.key!):undefined}
                      className={`text-left px-4 py-3 text-[11px] font-bold uppercase tracking-wider text-white/40 select-none ${col.key?"sort-th":""}`}>
                      <span className="flex items-center gap-1.5">{col.label}{col.key&&<SortIcon k={col.key}/>}</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {visible.length===0&&(
                  <tr><td colSpan={4} className="text-center py-16 text-white/25 text-sm" style={{background:"#161b22"}}>
                    <Search size={28} className="mx-auto mb-2 opacity-20"/> No users match your search
                  </td></tr>
                )}
                {visible.map((u,i)=>(
                  <tr key={u.id} className="au-row" style={{background:i%2===0?"#161b22":"#13181f",borderBottom:"1px solid rgba(255,255,255,0.04)"}}>

                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="relative flex-shrink-0">
                          <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-[11px] font-black" style={{background:avatarGrad(u.id),fontFamily:"'JetBrains Mono',monospace"}}>{u.avatar}</div>
                          <span className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 ${u.status==="online"?"status-pulse":""}`} style={{background:u.status==="online"?"#12b886":"#ef4444",borderColor:i%2===0?"#161b22":"#13181f"}}/>
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-white truncate">{u.name}</p>
                          <p className="text-[10px] text-white/30" style={{fontFamily:"'JetBrains Mono',monospace"}}>{u.id}</p>
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-3">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-1.5 text-[11.5px] text-white/50">
                          <Mail size={10} className="text-white/25 flex-shrink-0"/><span className="truncate max-w-[160px]">{u.email}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-[11.5px] text-white/50">
                          <Phone size={10} className="text-white/25 flex-shrink-0"/><span style={{fontFamily:"'JetBrains Mono',monospace"}}>{u.phone}</span>
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-3">
                      <button onClick={()=>toggleStatus(u.id)} className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-bold uppercase tracking-wider transition-all hover:opacity-80"
                        style={{background:u.status==="online"?"rgba(18,184,134,0.15)":"rgba(239,68,68,0.12)",color:u.status==="online"?"#12b886":"#ef4444",border:`1px solid ${u.status==="online"?"rgba(18,184,134,0.3)":"rgba(239,68,68,0.25)"}`}}
                        title="Click to toggle">
                        {u.status==="online"?<Wifi size={10}/>:<WifiOff size={10}/>}{u.status}
                      </button>
                      <p className="text-[10px] text-white/25 mt-1 ml-0.5">{fmtAgo(u.lastActive)}</p>
                    </td>

                    <td className="px-4 py-3">
                      <DeviceCell device={u.device}/>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="px-4 py-2.5 flex justify-between items-center text-[11px] text-white/25 font-medium" style={{background:"#0d1117",borderTop:"1px solid rgba(255,255,255,0.06)"}}>
            <span>Showing {visible.length} of {users.length} users</span>
            <span>{users.length} devices registered</span>
          </div>
        </div>
      </div>

      <AddModal isOpen={modal} onClose={()=>setModal(false)} onSubmit={addUser}/>
    </div>
  );
}