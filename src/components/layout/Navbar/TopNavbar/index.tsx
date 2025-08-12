"use client";
import { cn } from "@/lib/utils";
import { integralCF } from "@/styles/fonts";
import Link from "next/link";
import ResTopNavbar from "./ResTopNavbar";
import { Button } from "@/components/ui/button";
import { NavItem } from "../navbar.types";
import { Company } from "@/types/company.types";

const NAV_ITEMS: NavItem[] = [
  { id: 1, label: "Trang chủ", url: "/" },
  { id: 2, label: "Giới thiệu", url: "/gioi-thieu" },
  { id: 3, label: "Dịch vụ", url: "/dich-vu" },
  { id: 4, label: "Dự án", url: "/du-an" },
  { id: 5, label: "Tin tức", url: "/tin-tuc" },
  { id: 6, label: "Liên hệ", url: "/lien-he" },
];

const TopNavbar = ({ company }: { company: Company | null }) => {
  return (
    <nav className="sticky top-0 bg-white z-20">
      <div className="flex relative max-w-frame mx-auto items-center justify-between py-5 md:py-6 px-4 xl:px-0">
        <div className="flex items-center">
          <div className="block md:hidden mr-4">
            <ResTopNavbar items={NAV_ITEMS} companyName={company?.name} />
          </div>
          <Link
            href="/"
            className={cn([
              integralCF.className,
              "text-2xl lg:text-[32px] mb-2 mr-3 lg:mr-10",
            ])}
            aria-label={company?.name || "Home"}
          >
            {company?.name ? company.name : "Nam Phong"}
          </Link>
        </div>
        <div className="hidden md:flex items-center space-x-6">
          {NAV_ITEMS.map((item) => (
            <Link key={item.id} href={item.url} className="text-sm font-medium">
              {item.label}
            </Link>
          ))}
        </div>
        <Button asChild className="hidden md:inline-flex">
          <Link href="/lien-he">Nhận báo giá</Link>
        </Button>
      </div>
    </nav>
  );
};

export default TopNavbar;
