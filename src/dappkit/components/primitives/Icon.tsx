import * as RemixIcon from "@remixicon/react";
import { mergeClass } from "dappkit/utils/css";
import type { Component, Styled } from "dappkit/utils/types";
import { useMemo } from "react";
import { type Action, actions } from "src/config/actions";
import { type ChainId, chains } from "src/config/chains";
import { tv } from "tailwind-variants";
import * as Avatar from '@radix-ui/react-avatar';
import Image from "./Image";

export const iconStyles = tv({
  base: "flex flex-col border-0 gap-1 self-center aspect-square rounded-sm",
  variants: {
    size: {
      xs: "h-sm*2 w-sm*2",
      sm: "h-md*2 w-md*2",
      md: "h-lg*2 w-lg*2",
      lg: "h-xl*2 w-xl*2",
      xl: "h-xl*4 w-xl*4",
    },
    rounded: {
      true: "rounded-full",
      false: "",
    }
  },
  defaultVariants: {
    size: "md",
    rounded: false
  },
});

export type IconProps = Component<
  Styled<typeof iconStyles> & {
    src: string;
    chain: ChainId;
    action: Action;
    remix: keyof typeof RemixIcon;
  },
  HTMLImageElement
>;

export default function Icon({ size, rounded, remix, action, chain, src, alt, className, ...props }: IconProps) {
  const styles = useMemo(() => iconStyles({ size, rounded }), [size, rounded]);

  const Component = useMemo(() => {
    if (remix) return RemixIcon[remix];
    if (chain)
      return () => <img className={mergeClass(styles, className)} alt={alt} src={chains[chain]?.asset} {...props} />;
    if (action)
      return () => <img className={mergeClass(styles, className)} alt={alt} src={actions[action]?.asset} {...props} />;
    return () => <Image className={mergeClass(styles, className)} alt={alt} src={src} {...props} />;
  }, [remix, chain, alt, src, props]);

  return <Component className={mergeClass(styles, className)} />;
}
