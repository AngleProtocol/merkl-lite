import { type LoaderFunctionArgs, type MetaFunction, json } from "@remix-run/node";
import { Meta, Outlet, useLoaderData } from "@remix-run/react";
import { api } from "src/api/index.server";
import Heading from "src/components/composite/Heading";

import { Container } from "dappkit";
import Tag from "src/components/element/Tag";
import useOpportunity from "src/hooks/resources/useOpportunity";
import { ErrorHeading } from "src/components/layout/ErrorHeading";

export async function loader({ params: { id, type, chain: chainId } }: LoaderFunctionArgs) {
  if (!chainId || !id || !type) throw "";

  const { data: chains } = await api.v4.chains.index.get({ query: { search: chainId } });
  const chain = chains?.[0];

  if (!chain) throw new Response(`Chain ${chainId} could not be found`, { status: 404 });

  const { data: opportunity, status } = await api.v4.opportunities({ id: `${chain.id}-${type}-${id}` }).get();

  if (status === 404) throw new Response("Opportunity not found", { status });
  if (status === 500) throw new Response("Opportunity unavailable", { status });
  if (!opportunity) throw new Response("Opportunity unavailable", { status });

  return json(opportunity);
}

export const meta: MetaFunction<typeof loader> = ({ data,error }) => {
  if (error) return [{ title: error }];
  return [{ title: `${data?.name} on Merkl` }];
};

export default function Index() {
  const opportunity = useLoaderData<typeof loader>();
  const { tags, description, link } = useOpportunity(opportunity);

  return (
    <Container>
      <Meta />
      <Heading
        icons={opportunity.tokens.map(t => ({ src: t.icon }))}
        navigation={{ label: "Back to opportunities", link: "/" }}
        title={opportunity.name}
        description={description}
        tabs={[
          { label: "Overview", link },
          { label: "Leaderboard", link: `${link}/leaderboard` },
          { label: "Analytics", link: `${link}/analytics` },
        ]}
        tags={tags.map(tag => (
          <Tag key={`${tag.type}_${tag.value?.address ?? tag.value}`} {...tag} size="sm" look="bold" />
        ))}>
        <Outlet />
      </Heading>
    </Container>
  );
}

export function ErrorBoundary() {
  return <ErrorHeading/>
}
