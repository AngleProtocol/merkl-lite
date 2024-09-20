import { useMemo } from "react";
import Dropdown from "src/components/extenders/Dropdown";
import Group from "src/components/extenders/Group";
import Button, { type ButtonProps } from "src/components/primitives/Button";
import Divider from "src/components/primitives/Divider";
import Image from "src/components/primitives/Image";
import Text from "src/components/primitives/Text";
import Title from "src/components/primitives/Title";
import useWallet from "src/hooks/useWalletState";
import { Format } from "src/utils/format";
import WalletConnectors from "./WalletConnectors";

export type WalletButton = ButtonProps;

export default function WalletButton(props: ButtonProps) {
  const { address, connected, connect, disconnect, connector, chainId } = useWallet();

  const description = useMemo(() => {
    if (address) return `Connected as ${address}`;
    return "Choose a wallet to connect with";
  }, [address]);

  if (true)
    return (
      <Dropdown
        content={
          <>
            <Title h={3}>Connect</Title>
            <Text>Choose amongst detected wallets.</Text>
            <WalletConnectors />
          </>
        }
      >
        <Button {...props}>{"Connect"}</Button>
      </Dropdown>
    );

  return (
    <>
      <Dropdown
        content={
          <>
            <Title h={3}>
              <Group className="items-center">
                <Image className="h-5" src={connector?.icon} />
                {Format.address(address, "short")}
                <Button size="xs">copy</Button>
                <Button onClick={disconnect} size="xs">
                  disconnect
                </Button>
              </Group>
            </Title>
            <Group className="items-center">
              <Text size="xs">Connected with {connector?.name}</Text>
            </Group>
            <Divider horizontal className="border-main-6 mt-4" />
            <Group className="items-center flex-col [&>*]:w-full">
              <Button size="sm" look="soft">
                Explorer
              </Button>
            </Group>
          </>
        }
      >
        <Button look="tint" size="sm">
          {Format.address(address, "short")}
        </Button>
      </Dropdown>
    </>
  );
}
