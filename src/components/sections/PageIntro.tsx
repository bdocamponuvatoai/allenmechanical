import type { ReactNode } from "react";

type Props = {
  eyebrow: string;
  /** First line, then the accented second line. */
  title: [string, string];
  children?: ReactNode;
};

export function PageIntro({ eyebrow, title, children }: Props) {
  return (
    <section className="container page-intro">
      <p className="eyebrow">{eyebrow}</p>
      <h1>
        {title[0]}
        <br /> <span>{title[1]}</span>
      </h1>
      {children}
    </section>
  );
}
