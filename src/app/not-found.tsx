import type { Metadata } from "next";
import { PageIntro } from "@/components/sections/PageIntro";
import { ButtonLink } from "@/components/ui/ButtonLink";

export const metadata: Metadata = {
  title: { absolute: "Page not found | Allen Mechanical" },
  description: "Return to Allen Mechanical.",
};

export default function NotFound() {
  return (
    <PageIntro eyebrow="404 / A MISSING CONNECTION" title={["Let’s get you", "back on track."]}>
      <p>The page you’re looking for isn’t here.</p>
      <ButtonLink href="/">Return to home</ButtonLink>
    </PageIntro>
  );
}
