"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { Dropdown, Modal } from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";
import {
  IconHome2,
  IconSettings,
  IconPackage,
  IconShoppingCart,
  IconTruckDelivery,
  IconReportAnalytics,
  IconLogout,
  IconUser,
} from "@tabler/icons-react";

import DeleteCookies from "./deleteCookies";

const Sidebar = ({ children }) => {
  const router = useRouter();
  const currentRoute = usePathname();
  const linkStyle = {
    active: "px-3 py-3 flex items-center gap-1 hover:text-slate-600 transition-all bg-[#f0f4f9] rounded-l-full",
    inactive: "px-3 py-3 flex items-center gap-1 hover:opacity-70 transition-all text-white",
  };

  const { confirm } = Modal;

  const logoutOkClick = async () => {
    await DeleteCookies();
    router.push("/login");
  };

  const handleLogout = () => {
    confirm({
      title: "Apakah anda yakin untuk keluar?",
      icon: <ExclamationCircleFilled />,
      content: "Anda akan logout dan dikembalikan ke halaman login",
      okType: "default",
      onOk() {
        logoutOkClick();
      },
      onCancel() {},
    });
  };

  const items = [
    {
      key: "1",
      label: (
        <div className="flex items-center gap-1">
          <IconUser />
          <p>Profil</p>
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <div className="flex items-center gap-1" onClick={handleLogout}>
          <IconLogout />
          <p>Logout</p>
        </div>
      ),
    },
  ];

  if (currentRoute === "/login") {
    return children;
  } else {
    return (
      <nav className="fixed pt-10 pl-5 w-[200px] min-h-screen bg-indigo-500">
        <ul className="flex flex-col gap-5">
          <Link href="/" className={currentRoute === "/" ? linkStyle.active : linkStyle.inactive}>
            <IconHome2 />
            <li>Home</li>
          </Link>
          <Link href="/barang" className={currentRoute.includes("/barang") ? linkStyle.active : linkStyle.inactive}>
            <IconPackage />
            <li>Barang</li>
          </Link>
          <Link
            href="/pemesanan"
            className={currentRoute.includes("/pemesanan") ? linkStyle.active : linkStyle.inactive}
          >
            <IconTruckDelivery />
            <li>Pemesanan</li>
          </Link>
          <Link
            href="/penjualan"
            className={currentRoute.includes("/penjualan") ? linkStyle.active : linkStyle.inactive}
          >
            <IconShoppingCart />
            <li>Penjualan</li>
          </Link>
          <Link href="/metode" className={currentRoute.includes("/metode") ? linkStyle.active : linkStyle.inactive}>
            <IconReportAnalytics />
            <li>Metode</li>
          </Link>
          <Dropdown placement="bottom" menu={{ items }} arrow={{ pointAtCenter: true }} className={linkStyle.inactive}>
            <Link href="" className={currentRoute === "" ? linkStyle.active : linkStyle.inactive}>
              <IconSettings />
              <li>Setting</li>
            </Link>
          </Dropdown>
        </ul>
      </nav>
    );
  }
};

export default Sidebar;
