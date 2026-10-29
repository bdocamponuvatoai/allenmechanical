"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { Icon } from "@/components/ui/Icon";
import { Lines } from "@/components/ui/Lines";
import { mailto, site } from "@/config/site";
import {
  briefSteps,
  drawingStatuses,
  projectStages,
  projectTypes,
  targetTimings,
  type ProjectType,
} from "@/content/project-brief";
import { services, type Service } from "@/content/services";
import { briefMailto, briefRows, briefText, type BriefRow } from "@/lib/project-brief";

type Props = {
  /** Preselected capabilities, from the ?service= and ?type= presets. */
  presetServices?: Service["slug"][];
  presetType?: ProjectType;
};

type Review = { rows: BriefRow[]; text: string; href: string };

const REVIEW_STEP = 2;

export function BriefBuilder({ presetServices = [], presetType }: Props) {
  const formRef = useRef<HTMLFormElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);
  const [error, setError] = useState("");
  const [review, setReview] = useState<Review | null>(null);
  const [downloadStatus, setDownloadStatus] = useState("");

  // Start from the defaults, even if the browser restored earlier entries.
  useEffect(() => formRef.current?.reset(), []);

  function show(index: number) {
    const form = formRef.current!;
    flushSync(() => {
      setStep(index);
      setError("");
      if (index === REVIEW_STEP) {
        const data = new FormData(form);
        const rows = briefRows(data);
        const text = briefText(rows);
        setReview({ rows, text, href: briefMailto(data, text) });
        setDownloadStatus("");
      }
    });
    form.querySelectorAll<HTMLElement>(".plan-step h2")[index].focus({ preventScroll: true });
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    cardRef.current?.scrollIntoView({ block: "start", behavior: reduce ? "instant" : "smooth" });
  }

  function advance() {
    const form = formRef.current!;
    if (step === 0 && !form.querySelector('[name="services"]:checked')) {
      setError("Choose at least one capability to continue.");
      form.querySelector<HTMLInputElement>('[name="services"]')?.focus();
      return;
    }
    if (step === 1) {
      const city = form.elements.namedItem("city") as HTMLInputElement;
      if (!city.value.trim()) {
        setError("Add the project city or community so the team has a location.");
        city.focus();
        return;
      }
    }
    if (step < REVIEW_STEP) show(step + 1);
  }

  function download() {
    if (!review) return;
    const url = URL.createObjectURL(new Blob([review.text], { type: "text/plain;charset=utf-8" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = "allen-mechanical-project-brief.txt";
    document.body.append(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    setDownloadStatus("Your brief download is ready. Nothing has been sent to Allen Mechanical.");
  }

  return (
    <section className="container planner-layout">
      <aside>
        <ol className="plan-progress">
          {briefSteps.map((label, i) => (
            <li
              key={label}
              className={i === step ? "active" : i < step ? "done" : undefined}
              aria-current={i === step ? "step" : undefined}
            >
              <span>{`0${i + 1}`}</span>
              {label}
            </li>
          ))}
        </ol>
        <div className="plan-support">
          <p className="eyebrow">PREFER TO TALK?</p>
          <a href={site.phone.href}>{`${site.phone.display} ↗`}</a>
          <p>
            <Lines lines={["Connect directly with", "Ken and the team."]} />
          </p>
        </div>
      </aside>
      <div className="planner-card" ref={cardRef}>
        <form
          ref={formRef}
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
            advance();
          }}
        >
          <section className="plan-step" hidden={step !== 0}>
            <p className="eyebrow">01 / DEFINE THE SCOPE</p>
            <h2 tabIndex={-1}>What are you working on?</h2>
            <p>Select the capabilities you’d like to discuss. You can choose more than one.</p>
            <fieldset>
              <legend className="sr-only">Required capabilities</legend>
              <div className="service-choices">
                {services.map((s, i) => (
                  <label key={s.slug} className="service-choice">
                    <input
                      type="checkbox"
                      name="services"
                      value={s.slug}
                      defaultChecked={presetServices.includes(s.slug)}
                    />
                    <span className="choice-number">{`0${i + 1}`}</span>
                    <span>
                      <strong>{s.name}</strong>
                      <small>{s.short}</small>
                    </span>
                    <span className="choice-check" aria-hidden="true">
                      ✓
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>
            <label className="form-label">
              Project type
              <select name="type" defaultValue={presetType}>
                {projectTypes.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </select>
            </label>
          </section>
          <section className="plan-step" hidden={step !== 1}>
            <p className="eyebrow">02 / ADD THE CONTEXT</p>
            <h2 tabIndex={-1}>A little more about the project.</h2>
            <p>
              Share the essentials. Exact scope, availability and pricing are discussed with the
              team.
            </p>
            <div className="form-grid">
              <label>
                Project city / community <span className="required">*</span>
                <input
                  name="city"
                  autoComplete="address-level2"
                  placeholder="e.g. Kingston"
                  maxLength={100}
                  required
                />
              </label>
              <label>
                Project stage
                <Select name="stage" options={projectStages} />
              </label>
              <label>
                Target timing
                <Select name="timing" options={targetTimings} />
              </label>
              <label>
                Drawings available?
                <Select name="drawings" options={drawingStatuses} />
              </label>
              <label>
                Company <span className="optional">Optional</span>
                <input
                  name="company"
                  autoComplete="organization"
                  maxLength={100}
                  placeholder="Company or project team"
                />
              </label>
              <label>
                Your name <span className="optional">Optional</span>
                <input name="name" autoComplete="name" maxLength={80} placeholder="Your name" />
              </label>
            </div>
            <label className="form-label">
              What should we know? <span className="optional">Optional</span>
              <textarea
                name="notes"
                rows={4}
                maxLength={1200}
                placeholder="Describe your scope, priorities or important constraints. Leave out confidential documents and access codes."
              ></textarea>
            </label>
            <p className="small">
              Have drawings? Mention them here and arrange file sharing directly with the team. This
              preview does not upload files.
            </p>
          </section>
          <section className="plan-step" hidden={step !== REVIEW_STEP}>
            <p className="eyebrow">03 / REVIEW & CONNECT</p>
            <h2 tabIndex={-1}>A clear place to start.</h2>
            <p>Check the details, then choose how to continue.</p>
            <div className="project-summary">
              {review?.rows.map(([label, value]) => (
                <div key={label} className="summary-row">
                  <span>{label}</span>
                  <strong>{value}</strong>
                </div>
              ))}
            </div>
            <div className="handoff">
              <p className="eyebrow">CONNECT WITH KEN</p>
              <h3>
                <Lines lines={["Your brief is ready.", "The conversation is next."]} />
              </h3>
              <p>
                Open a draft in your email app. Review it, add any relevant files and send it when
                you’re ready.
              </p>
              <a className="button" href={review?.href ?? mailto}>
                {"Open email draft "}
                <Icon />
              </a>
              <button className="text-link" type="button" onClick={download}>
                Download project brief ↓
              </button>
            </div>
            <p className="handoff-note">
              Nothing has been sent. This is a project brief, not a quote or booking confirmation.
            </p>
            <p role="status" className="small">
              {downloadStatus}
            </p>
          </section>
          <p id="form-error" role="alert">
            {error}
          </p>
          <div className="form-actions">
            <button
              type="button"
              className="button outline"
              hidden={step !== 1}
              onClick={() => show(0)}
            >
              ← Back
            </button>
            <button
              id="next-step"
              type="button"
              className="button"
              hidden={step === REVIEW_STEP}
              onClick={advance}
            >
              {step === 0 ? "Continue to project details →" : "Review project brief →"}
            </button>
            <button
              type="button"
              className="button outline"
              hidden={step !== REVIEW_STEP}
              onClick={() => show(0)}
            >
              Edit this brief
            </button>
          </div>
        </form>
        <noscript>
          <p>
            {"The brief builder needs JavaScript. Please "}
            <a href={mailto}>email Ken</a>
            {" or "}
            <a href={site.phone.href}>{`call ${site.phone.dashed}`}</a>
            {" to discuss your project."}
          </p>
        </noscript>
        <p className="planner-privacy">
          {
            "Your entries stay in this page until you reload. They are not stored or sent by this preview. "
          }
          <Link href="/privacy/">Privacy details</Link>
        </p>
      </div>
    </section>
  );
}

function Select({ name, options }: { name: string; options: string[] }) {
  return (
    <select name={name}>
      {options.map((o) => (
        <option key={o}>{o}</option>
      ))}
    </select>
  );
}
