// Only the CMS admin may embed this site in an iframe (visual editor).
const adminOrigins = (process.env.NEXT_PUBLIC_CMS_ADMIN_ORIGIN ?? "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value: `frame-ancestors 'self' ${adminOrigins.join(" ")}`.trim(),
          },
        ],
      },
    ];
  },
  // Dev: IP-ről (pl. telefon ugyanazon a wifin) való eléréshez engedett origin-ök.
  // Enélkül a Next blokkolja a /_next erőforrásokat (JS/CSS/HMR) → fekete oldal más eszközön.
  allowedDevOrigins: ["192.168.0.150"],
  // next/image külső képforrásai (Supabase Storage + YouTube-fallback thumbnail).
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "lpimxezspyrlirqwffwg.supabase.co" },
      // Ügyfél Admin CMS (feltöltött WebP-k unoptimized-ként mennek, de a default-ok is innen jöhetnek)
      { protocol: "https", hostname: "fwhgroduenrtixzuwpfv.supabase.co" },
      { protocol: "https", hostname: "img.youtube.com" },
      { protocol: "https", hostname: "i.ytimg.com" },
    ],
  },
};

export default nextConfig;
