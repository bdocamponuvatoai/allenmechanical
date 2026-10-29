import type { MetadataRoute } from "next";
import { siteUrl } from "@/config/deployment";
import { serviceHref, services } from "@/content/services";

export const dynamic = "force-static";

const pages = [
  "/",
  "/capabilities/",
  ...services.map(serviceHref),
  "/approach/",
  "/about/",
  "/contact/",
  "/start-project/",
  "/privacy/",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.map((path) => ({ url: `${siteUrl}${path}` }));
}
