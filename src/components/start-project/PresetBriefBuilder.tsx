"use client";

import { useSearchParams } from "next/navigation";
import { isProjectType } from "@/content/project-brief";
import { findService, type Service } from "@/content/services";
import { BriefBuilder } from "./BriefBuilder";

/** Reads the ?service= and ?type= presets. Render inside <Suspense> with a plain BriefBuilder fallback. */
export function PresetBriefBuilder() {
  const params = useSearchParams();
  const service = findService(params.get("service"))?.slug;
  const type = params.get("type");
  const presetType = isProjectType(type) ? type : undefined;

  const presetServices: Service["slug"][] = [];
  if (service) presetServices.push(service);
  if (presetType === "fabrication") presetServices.push("sheet-metal");

  return (
    <BriefBuilder
      key={`${service}|${presetType}`}
      presetServices={presetServices}
      presetType={presetType}
    />
  );
}
