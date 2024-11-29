import type { Campaign, Opportunity } from "@angleprotocol/merkl-api";
import { Group } from "@ariakit/react";
import { type LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Space } from "packages/dappkit/src";
import { api } from "src/api/index.server";
import CampaignLibrary from "src/components/element/campaign/CampaignLibrary";
import Participate from "src/components/element/participate/Participate";
import { ErrorContent } from "src/components/layout/ErrorContent";
import { ErrorHeading } from "src/components/layout/ErrorHeading";

export async function loader({ params: { id, type, chain: chainId } }: LoaderFunctionArgs) {
  if (!chainId || !id || !type) throw "";

  const { data: chains } = await api.v4.chains.index.get({
    query: { search: chainId },
  });
  const chain = chains?.[0];

  if (!chain) throw new Response(`Chain ${chainId} could not be found`, { status: 404 });

  const { data: opportunity, status } = await api.v4.opportunities({ id: `${chain.id}-${type}-${id}` }).get();
  if (status !== 200) throw new Response("DSQMDQS", { status })
  if (!opportunity) throw "No Opportunity";

  const { data: campaigns } = await api.v4.opportunities({ id: `${chain.id}-${type}-${id}` }).campaigns.get();

  if (!opportunity || !campaigns) throw "DAZZ";

  return json({ opportunity, campaigns: campaigns.campaigns });
}

export default function Index() {
  const { opportunity, campaigns } = useLoaderData<typeof loader>();

  return (
    <Group>
      <Space size="md" />
      <Group className="grid grid-cols-1 gap-md md:grid-cols-[1fr,300px]">
        <CampaignLibrary campaigns={campaigns as Campaign[]} />
        <Group className="flex-col">
          <Participate opportunity={opportunity as Opportunity} />
        </Group>
      </Group>
    </Group>
  );
}

export function ErrorBoundary() {
  return <ErrorContent/>
}
