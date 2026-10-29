import { Icon } from "./Icon";
import { SmartLink } from "./SmartLink";

type Props = { href: string; children: string; variant?: "outline" | "nav-cta" };

export function ButtonLink({ href, children, variant }: Props) {
  return (
    <SmartLink className={variant ? `button ${variant}` : "button"} href={href}>
      {children}
      <Icon />
    </SmartLink>
  );
}
