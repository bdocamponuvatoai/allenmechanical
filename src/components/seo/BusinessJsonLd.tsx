import rooftopHvac from "@/assets/images/rooftop-hvac.webp";
import { siteUrl } from "@/config/deployment";
import { site } from "@/config/site";
import { services } from "@/content/services";
import { JsonLd } from "./JsonLd";

/** Business facts already shown on the site, as schema.org data. */
export function BusinessJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "HVACBusiness",
        name: site.legalName,
        url: `${siteUrl}/`,
        image: `${siteUrl}${rooftopHvac.src}`,
        telephone: "+1-613-634-7298",
        email: site.email,
        address: {
          "@type": "PostalAddress",
          streetAddress: site.address.street,
          addressLocality: site.address.locality,
          addressRegion: site.address.region,
          postalCode: site.address.postalCode,
          addressCountry: site.address.country,
        },
        knowsAbout: services.map((s) => s.name),
      }}
    />
  );
}
