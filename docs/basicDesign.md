# TÀI LIỆU THIẾT KẾ & CHUYỂN ĐỔI

**Dự án:** Chuyển website *Xây Dựng Nam Phong* sang React (SPA + tối ưu SEO)

> Ghi chú: Vì chưa thể truy cập trực tiếp URL bạn gửi tại thời điểm soạn tài liệu, nội dung dưới đây trình bày **bộ khung đầy đủ**, có thể map nhanh với giao diện hiện có. Các mục có **\[TODO]** sẽ được điền khi bạn cung cấp HTML/screenshot/menu.

---

## 1) Mục tiêu & Phạm vi

* **Mục tiêu**

  * Giữ nguyên bố cục, nội dung và phong cách thương hiệu của site hiện tại.
  * Nâng cấp codebase sang **React + TypeScript** để dễ bảo trì, mở rộng.
  * Tối ưu **SEO/hiệu năng** (LCP, CLS, TBT), **khả năng truy cập** (WCAG 2.2), **responsive**.
  * Chuẩn bị sẵn các điểm tích hợp: **form liên hệ**, **danh mục dịch vụ**, **dự án (gallery)**, **tin tức**.
* **Phạm vi**

  * Frontend React: layout, routing, components, data models, SSR/prerender (tuỳ chọn), SEO, analytics.
  * Không bao gồm redesign. Style sẽ **clone 1:1** (hoặc tinh gọn bằng Tailwind).
  * Backend/API: tách riêng. Tài liệu định nghĩa sẵn **hợp đồng API**.

---

## 2) Lựa chọn kiến trúc

### 2.1 Phương án khuyến nghị

* **Vite + React + TypeScript** (nhẹ, build nhanh) + **React Router v6**.
* **TailwindCSS** cho utility-first, tái sử dụng class, tốc độ dựng UI.
* **TanStack Query** (tùy chọn) nếu có API động; nếu nội dung tĩnh: dùng JSON.
* **Prerender SEO**: deploy qua Netlify/Cloudflare (bật prerender) **hoặc** dùng **vike/vite-plugin-ssr** nếu cần SSR nhẹ.

### 2.2 Phương án thay thế (khi SEO rất quan trọng & có blog động)

* **Next.js (App Router)**: SSR/SSG out-of-the-box, Image Optimization, Middleware cho i18n, sitemap, v.v.

> Ban đầu đề xuất **Vite SPA + prerender** để nhanh và đơn giản. Nếu bạn muốn blog/tin tức cập nhật thường xuyên và SEO mạnh, cân nhắc **Next.js**.

---

## 3) Tooling & Chuẩn code

* **ESLint** (airbnb + react + typescript), **Prettier**, **lint-staged** + **husky** (pre-commit).
* **Commitlint** + Conventional Commits.
* **Path alias**: `@/components`, `@/features`, `@/pages`, `@/assets`, `@/utils`, `@/styles`.
* **.editorconfig** để đồng nhất indent/charset/end-of-line.

---

## 4) Cấu trúc thư mục

```
/src
  /assets
    /images            # logo, banner, ảnh dự án
    /icons
  /components
    /common            # Header, Footer, Seo, Breadcrumbs, Pagination, Container
    /home              # Hero, ServiceList, AboutBlock, StatsStrip, ProjectCarousel, Testimonials, Partners, CTA
    /services          # ServiceCard, ServiceSidebar
    /projects          # ProjectCard, ProjectFilter, ProjectGallery, ProjectMeta
    /blog              # PostCard, PostSidebar, CategoryList
    /ui                # Button, Card, Modal, Tabs... (tùy chọn)
  /features
    /services          # services.api.ts, services.types.ts
    /projects          # projects.api.ts, projects.types.ts
    /blog              # blog.api.ts, blog.types.ts
    /contact           # contact.api.ts, contact.types.ts
  /layouts
    MainLayout.tsx     # Header + <Outlet/> + Footer
  /pages
    Home.tsx
    About.tsx
    Services.tsx
    ServiceDetail.tsx
    Projects.tsx
    ProjectDetail.tsx
    Blog.tsx
    PostDetail.tsx
    Contact.tsx
    NotFound.tsx
  /routes
    router.tsx
  /styles
    tailwind.css
  /utils
    seo.ts, format.ts, constants.ts, images.ts
  main.tsx
  index.css
```

---

## 5) Thiết kế hệ thống (Design Tokens)

> Mục tiêu: tái tạo chính xác brand hiện tại, nhưng có **token hoá** để dễ đổi chủ đề.

* **Màu sắc** (ví dụ – \[TODO] thay bằng swatch site hiện tại):

  * `--color-primary: #0C7FDA;`
  * `--color-secondary: #FFB703;`
  * `--color-accent: #2A9D8F;`
  * `--color-text: #1A1A1A;`
  * `--color-muted: #6B7280;`
  * `--bg-body: #FFFFFF; --bg-section: #F7F9FC;`
* **Typography**:

  * Heading: \[TODO font], scale: H1 40/48, H2 32/40, H3 24/32, Body 16/24.
* **Spacing**: 4/8/12/16/24/32/48/64.
* **Radius**: `rounded-xl/2xl` cho card, button.
* **Shadow**: `shadow-md` cho card; `shadow-lg` cho hero overlay.
* **Breakpoints**: `sm 640px`, `md 768px`, `lg 1024px`, `xl 1280px`, `2xl 1536px`.

> Triển khai token bằng Tailwind config (theme.extend) hoặc CSS variables.

---

## 6) Kiến trúc routing & URL Scheme

```
/                 -> Home
/gioi-thieu       -> About
/dich-vu          -> Services (grid các dịch vụ)
/dich-vu/:slug    -> ServiceDetail (nội dung + ảnh minh hoạ)
/du-an            -> Projects (filter theo loại, năm, địa điểm)
/du-an/:slug      -> ProjectDetail (gallery + thông tin thi công)
/tin-tuc          -> Blog (danh sách bài viết)
/tin-tuc/:slug    -> PostDetail
/lien-he          -> Contact (form + bản đồ)
```

* **Breadcrumbs** tại: ServiceDetail, ProjectDetail, PostDetail.
* **Sitemap** sẽ phản chiếu cấu trúc này.

---

## 7) Data Model (TypeScript)

```ts
// features/services/services.types.ts
export interface Service {
  id: string;
  name: string;
  slug: string;
  shortDesc: string;
  contentHtml: string;
  coverUrl?: string;
  seo?: { title?: string; description?: string; image?: string };
}

// features/projects/projects.types.ts
export interface Project {
  id: string;
  name: string;
  slug: string;
  location?: string;
  category?: "dan-dung" | "cong-nghiep" | "noi-that" | "ha-tang" | "khac";
  year?: number;
  investor?: string;         // Chủ đầu tư (nếu có)
  area?: string;             // Diện tích
  shortDesc: string;
  contentHtml: string;       // Mô tả chi tiết, quy trình, vật liệu
  gallery: string[];         // URL ảnh
  seo?: { title?: string; description?: string; image?: string };
}

// features/blog/blog.types.ts
export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  contentHtml: string;
  thumbnail?: string;
  publishedAt: string;       // ISO string
  author?: string;
  tags?: string[];
  seo?: { title?: string; description?: string; image?: string };
}

// features/contact/contact.types.ts
export interface ContactPayload {
  name: string;
  phone: string;
  email?: string;
  message: string;
}
```

---

## 8) Hợp đồng API (REST – dự phòng)

> Có thể thay thế bằng CMS headless (Strapi, Directus, Sanity). Nếu chưa có backend, dùng JSON mock.

* `GET /api/services`: `Service[]`
* `GET /api/services/:slug`: `Service`
* `GET /api/projects?category=&year=&q=&page=`: `{ items: Project[]; total: number }`
* `GET /api/projects/:slug`: `Project`
* `GET /api/posts?page=&tag=`: `{ items: Post[]; total: number }`
* `GET /api/posts/:slug`: `Post`
* `POST /api/contact`: nhận `ContactPayload`

**Yêu cầu chung**: `Cache-Control`, `ETag`, `CORS` cho domain FE.

---

## 9) Phân rã trang & Component chi tiết

### 9.1 Header

* **Thành phần**: Logo, Hotline, Menu chính (đa cấp), Nút CTA "Nhận báo giá".
* **Props**: `menu: MenuItem[]`, `hotline: string`.
* **Yêu cầu**: Sticky, mobile drawer, ARIA nav, focus trap.

### 9.2 Footer

* **Thành phần**: Thông tin công ty, địa chỉ, giờ làm, social, bản đồ embed, liên kết nhanh.
* **Props**: `company: {name, address, phone, email, taxCode, mapEmbed}`.

### 9.3 Home sections

1. **Hero**: slider/banner, heading, subtext, CTA. Lazy images.
2. **ServiceList**: grid 6–8 dịch vụ → link `/dich-vu/:slug`.
3. **AboutBlock**: đoạn giới thiệu + ảnh đội thi công.
4. **StatsStrip**: Số năm kinh nghiệm, số công trình, khách hàng.
5. **ProjectCarousel**: dự án nổi bật (swiper).
6. **ProcessSteps** (tuỳ chọn): 4–6 bước làm việc.
7. **Testimonials**: nhận xét khách hàng.
8. **Partners**: logo đối tác, nhà cung cấp.
9. **CTAQuote**: khối kêu gọi liên hệ.

### 9.4 Services & ServiceDetail

* **Services**: lưới `ServiceCard` (icon/ảnh, tiêu đề, mô tả ngắn). Sidebar (liệt kê dịch vụ).
* **ServiceDetail**: nội dung chi tiết + CTA liên hệ + related services.

### 9.5 Projects & ProjectDetail

* **Projects**: filter (category, year, location), `ProjectCard` -> modal/gallery hoặc trang chi tiết.
* **ProjectDetail**: tiêu đề, meta (năm/địa điểm/diện tích/chủ đầu tư), mô tả, **gallery** (lightbox), phần vật liệu/thi công.

### 9.6 Blog & PostDetail

* **Blog**: danh sách, phân trang, sidebar (tags, bài mới).
* **PostDetail**: nội dung, bài liên quan, structured data Article.

### 9.7 Contact

* **Form**: tên, điện thoại (bắt buộc), email (tùy), nội dung, checkbox đồng ý.
* **Bảo vệ SPAM**: hCaptcha/Cloudflare Turnstile + honeypot + rate limit (phía server).
* **Map**: iframe Google Map/Leaflet.

---

## 10) SEO & SMO

* `<Seo/>` component: title, description, og\:image, canonical.
* `robots.txt`, `sitemap.xml` (build script sinh tự động), **breadcrumb schema**.
* JSON-LD:

  * `Organization`/`LocalBusiness` (địa chỉ, hotline, giờ mở cửa).
  * `BreadcrumbList` cho trang chi tiết.
  * `Article` cho blog; `CreativeWork`/`Project` (tùy) cho dự án.
* **Performance SEO**:

  * Preload font, critical CSS (Tailwind JIT nhẹ), image `srcset`/`sizes`, WebP/AVIF.
  * Code-splitting theo route, lazy import section nặng (carousel, lightbox).
* **Meta đa ngôn ngữ** (nếu có i18n): `hreflang`.

---

## 11) Accessibility (A11y)

* Semantic HTML: `header/nav/main/section/article/footer`.
* Contrast ratio >= 4.5:1.
* Focus visible, skip links, aria-label cho icon button.
* Keyboard navigation đầy đủ (menu, modal, carousel).

---

## 12) Hiệu năng & Hình ảnh

* Ảnh: dùng **responsive** (`srcset`, `sizes`), định dạng **WebP** (fallback JPEG/PNG), lazy-load (`loading="lazy"`).
* Gallery: virtualized list nếu nhiều mục.
* Đo lường: Lighthouse, Web Vitals (CLS < 0.1, LCP < 2.5s, INP < 200ms).

---

## 13) i18n (tuỳ chọn)

* `react-i18next` + namespaces: common, home, services, projects, blog, contact.
* Định tuyến theo locale: `/vi/...` (nếu cần).

---

## 14) Phân tích & đồng ý cookie

* Gtag (GA4) hoặc Plausible/Umami.
* Banner consent nhẹ, chỉ load analytics sau khi đồng ý.

---

## 15) Bảo mật & tuân thủ

* Escape HTML khi render nội dung từ CMS.
* CSP cơ bản, SRI cho script ngoài (nếu dùng).
* Rate limit endpoint contact, xác thực webhook (nếu tích hợp mail service).

---

## 16) Build & Triển khai

* **CI/CD**: GitHub Actions

  * Lint + typecheck.
  * Build sản phẩm `dist/`.
  * Upload artifact & deploy (Vercel/Netlify/Cloudflare Pages/Nginx).
* **Nginx** (nếu tự host):

  * `try_files $uri /index.html;` (SPA routing).
  * nén gzip/brotli, cache static (ảnh, font, JS/CSS).

---

## 17) Kế hoạch Migration (bước thực thi)

1. **Audit & Inventory**

   * \[TODO] Danh sách trang/menu hiện có.
   * Trích xuất: logo, favicon, ảnh hero, ảnh dự án, icon.
   * Ghi nhận font (tên + nguồn), màu sắc, khoảng cách.
2. **Export tài nguyên**

   * Dùng DevTools/`wget`/HTTrack để lấy HTML/CSS/JS/ảnh (nếu không có source).
3. **Token hoá giao diện**

   * Map màu, font vào Tailwind config.
4. **Khởi tạo project**

   * Vite + TS + Tailwind + Router + ESLint/Prettier.
5. **Dựng layout & common**

   * Header, Footer, Container, Seo, Breadcrumbs.
6. **Dựng pages & section** theo thứ tự ưu tiên: Home → Services → Projects → Contact → Blog.
7. **Nhập dữ liệu mẫu**

   * JSON mock cho services/projects/posts.
8. **Tối ưu SEO/hiệu năng**

   * Meta, sitemap, lazy, split, preload font.
9. **QA**

   * Responsive, a11y, forms, Vietnamese charset.
10. **Triển khai & kiểm tra thực tế**

    * Domain, HTTPS, redirect www/non-www, HTTP→HTTPS.

---

## 18) Acceptance Criteria

* UI khớp ≥ 95% với site cũ (đo bằng screenshot diff cho hero/section chính).
* Core Web Vitals: LCP < 2.5s, CLS < 0.1 trên 4G/CPU trung bình.
* SEO cơ bản: title/desc/OG đúng; sitemap + robots hoạt động.
* Routing hoạt động với reload trực tiếp deep link.
* Form liên hệ gửi thành công (mock/real) + chống spam.

---

## 19) Kiểm thử (Testing)

* **Unit**: component pure (cards, list) bằng Vitest/RTL.
* **E2E**: Cypress/Playwright → kiểm tra routing, form, gallery.
* **Visual Regression**: Chromatic/Storybook (tuỳ chọn) hoặc Loki.

---

## 20) Mapping thực tế từ site hiện tại

> Điền sau khi nhận HTML/screenshot/menu.

* **Menu cấp 1**: \[TODO]
* **Menu cấp 2 (nếu có)**: \[TODO]
* **Trang chứa gallery dự án**: \[TODO]
* **Trang tin tức**: \[TODO]
* **Style đặc biệt (gradient, border, pattern)**: \[TODO]

---

## 21) Mẫu code khởi tạo

### 21.1 Router (React Router v6)

```tsx
// /src/routes/router.tsx
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Services from "@/pages/Services";
import ServiceDetail from "@/pages/ServiceDetail";
import Projects from "@/pages/Projects";
import ProjectDetail from "@/pages/ProjectDetail";
import Blog from "@/pages/Blog";
import PostDetail from "@/pages/PostDetail";
import Contact from "@/pages/Contact";
import NotFound from "@/pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "gioi-thieu", element: <About /> },
      { path: "dich-vu", element: <Services /> },
      { path: "dich-vu/:slug", element: <ServiceDetail /> },
      { path: "du-an", element: <Projects /> },
      { path: "du-an/:slug", element: <ProjectDetail /> },
      { path: "tin-tuc", element: <Blog /> },
      { path: "tin-tuc/:slug", element: <PostDetail /> },
      { path: "lien-he", element: <Contact /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);
```

### 21.2 Layout cơ bản

```tsx
// /src/layouts/MainLayout.tsx
import { Outlet } from "react-router-dom";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";

export default function MainLayout() {
  return (
    <div className="min-h-dvh flex flex-col bg-white text-gray-900">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
```

### 21.3 Component SEO

```tsx
// /src/components/common/Seo.tsx
import { Helmet } from "react-helmet-async";

type Props = { title?: string; description?: string; image?: string; canonical?: string };
export default function Seo({ title, description, image, canonical }: Props) {
  const siteName = "Xây Dựng Nam Phong";
  const t = title ? `${title} | ${siteName}` : siteName;
  return (
    <Helmet>
      <title>{t}</title>
      {description && <meta name="description" content={description} />}
      {canonical && <link rel="canonical" href={canonical} />}
      {image && <meta property="og:image" content={image} />}
      <meta property="og:title" content={t} />
      {description && <meta property="og:description" content={description} />}
      <meta property="og:site_name" content={siteName} />
    </Helmet>
  );
}
```

### 21.4 Types & API mock (ví dụ Projects)

```ts
// /src/features/projects/projects.api.ts
import type { Project } from "./projects.types";

const MOCK: Project[] = [
  {
    id: "p1",
    name: "Nhà phố hiện đại Q.7",
    slug: "nha-pho-hien-dai-q7",
    location: "TP.HCM",
    category: "dan-dung",
    year: 2024,
    shortDesc: "Thi công trọn gói 3 tầng, phong cách hiện đại.",
    contentHtml: "<p>Mô tả chi tiết dự án...</p>",
    gallery: ["/images/projects/p1-1.jpg", "/images/projects/p1-2.jpg"],
  },
];

export async function listProjects(): Promise<Project[]> {
  // Thay bằng fetch(`/api/projects`)
  return Promise.resolve(MOCK);
}
```

---

## 22) Biểu đồ luồng (ở mức logic)

1. **Client**: Load `index.html` → download `main.js`/`styles.css`.
2. React Router render `MainLayout` + page tương ứng.
3. Nếu trang cần dữ liệu: gọi `features/*/*.api.ts` (JSON hoặc REST backend).
4. Render section + SEO meta bằng `<Seo/>`.
5. Ảnh/galleries lazy load.
6. Người dùng gửi form → `POST /api/contact` → phản hồi.

---

## 23) Rủi ro & Giảm thiểu

* **Chậm ảnh/galleries** → Tối ưu kích thước, CDN, lazy, `srcset`.
* **Mất SEO khi chuyển URL** → Thiết lập 301 redirect từ URL cũ → mới; cập nhật sitemap.
* **Nội dung từ nguồn không tin cậy** → sanitize/escape trước khi render.
* **Khác biệt font** → nhúng đúng file font, preload, fallback tương thích.

---

## 24) Checklist Go-live

* [ ] Meta title/desc cho từng trang.
* [ ] robots.txt + sitemap.xml hoạt động.
* [ ] Ảnh WebP + fallback.
* [ ] Lighthouse >= 90 mọi mục.
* [ ] 301 redirect (nếu thay slug).
* [ ] GA4/Plausible gắn đúng, tôn trọng consent.
* [ ] Form liên hệ test thực tế (thành công & lỗi).
* [ ] Nút hotline/SMS/Zalo (nếu có) chạy trên mobile.

---

## 25) Phụ lục

### 25.1 `package.json` scripts (Vite)

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview",
    "lint": "eslint .",
    "format": "prettier --write ."
  }
}
```

### 25.2 robots.txt (mẫu)

```
User-agent: *
Allow: /
Sitemap: https://example.com/sitemap.xml
```

### 25.3 .env (mẫu)

```
VITE_API_BASE_URL=/api
```

---

## 26) Hạng mục cần bạn cung cấp để hoàn tất mapping 1:1

* HTML hoặc screenshot full **Trang chủ**, **Dịch vụ**, **Dự án**, **Tin tức**, **Liên hệ**.
* **Danh sách menu + slug mong muốn**.
* Bộ **màu/Font** hiện tại (nếu có file .ttf/.woff2 thì tốt).
* Tối thiểu 10–20 ảnh dự án gốc để dựng gallery.

---

**Kết luận:** Tài liệu này là khung chi tiết để bắt tay vào dựng React ngay. Khi bạn gửi HTML/screenshot/menu, mình sẽ **điền các \[TODO]**, tạo **các component cụ thể** theo đúng layout hiện có và cung cấp **bộ mã khởi tạo** hoàn chỉnh.
