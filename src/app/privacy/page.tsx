import { PageIntro } from "@/components/sections/PageIntro";
import { mailto, site } from "@/config/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Privacy and preview information",
  path: "/privacy/",
  description:
    "How this private design preview handles project details, contact links and illustrative imagery.",
});

export default function PrivacyPage() {
  return (
    <>
      <PageIntro
        eyebrow="PRIVACY & PREVIEW DETAILS"
        title={["A clear view", "of this experience."]}
      />
      <section className="container prose">
        <h2>Your project brief</h2>
        <p>
          The brief builder works in your browser. Entries are kept in page memory and reset on
          reload. This preview does not store them in a database, send them to the company, or
          upload documents.
        </p>
        <p>
          Downloading a brief creates a text file on your device. The email link opens your email
          application with the brief included in a draft. You review and send that draft yourself;
          nothing is sent automatically.
        </p>
        <h2>Contacting the company</h2>
        <p>
          Telephone and email links open your device’s chosen applications. Allen Mechanical
          confirms project scope, services, availability and pricing directly. A project brief is
          not a quotation, booking or contract.
        </p>
        <h2>About the design concept</h2>
        <p>
          This is a private website design preview. The identity is proposed and the photography is
          AI-generated illustration of the industry. It does not show verified company projects or
          actual Allen Mechanical staff. The stated company history and CEO information come from
          the project brief; business contact details were checked against the Kingston Construction
          Association directory.
        </p>
        <h2>Questions</h2>
        <p>
          {"For company and project inquiries, contact "}
          <a href={mailto}>{site.email}</a>
          {" or "}
          <a href={site.phone.href}>{site.phone.dashed}</a>.
        </p>
      </section>
    </>
  );
}
