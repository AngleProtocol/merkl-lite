import { createColoring } from "dappkit";
import { createConfig } from "src/config/type";
<<<<<<< HEAD
import { createClient, custom, http } from "viem";
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
import hero from "src/customer/assets/images/hero.jpg?url";
import { eip712WalletActions } from "viem/zksync";

export default createConfig({
  appName: "Puffer",
  defaultTheme: "puffer",
  modes: ["light"],
  themes: {
    merkl: {
      base: createColoring(
        ["#2A35BD", "#F5F9FF", "#FFFFFF"],
        ["#2A35BD", "#F5F9FF", "#FFFFFF"]
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
=======
import hero from "src/customer/assets/images/hero.jpg?url";
import { http, createClient, custom } from "viem";
import {
  arbitrum,
  astar,
  astarZkEVM,
  avalanche,
  base,
  blast,
  bob,
  bsc,
  coreDao,
  etherlink,
  fantom,
  filecoin,
  fraxtal,
  fuse,
  gnosis,
  immutableZkEvm,
  linea,
  lisk,
  mainnet,
  manta,
  mantle,
  mode,
  moonbeam,
  optimism,
  polygon,
  polygonZkEvm,
  rootstock,
  scroll,
  sei,
  taiko,
  thunderCore,
  worldchain,
  xLayer,
  zksync,
} from "viem/chains";
import { eip712WalletActions } from "viem/zksync";
import { coinbaseWallet, walletConnect } from "wagmi/connectors";

export default createConfig({
  appName: "Merkl",
  modes: ["dark", "light"],
  defaultTheme: "ignite",
  deposit: false,
  themes: {
    ignite: {
      base: createColoring(["#1755F4", "#FF7900", "#0D1530"], ["#1755F4", "#FF7900", "#FFFFFF"]),
      info: createColoring(["#2ABDFF", "#2ABDFF", "#131620"], ["#FFFFFF", "#40B66B", "white"]),
      good: createColoring(["#40B66B", "#40B66B", "#131620"], ["#FFFFFF", "#40B66B", "white"]),
      warn: createColoring(["#ff9600", "#ff9600", "#131620"], ["#FFFFFF", "#40B66B", "white"]),
      harm: createColoring(["#d22e14", "#d22e14", "#131620"], ["#FFFFFF", "#40B66B", "white"]),
    },
    merkl: {
      base: createColoring(["#1755F4", "#FF7900", "#0D1530"], ["#1755F4", "#FF7900", "#FFFFFF"]),
      info: createColoring(["#2ABDFF", "#2ABDFF", "#131620"], ["#FFFFFF", "#40B66B", "white"]),
      good: createColoring(["#40B66B", "#40B66B", "#131620"], ["#FFFFFF", "#40B66B", "white"]),
      warn: createColoring(["#ff9600", "#ff9600", "#131620"], ["#FFFFFF", "#40B66B", "white"]),
      harm: createColoring(["#d22e14", "#d22e14", "#131620"], ["#FFFFFF", "#40B66B", "white"]),
    },
    backoffice: {
      base: createColoring(["#8B8D98", "#9984D2", "#000000"], ["#8B8D98", "#9984D2", "#FFFFFF"]),
      info: createColoring(["#2ABDFF", "#2ABDFF", "#131620"], ["#FFFFFF", "#40B66B", "white"]),
      good: createColoring(["#40B66B", "#40B66B", "#131620"], ["#FFFFFF", "#40B66B", "white"]),
      warn: createColoring(["#ff9600", "#ff9600", "#131620"], ["#FFFFFF", "#40B66B", "white"]),
      harm: createColoring(["#d22e14", "#d22e14", "#131620"], ["#FFFFFF", "#40B66B", "white"]),
    },
    puffer: {
      base: createColoring(["#2A35BD", "#3D3D3D", "#0E1035"], ["#2A35BD", "#F5F9FF", "#FFFFFF"]),
      info: createColoring(["#2ABDFF", "#2ABDFF", "#131620"], ["#FFFFFF", "#40B66B", "white"]),
      good: createColoring(["#40B66B", "#40B66B", "#131620"], ["#FFFFFF", "#40B66B", "white"]),
      warn: createColoring(["#ff9600", "#ff9600", "#131620"], ["#FFFFFF", "#40B66B", "white"]),
      harm: createColoring(["#d22e14", "#d22e14", "#131620"], ["#FFFFFF", "#40B66B", "white"]),
>>>>>>> merkl-lite/main
    },
  },
  sizing: {
    width: { xs: 14, sm: 16, md: 18, lg: 20, xl: 24 },
    spacing: { xs: 2, sm: 4, md: 8, lg: 12, xl: 16 },
    radius: { xs: 3, sm: 6, md: 9, lg: 12, xl: 15 },
  },
  images: {
    hero: hero,
  },
  routes: {
    homepage: {
      icon: "RiHomeFill",
      route: "/",
      key: crypto.randomUUID(),
    },
    opportunities: {
      icon: "RiPlanetFill",
      route: "/opportunities",
      key: crypto.randomUUID(),
    },
    // protocols: {
    //   icon: "RiVipCrown2Fill",
    //   route: "/protocols",
    //   key: crypto.randomUUID(),
    // },
<<<<<<< HEAD
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
    discord: "https://discord.com/invite/pufferfi",
    telegram: "https://t.me/puffer_fi",
    x: "https://x.com/puffer_finance",
    github: "https://github.com/PufferFinance",
  },
  links: {
    merkl: "https://merkl.xyz/",
  },
=======
    // terms: {
    //   icon: "RiCompassesLine",
    //   route: "/terms",
    //   key: crypto.randomUUID(),
    // },
    // privacy: {
    //   icon: "RiInformationFill",
    //   route: "/privacy",
    //   key: crypto.randomUUID(),
    // },
  },
  socials: {
    discord: "",
    telegram: "https://t.me/+2T0RNabX2ANkMzAx",
    x: "https://x.com/zksyncignite",
    github: "",
  },
  links: {
    merkl: "https://merkl.xyz/",
    merklTermsConditions: "https://app.merkl.xyz/merklTerms.pdf",
    merklPrivacy: "https://privacy.angle.money",
  },
  footerLinks: [],
>>>>>>> merkl-lite/main
  wagmi: {
    chains: [
      mainnet,
      optimism,
      rootstock,
      bsc,
<<<<<<< HEAD
=======
      lisk,
>>>>>>> merkl-lite/main
      gnosis,
      thunderCore,
      fuse,
      polygon,
      manta,
      xLayer,
      fantom,
      fraxtal,
      filecoin,
<<<<<<< HEAD
=======
      etherlink,
>>>>>>> merkl-lite/main
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
    client({ chain }) {
      if (chain.id === zksync.id)
        return createClient({
          chain,
          transport: custom(window.ethereum!),
        }).extend(eip712WalletActions());
      return createClient({ chain, transport: http() });
    },
    ssr: true,
    connectors: [
      coinbaseWallet(),
      walletConnect({
        customStoragePrefix: "wagmi",
        projectId: "26c912aadd2132cd869a5edc00aeea0f",
        metadata: {
<<<<<<< HEAD
          name: "Puffer",
          description: "Puffer",
=======
          name: "Merkl Lite",
          description: "Merkl Lite",
>>>>>>> merkl-lite/main
          url: "https://app.merkl.xyz.com",
          icons: [],
        },
      }),
    ],
  },
});
