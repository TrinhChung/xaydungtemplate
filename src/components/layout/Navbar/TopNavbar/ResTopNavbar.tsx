import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { integralCF } from "@/styles/fonts";
import { NavMenu } from "../navbar.types";
import { Button } from "@/components/ui/button";

const ResTopNavbar = ({
  items,
  companyName,
}: {
  items: NavMenu;
  companyName?: string;
}) => {
  return (
    <Sheet>
      <SheetTrigger asChild className="cursor-pointer">
        <Image
          priority
          src="/icons/menu.svg"
          height={100}
          width={100}
          alt="menu"
          className="max-w-[22px] max-h-[22px]"
        />
      </SheetTrigger>
      <SheetContent side="left" className="overflow-y-auto">
        <SheetHeader className="mb-10">
          <SheetTitle asChild>
            <SheetClose asChild>
              <Link
                href="/"
                className={cn([integralCF.className, "text-2xl"])}
              >
                {companyName || "Nam Phong"}
              </Link>
            </SheetClose>
          </SheetTitle>
        </SheetHeader>
        <div className="flex flex-col items-start gap-4">
          {items.map((item) => (
            <SheetClose asChild key={item.id}>
              <Link href={item.url}>{item.label}</Link>
            </SheetClose>
          ))}
          <SheetClose asChild>
            <Link href="/lien-he" className="w-full">
              <Button className="mt-2 w-full">Nhận báo giá</Button>
            </Link>
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ResTopNavbar;
