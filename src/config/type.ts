import type * as RemixIcon from "@remixicon/react";
import type { Mode, Themes, sizeScale } from "dappkit";
import { createConfig as createWagmiConfig } from "wagmi";

export type routesType = {
  [key: string]: {
    route: string;
    icon: keyof typeof RemixIcon;
    key: string;
  };
};

export type MerklConfig<T extends Themes> = {
  themes: T;
  sizing: {
    width: { [Size in (typeof sizeScale)[number]]: number };
    spacing: { [Size in (typeof sizeScale)[number]]: number };
    radius: { [Size in (typeof sizeScale)[number]]: number };
  };
  defaultTheme: keyof T;
  modes: Mode[];
  wagmi: Parameters<typeof createWagmiConfig>["0"];
  appName: string;
  routes: routesType;
  images: {
    [name: string]: string;
  };
  socials: {
    [key: string]: string;
  };
  links: {
    [key: string]: string;
  };
};

export function createConfig<T extends Themes>({ wagmi, ...config }: MerklConfig<T>) {
  const wagmiConfig = createWagmiConfig(wagmi);

  return { wagmi: wagmiConfig, ...config };
}
