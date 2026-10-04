"use client";

import React, { useRef } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  href?: string;
  children: React.ReactNode;
  className?: string;
  cursorLabel?: string;
}

export function Button({
  variant = "primary",
  href,
  children,
  className,
  cursorLabel,
  onClick,
  ...props
}: ButtonProps) {
  const btnRef = useRef<HTMLButtonElement | HTMLAnchorElement | null>(null);

  // Magnetic pull effect on hover for fine-pointer desktop
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    // Mild subtle displacement
    btnRef.current.style.transform = `translate(${x * 0.18}px, ${y * 0.18}px)`;
  };

  const handleMouseLeave = () => {
    if (!btnRef.current) return;
    btnRef.current.style.transform = `translate(0px, 0px)`;
  };

  const baseClasses =
    "inline-flex items-center justify-center font-sans uppercase tracking-[0.24em] text-xs font-medium px-6 py-3.5 transition-all duration-300 select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e8cf9a]";

  if (variant === "primary") {
    const primaryClasses = cn(
      baseClasses,
      "btn-liquid bg-[#e8cf9a] text-[#0a0806] shadow-[0_4px_20px_rgba(201,164,92,0.25)] hover:shadow-[0_6px_28px_rgba(201,164,92,0.4)]",
      className
    );

    if (href) {
      return (
        <a
          ref={btnRef as React.RefObject<HTMLAnchorElement>}
          href={href}
          data-cursor={cursorLabel}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className={primaryClasses}
          onClick={onClick as unknown as React.MouseEventHandler<HTMLAnchorElement>}
        >
          {children}
        </a>
      );
    }

    return (
      <button
        ref={btnRef as React.RefObject<HTMLButtonElement>}
        data-cursor={cursorLabel}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={primaryClasses}
        onClick={onClick}
        {...props}
      >
        {children}
      </button>
    );
  }

  // Secondary variant: hairline outline with vertical text-roll
  const secondaryClasses = cn(
    baseClasses,
    "btn-roll border border-[#c9a45c]/50 text-[#f3ead8] hover:border-[#e8cf9a] hover:text-[#e8cf9a] bg-transparent",
    className
  );

  const rollContent = (
    <span className="roll-inner h-4 leading-4 overflow-hidden block">
      <span className="block">{children}</span>
      <span className="block text-[#e8cf9a]">{children}</span>
    </span>
  );

  if (href) {
    return (
      <a
        ref={btnRef as React.RefObject<HTMLAnchorElement>}
        href={href}
        data-cursor={cursorLabel}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={secondaryClasses}
        onClick={onClick as unknown as React.MouseEventHandler<HTMLAnchorElement>}
      >
        {rollContent}
      </a>
    );
  }

  return (
    <button
      ref={btnRef as React.RefObject<HTMLButtonElement>}
      data-cursor={cursorLabel}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={secondaryClasses}
      onClick={onClick}
      {...props}
    >
      {rollContent}
    </button>
  );
}
