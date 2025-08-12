"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="relative h-[400px] md:h-[600px] w-full">
      <Image
        src="/images/hero.jpg"
        alt="Hero"
        fill
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center text-white px-4">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">Chào mừng đến Nam Phong</h1>
        <p className="max-w-2xl mb-6">
          Giải pháp xây dựng chuyên nghiệp cho mọi công trình.
        </p>
        <Button asChild>
          <Link href="/lien-he">Liên hệ ngay</Link>
        </Button>
      </div>
    </section>
  );
}
