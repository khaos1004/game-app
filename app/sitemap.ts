import type { MetadataRoute } from "next";
import { site } from "@/lib/data";

export const dynamic = "force-static";

const routes = ["", "/gamelist", "/companyintro", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return routes.map((r) => ({
    url: `${site.url}${r}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: r === "" ? 1 : 0.7,
  }));
}
