export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/auth", "/api"],
    },
    sitemap: "https://stillsoulproduction.hu/sitemap.xml",
  };
}
