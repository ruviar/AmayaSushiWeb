import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [70, 80, 90],
  },
  async redirects() {
    // PT es el idioma por defecto: la raiz lleva siempre a /pt.
    return [{ source: "/", destination: "/pt", permanent: false }];
  },
  experimental: {
    // TypeScript 7 (port nativo) no expone la API de compilador que usa Next.
    useTypeScriptCli: true,
  },
};

export default nextConfig;
