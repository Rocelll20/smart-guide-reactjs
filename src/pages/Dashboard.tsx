import React, { Suspense, useState } from "react";
import {
  Menu,
  Search,
  Settings,
  Bell,
  Clock,
  UserPlus,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";

// ✅ FIXED: safe lazy import (no alias issue)
const Map = React.lazy(() => import("../components/ui/map"));

const ALL_MARKERS = [
  { id: 1, pos: [8.4772, 124.6459] as [number, number], name: "Main Station", device: "Device #882-Alpha" },
  { id: 2, pos: [8.4820, 124.6510] as [number, number], name: "North Sector", device: "Device #104-Beta" },
  { id: 3, pos: [8.4710, 124.6400] as [number, number], name: "West Gate", device: "Device #553-Gamma" },
  { id: 4, pos: [8.4850, 124.6350] as [number, number], name: "Emergency Unit", device: "Device #911-Delta" },
  { id: 5, pos: [8.4680, 124.6550] as [number, number], name: "South Outpost", device: "Device #404-Echo" },
];

export default function Dashboard() {
  const [mapSearchQuery, setMapSearchQuery] = useState("");

  const filteredMarkers = ALL_MARKERS.filter(
    (marker) =>
      marker.name.toLowerCase().includes(mapSearchQuery.toLowerCase()) ||
      marker.device.toLowerCase().includes(mapSearchQuery.toLowerCase())
  );

  return (
    <div className="w-full" style={{ fontFamily: "'Montserrat', sans-serif" }}>
      
      <header className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 px-4 pt-2">
        <div className="flex items-center gap-4">
          <button className="md:hidden text-white/70 hover:text-white p-2 bg-card rounded-lg">
            <Menu size={20} />
          </button>
          <h2 className="text-lg font-bold text-white">Dashboard</h2>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative hidden sm:flex items-center">
            <Search className="absolute left-3 w-4 h-4 text-white/50" />
            <input
              type="text"
              placeholder="Global Search..."
              className="bg-card border border-white/5 rounded-full py-2 pl-10 pr-4 text-sm text-white w-48 lg:w-64"
            />
          </div>

          <Settings size={16} className="text-white/70" />
          <Bell size={16} className="text-white/70" />
        </div>
      </header>

      <div className="flex flex-col gap-6 pb-6 px-4">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="bg-[#111624] rounded-xl p-6 text-white">
            <p className="text-xs opacity-50">Total Users</p>
            <h3 className="text-3xl font-bold">1,248</h3>
            <div className="flex items-center gap-2 mt-2 text-green-400 text-xs">
              <TrendingUp size={12} /> +12%
            </div>
          </div>

          <div className="bg-[#111624] rounded-xl p-6 text-white">
            <p className="text-xs opacity-50">Pending</p>
            <h3 className="text-3xl font-bold">24</h3>
            <Clock size={18} className="text-yellow-400 mt-2" />
          </div>

          <div className="bg-[#111624] rounded-xl p-6 text-white text-center">
            <ShieldCheck size={20} className="mx-auto text-blue-400" />
            <h3 className="text-2xl font-bold mt-2">86</h3>
            <p className="text-xs text-blue-400">Verified</p>
          </div>

          <div className="bg-[#111624] rounded-xl p-6 text-white text-center">
            <h3 className="text-3xl font-bold">1,138</h3>
            <p className="text-green-400 text-xs">+45 this week</p>
            <UserPlus size={18} className="mx-auto mt-2" />
          </div>

        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-150">

          <div className="lg:col-span-8 bg-[#111624] rounded-xl p-6 flex flex-col">
            
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-white font-bold">Live Monitoring Map</h3>

              <input
                type="text"
                placeholder="Search..."
                value={mapSearchQuery}
                onChange={(e) => setMapSearchQuery(e.target.value)}
                className="bg-[#1a2235] px-3 py-1 text-sm text-white rounded"
              />
            </div>

            <div className="flex-1 bg-[#0f172a] rounded-lg flex items-center justify-center">
              
              <Suspense fallback={<p className="text-white/40">Loading Map...</p>}>
                <Map posix={[8.4772, 124.6459]} markers={filteredMarkers} />
              </Suspense>

            </div>
          </div>

          <div className="lg:col-span-4 bg-[#111624] rounded-xl p-6 text-white">
            <h3 className="font-bold mb-4">History</h3>

            <p className="text-sm">📍 Location updated</p>
            <p className="text-xs opacity-50 mb-4">Today</p>

            <p className="text-sm text-red-400">🚨 Emergency triggered</p>
            <p className="text-xs opacity-50">Yesterday</p>
          </div>

        </div>

        <footer className="text-xs text-white/40 text-center pt-4">
          © SmartGuide IoT
        </footer>

      </div>
    </div>
  );
}