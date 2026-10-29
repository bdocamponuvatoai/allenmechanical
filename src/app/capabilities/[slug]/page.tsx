import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProjectCta } from "@/components/sections/ProjectCta";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Icon } from "@/components/ui/Icon";
import { Lines } from "@/components/ui/Lines";
import { findService, serviceHref, services } from "@/content/services";
import { pageMetadata } from "@/lib/metadata";

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/capabilities/[slug]">) {
  const service = findService((await params).slug);
  if (!service) notFound();
  return pageMetadata({
    title: `${service.name} in Kingston`,
    path: serviceHref(service),
    description: service.description,
  });
}

export default async function CapabilityPage({ params }: PageProps<"/capabilities/[slug]">) {
  const service = findService((await params).slug);
  if (!service) notFound();

  return (
    <>
      <section className="container detail-intro">
        <Link className="breadcrumb" href="/capabilities/">
          ← All capabilities
        </Link>
        <div className="detail-heading">
          <div>
            <p className="eyebrow">{service.label}</p>
            <h1>
              <Lines lines={service.heading} />
            </h1>
          </div>
          <p>{service.intro}</p>
        </div>
      </section>
      <div className="container detail-image">
        <Image src={service.image} alt={service.alt} loading="eager" fetchPriority="high" />
        <span>{service.short}</span>
      </div>
      <section className="container scope-section">
        <div>
          <p className="eyebrow">THE CONVERSATION STARTS WITH SCOPE</p>
          <h2>{service.question}</h2>
          <p>{service.guidance}</p>
          <ButtonLink href={`/start-project/?service=${service.slug}`}>
            Prepare a project brief
          </ButtonLink>
        </div>
        <div className="scope-list">
          <p className="eyebrow">DETAILS TO DISCUSS</p>
          {service.scope.map((item, i) => (
            <div key={item}>
              <span>{`0${i + 1}`}</span>
              <h3>{item}</h3>
            </div>
          ))}
          <p className="small">
            Project-specific services, materials, timing and pricing are confirmed with Allen
            Mechanical.
          </p>
        </div>
      </section>
      <section className="container related-services">
        <p className="eyebrow">CONNECTED CAPABILITIES</p>
        {services
          .filter((s) => s !== service)
          .map((s) => (
            <Link key={s.slug} href={serviceHref(s)}>
              {s.name}
              <Icon />
            </Link>
          ))}
      </section>
      <ProjectCta />
    </>
  );
}
