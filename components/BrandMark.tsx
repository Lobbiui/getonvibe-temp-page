import Image from "next/image";

type BrandMarkProps = {
  className?: string;
  size?: number;
};

export function BrandMark({ className, size = 56 }: BrandMarkProps) {
  return (
    <Image
      alt=""
      aria-hidden="true"
      className={className}
      height={size}
      priority
      src="/logos/getonvibe-signal-mark.svg"
      width={size}
    />
  );
}
