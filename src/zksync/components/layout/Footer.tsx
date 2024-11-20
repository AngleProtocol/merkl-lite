import { Group, Icon, Button, Container, Title } from "dappkit";
import Image from "../../../../packages/dappkit/src/components/primitives/Image";
import igniteLogo from "../../../assets/images/ignite_white.svg";
import merklFooter from "../../../assets/images/merkl-footer.svg";
import { link } from "src/constants/link";
import footerMp4 from "src/assets/video/footer.mp4";

export default function Footer() {
  return (
    <section className="w-full relative flex flex-col overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="flex-1 absolute inset-0 object-cover z-0 pointer-events-none w-full"
      >
        <source src={footerMp4} type="video/mp4" />
      </video>
      <Container className="z-10 relative">
        <Group className="gap-xl*2 lg:!gap-0 my-lg md:my-lg*2 lg:my-xl*4 py-lg md:py-xl*2 lg:py-xl*4 items-center flex justify-center">
          <Title className="mx-auto" h={3} size={3}>
            Fuel a new Era of DeFi
          </Title>
        </Group>
      </Container>
      <footer className="relative backdrop-blur py-lg lg:py-xl flex flex-nowrap justify-between items-center w-full">
        <Container className="relative z-10">
          <Group className="justify-between">
            <Button to="/" look="text" className="hidden md:flex">
              <Image
                className="w-[125px] lg:w-[165px]"
                alt="Ignite logo"
                src={igniteLogo}
              />
            </Button>

            <Group className="gap-xl lg:ml-xl*2">
              <Button look="text" external to={link.x}>
                <Icon className="w-lg*2 lg:w-xl*2" remix="RiTwitterXFill" />
              </Button>
              <Button look="text" external to={link.telegram}>
                <Icon className="w-lg*2 lg:w-xl*2" remix="RiTelegram2Fill" />
              </Button>
            </Group>

            <Button to={link.merkl} external look="text">
              <Image
                className="w-[130px]"
                alt="Merkl Footer logo"
                src={merklFooter}
              />
            </Button>
          </Group>
        </Container>
      </footer>
    </section>
  );
}
