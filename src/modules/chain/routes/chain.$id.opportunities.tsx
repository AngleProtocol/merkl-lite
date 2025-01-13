import { type LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Container, Group, Space, Title } from "dappkit";
import config from "merkl.config";
import OpportunityLibrary from "src/components/element/opportunity/OpportunityLibrary";
import { Cache } from "src/modules/cache/cache.service";
import { ChainService } from "src/modules/chain/chain.service";
import { OpportunityService } from "src/modules/opportunity/opportunity.service";
import { ProtocolService } from "src/modules/protocol/protocol.service";

export async function loader({ params: { id: chainId }, request }: LoaderFunctionArgs) {
  const chain = await ChainService.get({ name: chainId });
  const opportunityFilters = {
    chainId: chain.id.toString(),
  } as const;

  const { opportunities, count } = await OpportunityService.getManyFromRequest(request, opportunityFilters);
  const { opportunities: featuredOpportunities } = await OpportunityService.getFeatured(request, opportunityFilters);

  const { protocols } = await ProtocolService.getManyFromRequest(request);

  return json({ opportunities, count, protocols, featuredOpportunities });
}

export const clientLoader = Cache.wrap("chain/opportunities", 300);

export default function Index() {
  const { opportunities, count, protocols, featuredOpportunities } = useLoaderData<typeof loader>();

  return (
    <Container>
      <Space size="xl" />
      <Group size="xl" className="py-xl flex-col">
        {config.opportunity.featured.enabled && (
          <>
            <Title className="!text-main-11" h={3}>
              BEST OPPORTUNITIES
            </Title>
            <OpportunityLibrary forceView={"cells"} hideFilters opportunities={featuredOpportunities} />
            <Space size="xl" />
            <Title className="!text-main-11" h={3}>
              ALL OPPORTUNITIES
            </Title>
          </>
        )}
        <OpportunityLibrary exclude={["chain"]} opportunities={opportunities} count={count} protocols={protocols} />
      </Group>
    </Container>
  );
}
