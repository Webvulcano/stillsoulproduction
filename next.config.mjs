/** @type {import('next').NextConfig} */
const nextConfig = {
  // Dev: IP-ről (pl. telefon ugyanazon a wifin) való eléréshez engedett origin-ök.
  // Enélkül a Next blokkolja a /_next erőforrásokat (JS/CSS/HMR) → fekete oldal más eszközön.
  allowedDevOrigins: ["192.168.0.150"],
  // A képek előre méretezett WebP-k a Supabase Storage-ban (thumb/full) →
  // nincs Vercel Image Optimization, a böngésző közvetlenül a Supabase CDN-ről tölt.
  // remotePatterns: next/image külső képforrásai (Supabase Storage + YouTube-fallback thumbnail).
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "lpimxezspyrlirqwffwg.supabase.co" },
      { protocol: "https", hostname: "img.youtube.com" },
      { protocol: "https", hostname: "i.ytimg.com" },
    ],
  },
};

export default nextConfig;
