import { Suspense } from "react";
import { BriefBuilder } from "@/components/start-project/BriefBuilder";
import { PresetBriefBuilder } from "@/components/start-project/PresetBriefBuilder";
import { Lines } from "@/components/ui/Lines";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Start your project conversation",
  path: "/start-project/",
  description:
    "Create a clear mechanical project brief, download a copy and connect directly with Allen Mechanical.",
});

export default function StartProjectPage() {
  return (
    <>
      <section className="container planner-intro">
        <p className="eyebrow">START A PROJECT</p>
        <h1>
          Let’s put your
          <br /> <span>plans in motion.</span>
        </h1>
        <p>
          <Lines
            lines={[
              "A clear brief makes a better first conversation.",
              "Prepare yours in a few simple steps.",
            ]}
          />
        </p>
      </section>
      {/* The static HTML contains the plain form; presets apply once the URL is read. */}
      <Suspense fallback={<BriefBuilder />}>
        <PresetBriefBuilder />
      </Suspense>
    </>
  );
}
