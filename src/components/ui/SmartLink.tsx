import Link from "next/link";
import type { ComponentProps } from "react";

type Props = Omit<ComponentProps<"a">, "href"> & { href: string };

/** Site paths use next/link; tel:, mailto:, hashes and external URLs stay plain anchors. */
export function SmartLink({ href, ...props }: Props) {
  if (href.startsWith("/") && !href.startsWith("//")) return <Link href={href} {...props} />;
  return <a href={href} {...props} />;
}
