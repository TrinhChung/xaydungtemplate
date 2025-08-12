import { Button } from "@/components/ui/button";
import { Company } from "@/types/company.types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const TopBanner = ({ company }: { company: Company | null }) => {
  return (
    <div className="bg-black text-white text-center py-2 px-2 sm:px-4 xl:px-0">
      <div className="relative max-w-frame mx-auto">
        <p className="text-xs sm:text-sm">
          Sign up and get 20% off to your first order.{" "}
          <Link href="#" className="underline font-medium">
            Sign Up Now
          </Link>
        </p>
        {/* Thông tin công ty: Email & Hotline */}
        {company && (
          <div className="flex flex-col sm:flex-row gap-x-6 gap-y-1 justify-center items-center mt-1 text-[11px] sm:text-xs text-gray-300">
            <span>
              <b>EMAIL:</b> {company.email}
            </span>
            <span>
              <b>HOTLINE:</b> {company.hotline}
            </span>
          </div>
        )}
        <Button
          variant="ghost"
          className="hover:bg-transparent absolute right-0 top-1/2 -translate-y-1/2 w-fit h-fit p-1 hidden sm:flex"
          size="icon"
          type="button"
          aria-label="close banner"
        >
          <Image
            priority
            src="/icons/times.svg"
            height={13}
            width={13}
            alt="close banner"
          />
        </Button>
      </div>
    </div>
  );
};


export default TopBanner;
