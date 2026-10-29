import Image from "next/image";
import Link from "next/link";
import projectPlanning from "@/assets/images/project-planning.webp";
import rooftopHvac from "@/assets/images/rooftop-hvac.webp";
import sheetMetal from "@/assets/images/sheet-metal.webp";
import { CapabilityExplorer } from "@/components/home/CapabilityExplorer";
import { FaqSection } from "@/components/sections/FaqSection";
import { ProjectCta } from "@/components/sections/ProjectCta";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Lines } from "@/components/ui/Lines";
import { TextLink } from "@/components/ui/TextLink";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Built right. Built to work.",
  path: "/",
  description:
    "Mechanical contracting, HVAC, plumbing and heating, and custom sheet metal fabrication. Kingston, Ontario. Over 35 years of local experience.",
});

const projectPaths = [
  {
    type: "new-construction",
    label: "01 / STARTING FRESH",
    title: "A new build.",
    text: "Bring your project stage, drawings and mechanical requirements.",
  },
  {
    type: "building-upgrade",
    label: "02 / MOVING FORWARD",
    title: "A building upgrade.",
    text: "Start with what’s there today and what needs to work differently.",
  },
  {
    type: "fabrication",
    label: "03 / GETTING SPECIFIC",
    title: "A custom detail.",
    text: "Share the application, dimensions and fabrication requirements.",
  },
];

const processSteps = [
  ["Understand the project.", "The building, the scope, the people and the timing."],
  ["Work through the details.", "Drawings, existing conditions and the interfaces that matter."],
  ["Agree the next step.", "A clear discussion of scope, availability and what comes next."],
];

export default function HomePage() {
  return (
    <>
      <section className="hero container">
        <div className="hero-topline">
          <p className="eyebrow">
            <span className="status-dot"></span> MECHANICAL CONTRACTORS / KINGSTON, ON
          </p>
          <span className="hero-coordinate">CRAFT. COORDINATION. CONNECTION.</span>
        </div>
        <div className="hero-heading">
          <h1>
            Built right.
            <br /> <span>Built to work.</span>
          </h1>
          <div className="hero-intro">
            <p>Mechanical contracting. Plumbing & heating. Custom sheet metal.</p>
            <p>Over 35 years of experience behind the systems that bring buildings to life.</p>
            <TextLink href="/capabilities/">Explore our capabilities</TextLink>
          </div>
        </div>
      </section>
      <section className="hero-image-wrap">
        <div className="hero-image">
          <Image
            src={rooftopHvac}
            alt="Illustrative mechanical tradespeople beside rooftop HVAC equipment in Ontario"
            loading="eager"
            fetchPriority="high"
          />
          <div className="hero-image-shade"></div>
          <div className="image-caption">
            <span className="crosshair" aria-hidden="true">
              +
            </span>
            <div>
              <p>THE WORK BEHIND THE WAY WE LIVE.</p>
              <span>Air. Water. Heat. Possibility.</span>
            </div>
            <a className="hero-scroll" href="#expertise" aria-label="Explore the expertise below">
              ↓
            </a>
          </div>
          <span className="image-index">01 — SYSTEMS IN PLACE</span>
        </div>
      </section>
      <section className="container introduction" id="expertise">
        <p className="eyebrow">EXPERIENCE THAT CONNECTS THE DETAILS</p>
        <div className="intro-main">
          <h2>
            Great buildings work
            <br /> from the <span>inside out.</span>
          </h2>
          <p>
            Behind the walls, above the ceiling, and across the site, every connection has a
            purpose. Allen Mechanical brings together practical mechanical experience and custom
            fabrication for the construction community.
          </p>
        </div>
        <div className="fact-row">
          <div>
            <strong>
              35<span>+</span>
            </strong>
            <p>
              <Lines lines={["Years serving", "the Kingston area"]} />
            </p>
          </div>
          <div>
            <strong>04</strong>
            <p>
              <Lines lines={["Connected areas", "of capability"]} />
            </p>
          </div>
          <div>
            <strong>01</strong>
            <p>
              <Lines lines={["Conversation to", "get things moving"]} />
            </p>
          </div>
          <div className="location-fact">
            <span className="north-arrow" aria-hidden="true">
              ↗
            </span>
            <p>
              <Lines
                lines={["Rooted in Kingston.", <strong key="s">Built for what’s next.</strong>]}
              />
            </p>
          </div>
        </div>
      </section>
      <section className="capabilities-section" id="capabilities">
        <div className="container">
          <div className="section-heading">
            <div>
              <p className="eyebrow">CONNECTED CAPABILITIES</p>
              <h2>
                <Lines lines={["One project.", "Every detail matters."]} />
              </h2>
            </div>
            <TextLink href="/capabilities/">View all capabilities</TextLink>
          </div>
          <CapabilityExplorer />
        </div>
      </section>
      <section className="container craft-section">
        <div className="craft-copy">
          <p className="eyebrow">THE CRAFT IN THE CONNECTION</p>
          <h2>
            <Lines lines={["Some details", "can’t come", <em key="e">off the shelf.</em>]} />
          </h2>
          <p>
            That’s where custom sheet metal comes in. A fitting. A transition. A detail that needs
            to work with everything around it.
          </p>
          <p>
            Bring us the application and the dimensions. Let’s talk about making the right
            connection.
          </p>
          <ButtonLink href="/capabilities/sheet-metal/" variant="outline">
            Explore custom fabrication
          </ButtonLink>
        </div>
        <div className="craft-image">
          <Image
            src={sheetMetal}
            alt="Illustrative fabricator measuring a custom sheet metal fitting"
          />
          <div className="craft-caption">
            <span>FORM FOLLOWS FUNCTION.</span>
            <span>02 / THE CRAFT</span>
          </div>
        </div>
      </section>
      <section className="project-paths">
        <div className="container">
          <div className="section-heading">
            <div>
              <p className="eyebrow">WHERE DO WE START?</p>
              <h2>
                <Lines lines={["Different projects.", "A clear next step."]} />
              </h2>
            </div>
            <p>
              <Lines lines={["Give us the context.", "We’ll start with the right conversation."]} />
            </p>
          </div>
          <div className="path-grid">
            {projectPaths.map((path) => (
              <Link key={path.type} href={`/start-project/?type=${path.type}`}>
                <span>{path.label}</span>
                <h3>{path.title}</h3>
                <p>{path.text}</p>
                <span className="path-arrow" aria-hidden="true">
                  ↗
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="container experience-section">
        <div className="experience-image">
          <Image
            src={projectPlanning}
            alt="Illustrative tradespeople reviewing a drawing together"
          />
          <span>03 / WORKING IT THROUGH</span>
        </div>
        <div className="experience-copy">
          <p className="eyebrow">MORE THAN THREE DECADES. STILL BUILDING.</p>
          <h2>
            Kingston roots.
            <br /> Forward <span>thinking.</span>
          </h2>
          <p>
            Allen Mechanical has been part of the Kingston area’s construction community for over 35
            years. Led by CEO Ken Crook, the company brings mechanical contracting, plumbing and
            heating, and custom sheet metal fabrication into one conversation.
          </p>
          <TextLink href="/about/">Get to know Allen</TextLink>
          <div className="experience-footnote">
            <span>LOCAL EXPERIENCE</span>
            <span>LASTING CONNECTIONS</span>
          </div>
        </div>
      </section>
      <section className="container process-preview">
        <div>
          <p className="eyebrow">A BETTER START</p>
          <h2>
            <Lines lines={["Good work begins", "with good questions."]} />
          </h2>
          <TextLink href="/approach/">Explore the approach</TextLink>
        </div>
        <ol>
          {processSteps.map(([title, text], i) => (
            <li key={title}>
              <span>{`0${i + 1}`}</span>
              <div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>
      <FaqSection
        eyebrow="BEFORE WE CONNECT"
        heading={["A little more", "clarity."]}
        link={{ href: "/contact/", label: "Talk to the team" }}
      />
      <ProjectCta />
    </>
  );
}
