import { Lines } from "@/components/ui/Lines";
import { TextLink } from "@/components/ui/TextLink";
import { faq } from "@/content/faq";

type Props = {
  eyebrow: string;
  heading: [string, string];
  link?: { href: string; label: string };
};

export function FaqSection({ eyebrow, heading, link }: Props) {
  return (
    <section className="container faq-section">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2>
          <Lines lines={heading} />
        </h2>
        {link && <TextLink href={link.href}>{link.label}</TextLink>}
      </div>
      <div className="faq-list">
        {faq.map((item) => (
          <details key={item.question}>
            <summary>
              {item.question}
              <span aria-hidden="true">+</span>
            </summary>
            <p>{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
