import type { MetaFunction } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import Hero from "src/components/composite/Hero";

export const meta: MetaFunction = () => {
  return [{ title: "Merkl" }];
};

export default function Index() {
  return (
    <Hero
      icons={[{ remix: "RiPlanetFill" }]}
      navigation={{ label: "Back to opportunities", link: "/" }}
      title={"Bridge"}
      description={"Bridge funds to your desired chain"}>
      <Outlet />
    </Hero>
  );
}
