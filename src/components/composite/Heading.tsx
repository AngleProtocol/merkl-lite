import { useLocation } from "@remix-run/react";
import { Box, Divider, Group, Icon, type IconProps, Icons, Text, Title } from "dappkit";
import { Button } from "dappkit";
import type { PropsWithChildren, ReactNode } from "react";

export type HeadingProps = PropsWithChildren<{
  icons: IconProps[];
  title: ReactNode;
  navigation?: { label: ReactNode; link: string };
  description: ReactNode;
  tags?: ReactNode[];
  tabs?: { label: ReactNode; link: string }[];
}>;

export default function Heading({
  navigation,
  icons,
  title,
  description,
  tags,
  tabs,
  children,
}: HeadingProps) {
  const location = useLocation();

  return (
    <>
      <Group className="flex-row justify-between pb-md">
        <Group size="sm" className="mt-xl flex-col">
          <Group>
            {/** Disabled and set invisible when undefined to preserve layout height */}
            <Button
              className={!navigation ? "invisible" : ""}
              disabled={!navigation?.link}
              to={navigation?.link}
              look="soft"
              size="sm"
            >
              <Icon size="sm" remix="RiArrowLeftSLine" />
              {navigation?.label}
            </Button>
          </Group>
          <Group>
            <Icons size="lg">
              {icons?.map((icon) => (
                <Icon
                  className="text-main-12"
                  key={`${Object.values(icon)}`}
                  {...icon}
                />
              ))}
            </Icons>
            <Title h={1} size={3}>{title}</Title>
          </Group>
          {tags && <Group className="mb-lg">{tags}</Group>}
          <Text>{description}</Text>
          <Box size="sm" look="base" className="flex-row mt-xl*2 w-min">
            {tabs?.map(tab => (
              <Button look={location.pathname === tab.link ? "hype" : "soft"} to={tab.link} key={tab.link}>
                {tab.label}
              </Button>
            ))}
          </Box>
        </Group>
      </Group>
      <Divider className="border-main-4" horizontal />
      <div>{children}</div>
    </>
  );
}
