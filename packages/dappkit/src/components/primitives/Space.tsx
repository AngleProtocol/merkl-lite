import { mergeClass } from "dappkit/src";
import type { Component, Styled } from "dappkit/src";
import { tv } from "tailwind-variants";

export const spaceStyles = tv({
  base: "w-full",
  variants: {
    size: {
      xs: "py-xs/2",
      sm: "py-sm/2",
      md: "py-md/2",
      lg: "py-lg/2",
      xl: "py-xl/2",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export type SpaceProps = Component<Styled<typeof spaceStyles>, HTMLDivElement>;

export default function Space({ size, className, ...props }: SpaceProps) {
  return <div className={mergeClass(spaceStyles({ size }), className)} {...props} />;
}
