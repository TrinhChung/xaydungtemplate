import Image from "next/image";

const projects = [
  { id: 1, title: "Dự án 1", image: "/images/project-1.jpg" },
  { id: 2, title: "Dự án 2", image: "/images/project-2.jpg" },
  { id: 3, title: "Dự án 3", image: "/images/project-3.jpg" },
];

export default function ProjectCarousel() {
  return (
    <section className="max-w-frame mx-auto px-4 xl:px-0 py-12">
      <h2 className="text-2xl font-bold text-center mb-8">Dự án tiêu biểu</h2>
      <div className="flex gap-6 overflow-x-auto">
        {projects.map((p) => (
          <div key={p.id} className="min-w-[280px] flex-shrink-0">
            <div className="relative w-full h-48 mb-4">
              <Image
                src={p.image}
                alt={p.title}
                fill
                className="object-cover rounded"
              />
            </div>
            <h3 className="font-semibold text-center">{p.title}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}
