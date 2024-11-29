import { createColoring } from "dappkit";
import { createConfig } from "src/config/type";
import { http } from "viem";
import {
  mainnet,
  optimism,
  rootstock,
  bsc,
  gnosis,
  thunderCore,
  fuse,
  polygon,
  manta,
  xLayer,
  fantom,
  fraxtal,
  filecoin,
  zksync,
  worldchain,
  astar,
  polygonZkEvm,
  coreDao,
  moonbeam,
  sei,
  astarZkEVM,
  mantle,
  base,
  immutableZkEvm,
  mode,
  arbitrum,
  avalanche,
  linea,
  bob,
  blast,
  taiko,
  scroll,
} from "viem/chains";
import { coinbaseWallet, walletConnect } from "wagmi/connectors";

export default createConfig({
  appName: "Puffer",
  wagmi: {
    chains: [
      mainnet,
      optimism,
      rootstock,
      bsc,
      gnosis,
      thunderCore,
      fuse,
      polygon,
      manta,
      xLayer,
      fantom,
      fraxtal,
      filecoin,
      zksync,
      worldchain,
      astar,
      polygonZkEvm,
      coreDao,
      moonbeam,
      sei,
      astarZkEVM,
      mantle,
      base,
      immutableZkEvm,
      mode,
      arbitrum,
      avalanche,
      linea,
      bob,
      blast,
      taiko,
      scroll,
    ],
    connectors: [
      coinbaseWallet(),
      walletConnect({
        customStoragePrefix: "wagmi",
        projectId: "26c912aadd2132cd869a5edc00aeea0f",
        metadata: {
          name: "Puffer",
          description: "Merkl Lite",
          url: "https://app.merkl.xyz.com",
          icons: [],
        },
      }),
    ],
    transports: {
      [zksync.id]: http(),
      [optimism.id]: http(),
    },
  },
  defaultTheme: "puffer",
  modes: ["light"],
  themes: {
    puffer: {
      base: createColoring(
        ["#F5F9FF", "#2A35BD", "#FFFFFF"],
        ["#F5F9FF", "#2A35BD", "#FFFFFF"]
      ),
      info: createColoring(
        ["#2ABDFF", "#2ABDFF", "#131620"],
        ["#FFFFFF", "#40B66B", "white"]
      ),
      good: createColoring(
        ["#40B66B", "#40B66B", "#131620"],
        ["#FFFFFF", "#40B66B", "white"]
      ),
      warn: createColoring(
        ["#ff9600", "#ff9600", "#131620"],
        ["#FFFFFF", "#40B66B", "white"]
      ),
      harm: createColoring(
        ["#d22e14", "#d22e14", "#131620"],
        ["#FFFFFF", "#40B66B", "white"]
      ),
    },
  },
  sizing: {
    spacing: { xs: 2, sm: 4, md: 8, lg: 12, xl: 16 },
    radius: { xs: 2, sm: 4, md: 6, lg: 8, xl: 12 },
  },
  routes: {
    homepage: {
      icon: "RiHomeFill",
      route: "/",
      key: crypto.randomUUID(),
    },
    dashboard: {
      icon: "RiDashboard2Fill",
      route: "/user",
      key: crypto.randomUUID(),
    },
    opportunities: {
      icon: "RiPlanetFill",
      route: "/opportunities",
      key: crypto.randomUUID(),
    },
    protocols: {
      icon: "RiVipCrown2Fill",
      route: "/protocols",
      key: crypto.randomUUID(),
    },
    bridge: {
      icon: "RiVipCrown2Fill",
      route: "/bridge",
      key: crypto.randomUUID(),
    },
    faq: { icon: "RiQuestionFill", route: "/faq", key: crypto.randomUUID() },
    terms: {
      icon: "RiCompassesLine",
      route: "/terms",
      key: crypto.randomUUID(),
    },
    privacy: {
      icon: "RiInformationFill",
      route: "/privacy",
      key: crypto.randomUUID(),
    },
  },
  socials: {
    discord: "",
    telegram: "https://t.me/+2T0RNabX2ANkMzAx",
    x: "https://x.com/zksyncignite",
    github: "",
  },
  links: {
    merkl: "https://merkl.xyz/",
  },
});
