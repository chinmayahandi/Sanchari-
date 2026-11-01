import { MetadataRoute } from "next";
import { DESTINATIONS_DATA } from "@/data/destinations";
import { STAYS_DATA } from "@/data/stays";
import { GUIDES_DATA } from "@/data/guides";
import { EXPERIENCES_DATA } from "@/data/experiences";
import { ARTICLES_DATA } from "@/data/articles";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://sanchari.in";

  const staticRoutes = [
    "",
    "/destinations",
    "/stays",
    "/guides",
    "/experiences",
    "/search",
    "/help",
    "/articles",
    "/partners",
    "/about",
    "/contact",
    "/privacy",
    "/terms",
    "/cancellation-policy",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  const destinationRoutes = DESTINATIONS_DATA.map((d) => ({
    url: `${baseUrl}/destinations/${d.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  const stayRoutes = STAYS_DATA.map((s) => ({
    url: `${baseUrl}/stays/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const guideRoutes = GUIDES_DATA.map((g) => ({
    url: `${baseUrl}/guides/${g.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const experienceRoutes = EXPERIENCES_DATA.map((e) => ({
    url: `${baseUrl}/experiences/${e.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const articleRoutes = ARTICLES_DATA.map((a) => ({
    url: `${baseUrl}/articles/${a.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    ...staticRoutes,
    ...destinationRoutes,
    ...stayRoutes,
    ...guideRoutes,
    ...experienceRoutes,
    ...articleRoutes,
  ];
}
