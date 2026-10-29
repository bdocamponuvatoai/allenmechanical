import { Fragment, type ReactNode } from "react";

/**
 * Joins lines with `<br>` followed by a space, matching the legacy markup.
 * A string line becomes one text node (" line"), so glyph shaping is unchanged.
 */
export function Lines({ lines }: { lines: ReactNode[] }) {
  return lines.map((line, i) => (
    <Fragment key={i}>
      {i > 0 && <br />}
      {i === 0 ? line : typeof line === "string" ? ` ${line}` : <> {line}</>}
    </Fragment>
  ));
}
