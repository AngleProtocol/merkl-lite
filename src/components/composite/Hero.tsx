import type { Opportunity } from "@merkl/api";
import { useLoaderData, useLocation, useNavigate } from "@remix-run/react";
import {
  Container,
  Divider,
  Dropdown,
  Group,
  Hash,
  Icon,
  type IconProps,
  Icons,
  Input,
  Tabs,
  Text,
  Title,
} from "dappkit";
import { Button } from "dappkit";
import config from "merkl.config";
import { useState, type PropsWithChildren, type ReactNode } from "react";
import type { loader } from "src/routes/_merkl.users.$address";

export type HeroProps = PropsWithChildren<{
  icons?: IconProps[];
  title: ReactNode;
  breadcrumbs?: { name?: string; link: string; component?: ReactNode }[];
  navigation?: { label: ReactNode; link: string };
  description: ReactNode;
  tags?: ReactNode[];
  sideDatas?: { data: ReactNode; label: string; key: string }[];
  tabs?: { label: ReactNode; link: string; key: string }[];
  opportunity?: Opportunity;
}>;

export default function Hero({
  navigation,
  breadcrumbs,
  icons,
  title,
  description,
  tags,
  sideDatas,
  tabs,
  children,
}: HeroProps) {
  return (
    <>
      {/* TODO: Align lines & descriptions on all pages  */}
      {/* TODO: On sub-pages (all pages except Opportunities): Replace the banner by a color  */}
      <Group
        className="flex-row justify-between aspect-[1440/440] bg-cover bg-no-repeat xl:aspect-auto xl:min-h-[400px]"
        style={{ backgroundImage: `url('${config.images.hero}')` }}
      >
        <Container>
          <Group className="flex-col h-full py-xl gap-xl lg:gap-xs">
            <Group className="items-center">
              {/* TODO: Build dynamic breadcrumbs */}
              <Button to={navigation?.link} look="soft" size="xs">
                Home
              </Button>
              {breadcrumbs?.map((breadcrumb) => {
                if (breadcrumb.component) return breadcrumb.component;
                return (
                  <Button
                    key={breadcrumb.link}
                    to={breadcrumb.link}
                    look="soft"
                    size="xs"
                  >
                    <Icon remix="RiArrowRightSLine" />
                    {breadcrumb.name}
                  </Button>
                );
              })}
            </Group>
            <Group className="grow items-center justify-between gap-xl lg:gap-xl*4">
              <Group className="flex-col flex-1 gap-xl lg:!gap-lg*2">
                <Group>
                  <Group className="items-center !gap-0 md:!gap-xl">
                    {!!icons && (
                      <Icons size="lg">
                        {icons?.length > 1
                          ? icons?.map((icon) => (
                              <Icon
                                className="hidden md:block text-main-12 !w-lg*4 !h-lg*4"
                                key={`${Object.values(icon)}`}
                                {...icon}
                              />
                            ))
                          : icons?.map((icon) => (
                              <Icon
                                className="hidden md:block text-main-12 !w-xl*4 !h-xl*4"
                                key={`${Object.values(icon)}`}
                                {...icon}
                              />
                            ))}
                      </Icons>
                    )}
                    <Title h={1} size={2}>
                      {title}
                    </Title>
                  </Group>
                </Group>
                <Divider look="base" />
                {!!description && (
                  <Text size="xl" bold>
                    {description}
                  </Text>
                )}
                {!!tags && <Group className="mb-lg">{tags}</Group>}
              </Group>
              {!!sideDatas && (
                <Group
                  className="w-full lg:w-auto lg:flex-col mr-xl*2"
                  size="xl"
                >
                  {sideDatas.map((data) => (
                    <Group key={data.key} className="flex-col">
                      <Text size={3}>{data.data}</Text>

                      <Text size="xl" className="font-bold">
                        {data.label}
                      </Text>
                    </Group>
                  ))}
                </Group>
              )}
            </Group>
          </Group>
        </Container>
      </Group>
      <Container>
        {!!tabs && (
          <Group size="xl" className="my-lg">
            <Tabs tabs={tabs} look="base" size="lg" />
          </Group>
        )}
      </Container>
      <div>{children}</div>
    </>
  );
}
