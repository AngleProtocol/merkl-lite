import { type LoaderFunctionArgs, type MetaFunction, json } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { ProtocolService } from "src/api/services/protocol.service";
import Hero from "src/components/composite/Hero";

export async function loader({ params: { id } }: LoaderFunctionArgs) {
  const protocol = await ProtocolService.get({ id: id ?? "" });

  return json({ protocol });
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data?.protocol) return [{ title: "Merkl" }];

  return [{ title: `${data?.protocol?.name} on Merkl` }];
};

export default function Index() {
  const { protocol } = useLoaderData<typeof loader>();

  return (
    <Hero
      icons={[{ src: protocol?.icon }]}
      title={protocol?.name}
      breadcrumbs={[
        { link: "/protocols", name: "Protocols" },
        { link: `/protocols/${protocol.name}`, name: protocol.name },
      ]}
      description={"Protocol"}
      tabs={[
        {
          label: "Opportunities",
          link: `/protocols/${protocol.name?.toLowerCase()}`,
          key: crypto.randomUUID(),
        },
      ]}>
      <Outlet />
    </Hero>
  );
}
