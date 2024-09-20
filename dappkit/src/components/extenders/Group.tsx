import { tv } from "tailwind-variants";
import type { Component, Styled } from "../../utils/types";
import { boxStyles } from "../primitives/Box";

export const groupStyles = tv({
  base: "shadow-none flex-row bg-main-0 p-0 border-0 flex-wrap flex gap-1",
  variants: {
    look: {
      base: "bg-main-0",
      soft: "bg-main-0",
      bold: "bg-main-0",
      hype: "bg-main-0",
    },
    size: {
      xs: "gap-xs",
      sm: "gap-sm",
      md: "gap-md",
      lg: "gap-lg",
      xl: "gap-xl",
    },
  },
  defaultVariants: {
    size: "md",
    look: "base",
  },
});

export type GroupProps = Component<Styled<typeof groupStyles>, HTMLDivElement>;

export default function Group({ look, size, className, ...props }: GroupProps) {
  return <div className={[groupStyles({ look, size }), className].join(" ")} {...props} />;
}
