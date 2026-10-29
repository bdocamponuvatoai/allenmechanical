import { FaqSection } from "@/components/sections/FaqSection";
import { PageIntro } from "@/components/sections/PageIntro";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Icon } from "@/components/ui/Icon";
import { Lines } from "@/components/ui/Lines";
import { mailto, site } from "@/config/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Contact Ken and the team",
  path: "/contact/",
  description: `Contact Allen Mechanical Inc. in Kingston, Ontario. Phone ${site.phone.dashed} or email ${site.email}.`,
});

export default function ContactPage() {
  const { address } = site;
  return (
    <>
      <PageIntro eyebrow="LET’S CONNECT" title={["Every good project", "starts somewhere."]}>
        <p>
          <Lines
            lines={[
              "A brief introduction or a detailed set of requirements.",
              "Let’s start with what you have.",
            ]}
          />
        </p>
      </PageIntro>
      <section className="container contact-layout">
        <div className="contact-primary">
          <p className="eyebrow">TALK TO ALLEN MECHANICAL</p>
          <a className="large-contact" href={site.phone.href}>
            {`${site.phone.display} `}
            <Icon />
          </a>
          <a className="email-contact" href={mailto}>
            {`${site.email} `}
            <Icon />
          </a>
          <div className="contact-person">
            <span>YOUR CONTACT</span>
            <p>
              <strong>{site.contact.name}</strong>
              <br />
              {` ${site.contact.title}`}
            </p>
          </div>
        </div>
        <div className="contact-address">
          <p className="eyebrow">KINGSTON, ONTARIO</p>
          <h2>
            <Lines lines={["Local roots.", "An open conversation."]} />
          </h2>
          <address>
            <Lines
              lines={[
                address.street,
                `${address.locality}, ${address.region} ${address.postalCode}`,
                "Canada",
              ]}
            />
          </address>
          <p className="small">
            Call ahead to arrange a meeting. Project location and availability are confirmed with
            the team.
          </p>
        </div>
      </section>
      <section className="container brief-prompt">
        <div>
          <p className="eyebrow">MAKE THE FIRST CONVERSATION COUNT</p>
          <h2>
            <Lines lines={["Bring the basics.", "We’ll talk through the rest."]} />
          </h2>
        </div>
        <div>
          <p>
            Our project brief helps organise your scope, location, project stage and priorities.
            Download a copy or open an email draft when you’re ready.
          </p>
          <ButtonLink href="/start-project/">Prepare your project brief</ButtonLink>
        </div>
      </section>
      <FaqSection eyebrow="GOOD TO KNOW" heading={["Before we", "get started."]} />
    </>
  );
}
