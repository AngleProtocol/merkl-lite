import { Form } from "@remix-run/react";
import { Button, Group, Icon, Input, List, Select } from "dappkit/src";
import { useMemo, useState } from "react";
import { actions } from "src/config/actions";
import { chains } from "src/config/chains";
import useSearchParamState from "src/hooks/filtering/useSearchParamState";

const filters = ["search", "action", "status", "chain"] as const;
type OpportunityFilter = (typeof filters)[number];

export type OpportunityFilterProps = {
  only?: OpportunityFilter[];
  exclude?: OpportunityFilter[];
};

export default function OpportunityFilters({ only, exclude }: OpportunityFilterProps) {
  //TODO: componentify theses
  const actionOptions = Object.entries(actions).reduce(
    (obj, [action, { icon, label }]) =>
      Object.assign(obj, {
        [action]: (
          <>
            <Icon size="sm" {...icon} />
            {label}
          </>
        ),
      }),
    {},
  );
  const statusOptions = {
    LIVE: (
      <>
        <Icon size="sm" remix="RiFlashlightLine" /> Live
      </>
    ),
    SOON: (
      <>
        <Icon size="sm" remix="RiTimerLine" /> Soon
      </>
    ),
    PAST: (
      <>
        <Icon size="sm" remix="RiHistoryLine" /> Past
      </>
    ),
  };
  const chainOptions = Object.entries(chains).reduce(
    (obj, [id, chain]) =>
      Object.assign(obj, {
        [id]: (
          <>
            <Icon size="sm" chain={id} />
            {chain.label}
          </>
        ),
      }),
    {},
  );

  const [actionsFilter, setActions] = useSearchParamState<string[]>(
    "action",
    v => v?.join(","),
    v => v?.split(","),
  );
  const [statusFilter, setStatus] = useSearchParamState<string[]>(
    "status",
    v => v?.join(","),
    v => v?.split(","),
  );
  const [chainIdsFilter, setChainIds] = useSearchParamState<string[]>(
    "chain",
    v => v?.join(","),
    v => v?.split(","),
  );

  const [innerSearch, setInnerSearch] = useState<string>();
  const [search, setSearch] = useSearchParamState<string>(
    "search",
    v => v,
    v => v,
  );

  const fields = useMemo(() => {
    if (only) return filters.filter(f => only.includes(f));
    if (exclude) return filters.filter(f => !exclude.includes(f));
    return filters;
  }, [only, exclude]);

  function onSearchSubmit() {
    if (!innerSearch || innerSearch === search) return;

    setSearch(innerSearch);
  }

  return (
    <Group>
      {fields.includes("search") && (
        <Form>
          <List flex="row" size="sm" content="sm" look="bold">
            <Input name="search" value={innerSearch} state={[innerSearch, setInnerSearch]} placeholder="Search" />
            <Button onClick={onSearchSubmit}>
              <Icon size="sm" remix="RiSearchLine" />
            </Button>
          </List>
        </Form>
      )}
      {fields.includes("action") && (
        <Select
          state={[actionsFilter, setActions]}
          allOption={"All actions"}
          multiple
          options={actionOptions}
          size="sm"
          look="bold"
          placeholder="Actions"
        />
      )}
      {fields.includes("status") && (
        <Select
          state={[statusFilter, s => setStatus(s)]}
          allOption={"All status"}
          multiple
          options={statusOptions}
          size="sm"
          look="bold"
          placeholder="Status"
        />
      )}
      {fields.includes("chain") && (
        <Select
          state={[chainIdsFilter, setChainIds]}
          allOption={"All chains"}
          multiple
          search
          options={chainOptions}
          size="sm"
          look="bold"
          placeholder="Chains"
        />
      )}
    </Group>
  );
}
