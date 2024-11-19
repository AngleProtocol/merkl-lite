import type { MetaFunction } from "@remix-run/node";
import { Button, Container, Group, Text, Title, Countdown } from "dappkit";
import Faq from "src/components/composite/Faq";
import heroWebm from "src/assets/video/hero.webm";
import heroMp4 from "src/assets/video/hero.mp4";

import { link } from "src/constants/link";
import { motion } from "framer-motion";

export const meta: MetaFunction = () => {
  return [
    { title: "ZKsync Ignite" },
    { name: "description", content: "Welcome to ZKsync Ignite!" },
  ];
  p;
};

const container = {
  hidden: { y: 0 },
  visible: {
    y: 0,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { y: "100%" },
  visible: {
    y: 0,
  },
};

export function Hero() {
  return (
    <section className="hero flex flex-col bg-accent-10 w-full min-h-screen relative">
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="flex-1 object-cover z-0 pointer-events-none"
      >
        <source src={heroWebm} type="video/webm" />
        <source src={heroMp4} type="video/mp4" />
      </video>
      <Container className="absolute flex flex-wrap items-center h-full z-10">
        <Group className="w-10/12 mx-auto gap-xl*2">
          <Title
            h={1}
            size="display1"
            className="text-center md:text-left !text-main-12"
          >
            <motion.div variants={container} initial="hidden" animate="visible">
              <div className="overflow-y-hidden">
                <motion.div variants={item}>Ready to ignite</motion.div>
              </div>

              <div className="overflow-y-hidden">
                <motion.div variants={item}>your protocol?</motion.div>
              </div>
            </motion.div>
          </Title>

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7, duration: 0.3 }}
          >
            <Button
              external
              size="xl"
              look="hype"
              className="!rounded-full"
              to={link.programForm}
            >
              {/* <Icon remix="RiArrowRightLine" /> */}
              Join the program now!
            </Button>
          </motion.div>
        </Group>
        {/* <Group className="justify-center items-stretch w-full my-xl gap-xl">
              <Input
                className="!flex-1 w-full !rounded-full !px-xl !text-main-9 inline-flex items-center placeholder:!text-main-9 !bg-main-1 min-w-[300px]"
                placeholder="Enter your email for updates"
              />
              <Button
                size="xl"
                look="bold"
                mode="dark"
                className="!rounded-full"
                coloring={zkSyncThemes.igniteWarm.base}
              >
                <Icon remix="RiArrowRightLine" className="text-main-11" />
                Subscribe
              </Button>
            </Group> */}
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
      <CountdownSection />
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
