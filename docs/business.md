Ok, mình đã **đồng bộ lại toàn bộ tài liệu** thành một bản hoàn chỉnh – chỉ mô tả **nghiệp vụ & tính năng web**, không đụng đến SEO/CI/CD/.env, và **ghim ràng buộc KHÔNG ĐƯỢC THAY ĐỔI** cho 3 phần: TopBanner, Footer, ContactPage như bạn yêu cầu.

---

# 0) Phạm vi

* Website giới thiệu doanh nghiệp xây dựng: **Trang chủ**, **Giới thiệu**, **Dịch vụ** (list + detail), **Dự án** (list + detail), **Tin tức** (list + detail), **Liên hệ**.
* Dữ liệu phase 1: JSON tĩnh `public/data/*.json` (có thể thay bằng CMS sau **không đổi interface**).
* Không triển khai giỏ hàng/sản phẩm; mọi phần “shop/cart/product” **không dùng**.

---

# 1) Kiến trúc thông tin (IA) & Điều hướng

## 1.1 Sitemap

* `/` – Trang chủ
* `/gioi-thieu`
* `/dich-vu` → danh sách

  * `/dich-vu/[slug]` → chi tiết
* `/du-an` → danh sách (có bộ lọc client)

  * `/du-an/[slug]` → chi tiết (gallery)
* `/tin-tuc` → danh sách

  * `/tin-tuc/[slug]` → chi tiết
* `/lien-he`

## 1.2 Menu & Footer

* Menu: Trang chủ, Giới thiệu, Dịch vụ, Dự án, Tin tức, Liên hệ (+ CTA “Nhận báo giá”).
* Footer: Thông tin công ty, liên kết nhanh, giờ làm, social, map nhúng.

**Nơi sửa trong source**

* `components/layout/Header.tsx`, `Navbar.tsx`: định nghĩa `NAV_ITEMS` (thay các mục e-commerce).
* `components/layout/Footer.tsx`: render theo `CompanyProfile`.

---

# 2) Mô hình dữ liệu (bắt buộc)

`src/types`

```ts
// common.types.ts
export type Slug = string;
export type ISODate = string;

// company.types.ts
export interface CompanyProfile {
  name: string;
  slogan?: string;
  phone: string;
  email: string;
  address: string;
  taxCode?: string;
  mapEmbedUrl?: string;
  workingHours?: string;
  socials?: { label: string; url: string }[];
  stats?: { label: string; value: string }[];
  aboutHtml?: string;
  note?: string;
  footer_text?: string;
  license_no?: string;
  logo_url?: string;
}

// service.types.ts
export interface Service {
  id: string;
  slug: Slug;
  title: string;
  shortDesc?: string;
  coverUrl?: string;
  contentHtml?: string;
  highlights?: string[];
  gallery?: string[];
  featured?: boolean;
}

// project.types.ts
export interface Project {
  id: string;
  slug: Slug;
  title: string;
  location?: string;
  year?: string;
  investor?: string;
  area?: string;
  coverUrl?: string;
  gallery?: string[];
  summary?: string;
  contentHtml?: string;
  services?: string[]; // Service.slug
  featured?: boolean;
  tags?: string[];
}

// post.types.ts
export interface Post {
  id: string;
  slug: Slug;
  title: string;
  excerpt?: string;
  coverUrl?: string;
  contentHtml: string;
  publishedAt: ISODate;
  tags?: string[];
}
```

**Adapter dữ liệu** `src/lib/cms.ts`

* Hàm: `getCompany()`, `getServices()`, `getService(slug)`, `getProjects()`, `getProject(slug)`, `getPosts()`, `getPost(slug)`.
* Phase 1 đọc JSON trong `public/data/*`; sau này có thể thay bằng API mà không đổi chữ ký hàm.

---

# 3) Thành phần giao diện & Hành vi

## 3.1 Header

* Logo, hotline, menu đa cấp (≤2 tầng), CTA “Nhận báo giá”.
* Sticky; mobile hamburger → drawer (đóng bằng overlay/ESC).
* Hotline click-to-call (`tel:`).
* Props: `menu: MenuItem[]`, `hotline: string`.

## 3.2 Footer

* Company info, social, working hours, quick links, map iframe.
* Props: `company: CompanyProfile`.

## 3.3 Trang chủ (sections)

1. **Hero**: banner (tĩnh/slider), heading, subtext, 2 CTA (Dịch vụ / Liên hệ).
2. **ServiceList**: grid 6–8 dịch vụ (card → detail).
3. **AboutBlock**: tóm tắt `aboutHtml` + ảnh đội thi công.
4. **StatsStrip**: từ `company.stats`.
5. **ProjectCarousel**: 6–10 dự án `featured: true`.
6. **ProcessSteps** *(tuỳ chọn)*: 4–6 bước thi công.
7. **Testimonials** *(tuỳ chọn)*.
8. **Partners**: logo đối tác.
9. **CTAQuote**: “Nhận báo giá” (link `/lien-he` hoặc scroll).

## 3.4 Dịch vụ

* **List**: grid ServiceCard, sidebar liệt kê dịch vụ; phân trang client nếu >12.
* **Detail**: cover, tiêu đề, `contentHtml`, `highlights`, `gallery`, related 3 item, CTA Liên hệ.

## 3.5 Dự án

* **List**: filter client `?service=&year=&location=`, card cover + meta; phân trang nếu >12.
* **Detail**: meta (năm/địa điểm/diện tích/chủ đầu tư), gallery lightbox, mô tả, dịch vụ liên quan.

## 3.6 Tin tức

* **List**: theo ngày mới nhất, filter `?tag=`, phân trang nếu >10.
* **Detail**: tiêu đề, ngày, cover (nếu có), nội dung, bài liên quan.

## 3.7 Liên hệ

* Trường: name\*; phone\*; email?; service? (select từ services); message\* (≥10); agree\*; hidden honeypot.
* Hành vi: submit `POST /api/contact`; trạng thái gửi/ok/lỗi; throttle 30s/IP.
* Map: iframe từ `company.mapEmbedUrl`.

---

# 4) API & xử lý server

## `POST /api/contact`

**Input JSON**

```json
{
  "name": ">=2",
  "phone": "digits/space/+",
  "email": "optional email",
  "service": "optional slug",
  "message": ">=10",
  "hp": ""
}
```

**Quy tắc**

* `hp` phải rỗng; throttle 1 request/30s/IP.
* Xử lý tối thiểu: ghi log + trả `{ ok: true }`.
* Lỗi: 400 (field message), 429 (quá nhanh), 500 (chung).

---

# 5) Store/Trạng thái

* Không dùng e-commerce: gỡ reducers `products`, `carts` khỏi `lib/store.ts`.
* (Tuỳ chọn) thêm `uiSlice` cho loading/toast/modal của form.

---

# 6) Routing & tái sử dụng

* Slug kebab-case; chi tiết dùng `[slug]`.
* Reuse: `Section`, `PageTitle`, `RichText`, `ImageCard`, `Gallery/Lightbox`, `Pagination`, `Button/Input/Textarea/Select/Skeleton`.
* Trạng thái rỗng: `EmptyState`.
* Tải client (nếu có): `Skeleton`.

---

# 7) Tài sản & quy ước

* Ảnh: `public/images/*` (logo, hero, services, projects, partners).
* Dữ liệu: `public/data/company.json`, `services.json`, `projects.json`, `posts.json`.
* Quy ước tên ảnh: `services/[slug]-cover.jpg`, `projects/[slug]-01.jpg`…

---

# 8) Công việc cần làm trong repo

## 8.1 Loại bỏ e-commerce (không dùng)

* Thư mục:
  `components/cart-page`, `components/product-page`, `components/shop-page`,
  `lib/features/carts`, `lib/features/products`.
* Cập nhật `lib/store.ts`: bỏ reducers trên; giữ `hooks/redux.tsx` (cho UI).

## 8.2 Thêm mới (bắt buộc)

* `components/layout`: `Header`, `Navbar`, `Footer`, `Breadcrumbs`, `Section`.
* `components/homepage`: `Hero`, `ServiceList`, `AboutBlock`, `StatsStrip`, `ProjectCarousel`, `ProcessSteps?`, `Testimonials?`, `Partners`, `CTAQuote`.
* `components/common`: `PageTitle`, `RichText`, `ImageCard`, `Pagination`, `ContactForm`, `EmptyState`, `Gallery/Lightbox`.
* `components/ui`: `Button`, `Input`, `Textarea`, `Select`, `Skeleton`.
* `lib/cms.ts` (adapter).
* `types/*` (mục 2).
* Routes `app/*`:

  ```
  page.tsx
  gioi-thieu/page.tsx
  dich-vu/page.tsx
  dich-vu/[slug]/page.tsx
  du-an/page.tsx
  du-an/[slug]/page.tsx
  tin-tuc/page.tsx
  tin-tuc/[slug]/page.tsx
  lien-he/page.tsx
  api/contact/route.ts
  ```
* `styles/globals.css`: giữ base Tailwind + vài util heading/paragraph/container.
* `app/layout.tsx`: lắp Header/Footer, `<main>`.

---

# 9) Quy tắc UX tối thiểu

* **Form Liên hệ**:
  name min 2, phone chỉ số/space/+; email hợp lệ nếu có; message min 10; agree bắt buộc; honeypot rỗng; trạng thái disable khi gửi, hiển thị thông báo.
* **Danh sách**: rỗng → `EmptyState`; phân trang client size 12.
* **Gallery**: click mở lightbox; mũi tên/ESC điều hướng.
* **Menu mobile**: focus trap trong drawer; đóng bằng overlay/ESC.

---

# 10) Tiêu chí chấp nhận

* Tất cả routes chạy đúng; 404 khi slug không tồn tại.
* Trang chủ có đầy đủ các block ở mục 3.3 (các mục “? ” có thể bỏ).
* Liên hệ trả `{ ok: true }` và throttle hoạt động.
* Dịch vụ/Dự án/Tin tức hiển thị đầy đủ với dữ liệu JSON mẫu.
* **Không còn dấu vết** cart/product/shop trên UI.
* Responsive tốt trên mobile/tablet/desktop.

---

# 11) RÀNG BUỘC KHÔNG ĐƯỢC THAY ĐỔI (3 PHẦN)

> Dữ liệu công ty **bắt buộc** lấy từ backend (đã có trong code mẫu); **không** thay đổi cách gọi/props/markup đã nêu.

## 11.1 TopBanner – `components/layout/Banner/TopBanner.tsx`

* **Props cố định:** `({ company }: { company: Company | null })`.
* **Nguồn dữ liệu:** chỉ đọc `company` truyền xuống; **không tự fetch**.
* **Phần hiển thị bắt buộc:** dòng “Sign up and get 20% off… Sign Up Now”; và nếu có `company` thì **EMAIL** + **HOTLINE**.
* **Kiểu & hành vi:** giữ nguyên container `max-w-frame`; nền đen chữ trắng; nút **close** icon `times.svg` (variant `"ghost"`, `size="icon"`) ở góc phải. **Không** thêm onClick/state tại đây.
* **Imports & classnames:** giữ nguyên như mẫu (Button/Image/Link/Company). **Không** đổi đường dẫn icon, không đổi class tailwind.

## 11.2 Footer – `components/layout/Footer/index.tsx`

* **Props cố định:** `({ company }: { company: Company | null })`.
* **Nguồn dữ liệu:** chỉ từ `company` truyền xuống; **không tự fetch**.
* **Khối bắt buộc:**

  1. Company info (name với `integralCF`, address `whitespace-pre-line` + `FaHome`, hotline + `FaPhoneAlt`, email + `FaEnvelope`, license nếu có).
  2. `LinksSection` (giữ nguyên API/position).
  3. Google Map: render `dangerouslySetInnerHTML` từ `company.google_map_embed` nếu có.
  4. Cụm `socialsData` 4 icon (Twitter, Facebook, Instagram, GitHub) **không đổi thứ tự/URL mẫu**.
* **Cuối trang:** dùng `company.footer_text` nếu có; nếu không → fallback năm hiện tại + tên công ty. Giữ `LayoutSpacing`.
* **Layout/class:** giữ nguyên `max-w-frame`, grid 3 cột md+, class tailwind như mẫu.

## 11.3 ContactPage – `app/lien-he/page.tsx`

* **Dynamic render:** `export const dynamic = "force-dynamic"` **giữ nguyên**.
* **Fetch công ty (bắt buộc):**

  * Lấy `host` từ `headers()`.
  * Gọi `customFetch.get<Company>("/company", { headers: { "X-Client-Domain": domain } })`.
  * Không đổi endpoint, không đổi header `X-Client-Domain`, không thêm query. Lỗi → `null` và log đúng message mẫu.
* **Luồng hiển thị:**

  * `company === null` → “Loading…” (đúng class).
  * Có `company` → render: tên + mô tả; địa chỉ (`FaMapMarkerAlt`, cho phép xuống dòng), email (`FaEnvelope`), hotline (`FaPhoneAlt`), license nếu có (`FaIdCard`), note nếu có (khối vàng); map nếu có (`dangerouslySetInnerHTML`); footer\_text nếu có.
* **Class/thứ tự:** giữ nguyên `max-w-2xl`, `mt-24`, `py-10` và thứ tự các khối, icon.

**Ghi chú chung cho 3 phần**

* Dùng đúng `Company` từ `@/types/company.types`; **không đổi** tên field.
* TopBanner/Footer **không** tự fetch; dữ liệu truyền từ trên (RootLayout).
* **Không đổi** imports/props/markup/chuỗi tĩnh/đường dẫn icon.
* **Không đổi** cách render map (`dangerouslySetInnerHTML`).

