import React from "react";
import {
  LayoutDashboard,
  AlertCircle,
  Users,
  Settings,
  LogOut,
  UserCheck,
  Monitor,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

// Interface for TypeScript type safety
interface NavItem {
  icon: React.ReactNode;
  label: string;
  href: string;
}

const Sidebar = () => {
  const location = useLocation();
  const pathname = location.pathname;

  const menuItems: NavItem[] = [
    { icon: <LayoutDashboard size={18} />, label: "Dashboard", href: "/dashboard" },
    { icon: <Monitor size={18} />, label: "Device", href: "/dashboard/device" },
    { icon: <AlertCircle size={18} />, label: "Emergency", href: "/dashboard/emergency" },
    { icon: <UserCheck size={18} />, label: "Active Users", href: "/dashboard/active-users" },
  ];

  const accountItems: NavItem[] = [
    { icon: <Users size={18} />, label: "Profile & Settings", href: "/dashboard/profile" },
    // { icon: <Settings size={18} />, label: "Settings", href: "/dashboard/settings" },
  ];

  const isActiveRoute = (href: string) => {
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <aside
      className="
        fixed left-4 top-4 bottom-4 w-64
        bg-sidebar rounded-2xl flex flex-col z-50 hidden md:flex
        shadow-xl border border-sidebar-border
        overflow-hidden /* Ensures absolutely no scrollbars appear */
      "
    >
      {/* 1. Brand Header */}
      <Link
        to="/dashboard"
        className="flex items-center gap-3 border-b border-sidebar-border mx-4 py-6 shrink-0"
      >
        <img src="/assets/smart-guide-no-bg.png" alt="Logo" width={50} />
        <h1 className="text-[14px] font-bold tracking-widest uppercase text-sidebar-foreground">
          SmartGuide
        </h1>
      </Link>

      {/* 2. Main Navigation - No Scroll */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-hidden">
        {menuItems.map((item) => {
          const isActive = isActiveRoute(item.href);
          return (
            <Link
              key={item.label}
              to={item.href}
              className={`
                flex items-center gap-3 px-3 py-2.5 rounded-xl
                transition-all duration-200
                ${isActive
                  ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-md"
                  : "text-muted-foreground hover:text-sidebar-foreground hover:bg-sidebar-accent"
                }
              `}
            >
              <div
                className={`
                  w-9 h-9 rounded-lg flex items-center justify-center shrink-0
                  transition
                  ${isActive
                    ? "bg-sidebar-primary-foreground/20 text-sidebar-primary-foreground"
                    : "bg-muted text-sidebar-primary"
                  }
                `}
              >
                {item.icon}
              </div>
              <span className={`text-[13px] tracking-wide ${isActive ? "font-semibold" : "font-medium"}`}>
                {item.label}
              </span>
            </Link>
          );
        })}

        {/* Account Section */}
        <div className="pt-6 mt-2">
          <p className="px-3 text-[10px] font-bold text-muted-foreground mb-3 tracking-widest uppercase">
            Account
          </p>
          {accountItems.map((item) => {
            const isActive = isActiveRoute(item.href);
            return (
              <Link
                key={item.label}
                to={item.href}
                className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-xl
                  transition-all duration-200
                  ${isActive
                    ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-md"
                    : "text-muted-foreground hover:text-sidebar-foreground hover:bg-sidebar-accent"
                  }
                `}
              >
                <div
                  className={`
                    w-9 h-9 rounded-lg flex items-center justify-center shrink-0
                    ${isActive
                      ? "bg-sidebar-primary-foreground/20 text-sidebar-primary-foreground"
                      : "bg-muted text-sidebar-primary"
                    }
                  `}
                >
                  {item.icon}
                </div>
                <span className="text-[13px] font-medium tracking-wide">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* 3. Bottom Footer Section (Logout & Avatar) */}
      <div className="p-4 mt-auto border-t border-sidebar-border shrink-0 bg-sidebar">
        <Link
          to="/"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-destructive hover:bg-destructive/10 transition-all mb-4"
        >
          <div className="w-9 h-9 rounded-lg bg-destructive/10 text-destructive flex items-center justify-center">
            <LogOut size={18} />
          </div>
          <span className="text-[13px] font-medium tracking-wide">
            Logout
          </span>
        </Link>

        <div className="flex items-center gap-3 px-3">
          <div className="w-9 h-9 rounded-full border border-sidebar-border flex items-center justify-center text-sidebar-foreground font-bold text-sm bg-muted shadow-inner cursor-pointer hover:border-ring transition-colors">
            N
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-bold text-sidebar-foreground leading-none">Admin</span>
            <span className="text-[10px] text-muted-foreground mt-1">online</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;