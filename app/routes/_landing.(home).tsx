import type { MetaFunction } from "@remix-run/node";
import { Container, Group, Text, Countdown } from "dappkit";
import Faq from "src/components/composite/Faq";
import heroMp4 from "src/assets/video/hero.mp4";
import zkSyncIgnite from "src/assets/images/zksync-ignite-logo.svg";
import Image from "../../packages/dappkit/src/components/primitives/Image";

export const meta: MetaFunction = () => {
  return [
    { title: "ZKsync Ignite" },
    { name: "description", content: "Welcome to ZKsync Ignite!" },
  ];
};

export function Hero() {
  return (
    <section className="hero flex flex-col bg-main-2 w-full min-h-screen relative overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="z-0 pointer-events-none absolute inset-0 w-full h-full object-cover"
      >
        <source src={heroMp4} type="video/mp4" />
      </video>
      <Container className="flex flex-wrap items-center flex-1 z-10">
        <Group className="w-10/12 mx-auto gap-xl*2 flex flex-col">
          <Image
            src={zkSyncIgnite}
            className="block w-[80vw] md:w-[60vw] xl:w-[40vw]"
          />
        </Group>
      </Container>
    </section>
  );
}

export function CountdownSection() {
  return (
    <section className="counter py-xl*2 bg-accent-11 w-full">
      <Container>
        <Group className="gap-xl*2 lg:!gap-0 my-lg md:my-xl*2 lg:my-xl*4 items-center flex-wrap-reverse justify-center">
          <Group className="text-gray-12 text-xl justify-center items-center gap-y-xl lg:gap-x-xl*2">
            <Countdown targetDate={new Date("2024-12-01T12:00:00")} />
            <Text
              size={5}
              className="w-full md:w-auto text-center md:text-left !text-main-1"
            >
              left before ignition
            </Text>
          </Group>
        </Group>
      </Container>
    </section>
  );
}

export default function Index() {
  return (
    <>
      <Hero />
      <Faq
        faqs={[
          "What is ZKsync Ignite?",
          "When will ZKsync Ignite go live?",
          "How can I participate?",
        ]}
      />
    </>
  );
}
