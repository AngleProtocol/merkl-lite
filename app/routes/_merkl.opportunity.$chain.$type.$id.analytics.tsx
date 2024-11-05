import { type LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Text } from "dappkit/src";

export async function loader({ params }: LoaderFunctionArgs) {
  return json({ chain: params.chain });
}

export default function Index() {
  const opportunity = useLoaderData<typeof loader>();

  return <Text>Analytics</Text>;
}