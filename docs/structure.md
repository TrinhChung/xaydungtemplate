# TÀI LIỆU CẤU TRÚC & KIẾN TRÚC

**Dự án:** Chuyển website *Xây Dựng Nam Phong* sang **Next.js** (App Router + tối ưu SEO)

> Ghi chú: Vì chưa thể truy cập trực tiếp URL bạn gửi, nội dung dưới đây trình bày bộ khung đầy đủ, có thể map nhanh với giao diện hiện có. Các mục có **[TODO]** sẽ được điền khi bạn cung cấp HTML/screenshot/menu.

---

## 1) Mục tiêu & Phạm vi

* **Mục tiêu**
  * Giữ nguyên bố cục, nội dung và phong cách thương hiệu của site hiện tại.
  * Nâng cấp codebase sang **Next.js + TypeScript** để dễ bảo trì, mở rộng.
  * Tối ưu **SEO/hiệu năng** (LCP, CLS, TBT), **khả năng truy cập** (WCAG 2.2), **responsive**.
  * Chuẩn bị sẵn các điểm tích hợp: **form liên hệ**, **danh mục dịch vụ**, **dự án (gallery)**, **tin tức**.
* **Phạm vi**
  * Frontend Next.js: layout, routing, components, data models, SSR/SSG, SEO, analytics.
  * Không bao gồm redesign. Style sẽ **clone 1:1** (hoặc tinh gọn bằng Tailwind).
  * Backend/API: tách riêng. Tài liệu định nghĩa sẵn **hợp đồng API**.

---

## 2) Lựa chọn kiến trúc

### 2.1 Phương án khuyến nghị

* **Next.js 14 (App Router) + TypeScript**: hỗ trợ SSR/SSG, Image Optimization, Middleware cho i18n, sitemap...
* **TailwindCSS** cho utility-first, tái sử dụng class, tốc độ dựng UI.
* **TanStack Query** (tùy chọn) nếu có API động; nếu nội dung tĩnh: dùng JSON.

### 2.2 Ghi chú

* Có thể triển khai SPA nhẹ bằng Vite nếu dự án nhỏ và không yêu cầu SEO mạnh, nhưng hiện tại **Next.js** là lựa chọn chính.

---

## 3) Tooling & Chuẩn code

* **ESLint** (airbnb + react + typescript), **Prettier**, **lint-staged** + **husky** (pre-commit).
* **Commitlint** + Conventional Commits.
* **Path alias**: `@/app`, `@/components`, `@/lib`, `@/types`, `@/utils`, `@/styles`.
* **.editorconfig** để đồng nhất indent/charset/end-of-line.

---

## 4) Cấu trúc thư mục

```
/src
  /app
    layout.tsx         # Header + Footer + Providers
    page.tsx           # Trang chủ
    /gioi-thieu
      page.tsx
    /dich-vu
      page.tsx
      /[slug]
        page.tsx
    /du-an
      page.tsx
      /[slug]
        page.tsx
    /tin-tuc
      page.tsx
      /[slug]
        page.tsx
    /lien-he
      page.tsx
    /not-found.tsx
  /components
    /common            # Header, Footer, Seo, Breadcrumbs, Container...
    /home              # Hero, ServiceList, AboutBlock, StatsStrip, ProjectCarousel, Testimonials, Partners, CTA
    /services          # ServiceCard, ServiceSidebar
    /projects          # ProjectCard, ProjectFilter, ProjectGallery, ProjectMeta
    /blog              # PostCard, PostSidebar, CategoryList
    /ui                # Button, Card, Modal, Tabs... (tùy chọn)
  /lib                # helper functions, config
    seo.ts, api.ts, constants.ts
  /styles
    globals.css
  /types
    ...
```

---

## 5) Thiết kế hệ thống (Design Tokens)

> Mục tiêu: tái tạo chính xác brand hiện tại, nhưng có token hoá để dễ đổi chủ đề.

* **Màu sắc** (ví dụ – [TODO] thay bằng swatch site hiện tại):
  * `--color-primary: #0C7FDA;`
  * `--color-secondary: #FFB703;`
  * `--color-accent: #2A9D8F;`
  * `--color-text: #1A1A1A;`
  * `--color-muted: #6B7280;`
  * `--bg-body: #FFFFFF; --bg-section: #F7F9FC;`
* **Typography**:
  * Heading: [TODO font], scale: H1 40/48, H2 32/40, H3 24/32, Body 16/24.
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


