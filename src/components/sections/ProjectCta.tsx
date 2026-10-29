import { ButtonLink } from "@/components/ui/ButtonLink";
import { Icon } from "@/components/ui/Icon";
import { Lines } from "@/components/ui/Lines";
import { mailto, site } from "@/config/site";

export function ProjectCta() {
  return (
    <section className="project-cta">
      <div className="container">
        <div>
          <p className="eyebrow">THE NEXT CONNECTION STARTS HERE</p>
          <h2>
            Let’s build
            <br /> what’s <span>next.</span>
          </h2>
        </div>
        <div className="cta-side">
          <p>
            <Lines
              lines={[
                "A set of drawings. A challenging detail.",
                "A building ready for its next chapter.",
                "Tell us what you’re working on.",
              ]}
            />
          </p>
          <ButtonLink href="/start-project/">Start the conversation</ButtonLink>
          <a className="cta-email" href={mailto}>
            {`${site.email} `}
            <Icon />
          </a>
        </div>
        <span className="cta-line" aria-hidden="true"></span>
      </div>
    </section>
  );
}
