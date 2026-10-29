import Link from "next/link";
import { Brand } from "@/components/ui/Brand";
import { Icon } from "@/components/ui/Icon";
import { Lines } from "@/components/ui/Lines";
import { mailto, site } from "@/config/site";
import { serviceHref, services } from "@/content/services";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-top">
        <Brand />
        <p>
          <Lines lines={["Mechanical expertise.", "Kingston roots."]} />
        </p>
        <a className="footer-phone" href={site.phone.href}>
          {`${site.phone.display} `}
          <Icon />
        </a>
      </div>
      <div className="container footer-columns">
        <div>
          <p className="eyebrow">OUR CAPABILITIES</p>
          {services.map((s) => (
            <Link key={s.slug} href={serviceHref(s)}>
              {s.name}
            </Link>
          ))}
        </div>
        <div>
          <p className="eyebrow">THE COMPANY</p>
          <Link href="/about/">About Allen</Link>
          <Link href="/approach/">Our approach</Link>
          <Link href="/contact/">Get in touch</Link>
          <Link href="/start-project/">Prepare your project brief</Link>
        </div>
        <div>
          <p className="eyebrow">KINGSTON, ONTARIO</p>
          <p>
            <Lines
              lines={[
                site.address.street,
                `${site.address.locality}, ${site.address.region} ${site.address.postalCode}`,
              ]}
            />
          </p>
          <a href={mailto}>{site.email}</a>
        </div>
        <div>
          <p className="eyebrow">BUILT ON EXPERIENCE</p>
          <p className="footer-statement">
            <Lines lines={["35+ years.", "Always looking", "forward."]} />
          </p>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© 2026 Allen Mechanical Inc.</span>
        <Link href="/privacy/">Privacy</Link>
        <a href="#top">Back to top ↑</a>
      </div>
    </footer>
  );
}
