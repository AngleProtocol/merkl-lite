import { type LoaderFunctionArgs, json } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { useMemo } from "react";
import Hero from "src/components/composite/Hero";
import Tag, { type TagType } from "src/components/element/Tag";
import { chainIdOrder } from "src/constants/chain";
import config from "../../merkl.config";
import { TokenService } from "src/api/services/token.service";
import { ChainService } from "src/api/services/chain.service";

export async function loader({ params: { symbol } }: LoaderFunctionArgs) {
  const tokens = await TokenService.getSymbol(symbol);
  const chains = await ChainService.getAll();

  return json({ tokens, chains });
}

export default function Index() {
  const { tokens, chains } = useLoaderData<typeof loader>();
  const token = tokens?.[0];

  const tags = useMemo(() => {
    return tokens
      .sort(({ chainId: a }, { chainId: b }) => {
        const order = chainIdOrder;

        if (order.indexOf(b) === -1) return -1;
        if (order.indexOf(b) === -1 && order.indexOf(a) === -1) return 0;
        if (order.indexOf(a) === -1) return 1;
        return order.indexOf(b) - order.indexOf(a);
      })
      .map(
        t =>
          ({
            type: "tokenChain",
            value: { ...t, chain: chains?.find(c => c.id === t.chainId) },
          }) satisfies TagType<"tokenChain">,
      );
  }, [tokens, chains]);

  return (
    <Hero
      icons={[{ src: tokens.find(t => t.icon && t.icon !== "")?.icon }]}
      navigation={{ label: "Back to opportunities", link: "/" }}
      title={
        <>
          {token.name} <span className="font-mono text-main-8">({token.symbol})</span>
        </>
      }
      description={`Deposit or earn ${token.symbol} on ${config.appName}.`}
      tabs={[
        {
          label: "Opportunities",
          link: `/token/${token.symbol?.toLowerCase()}`,
        },
      ]}
      tags={tags.map(tag => <Tag key={`${tag.type}_${tag.value?.address ?? tag.value}`} {...tag} size="lg" />)}>
      <Outlet />
    </Hero>
  );
}
