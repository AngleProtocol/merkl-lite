import { type LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Container, Space } from "dappkit";
import { ChainService } from "src/api/services/chain.service";
import { OpportunityService } from "src/api/services/opportunity.service";
import OpportunityLibrary from "src/components/element/opportunity/OpportunityLibrary";

export async function loader({ params: { id: chainId }, request }: LoaderFunctionArgs) {
  const chain = await ChainService.get({ search: chainId });
  const { opportunities, count } = await OpportunityService.getManyFromRequest(request, {
    chainId: chain.id.toString(),
  });

  return json({ opportunities, count });
}

export default function Index() {
  const { opportunities, count } = useLoaderData<typeof loader>();

  return (
    <Container>
      <Space size="md" />
      <OpportunityLibrary exclude={["chain"]} count={count} opportunities={opportunities} />
    </Container>
  );
}
