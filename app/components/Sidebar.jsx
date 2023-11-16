"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  IconHome2,
  IconSettings,
  IconPackage,
  IconShoppingCart,
  IconTruckDelivery,
  IconReportAnalytics,
} from "@tabler/icons-react";

export default function Sidebar() {
  const currentRoute = usePathname();
  const linkStyle = {
    active: "px-3 py-3 flex items-center gap-1 hover:text-slate-600 transition-all bg-[#f0f4f9] rounded-l-full",
    inactive: "px-3 py-3 flex items-center gap-1 hover:opacity-70 transition-all text-white",
  };

  return (
    <nav className="pt-10 pl-5 w-[200px] min-h-screen bg-indigo-500">
      <ul className="flex flex-col gap-5">
        <Link href="/" className={currentRoute === "/" ? linkStyle.active : linkStyle.inactive}>
          <IconHome2 />
          <li>Home</li>
        </Link>
        <Link href="/barang" className={currentRoute.includes("/barang") ? linkStyle.active : linkStyle.inactive}>
          <IconPackage />
          <li>Barang</li>
        </Link>
        <Link href="/pemesanan" className={currentRoute.includes("/pemesanan") ? linkStyle.active : linkStyle.inactive}>
          <IconTruckDelivery />
          <li>Pemesanan</li>
        </Link>
        <Link href="/penjualan" className={currentRoute.includes("/penjualan") ? linkStyle.active : linkStyle.inactive}>
          <IconShoppingCart />
          <li>Penjualan</li>
        </Link>
        <Link href="/metode" className={currentRoute.includes("/metode") ? linkStyle.active : linkStyle.inactive}>
          <IconReportAnalytics />
          <li>Metode</li>
        </Link>
        <Link href="*" className={currentRoute === "" ? linkStyle.active : linkStyle.inactive}>
          <IconSettings />
          <li>Setting</li>
        </Link>
      </ul>
    </nav>
  );
}
