import Link from "next/link";
import { site } from "@/config/site";

/** Fixed call/start bar shown on small screens. */
export function MobileBar() {
  return (
    <div className="mobile-bar">
      <a href={site.phone.href}>Call Allen ↗</a>
      <Link href="/start-project/">Start a project ↗</Link>
    </div>
  );
}
