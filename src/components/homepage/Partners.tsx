import Image from "next/image";

const partners = [
  { id: 1, image: "/images/partner-1.png", alt: "Partner 1" },
  { id: 2, image: "/images/partner-2.png", alt: "Partner 2" },
  { id: 3, image: "/images/partner-3.png", alt: "Partner 3" },
  { id: 4, image: "/images/partner-4.png", alt: "Partner 4" },
];

export default function Partners() {
  return (
    <section className="max-w-frame mx-auto px-4 xl:px-0 py-12">
      <h2 className="text-2xl font-bold text-center mb-8">Đối tác</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 items-center justify-items-center">
        {partners.map((p) => (
          <Image
            key={p.id}
            src={p.image}
            alt={p.alt}
            width={150}
            height={80}
            className="object-contain"
          />
        ))}
      </div>
    </section>
  );
}
