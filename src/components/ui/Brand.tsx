import Image from "next/image";
import Link from "next/link";
import brandMark from "@/assets/images/brand-mark.svg";

export function Brand() {
  return (
    <Link className="brand" href="/" aria-label="Allen Mechanical home">
      <span className="brand-symbol">
        <Image src={brandMark} width={48} height={48} alt="" loading="eager" />
      </span>
      <span className="brand-type">
        <strong>ALLEN</strong>
        <span>MECHANICAL INC.</span>
      </span>
    </Link>
  );
}
