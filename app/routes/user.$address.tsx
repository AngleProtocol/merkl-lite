import { Outlet, useParams } from "@remix-run/react";
import Group from "dappkit/components/extenders/Group";
import Hash from "dappkit/components/primitives/Hash";
import Icon from "dappkit/components/primitives/Icon";
import Heading from "src/components/composite/Heading";
import Page from "src/components/composite/layout/Page";

export default function Index() {
  const { address } = useParams();

  return (
    <Page>
      <Heading
        icons={[{ remix: "RiUser6Fill" }]}
        navigation={{ label: "Back to opportunities", link: "/" }}
        title={
          <Hash value format="short">
            {address}
          </Hash>
        }
        description={"Inspect rewards, balances and positions."}
        tabs={[
          {
            label: (
              <>
                <Icon size="sm" remix="RiGift2Fill" />
                Rewards
              </>
            ),
            link: `/user/${address}`,
          },
          {
            label: (
              <>
                <Icon size="sm" remix="RiDropFill" />
                Liquidity
              </>
            ),
            link: `/user/${address}/liquidity`,
          },
          {
            label: (
              <>
                <Icon size="sm" remix="RiListCheck3" />
                Claims
              </>
            ),
            link: `/user/${address}/claims`,
          },
        ]}>
        <Outlet />
      </Heading>
    </Page>
  );
}
