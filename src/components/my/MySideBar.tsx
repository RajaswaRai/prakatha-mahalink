import Link from "next/link";
import {
  Home,
  Building2,
  Calendar,
  FileText,
  Plus,
  Settings,
  Link2,
} from "lucide-react";

export default function MySideBar() {
  const navItems = [
    { label: "Dashboard", icon: Home, href: "/dashboard", active: true },
    {
      label: "Organization",
      icon: Building2,
      href: "/dashboard/organization",
      active: false,
    },
    {
      label: "Events",
      icon: Calendar,
      href: "/dashboard/events",
      active: false,
    },
    { label: "Blog", icon: FileText, href: "/dashboard/blog", active: false },
    { label: "Homepage", icon: Home, href: "/", active: false },
  ];

  const myOrganizations = [
    {
      name: "HMTI",
      role: "Staf",
      bgColor: "bg-blue-100",
      textColor: "text-blue-600",
    },
    {
      name: "KSR PMI Unit",
      role: "Anggota",
      bgColor: "bg-orange-100",
      textColor: "text-orange-600",
    },
  ];

  return (
    <aside className="w-64 h-screen bg-white border-r border-gray-100 flex flex-col justify-between p-4 sticky top-0">
      {/* Upper Content */}
      <div className="space-y-6">
        {/* Brand Header */}
        <div className="flex items-center gap-3 px-2 py-1">
          <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-white">
            <Link2 className="w-4 h-4" />
          </div>
          <div>
            <h1 className="font-bold text-gray-900 text-sm leading-none">
              Mantra
            </h1>
            <p className="text-[10px] text-gray-400 mt-0.5">
              Pusat Kemahasiswaan · Univ. Nusantara
            </p>
          </div>
        </div>

        {/* Main Navigation */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                  item.active
                    ? "bg-[#F3F7FF] text-[#1D4ED8]"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Section: Organisasi Saya */}
        <div className="space-y-2 pt-2">
          <p className="px-3 text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
            Organisasi Saya
          </p>

          <div className="space-y-1">
            {myOrganizations.map((org) => (
              <div
                key={org.name}
                className="flex items-center justify-between px-3 py-2 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-6 h-6 rounded-md ${org.bgColor} ${org.textColor} flex items-center justify-center text-[10px] font-bold`}
                  >
                    {org.name.charAt(0)}
                  </div>
                  <span className="text-xs font-medium text-gray-700">
                    {org.name}
                  </span>
                </div>
                <span className="text-[10px] text-gray-400">{org.role}</span>
              </div>
            ))}

            {/* Button: Ajukan organisasi baru */}
            <button className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-colors">
              <div className="w-5 h-5 rounded-full border border-dashed border-gray-300 flex items-center justify-center">
                <Plus className="w-3 h-3 text-gray-500" />
              </div>
              <span>Ajukan organisasi baru</span>
            </button>
          </div>
        </div>
      </div>

      {/* Footer: User Profile */}
      <div className="pt-4 border-t border-gray-100 flex items-center justify-between px-2">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-semibold text-xs flex items-center justify-center">
            RA
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-gray-900 leading-tight">
              Raka Aditya
            </span>
            <span className="text-[10px] text-gray-400">NIM 2310511023</span>
          </div>
        </div>
        <button className="text-gray-400 hover:text-gray-600 transition-colors p-1">
          <Settings className="w-4 h-4" />
        </button>
      </div>
    </aside>
  );
}
