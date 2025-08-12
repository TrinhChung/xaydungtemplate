import Image from "next/image";

const services = [
  { id: 1, title: "Thiết kế kiến trúc", image: "/images/service-1.jpg" },
  { id: 2, title: "Thi công trọn gói", image: "/images/service-2.jpg" },
  { id: 3, title: "Tư vấn giám sát", image: "/images/service-3.jpg" },
];

export default function ServiceList() {
  return (
    <section className="max-w-frame mx-auto px-4 xl:px-0 py-12">
      <h2 className="text-2xl font-bold text-center mb-8">Dịch vụ của chúng tôi</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s) => (
          <div key={s.id} className="text-center">
            <div className="relative w-full aspect-video mb-4">
              <Image src={s.image} alt={s.title} fill className="object-cover rounded" />
            </div>
            <h3 className="font-semibold">{s.title}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}
