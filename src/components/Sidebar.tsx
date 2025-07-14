"use client";

import { SidebarItem } from "@/models";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href;

  const SidebarItems: SidebarItem[] = [
    { name: "Dashboard", icon: "fa-home", href: "/dashboard" },
    { name: "Sorting", icon: "fa-cog", href: "/sorting" },
  ];

  return (
    <aside className="w-64 h-screen fixed top-0 left-0 bg-gray-800 text-white p-4">
      <h2 className="text-2xl font-bold mb-6">Visualizer</h2>
      <nav className="flex flex-col space-y-3">
        {SidebarItems.map((item: SidebarItem) => (
          <Link href={item.href} key={item.name}>
            <span
              className={
                "hover:bg-gray-700 p-2 rounded flex items-center gap-2 "
              }
            >
              <i className={"fas " + item.icon}></i> {item.name}
            </span>
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
