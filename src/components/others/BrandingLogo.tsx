// src/components/others/BrandingLogo.tsx

import { useEffect, useState } from "react";
import { useContract } from "@/core/contracts/contract-provider";
import clsx from "clsx";

interface BrandingLogoProps {
  className?: string;
  alt?: string;
  draggable?: boolean;
}

export function BrandingLogo({
  className,
  alt,
  draggable = false,
}: BrandingLogoProps) {
  const contract = useContract();
  const [brandingId, setBrandingId] = useState<string>("default");

  useEffect(() => {
    const root = document.documentElement;

    const brandingClass = Array.from(root.classList).find((cls) =>
      cls.startsWith("theme-"),
    );

    setBrandingId(
      brandingClass ? brandingClass.replace("theme-", "") : "default",
    );
  }, []);

  const { invert, ...logos } = contract.branding.logo;

  const logoSrc = logos[brandingId as keyof typeof logos] ?? logos.default;

  return (
    <img
      src={logoSrc}
      alt={alt ?? `${contract.app.name} logo`}
      draggable={draggable}
      className={clsx("select-none", invert && "dark:invert", className)}
    />
  );
}
