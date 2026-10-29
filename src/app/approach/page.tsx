import Image from "next/image";
import projectPlanning from "@/assets/images/project-planning.webp";
import { PageIntro } from "@/components/sections/PageIntro";
import { ProjectCta } from "@/components/sections/ProjectCta";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Lines } from "@/components/ui/Lines";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "A clear start to your project",
  path: "/approach/",
  description:
    "Prepare for a productive mechanical contracting conversation: project context, technical requirements and a clear next step.",
});

const steps = [
  {
    eyebrow: "UNDERSTAND",
    title: "The project before the parts.",
    text: "Tell us what you’re building or changing. Location, intended use, current project stage and timing give the conversation a useful starting point.",
    questions: ["Where is the project?", "What needs to happen?", "What stage are you at?"],
  },
  {
    eyebrow: "REVIEW",
    title: "The details that shape the work.",
    text: "Drawings, specifications, site access and existing conditions help define a mechanical package. Share what you have and identify what still needs to be resolved.",
    questions: [
      "Which trades and systems are involved?",
      "Are drawings or specifications available?",
      "What constraints should be discussed?",
    ],
  },
  {
    eyebrow: "CONNECT",
    title: "A practical next step.",
    text: "Use the project brief to organise your thoughts, then connect directly with Ken and the team. Scope, scheduling and pricing are discussed with the company.",
  },
];

export default function ApproachPage() {
  return (
    <>
      <PageIntro eyebrow="OUR APPROACH" title={["Clear conversations.", "Better foundations."]}>
        <p>
          <Lines
            lines={[
              "Start with what matters. Work through what’s needed.",
              "Make the next step a clear one.",
            ]}
          />
        </p>
      </PageIntro>
      <div className="container wide-photo">
        <Image
          src={projectPlanning}
          alt="Illustrative team discussing drawings on a construction site"
          loading="eager"
          fetchPriority="high"
        />
      </div>
      <section className="container approach-steps">
        {steps.map((step, i) => (
          <article key={step.eyebrow}>
            <span>{`0${i + 1}`}</span>
            <div>
              <p className="eyebrow">{step.eyebrow}</p>
              <h2>{step.title}</h2>
              <p>{step.text}</p>
              {step.questions ? (
                <ul>
                  {step.questions.map((q) => (
                    <li key={q}>{q}</li>
                  ))}
                </ul>
              ) : (
                <ButtonLink href="/start-project/">Build your project brief</ButtonLink>
              )}
            </div>
          </article>
        ))}
      </section>
      <ProjectCta />
    </>
  );
}
