"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { mainNav } from "@/config/site";
import type { ReactNode } from "react";

// Matches the CSS breakpoint where the menu toggle is shown.
const DESKTOP_QUERY = "(min-width: 701px)";

export function Header({ brand }: { brand: ReactNode }) {
  const pathname = usePathname();
  const section = pathname.endsWith("/") ? pathname : `${pathname}/`;
  // Remember which page the menu was opened on, so navigating closes it.
  const [openOnPath, setOpenOnPath] = useState<string | null>(null);
  const open = openOnPath === pathname;
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpenOnPath(null);
      toggleRef.current?.focus();
    };
    const desktop = window.matchMedia(DESKTOP_QUERY);
    const onResize = () => desktop.matches && setOpenOnPath(null);
    document.addEventListener("keydown", onKey);
    desktop.addEventListener("change", onResize);
    return () => {
      document.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onResize);
    };
  }, [open]);

  return (
    <header className="site-header">
      <div className="nav-inner">
        {brand}
        <button
          ref={toggleRef}
          className="menu-toggle"
          aria-controls="main-nav"
          aria-expanded={open}
          onClick={() => setOpenOnPath(open ? null : pathname)}
        >
          Menu <span aria-hidden="true">☰</span>
        </button>
        <nav id="main-nav" aria-label="Main navigation" className={open ? "open" : undefined}>
          {mainNav.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              aria-current={section.startsWith(item.href) ? "page" : undefined}
              onClick={() => setOpenOnPath(null)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <ButtonLink href="/start-project/" variant="nav-cta">
          Start a project
        </ButtonLink>
      </div>
    </header>
  );
}
