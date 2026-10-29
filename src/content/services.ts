import type { StaticImageData } from "next/image";
import mechanicalRoom from "@/assets/images/mechanical-room.webp";
import projectPlanning from "@/assets/images/project-planning.webp";
import rooftopHvac from "@/assets/images/rooftop-hvac.webp";
import sheetMetal from "@/assets/images/sheet-metal.webp";

export type Service = {
  slug: "mechanical-contracting" | "hvac" | "plumbing-heating" | "sheet-metal";
  name: string;
  short: string;
  label: string;
  image: StaticImageData;
  alt: string;
  /** Detail page heading, one entry per line. */
  heading: [string, string];
  intro: string;
  scope: string[];
  description: string;
  question: string;
  guidance: string;
};

export const services: Service[] = [
  {
    slug: "mechanical-contracting",
    name: "Mechanical contracting",
    short: "The systems behind the structure.",
    label: "01 / MECHANICAL",
    image: projectPlanning,
    alt: "Illustrative tradespeople reviewing a mechanical drawing on a construction site",
    heading: ["A considered approach.", "A connected building."],
    intro:
      "Mechanical work is part of a bigger picture. Bring Allen Mechanical into the conversation about your plans, site requirements and the work ahead.",
    scope: [
      "Project requirements and mechanical scope",
      "Drawing and specification review",
      "Trade interfaces and site access",
      "Project timing and handover requirements",
    ],
    description:
      "A starting point for contractors, owners and project teams looking for mechanical contracting experience in Kingston.",
    question: "What does your project need?",
    guidance:
      "Share the location, project stage, drawings available and the mechanical package you want to discuss.",
  },
  {
    slug: "hvac",
    name: "HVAC & ventilation",
    short: "Comfort starts behind the scenes.",
    label: "02 / AIR",
    image: rooftopHvac,
    alt: "Illustrative commercial rooftop air handling equipment and ductwork",
    heading: ["Good buildings", "need good air."],
    intro:
      "Heating, ventilation and air conditioning belong in the project conversation from the beginning. Start with the building, its use and what you need the system to do.",
    scope: [
      "Heating and cooling project requirements",
      "Ventilation and ductwork scope",
      "Equipment access and space constraints",
      "Existing systems and upgrade objectives",
    ],
    description:
      "Discuss the HVAC scope for a new building, a renovation or a planned equipment change.",
    question: "A new system or a new requirement?",
    guidance:
      "Tell us how the space is used, what is already installed and what needs to change. Availability and the final scope are confirmed with the team.",
  },
  {
    slug: "plumbing-heating",
    name: "Plumbing & heating",
    short: "Essential connections. Considered carefully.",
    label: "03 / WATER & HEAT",
    image: mechanicalRoom,
    alt: "Illustrative commercial mechanical room with orderly pipework and circulation equipment",
    heading: ["Behind every space,", "essential connections."],
    intro:
      "From the project drawings to the connections that serve a building, plumbing and heating work deserves a clear scope and a practical conversation.",
    scope: [
      "Plumbing and heating project scope",
      "Pipework and equipment requirements",
      "Connection points and existing conditions",
      "Access, timing and project constraints",
    ],
    description:
      "Plumbing and heating are established parts of Allen Mechanical’s work in the Kingston construction community.",
    question: "Let’s start with the essentials.",
    guidance:
      "Include the property type, location and the system or work package involved. The team can review the requirements with you.",
  },
  {
    slug: "sheet-metal",
    name: "Custom sheet metal",
    short: "Made to fit the work.",
    label: "04 / FABRICATION",
    image: sheetMetal,
    alt: "Illustrative sheet metal fabricator checking a folded duct fitting with a square",
    heading: ["Precision takes shape.", "One detail at a time."],
    intro:
      "Some details need a custom fit. Start a conversation about sheet metal fabrication with the dimensions, application and drawings that define your requirement.",
    scope: [
      "Custom sheet metal requirements",
      "Ductwork components and fittings",
      "Dimensions, materials and finishes to review",
      "Quantities, drawings and required timing",
    ],
    description:
      "Custom sheet metal fabrication complements the company’s mechanical, plumbing and heating capabilities.",
    question: "Have a detail that needs making?",
    guidance:
      "Prepare a dimensioned sketch or drawing and your intended use. Materials, tolerances, quantities and lead times need to be agreed before fabrication.",
  },
];

export function findService(slug: string | null | undefined): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export const serviceHref = (s: Service) => `/capabilities/${s.slug}/`;
