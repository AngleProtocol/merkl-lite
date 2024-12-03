import type { Opportunity, Token } from "@angleprotocol/merkl-api";
import { Button, Divider, Dropdown, Group, Hash, Icon, PrimitiveTag, Text } from "dappkit";
import type { ButtonProps } from "dappkit";
import { type Action, actions } from "src/config/actions";
import type { Protocol } from "src/config/protocols";
import { statuses } from "src/config/status";

export type TagTypes = {
  chain: Opportunity["chain"];
  token: Token;
  tokenChain: Token & { chain?: Chain };
  protocol: Protocol;
  action: Action;
  status: Opportunity["status"];
};

export type TagType<T extends keyof TagTypes = keyof TagTypes> = {
  type: T;
  value: TagTypes[T];
};
export type TagProps<T extends keyof TagTypes> = ButtonProps & {
  type: T;
  value: TagTypes[T];
};

export default function Tag<T extends keyof TagTypes>({ type, value, ...props }: TagProps<T>) {
  switch (type) {
    case "status": {
      const status = statuses[value as TagTypes["status"]] ?? statuses.LIVE;
      return (
        <Dropdown
          size="lg"
          padding="xs"
          content={
            <Group className="flex-col">
              <Group size="xs" className="flex-col">
                <Group size="sm">
                  <Icon {...status.icon} />
                  <Text size="sm" className="text-main-12" bold>
                    {status?.label}
                  </Text>
                </Group>
              </Group>
              <Divider look="soft" horizontal />
              <Group className="flex-col">
                <Text size="xs">{status?.description}</Text>
                <Button to={`/status/${status?.label}`} size="xs" look="soft">
                  <Icon remix="RiArrowRightLine" />
                  Open
                </Button>
              </Group>
            </Group>
          }>
          <PrimitiveTag look="soft" key={value} {...props}>
            <Icon size={props?.size} {...status.icon} />
            {status?.label}
          </PrimitiveTag>
        </Dropdown>
      );
    }
    case "chain": {
      const chain = value as TagTypes["chain"];
      return (
        <Dropdown
          size="lg"
          padding="xs"
          content={
            <Group className="flex-col">
              <Group className="w-full justify-between items-center" size="xl">
                <Group size="sm">
                  <Icon src={chain?.icon} />
                  <Text size="sm" className="text-main-12" bold>
                    {chain?.name}
                  </Text>
                </Group>
                <Text size="xs">id: {chain?.id}</Text>
              </Group>

              <Divider look="soft" horizontal />
              <Group className="flex-col">
                <Button to={`/chain/${chain?.name}`} size="xs" look="soft">
                  <Icon remix="RiArrowRightLine" /> Open
                </Button>
              </Group>
            </Group>
          }>
          <PrimitiveTag look="base" key={value} {...props}>
            <Icon size={props?.size} src={chain?.icon} />
            {chain?.name}
          </PrimitiveTag>
        </Dropdown>
      );
    }
    case "action": {
      const action = actions[value as TagTypes["action"]];
      if (!action) return <Button {...props}>{value}</Button>;
      return (
        <Dropdown
          size="lg"
          padding="xs"
          content={
            <Group className="flex-col">
              <Group size="xs" className="flex-col">
                <Group size="sm">
                  <Icon {...action.icon} />
                  <Text size="sm" className="text-main-12" bold>
                    {action?.label}
                  </Text>
                </Group>
              </Group>
              <Divider look="soft" horizontal />
              <Text size="xs">{action?.description}</Text>
              <Button to={`/action/${action?.label}`} size="xs" look="soft">
                <Icon remix="RiArrowRightLine" />
                Open
              </Button>
            </Group>
          }>
          <PrimitiveTag look="bold" key={value} {...props}>
            <Icon size={props?.size} {...action.icon} />
            {action?.label}
          </PrimitiveTag>
        </Dropdown>
      );
    }
    case "token": {
      const token = value as TagTypes["token"];
      if (!token) return <Button {...props}>{value}</Button>;
      return (
        <Dropdown
          size="lg"
          padding="xs"
          content={
            <Group className="flex-col">
              <Group className="w-full justify-between items-center" size="xl">
                <Group size="sm">
                  <Icon size={props?.size} src={token.icon} />
                  <Text size="sm" className="text-main-12" bold>
                    {token?.name}
                  </Text>
                </Group>
                <Text size="xs">
                  <Hash copy format="short" size="xs">
                    {token.address}
                  </Hash>
                </Text>
              </Group>
              <Divider look="soft" horizontal />
              <Group className="flex-col" size="md">
                {/* <Text size="xs">{token?.description}</Text> */}
                <Button to={`/token/${token?.symbol}`} size="xs" look="soft">
                  <Icon remix="RiArrowRightLine" />
                  {token?.symbol} on Merkl
                </Button>
                <Button size="xs" look="soft">
                  <Icon remix="RiArrowRightLine" />
                  {token?.symbol} on Etherscan
                </Button>
              </Group>
            </Group>
          }>
          <PrimitiveTag look="base" key={value} {...props}>
            <Icon size={props?.size} src={token.icon} />
            {token?.symbol}
          </PrimitiveTag>
        </Dropdown>
      );
    }
    case "tokenChain": {
      const token = value as TagTypes["tokenChain"];
      if (!token) return <Button {...props}>{value}</Button>;
      return (
        <Dropdown
          size="lg"
          padding="xs"
          content={
            <Group className="flex-col">
              <Group size="xs" className="flex-col">
                <Group className="justify-between" size="xl">
                  <Text size="xs">Token</Text>
                  <Hash format="short" size="xs">
                    {token.address}
                  </Hash>
                </Group>
                <Group size="sm">
                  <Icon size={props?.size} src={token.logoURI} />
                  <Text size="sm" className="text-main-12" bold>
                    {token?.name}
                  </Text>
                </Group>
              </Group>
              <Divider look="soft" horizontal />
              <Group className="flex-col" size="md">
                {/* <Text size="xs">{token?.description}</Text> */}
                <Button to={`/chain/${token.chain?.name}`} size="sm" look="bold">
                  <Icon size="sm" src={token.chain?.icon} />
                  {token.chain?.name}
                </Button>
                <Button to={`/token/${token?.symbol}`} size="xs" look="soft">
                  <Icon remix="RiArrowRightLine" />
                  {token?.symbol} on Merkl
                </Button>
                <Button size="xs" look="soft">
                  <Icon remix="RiArrowRightLine" />
                  {token?.symbol} on Etherscan
                </Button>
              </Group>
            </Group>
          }>
          <PrimitiveTag look="base" key={value} {...props}>
            <Icon size={props?.size} src={token.chain.icon} />
            {token.chain.name}
          </PrimitiveTag>
        </Dropdown>
      );
    }
    case "protocol": {
      const protocol = value;
      if (!protocol) return <Button {...props}>{value}</Button>;
      return (
        <Dropdown
          size="lg"
          padding="xs"
          content={
            <Group className="flex-col">
              <Group size="sm">
                <Icon size={props?.size} src={protocol?.icon} />
                <Text size="sm" className="text-main-12" bold>
                  {value?.name}
                </Text>
              </Group>
              <Divider className="border-main-6" horizontal />
              {/* <Text size="xs">{token?.description}</Text> */}
              <Group className="flex-col" size="md">
                <Button to={`/protocols/${protocol?.name}`} size="sm" look="bold">
                  {protocol?.name} on Merkl
                </Button>
                <Button size="xs" look="soft">
                  <Icon remix="RiArrowRightLine" />
                  {protocol?.name}
                </Button>
              </Group>
            </Group>
          }>
          <PrimitiveTag look="tint" key={value} {...props}>
            <Icon src={protocol?.icon} />
            {value?.name}
          </PrimitiveTag>
        </Dropdown>
      );
    }
    default:
      return <PrimitiveTag {...props}>{value}</PrimitiveTag>;
  }
}
