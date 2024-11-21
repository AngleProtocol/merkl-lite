import { link } from "src/constants/link";

export const faqList = [
  {
    question: "What is ZKsync Ignite?",
    answer: (
      <>
        ZKsync Ignite is designed to turn ZKsync Era into a liquidity hub for
        the Elastic Chain by streaming 300M ZK tokens over 9 months to DeFi
        users.
        <br />
        <br />
        Split into 3 seasons, ZKsync Ignite will allocate ZK tokens to DeFi
        users that provide liquidity for key token pairs, supply to lending
        markets, and trade on selected DeFi protocols.
      </>
    ),
    key: crypto.randomUUID(),
  },
  {
    question: "When will ZKsync Ignite go live?",
    answer: (
      <>
        ZKsync Ignite was originally{" "}
        <a
          className="underline dim"
          target="_blank"
          rel="noopener noreferrer"
          href="https://forum.zknation.io/t/tpp-001-zksync-ignite-program-the-ignite-program/168"
        >
          introduced
        </a>{" "}
        to the ZKsync governance forum in October, 2024. In November, the ZKsync
        Governance System{" "}
        <a
          className="underline dim"
          target="_blank"
          rel="noopener noreferrer"
          href="https://vote.zknation.io/dao/proposal/61143334896738427838139044418897411872404555684850233057602201527014096413671?govId=eip155:324:0x10560f8B7eE37571AD7E3702EEb12Bc422036E89"
        >
          formally passed
        </a>{" "}
        the proposal. The elected DeFi Steering Committee is currently reviewing
        applications.
        <br /> <br />
        Once the selected protocols have fully integrated with ZKsync Ignite,
        the program will go live for DeFi users to participate and earn rewards.
        We expect this to be in the coming weeks.{" "}
      </>
    ),
    key: crypto.randomUUID(),
  },
  {
    question: "How can I participate?",
    answer: (
      <>
        DeFi users can participate once the program is live through a
        custom-build web application hosted on{" "}
        <a
          className="underline dim"
          href={link.programForm}
          target="_blank"
          rel="noopener noreferrer"
        >
          zksyncignite.xyz
        </a>
        . <br />
        This web app will allow DeFi users to browse participating protocols and
        incentivized pools, view a personal dashboard with unclaimed rewards,
        and one-click gasless deposits.
        <br />
        <br />
        Alternatively, DeFi users can interact directly with participating
        protocols and collect rewards from the web app.
      </>
    ),
    key: crypto.randomUUID(),
  },
] as const;

export type FaqListType = typeof faqList;
