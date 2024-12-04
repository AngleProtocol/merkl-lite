import type { Token as TokenType } from "@merkl/api";
import { Button, Dropdown, Icon, Text, Value } from "packages/dappkit/src";
import { useMemo } from "react";
import TokenTooltip from "./TokenTooltip";

export type TokenProps = {
  token: TokenType;
  value?: boolean;
  amount?: number;
};

export default function Token({ token, amount, value }: TokenProps) {
  const display = useMemo(
    () => (
      <Button look="soft">
        <Icon rounded size="sm" src={token.icon} />
        {amount && (
          <Value format="0.00a" look={"bold"}>
            {amount}
          </Value>
        )}
        {<Text look={"bold"}>{token.symbol}</Text>}
        {token?.price && amount && (
          <Value look={"soft"} format="$0.00a">
            {amount * token?.price}
          </Value>
        )}
      </Button>
    ),
    [token, amount]
  );

  if (value) return display;
  return (
    <Dropdown content={<TokenTooltip {...{ token, amount }} />}>
      {display}
    </Dropdown>
  );
}
