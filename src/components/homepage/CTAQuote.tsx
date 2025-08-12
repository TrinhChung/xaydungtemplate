import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CTAQuote() {
  return (
    <section className="bg-primary text-primary-foreground py-16">
      <div className="max-w-frame mx-auto px-4 xl:px-0 text-center">
        <h2 className="text-2xl font-bold mb-4">Bạn đang lên kế hoạch cho dự án?</h2>
        <p className="mb-6">Liên hệ với chúng tôi để nhận báo giá chi tiết.</p>
        <Button asChild variant="secondary">
          <Link href="/lien-he">Nhận báo giá</Link>
        </Button>
      </div>
    </section>
  );
}
