# Xây Dựng Nam Phong - Website Next.js

Dự án này tái xây dựng website [xaydungnamphong.congtyhh3.com](https://xaydungnamphong.congtyhh3.com/) bằng **Next.js 14 App Router**.
Mục tiêu là giữ nguyên phong cách hiện tại nhưng tối ưu SEO, hiệu năng và khả năng mở rộng.

## Mục tiêu

- Clone giao diện và nội dung của website gốc.
- Sử dụng SSR/SSG của Next.js để tối ưu SEO và tốc độ tải.
- Viết mã bằng TypeScript để dễ bảo trì.

## Công nghệ

- [Next.js 14](https://nextjs.org/) (App Router)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [ShadCN UI](https://ui.shadcn.com/) *(tuỳ chọn)*
- [Redux Toolkit](https://redux-toolkit.js.org/) *(nếu cần chia sẻ trạng thái)*
- [Framer Motion](https://www.framer.com/motion/) *(hiệu ứng)*

## Bắt đầu

```bash
git clone <repo-url>
cd xaydungtemplate
npm install
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000) trong trình duyệt để xem kết quả.

## Hướng dẫn clone website gốc

1. **Khảo sát trang hiện tại**: liệt kê đầy đủ các trang (Trang chủ, Giới thiệu, Dịch vụ, Dự án, Tin tức, Liên hệ...). Ghi lại cấu trúc menu, phần header/footer, các section lặp lại.
2. **Tải nội dung và ảnh**: lưu HTML hoặc copy text, tải toàn bộ hình ảnh và tài liệu (logo, icon, file PDF...). Nên nhóm ảnh theo thư mục `public/images/<page>/` để dễ quản lý.
3. **Map URL → App Router**: ánh xạ từng trang sang thư mục trong `src/app`. Ví dụ `/dich-vu/thi-cong` → `src/app/dich-vu/[slug]/page.tsx`.
4. **Chuyển HTML → component**: chia nhỏ mỗi trang thành các component React/Tailwind trong `src/components` (Header, Hero, ServiceCard...). Tận dụng các thành phần dùng chung.
5. **SEO & metadata**: thêm `generateMetadata` hoặc component `Seo` cho từng trang. Sao chép title/description từ site cũ, bổ sung Open Graph.
6. **Kiểm thử**: so sánh hiển thị với website gốc trên desktop/mobile, kiểm tra navigation, form liên hệ, và tối ưu Lighthouse.

## Cấu trúc thư mục

```
src/
  app/                 # App Router
    page.tsx           # Trang chủ
    gioi-thieu/
    dich-vu/
      [slug]/
    du-an/
      [slug]/
    tin-tuc/
      [slug]/
    lien-he/
  components/          # Component dùng chung
  lib/                 # Hàm tiện ích, gọi API
  styles/              # Tailwind config & global styles
  types/               # Định nghĩa TypeScript
```

## Lệnh hữu ích

| Nhiệm vụ | Lệnh |
| --- | --- |
| Chạy môi trường dev | `npm run dev` |
| Build production | `npm run build` |
| Start production | `npm start` |
| Kiểm tra lint | `npm run lint` |

## Tài liệu

- [Tài liệu cấu trúc & kiến trúc](docs/structure.md)
- [Tài liệu nghiệp vụ & tính năng](docs/business.md)

## Giấy phép

Phát hành dưới giấy phép [MIT](LICENSE).

