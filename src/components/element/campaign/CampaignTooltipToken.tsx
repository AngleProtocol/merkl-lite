import type { Campaign } from "@merkl/api";
import { Button, Divider, Group, Icon, Text, Value } from "packages/dappkit/src";
import useCampaign from "src/hooks/resources/useCampaign";

export type IProps = {
  campaign: Campaign;
};

export default function CampaignTooltipToken({ campaign }: IProps) {
  const { amount } = useCampaign(campaign);

  return (
    <>
      <Group>
        <Group>
          <Icon remix={"RiMoneyDollarCircleLine"} />
          <Text look="bold">Total rewards</Text>
          <Value look={"base"} format="$0,0.#">
            {amount}
          </Value>
        </Group>
      </Group>
      <Divider look="soft" horizontal />
      {/* <Text size="xs">{token?.description}</Text> */}
      <Group className="flex-col" size="sm">
        <Button to={`/token/${campaign.rewardToken.symbol}`} size="sm" look="bold">
          {campaign.rewardToken.symbol} on Merkl
        </Button>
        <Button size="sm" look="bold">
          {campaign.rewardToken.symbol} on Etherscan
        </Button>
      </Group>
    </>
  );
}
