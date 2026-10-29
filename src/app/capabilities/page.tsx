import Image from "next/image";
import Link from "next/link";
import { PageIntro } from "@/components/sections/PageIntro";
import { ProjectCta } from "@/components/sections/ProjectCta";
import { Lines } from "@/components/ui/Lines";
import { TextLink } from "@/components/ui/TextLink";
import { serviceHref, services } from "@/content/services";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Our capabilities",
  path: "/capabilities/",
  description:
    "Explore Allen Mechanical’s mechanical contracting, HVAC, plumbing and heating, and custom sheet metal capabilities.",
});

export default function CapabilitiesPage() {
  return (
    <>
      <PageIntro eyebrow="OUR CAPABILITIES" title={["The details connect.", "The building works."]}>
        <div className="intro-bottom">
          <p>
            <Lines
              lines={[
                "Explore the work behind the walls, above the ceilings,",
                "and at the heart of the building.",
              ]}
            />
          </p>
          <TextLink href="/start-project/">Discuss your requirements</TextLink>
        </div>
      </PageIntro>
      <section className="container capability-list">
        {services.map((s) => (
          <article key={s.slug} className="capability-row">
            <Link className="capability-row-image" href={serviceHref(s)}>
              <Image src={s.image} alt={s.alt} />
            </Link>
            <div>
              <p className="eyebrow">{s.label}</p>
              <h2>{s.name}</h2>
              <p>{s.description}</p>
              <TextLink href={serviceHref(s)}>Explore this capability</TextLink>
            </div>
          </article>
        ))}
      </section>
      <ProjectCta />
    </>
  );
}
