const stats = [
  { label: "Năm kinh nghiệm", value: "10+" },
  { label: "Dự án hoàn thành", value: "150+" },
  { label: "Khách hàng hài lòng", value: "200+" },
];

export default function StatsStrip() {
  return (
    <section className="bg-gray-100 py-8">
      <div className="max-w-frame mx-auto px-4 xl:px-0 grid grid-cols-1 sm:grid-cols-3 text-center gap-6">
        {stats.map((stat) => (
          <div key={stat.label}>
            <div className="text-3xl font-bold text-primary">{stat.value}</div>
            <div className="mt-2 text-sm uppercase tracking-wide">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
