import { createColoring } from "dappkit";
import { createConfig } from "src/config/type";
import { http } from "viem";
import { optimism } from "viem/chains";
import { zksync } from "viem/zksync";
import { coinbaseWallet, walletConnect } from "wagmi/connectors";

export default createConfig({
  appName: "Merkl",
  wagmi: {
    chains: [zksync, optimism],
    connectors: [
      coinbaseWallet(),
      walletConnect({
        customStoragePrefix: "wagmi",
        projectId: "26c912aadd2132cd869a5edc00aeea0f",
        metadata: {
          name: "Merkl Lite",
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
  defaultTheme: "ignite",
  themes: {
    ignite: {
      base: createColoring(["#7F89F2", "#FFA200", "#111111"], ["#7F89F2", "#FFA200", "#FFFFFF"]),
      info: createColoring(["#2ABDFF", "#2ABDFF", "#131620"], ["#FFFFFF", "#40B66B", "white"]),
      good: createColoring(["#40B66B", "#40B66B", "#131620"], ["#FFFFFF", "#40B66B", "white"]),
      warn: createColoring(["#ff9600", "#ff9600", "#131620"], ["#FFFFFF", "#40B66B", "white"]),
      harm: createColoring(["#d22e14", "#d22e14", "#131620"], ["#FFFFFF", "#40B66B", "white"]),
    },
    igniteWarm: {
      base: createColoring(["#F39700", "#FFA200", "#111111"], ["#F89B00", "#3A3D90", "#FFFFFF"]),
      info: createColoring(["#2ABDFF", "#2ABDFF", "#131620"], ["#FFFFFF", "#40B66B", "white"]),
      good: createColoring(["#40B66B", "#40B66B", "#131620"], ["#FFFFFF", "#40B66B", "white"]),
      warn: createColoring(["#ff9600", "#ff9600", "#131620"], ["#FFFFFF", "#40B66B", "white"]),
      harm: createColoring(["#d22e14", "#d22e14", "#131620"], ["#FFFFFF", "#40B66B", "white"]),
    },
    zksync: {
      base: createColoring(["#000000", "#1755F4", "#000000"], ["#6e4c18", "#FB9901", "#FCF8F5"]),
      info: createColoring(["#2ABDFF", "#2ABDFF", "#131620"], ["#FFFFFF", "#40B66B", "white"]),
      good: createColoring(["#40B66B", "#40B66B", "#131620"], ["#FFFFFF", "#40B66B", "white"]),
      warn: createColoring(["#ff9600", "#ff9600", "#131620"], ["#FFFFFF", "#40B66B", "white"]),
      harm: createColoring(["#d22e14", "#d22e14", "#131620"], ["#FFFFFF", "#40B66B", "white"]),
    },
  },
});
