export const dynamic = "force-dynamic";

import type { Metadata, Viewport } from "next";
import "@/styles/globals.css";
import { satoshi } from "@/styles/fonts";
import TopBanner from "@/components/layout/Banner/TopBanner";
import TopNavbar from "@/components/layout/Navbar/TopNavbar";
import Footer from "@/components/layout/Footer";
import HolyLoader from "holy-loader";
import Providers from "./providers";
import customFetch from "@/lib/axios/custom";
import { Company } from "@/types/company.types";
import { headers } from "next/headers";

// Hàm fetch thông tin công ty (dùng lại)
async function getCompanyInfo() {
  try {
    // Lấy headers của request
    const h = headers();
    // Tìm domain từ host header
    const domain =
      h.get("host") || "localhost";
    const res = await customFetch.get<Company>("/company", {
      headers: {
        "X-Client-Domain": domain,
      },
    });
    return res.data;
  } catch (e) {
    console.error("Could not fetch company info", e);
    return null;
  }
}

// Metadata động: gọi API lấy tên, description, logo
export async function generateMetadata(): Promise<Metadata> {
  const company = await getCompanyInfo();
  return {
    title: company?.name || "TEEZ.LO",
    description: company?.description || "Fashion Store powered by Next.js",
    icons: company?.logo_url
      ? [{ rel: "icon", url: process.env.NEXT_PUBLIC_API_URL + company.logo_url }]
      : undefined,
  };
}

export const viewport: Viewport = {
  themeColor: "#000000",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const company = await getCompanyInfo();

  return (
    <html lang="en">
      <body className={satoshi.className}>
        <HolyLoader color="#868686" />
        <TopBanner company={company} />
        <Providers>
          <TopNavbar company={company} />
          {children}
        </Providers>
        <Footer company={company} />
      </body>
    </html>
  );
}
