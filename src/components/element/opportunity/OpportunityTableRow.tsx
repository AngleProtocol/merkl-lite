import type { Opportunity } from "@merkl/api";
import { Link } from "@remix-run/react";
import type { BoxProps } from "dappkit";
import { Dropdown, Group, Icon, Icons, PrimitiveTag, Text, Title, Value } from "dappkit";
import { mergeClass } from "dappkit";
import { useOverflowingRef } from "packages/dappkit/src/hooks/events/useOverflowing";
import { useMemo } from "react";
import type { OpportunityNavigationMode } from "src/config/opportunity";
import useOpportunity from "src/hooks/resources/useOpportunity";
import Tag, { type TagTypes } from "../Tag";
import AprModal from "../apr/AprModal";
import TokenAmountModal from "../token/TokenAmountModal";
import OpportunityParticipateModal from "./OpportunityParticipateModal";
import { OpportunityRow } from "./OpportunityTable";

export type OpportunityTableRowProps = {
  hideTags?: (keyof TagTypes)[];
  opportunity: Opportunity;
  navigationMode?: OpportunityNavigationMode;
} & BoxProps;

export default function OpportunityTableRow({
  hideTags,
  opportunity,
  className,
  navigationMode,
  ...props
}: OpportunityTableRowProps) {
  const { tags, link, icons, rewardsBreakdown } = useOpportunity(opportunity);

  const { ref, overflowing } = useOverflowingRef<HTMLHeadingElement>();

  const aprColumn = useMemo(
    () => (
      <Dropdown size="xl" onHover content={<AprModal opportunity={opportunity} />}>
        <PrimitiveTag look="tint" size="lg">
          <Value value format="0a%">
            {opportunity.apr / 100}
          </Value>
        </PrimitiveTag>
      </Dropdown>
    ),
    [opportunity],
  );

  const tvlColumn = useMemo(
    () => (
      <Dropdown size="xl" onHover content={<AprModal opportunity={opportunity} />}>
        <PrimitiveTag look="base" className="font-mono">
          <Value value format="$0,0.0a">
            {opportunity.tvl ?? 0}
          </Value>
        </PrimitiveTag>
      </Dropdown>
    ),
    [opportunity],
  );

  const rewardsColumn = useMemo(
    () => (
      <Dropdown
        className="py-xl"
        content={
          <TokenAmountModal
            tokens={rewardsBreakdown}
            label={
              <Group size="sm">
                <Icon remix="RiGift2Fill" />
                <Text size="sm" className="text-main-12" bold>
                  Daily Rewards
                </Text>
              </Group>
            }
          />
        }>
        <PrimitiveTag look="base" className="font-mono">
          <Value value format="$0,0.0a">
            {opportunity.dailyRewards ?? 0}
          </Value>
          <Icons>
            {rewardsBreakdown.map(({ token: { icon } }) => (
              <Icon key={icon} src={icon} />
            ))}
          </Icons>
        </PrimitiveTag>
      </Dropdown>
    ),
    [opportunity, rewardsBreakdown],
  );

  // biome-ignore lint/correctness/useExhaustiveDependencies: cannot include props
  const row = useMemo(
    () => (
      <OpportunityRow
        size="lg"
        content="sm"
        className={mergeClass("cursor-pointer", className)}
        {...props}
        aprColumn={aprColumn}
        tvlColumn={tvlColumn}
        rewardsColumn={rewardsColumn}
        opportunityColumn={
          <Group className="flex-col w-full text-nowrap whitespace-nowrap text-ellipsis">
            <Group className="text-nowrap whitespace-nowrap min-w-0 flex-nowrap overflow-hidden max-w-full">
              <Text className="text-xl">
                <Icons className="flex-nowrap">{icons}</Icons>
              </Text>
              {/* TODO: embed the ellipsis scroll behavior in the Text component as an ellipsis prop */}
              <Group className="overflow-hidden">
                <Title
                  h={3}
                  size={4}
                  ref={ref}
                  className={mergeClass(
                    "text-nowrap whitespace-nowrap text-ellipsis min-w-0 inline-block overflow-hidden",
                    overflowing && "hover:overflow-visible hover:animate-textScroll hover:text-clip",
                  )}>
                  <span className="overflow-visible">{opportunity.name}</span>
                </Title>
              </Group>
            </Group>
            <Group>
              {tags
                ?.filter(a => a !== undefined)
                ?.filter(({ type }) => !hideTags || !hideTags.includes(type))
                .map(tag => (
                  <Tag filter key={`${tag.type}_${tag.value?.address ?? tag.value}`} {...tag} size="xs" />
                ))}
            </Group>
          </Group>
        }
      />
    ),
    [opportunity, aprColumn, tvlColumn, hideTags, className, rewardsColumn, icons, overflowing, ref],
  );

  if (navigationMode === "supply")
    return <OpportunityParticipateModal opportunity={opportunity}>{row}</OpportunityParticipateModal>;
  return (
    <Link prefetch="intent" to={link}>
      {row}
    </Link>
  );
}
