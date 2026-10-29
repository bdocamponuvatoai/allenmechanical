"use client";

import Image from "next/image";
import { useRef, useState, type KeyboardEvent } from "react";
import { TextLink } from "@/components/ui/TextLink";
import { serviceHref, services } from "@/content/services";

const KEY_STEPS: Record<string, (i: number, n: number) => number> = {
  ArrowRight: (i, n) => (i + 1) % n,
  ArrowDown: (i, n) => (i + 1) % n,
  ArrowLeft: (i, n) => (i - 1 + n) % n,
  ArrowUp: (i, n) => (i - 1 + n) % n,
  Home: () => 0,
  End: (_, n) => n - 1,
};

/** Home page capability picker: four toggle buttons that swap the photo and summary. */
export function CapabilityExplorer() {
  const [selected, setSelected] = useState(0);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const service = services[selected];

  function onKeyDown(e: KeyboardEvent, index: number) {
    const step = KEY_STEPS[e.key];
    if (!step) return;
    e.preventDefault();
    const next = step(index, services.length);
    setSelected(next);
    buttons.current[next]?.focus();
  }

  return (
    <div className="capability-explorer">
      <div className="capability-visual">
        <Image src={service.image} alt={service.alt} />
        <span className="capability-photo-label">{service.label}</span>
      </div>
      <div className="capability-selector" role="group" aria-label="Explore capabilities">
        {services.map((s, i) => (
          <button
            key={s.slug}
            ref={(el) => {
              buttons.current[i] = el;
            }}
            className={i === selected ? "capability-tab active" : "capability-tab"}
            aria-pressed={i === selected}
            onClick={() => setSelected(i)}
            onKeyDown={(e) => onKeyDown(e, i)}
          >
            <span className="capability-number">{`0${i + 1}`}</span>
            <span>{s.name}</span>
            <span className="tab-arrow" aria-hidden="true">
              ↗
            </span>
          </button>
        ))}
        <div className="capability-details" aria-live="polite">
          <p className="capability-description">{service.description}</p>
          <TextLink className="capability-link" href={serviceHref(service)}>
            {`Explore ${service.name.toLowerCase()}`}
          </TextLink>
        </div>
      </div>
    </div>
  );
}
