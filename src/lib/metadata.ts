import type { Metadata } from "next";
import rooftopHvac from "@/assets/images/rooftop-hvac.webp";
import { site } from "@/config/site";

type PageMeta = { title: string; path: string; description?: string };

/** Per-page metadata: "<title> | Allen Mechanical", canonical URL and Open Graph. */
export function pageMetadata({ title, path, description }: PageMeta): Metadata {
  const fullTitle = `${title} | ${site.name}`;
  return {
    title: { absolute: fullTitle },
    description,
    alternates: { canonical: path },
    openGraph: {
      title: fullTitle,
      description,
      type: "website",
      images: [{ url: rooftopHvac.src, width: rooftopHvac.width, height: rooftopHvac.height }],
    },
  };
}
