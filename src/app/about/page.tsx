import Image from "next/image";
import sheetMetal from "@/assets/images/sheet-metal.webp";
import { PageIntro } from "@/components/sections/PageIntro";
import { ProjectCta } from "@/components/sections/ProjectCta";
import { Lines } from "@/components/ui/Lines";
import { TextLink } from "@/components/ui/TextLink";
import { mailto, site } from "@/config/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Kingston roots. Mechanical experience.",
  path: "/about/",
  description:
    "Meet Allen Mechanical Inc., a Kingston mechanical contractor led by Ken Crook with over 35 years in the area.",
});

export default function AboutPage() {
  return (
    <>
      <PageIntro
        eyebrow="ABOUT ALLEN MECHANICAL"
        title={["Built on experience.", "Rooted in Kingston."]}
      />
      <section className="container about-layout">
        <div className="about-stat">
          <span>35+</span>
          <p>
            <Lines lines={["Years in the", "Kingston area."]} />
          </p>
          <div className="stat-lines" aria-hidden="true"></div>
        </div>
        <div className="about-copy">
          <h2>
            <Lines lines={["The work behind", "a working building."]} />
          </h2>
          <p>
            Allen Mechanical Inc. is a mechanical contracting company based in Kingston, Ontario.
            For over 35 years, the business has served the local construction industry with
            mechanical contracting, plumbing and heating, and custom sheet metal fabrication.
          </p>
          <p>
            Led by CEO Ken Crook, Allen Mechanical is a point of contact for project teams looking
            to discuss the systems and custom details that make up their next construction project.
          </p>
          <div className="leader-line">
            <span className="leader-initials">{site.contact.initials}</span>
            <span>
              <strong>{site.contact.name}</strong>
              <small>{site.contact.title}</small>
            </span>
            <a href={mailto} aria-label={`Email ${site.contact.name}`}>
              ↗
            </a>
          </div>
        </div>
      </section>
      <div className="container wide-photo about-photo">
        <Image src={sheetMetal} alt="Illustrative sheet metal fabrication craftsmanship" />
      </div>
      <section className="container local-section">
        <p className="eyebrow">LOCAL EXPERIENCE. PRACTICAL CONNECTIONS.</p>
        <h2>
          <Lines lines={["Kingston is where", "the conversation starts."]} />
        </h2>
        <div>
          <p>
            A construction project depends on the work you see and the systems you don’t. Allen
            Mechanical’s capabilities bring those essential details into focus.
          </p>
          <p>
            Have a project in Kingston or the surrounding area? Tell us about it and let’s discuss
            the fit.
          </p>
          <TextLink href="/contact/">Connect with the company</TextLink>
        </div>
      </section>
      <ProjectCta />
    </>
  );
}
