import { Group, Button, Container, Title, Icon } from "dappkit";
import igniteLogo from "../../../assets/images/ignite.svg";
import Image from "../../../../packages/dappkit/src/components/primitives/Image";
import { link } from "src/constants/link";
import { motion } from "framer-motion";

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
  return (
    <motion.header
      variants={container}
      initial="hidden"
      whileInView="visible"
      className="w-full fixed top-0 z-20"
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
            <Group className="gap-xl*2">
              <Group className="md:justify-end items-center gap-xl">
                <Title h={5} className="hidden md:block">
                  Follow us on
                </Title>
                <Group>
                  <Button
                    className="transition-opacity hover:opacity-70 !rounded-full !p-md !text-main-1 !bg-main-12"
                    external
                    to={link.x}
                  >
                    <Icon
                      className="!h-xl*1.5 w-lg*2 lg:w-xl*1.5"
                      remix="RiTwitterXFill"
                    />
                  </Button>
                  <Button
                    className="transition-opacity hover:opacity-70 !rounded-full !p-md !text-main-1 !bg-main-12"
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

              {/* <Button
              className="!p-lg !rounded-full transition-all duration-300 bg-accent-11 text-accent-1 hover:bg-accent-12 hover:text-main-1 active:bg-main-3 focus-visible:border-main-9"
              to="/app"
            >
              You're a protocol?
            </Button> */}
            </Group>
          </motion.div>
        </Group>
      </Container>
    </motion.header>
  );
}
