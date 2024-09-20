import Group from "src/components/extenders/Group";
import Button from "src/components/primitives/Button";
import Divider from "src/components/primitives/Divider";
import Image from "src/components/primitives/Image";
import Input from "src/components/primitives/Input";
import List from "src/components/primitives/List";
import Text from "src/components/primitives/Text";
import { useWalletContext } from "src/context/Wallet.context";
import { useAccount, useConfig } from "wagmi";

export default function WalletConnectors() {
  const { config, connect, connector: connected, address } = useWalletContext();

  return (
    <Group className="flex-col w-full ">
      <List look="bold">
        {config.connectors.map((connector) => {
          return (
            <Button
              look={connected?.id === connector.id ? "hype" : undefined}
              onClick={() => connect(connector.id)}
              key={connector.id}
            >
              <Image
                className="h-8 w-8 rounded-md"
                alt={connector.name}
                src={connector.icon}
                fallback="WC"
              />
              {connector.name}
            </Button>
          );
        })}
      </List>
      <Divider horizontal className="border-main-6" />
      <Text>Spy</Text>
      <Input size="sm" placeholder="Address" />
    </Group>
  );
}
