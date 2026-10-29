import { Icon } from "./Icon";
import { SmartLink } from "./SmartLink";

type Props = { href: string; children: string; className?: string };

/** Underlined link with a trailing arrow. The label and its trailing space stay one text node. */
export function TextLink({ href, children, className }: Props) {
  return (
    <SmartLink className={className ? `text-link ${className}` : "text-link"} href={href}>
      {`${children} `}
      <Icon />
    </SmartLink>
  );
}
