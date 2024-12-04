import type { Campaign, Token as TokenType } from "@merkl/api";
import { Dropdown, Icon, PrimitiveTag, Text, Value } from "packages/dappkit/src";
import { useMemo } from "react";
import useCampaign from "src/hooks/resources/useCampaign";
import CampaignTooltipToken from "../campaign/CampaignTooltipToken";
import TokenTooltip from "./TokenTooltip";

export type TokenProps = {
  token: TokenType;
  value?: boolean;
  amount?: bigint;
  campaign?: Campaign;
};

export default function Token({ token, amount, value, campaign }: TokenProps) {
  const { dailyRewardsUsd } = useCampaign(campaign);

  const display = useMemo(
    () => (
      <PrimitiveTag look="base">
        <Icon rounded src={token.icon} />
        {!!amount && (
          <Value format="0.00a" look={"bold"}>
            {amount.toString()}
          </Value>
        )}
        {<Text look={"bold"}>{token.symbol}</Text>}
        {token?.price && !!amount && (
          <Value look={"soft"} format="$0.00a">
            {dailyRewardsUsd}
          </Value>
        )}
      </PrimitiveTag>
    ),
    [token, amount, dailyRewardsUsd],
  );

  const renderDropdownContent = useMemo(() => {
    if (campaign) return <CampaignTooltipToken campaign={campaign} />;
    return <TokenTooltip token={token} />;
  }, [campaign, token]);

  if (value) return display;
  return <Dropdown content={renderDropdownContent}>{display}</Dropdown>;
}
