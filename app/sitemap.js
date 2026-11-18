import { SERVICE_PAGES_PUBLIC, SERVICE_PATHS } from "@/lib/features";

export default function sitemap() {
  const baseUrl = "https://stillsoulproduction.hu";

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    // Szolgáltatás-aloldalak — csak ha nyilvánosak (lib/features.js).
    ...(SERVICE_PAGES_PUBLIC ? SERVICE_PATHS : []).map((path) => ({
      url: `${baseUrl}${path}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    })),
    {
      url: `${baseUrl}/portfolio`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/adatkezeles`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: `${baseUrl}/impresszum`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];
}
