import { type LoaderFunctionArgs, json } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import Heading from "src/components/composite/Heading";
import { Container } from "dappkit";
import { type Action, actions, getAction } from "src/config/actions";

export async function loader({
  params: { action: _action },
}: LoaderFunctionArgs) {
  const action = getAction(_action ?? "");

  if (!action) throw new Error("Unknown action");

  return json({ action });
}

export default function Index() {
  const { action: _action } = useLoaderData<typeof loader>();
  const action = actions[_action as Action];

  return (
    <Container>
      <Heading
        icons={[action.icon]}
        navigation={{ label: "Back to opportunities", link: "/" }}
        title={action.label}
        description={action.description}
        tabs={[
          {
            label: "Opportunities",
            link: `/action/${action.label?.toLowerCase()}`,
          },
        ]}
      >
        <Outlet />
      </Heading>
    </Container>
  );
}
