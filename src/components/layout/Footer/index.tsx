// src/components/layout/Footer/index.tsx
import { cn } from "@/lib/utils";
import { integralCF } from "@/styles/fonts";
import React from "react";
import { SocialNetworks } from "./footer.types";
import { FaFacebookF, FaGithub, FaInstagram, FaTwitter, FaHome, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import Link from "next/link";
import LinksSection from "./LinksSection";
import LayoutSpacing from "./LayoutSpacing";
import { Company } from "@/types/company.types";

const socialsData: SocialNetworks[] = [
  { id: 1, icon: <FaTwitter />, url: "https://twitter.com" },
  { id: 2, icon: <FaFacebookF />, url: "https://facebook.com" },
  { id: 3, icon: <FaInstagram />, url: "https://instagram.com" },
  { id: 4, icon: <FaGithub />, url: "https://github.com/NafisRayan" },
];

const Footer = ({ company }: { company: Company | null }) => {
  return (
    <footer className="mt-10 bg-[#F0F0F0]">
      <div className="max-w-frame mx-auto px-4 py-10">
        <div className="grid md:grid-cols-3 gap-12 mb-8">
          {/* 1. THÔNG TIN CÔNG TY */}
          <div>
            <h1 className={cn([integralCF.className, "text-[28px] lg:text-[32px] mb-2"])}>
              {company?.name || ""}
            </h1>
            {company?.address && (
              <div className="flex items-start mb-1 gap-2">
                <FaHome className="mt-1 text-black" />
                <span className="whitespace-pre-line">{company.address}</span>
              </div>
            )}
            {company?.hotline && (
              <div className="flex items-center mb-1 gap-2">
                <FaPhoneAlt className="text-black" />
                <span>Hotline: {company.hotline}</span>
              </div>
            )}
            {company?.email && (
              <div className="flex items-center mb-1 gap-2">
                <FaEnvelope className="text-black" />
                <span>Email: {company.email}</span>
              </div>
            )}
            {company?.license_no && (
              <div className="mt-1">License No.: {company.license_no}</div>
            )}
            <div className="flex items-center mt-4">
              {socialsData.map((social) => (
                <Link
                  href={social.url}
                  key={social.id}
                  className="bg-white hover:bg-black hover:text-white transition-all mr-3 w-7 h-7 rounded-full border border-black/20 flex items-center justify-center p-1.5"
                >
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>

          {/* 2. LINKS SECTION */}
          <div className="flex flex-col md:flex-row md:gap-12">
            <LinksSection />
          </div>

          {/* 3. GOOGLE MAP */}
          <div className="flex flex-col">
            {company?.google_map_embed && (
              <>
                <div className="font-bold mb-2">GOOGLE MAP</div>
                <div
                  className="w-full max-w-xs rounded overflow-hidden"
                  style={{ minHeight: "120px" }}
                  dangerouslySetInnerHTML={{ __html: company.google_map_embed }}
                />
              </>
            )}
          </div>
        </div>

        <hr className="h-[1px] border-t-black/10 mb-6" />
        <div className="flex flex-col sm:flex-row justify-center sm:justify-between items-center mb-2">
          <p className="text-sm text-center sm:text-left text-black/60 mb-4 sm:mb-0 sm:mr-1">
            {company?.footer_text
              ? company.footer_text
              : <>© {new Date().getFullYear()} {company?.name || ""}. All rights reserved.</>}
          </p>
        </div>
      </div>
      <LayoutSpacing />
    </footer>
  );
};

export default Footer;
