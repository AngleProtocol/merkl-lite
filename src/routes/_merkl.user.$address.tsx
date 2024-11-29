import { Outlet, useParams } from "@remix-run/react";
import { Group, Hash, Icon, Value, Text, Button } from "dappkit";
import { useState } from "react";
import Hero from "src/components/composite/Hero";

export default function Index() {
  const { address } = useParams();
  const [_isEditingAddress, setIsEditingAddress] = useState(false);

  return (
    <Hero
      navigation={{ label: "Back to opportunities", link: "/" }}
      title={
        <Group className="w-full gap-xl md:gap-xl*4 items-center">
          {/* TODO: Make it dynamic this */}
          <Group className="flex-col">
            <Text size={2} className="text-main-12">
              $6k
            </Text>
            <Text size="xl" className="!font-bold">
              Total earned
            </Text>
          </Group>
          <Group className="flex-col">
            <Text size={2} className="text-main-12">
              $1.2k
            </Text>
            <Text size={"xl"} className="!font-bold">
              Earned today
            </Text>
          </Group>
          <Group className="flex-col">
            <Text size={2} className="text-main-12">
              $3k
            </Text>
            <Text size={"xl"} className="!font-bold">
              Claimable
            </Text>
          </Group>
          <Group className="flex-col">
            <Button look="hype" size="lg">
              Claim
            </Button>
          </Group>
        </Group>
      }
      description={
        <Hash size={4} className="text-main-12" format="short" copy>
          {address}
        </Hash>
      }
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
      ]}
    >
      <Outlet />
    </Hero>
  );
}
