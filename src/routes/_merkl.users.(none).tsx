import { Outlet, useNavigate } from "@remix-run/react";
import { Button, Group, Hash, Icon, Input } from "dappkit";
import { useWalletContext } from "packages/dappkit/src/context/Wallet.context";
import { useState } from "react";
import Hero from "src/components/composite/Hero";

export default function Index() {
  const [_isEditingAddress] = useState(false);
  const { address } = useWalletContext();
  const [inputAddress, setInputAddress] = useState<string>();
  const navigate = useNavigate();

  return (
    <Hero
      breadcrumbs={[]}
      navigation={{ label: "Back to opportunities", link: "/" }}
      title={"Dashboard"}
      description={
        <Group>
          <Input
            state={[inputAddress, setInputAddress]}
            look="soft"
          />
          <Button onClick={() => navigate(`/users/${inputAddress}`)} size="xl" look="soft">
            <Icon remix="RiSendPlane2Fill" />
          </Button>
        </Group>
      }
      tabs={[
        {
          label: (
            <>
              <Icon size="sm" remix="RiGift2Fill" />
              Rewards
            </>
          ),
          link: `/users/${address}`,
        },
        {
          label: (
            <>
              <Icon size="sm" remix="RiDropFill" />
              Liquidity
            </>
          ),
          link: `/users/${address}/liquidity`,
        },
        {
          label: (
            <>
              <Icon size="sm" remix="RiListCheck3" />
              Claims
            </>
          ),
          link: `/users/${address}/claims`,
        },
      ]}>
      <Outlet />
    </Hero>
  );
}
