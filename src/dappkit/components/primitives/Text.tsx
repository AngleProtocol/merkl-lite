import clsx from "clsx";
import type { Component, Styled } from "../../utils/types";
import { tv } from "tailwind-variants";

export const textStyles = tv({
  base: "text-main-11 font-default font-normal",
  variants: {
    look: {
      base: "text-main-11",
      soft: "text-main-11",
      bold: "text-secondary-12",
      tint: "text-accent-12",
      hype: "text-accent-11",
    },
    size: {
      xs: "text-xs rounded",
      sm: "text-sm rounded-sm",
      md: "text-md rounded-md",
      lg: "text-lg rounded-lg",
      xl: "text-xl rounded-xl",
    },
  },
  defaultVariants: {
    size: "md",
    look: "base",
  },
});

export type TextProps = Component<Styled<typeof textStyles>, HTMLParagraphElement>;

export default function Text({ look, size, className, ...props }: TextProps) {
  return <p className={clsx(textStyles({ look, size }), className)} {...props} />;
}
