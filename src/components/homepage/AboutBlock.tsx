import Image from "next/image";

export default function AboutBlock() {
  return (
    <section className="max-w-frame mx-auto px-4 xl:px-0 py-12 grid gap-8 md:grid-cols-2 items-center">
      <div className="relative w-full h-64 md:h-96">
        <Image
          src="/images/about.jpg"
          alt="Về chúng tôi"
          fill
          className="object-cover rounded"
        />
      </div>
      <div>
        <h2 className="text-2xl font-bold mb-4">Về Nam Phong</h2>
        <p className="text-gray-700 mb-4">
          Chúng tôi là đơn vị xây dựng với nhiều năm kinh nghiệm trong lĩnh vực
          nhà ở, công nghiệp và hạ tầng.
        </p>
        <p className="text-gray-700">
          Đội ngũ kỹ sư và kiến trúc sư của chúng tôi luôn sẵn sàng đồng hành
          cùng khách hàng trong mọi dự án.
        </p>
      </div>
    </section>
  );
}
