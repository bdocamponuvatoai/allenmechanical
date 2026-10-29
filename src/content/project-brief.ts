// Options for the start-project brief builder.

export const projectTypes = [
  { value: "new-construction", label: "New construction" },
  { value: "building-upgrade", label: "Building upgrade or renovation" },
  { value: "fabrication", label: "Custom fabrication" },
  { value: "other", label: "Other / let’s discuss" },
] as const;

export type ProjectType = (typeof projectTypes)[number]["value"];

export function isProjectType(value: string | null): value is ProjectType {
  return projectTypes.some((t) => t.value === value);
}

export const projectStages = [
  "Early planning",
  "Design development",
  "Tender / estimating",
  "Ready to discuss scheduling",
];

export const targetTimings = [
  "To be discussed",
  "Within 1–3 months",
  "Within 3–6 months",
  "More than 6 months away",
];

export const drawingStatuses = [
  "Not yet",
  "Preliminary drawings",
  "Issued drawings / specifications",
  "Sketches or dimensions",
];

export const briefSteps = ["Define the scope", "Add the context", "Review & connect"];
