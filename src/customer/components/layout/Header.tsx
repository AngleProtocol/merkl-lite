import { Group, Button, Container, Icon } from "dappkit";
import igniteLogo from "src/customer/assets/images/ignite.svg";
import Image from "../../../../packages/dappkit/src/components/primitives/Image";
import { link } from "src/customer/constants/link";
import { motion } from "framer-motion";
import { useState } from "react";

const container = {
  hidden: { opacity: 0, y: 0 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { y: "-100%" },
  visible: {
    y: 0,
  },
};

export default function Header() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.header
      variants={container}
      initial="hidden"
      whileInView="visible"
      className="w-full fixed top-0 z-20 backdrop-blur"
    >
      <Container className="py-xl">
        <Group className="justify-between items-center">
          <motion.div variants={item}>
            <Button to="/" look="text">
              <Image
                className="w-[160px] md:w-[200px]"
                alt="zkSync logo"
                src={igniteLogo}
              />
            </Button>
          </motion.div>

          <motion.div variants={item}>
            <Group className="gap-xl">
              <Group className="md:justify-end items-center gap-xl">
                <Group>
                  <Button
                    className="dim !rounded-full !p-md !text-main-12 hover:bg-transparent bg-transparent"
                    external
                    to={link.x}
                  >
                    <Icon
                      className="!h-xl*1.5 w-lg*2 lg:w-xl*1.5"
                      remix="RiTwitterXFill"
                    />
                  </Button>
                  <Button
                    className="dim !rounded-full !p-md !text-main-12 hover:bg-transparent bg-transparent"
                    external
                    to={link.telegram}
                  >
                    <Icon
                      className="!h-xl*1.5 w-lg*2 lg:w-xl*1.5"
                      remix="RiTelegram2Fill"
                    />
                  </Button>
                </Group>
              </Group>
              <div
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <Button
                  className={`!rounded-full ease text-md ${
                    isHovered
                      ? "bg-accent-10 text-main-1"
                      : "bg-main-11 text-accent-4"
                  }`}
                  size="lg"
                  to="/app"
                  disabled
                >
                  {isHovered ? "Coming Soon" : "Enter App"}
                </Button>
              </div>
            </Group>
          </motion.div>
        </Group>
      </Container>
    </motion.header>
  );
}
