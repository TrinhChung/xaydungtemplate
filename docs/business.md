# TÀI LIỆU NGHIỆP VỤ & TÍNH NĂNG

**Dự án:** Chuyển website *Xây Dựng Nam Phong* sang **Next.js** (App Router + tối ưu SEO)

> Tài liệu mô tả các trang và thành phần nghiệp vụ chính của website.

---

## 1) Phân rã trang & Component chi tiết

### 1.1 Header
* Thành phần: Logo, Hotline, Menu chính (đa cấp), Nút CTA "Nhận báo giá".
* Props: `menu: MenuItem[]`, `hotline: string`.
* Yêu cầu: Sticky, mobile drawer, ARIA nav, focus trap.

### 1.2 Footer
* Thành phần: Thông tin công ty, địa chỉ, giờ làm, social, bản đồ embed, liên kết nhanh.
* Props: `company: {name, address, phone, email, taxCode, mapEmbed}`.

### 1.3 Home sections
1. **Hero**: slider/banner, heading, subtext, CTA. Lazy images.
2. **ServiceList**: grid 6–8 dịch vụ → link `/dich-vu/:slug`.
3. **AboutBlock**: đoạn giới thiệu + ảnh đội thi công.
4. **StatsStrip**: Số năm kinh nghiệm, số công trình, khách hàng.
5. **ProjectCarousel**: dự án nổi bật (swiper).
6. **ProcessSteps** (tuỳ chọn): 4–6 bước làm việc.
7. **Testimonials**: nhận xét khách hàng.
8. **Partners**: logo đối tác, nhà cung cấp.
9. **CTAQuote**: khối kêu gọi liên hệ.

### 1.4 Services & ServiceDetail
* **Services**: lưới `ServiceCard` (icon/ảnh, tiêu đề, mô tả ngắn). Sidebar (liệt kê dịch vụ).
* **ServiceDetail**: nội dung chi tiết + CTA liên hệ + related services.

### 1.5 Projects & ProjectDetail
* **Projects**: filter (category, year, location), `ProjectCard` -> modal/gallery hoặc trang chi tiết.
* **ProjectDetail**: tiêu đề, meta (năm/địa điểm/diện tích/chủ đầu tư), mô tả, **gallery** (lightbox), phần vật liệu/thi công.

### 1.6 Blog & PostDetail
* **Blog**: danh sách, phân trang, sidebar (tags, bài mới).
* **PostDetail**: nội dung, bài liên quan, structured data Article.

### 1.7 Contact
* **Form**: tên, điện thoại (bắt buộc), email (tùy), nội dung, checkbox đồng ý.
* **Bảo vệ SPAM**: hCaptcha/Cloudflare Turnstile + honeypot + rate limit (phía server).
* **Map**: iframe Google Map/Leaflet.

---

## 2) SEO & SMO
* `<Seo/>` component: title, description, og:image, canonical.
* `robots.txt`, `sitemap.xml` (build script sinh tự động), breadcrumb schema.
* JSON-LD:
  * `Organization`/`LocalBusiness` (địa chỉ, hotline, giờ mở cửa).
  * `BreadcrumbList` cho trang chi tiết.
  * `Article` cho blog; `CreativeWork`/`Project` (tùy) cho dự án.
* Performance SEO:
  * Preload font, critical CSS (Tailwind JIT nhẹ), image `srcset`/`sizes`, WebP/AVIF.
  * Code-splitting theo route, lazy import section nặng (carousel, lightbox).
* Meta đa ngôn ngữ (nếu có i18n): `hreflang`.

---

## 3) Accessibility (A11y)
* Semantic HTML: `header/nav/main/section/article/footer`.
* Contrast ratio >= 4.5:1.
* Focus visible, skip links, aria-label cho icon button.
* Keyboard navigation đầy đủ (menu, modal, carousel).

---

## 4) Hiệu năng & Hình ảnh
* Ảnh: dùng responsive (`srcset`, `sizes`), định dạng WebP (fallback JPEG/PNG), lazy-load (`loading="lazy"`).
* Gallery: virtualized list nếu nhiều mục.
* Đo lường: Lighthouse, Web Vitals (CLS < 0.1, LCP < 2.5s, INP < 200ms).

---

## 5) i18n (tuỳ chọn)
* `react-i18next` + namespaces: common, home, services, projects, blog, contact.
* Định tuyến theo locale: `/vi/...` (nếu cần).

---

## 6) Phân tích & đồng ý cookie
* Gtag (GA4) hoặc Plausible/Umami.
* Banner consent nhẹ, chỉ load analytics sau khi đồng ý.

---

## 7) Bảo mật & tuân thủ
* Escape HTML khi render nội dung từ CMS.
* CSP cơ bản, SRI cho script ngoài (nếu dùng).
* Rate limit endpoint contact, xác thực webhook (nếu tích hợp mail service).

---
