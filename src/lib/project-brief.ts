import { site } from "@/config/site";
import { projectTypes } from "@/content/project-brief";
import { services } from "@/content/services";

export type BriefRow = [label: string, value: string];

const text = (data: FormData, name: string) => String(data.get(name) ?? "").trim();

function typeLabel(data: FormData) {
  return projectTypes.find((t) => t.value === data.get("type"))?.label;
}

/** Summary rows shown on the review step, in display order. */
export function briefRows(data: FormData): BriefRow[] {
  const names = data
    .getAll("services")
    .map((slug) => services.find((s) => s.slug === slug)?.name)
    .filter(Boolean);
  return [
    ["Capabilities", names.join(", ")],
    ["Project type", typeLabel(data) ?? ""],
    ["Location", text(data, "city")],
    ["Project stage", String(data.get("stage"))],
    ["Target timing", String(data.get("timing"))],
    ["Drawings", String(data.get("drawings"))],
    ["Company", text(data, "company") || "Not provided"],
    ["Contact", text(data, "name") || "Not provided"],
    ["Notes", text(data, "notes") || "To discuss with the team"],
  ];
}

/** Plain-text brief used for both the email body and the download. */
export function briefText(rows: BriefRow[]): string {
  return (
    `${site.legalName.toUpperCase()}\nProject inquiry brief\n\n` +
    rows.map(([k, v]) => `${k}: ${v}`).join("\n") +
    "\n\nPlease review these requirements and discuss the appropriate next step. This brief is not a quotation, booking or contract.\n\n" +
    `${site.legalName}\n${site.phone.dashed}\n${site.email}\n`
  );
}

export function briefMailto(data: FormData, body: string): string {
  const subject = `Project inquiry — ${typeLabel(data)}`;
  return `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
