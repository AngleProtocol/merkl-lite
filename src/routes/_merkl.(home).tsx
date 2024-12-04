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
      navigation={{
        label: "Back to opportunities",
        link: "/",
      }}
      title={"Opportunities"}
      description={"Compare campaigns, find the best opportunities and earn tokens"}
    >
      <Outlet />
    </Hero>
  );
}
