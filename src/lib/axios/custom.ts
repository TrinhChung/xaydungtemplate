import axios from "axios";
import { headers } from "next/headers";

// Lấy base URL từ env (Next.js dùng NEXT_PUBLIC_API_URL cho client-side)
const baseURL =
  typeof window === "undefined"
    ? process.env.NEXT_PUBLIC_API_URL + "/api/"
    : (process.env.NEXT_PUBLIC_API_URL as string) + "/api/";

const customFetch = axios.create({
  baseURL,
  headers: {
    Accept: "application/json",
  },
});

// Interceptor chỉ gắn X-Client-Domain ở phía client (browser)
import type { InternalAxiosRequestConfig } from "axios";

customFetch.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (typeof window !== "undefined") {
      // Only in browser
      // Lấy headers của request
      const h = headers();
      // Tìm domain từ host header
      const domain = h.get("host") || "localhost";
      config.headers = config.headers || {};
      console.log("Setting X-Client-Domain:", domain);
      config.headers["X-Client-Domain"] = domain;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default customFetch;
