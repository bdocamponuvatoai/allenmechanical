// Business details and navigation. Safe to import from client components.
// Contact details are from the Kingston Construction Association directory;
// confirm them with the company before launch (see README).

export const site = {
  name: "Allen Mechanical",
  legalName: "Allen Mechanical Inc.",
  locale: "en-CA",
  themeColor: "#f5f5f1",
  phone: {
    display: "613 634 7298",
    dashed: "613-634-7298",
    href: "tel:+16136347298",
  },
  email: "ken@allenmechanical.ca",
  contact: {
    name: "Ken Crook",
    initials: "KC",
    title: "Chief Executive Officer",
  },
  address: {
    street: "3026 Creekford Road",
    locality: "Kingston",
    region: "ON",
    postalCode: "K7P 2Z4",
    country: "CA",
  },
} as const;

export const mailto = `mailto:${site.email}`;

type NavKey = "capabilities" | "approach" | "about" | "contact";

export const mainNav: { key: NavKey; label: string; href: string }[] = [
  { key: "capabilities", label: "Capabilities", href: "/capabilities/" },
  { key: "approach", label: "Our approach", href: "/approach/" },
  { key: "about", label: "About Allen", href: "/about/" },
  { key: "contact", label: "Contact", href: "/contact/" },
];
