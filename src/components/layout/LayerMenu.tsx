import { NavLink } from "@remix-run/react";
import { Divider, Group, Text, WalletButton } from "dappkit";
import { Icon } from "packages/dappkit/src";
import type { FC } from "react";
import { useMediaQuery } from "react-responsive";
import type { routesType } from "src/config/type";
import SCREENS from "../../../packages/dappkit/src/constants/SCREENS.json";
import SwitchMode from "../element/SwitchMode";
import SearchBar from "../element/functions/SearchBar";

export const LayerMenu: FC<{
  nav: routesType;
  setOpen: (open: boolean) => void;
}> = ({ nav, setOpen }) => {
  const smScreens = useMediaQuery({ maxWidth: SCREENS.md });
  return (
    <div className="layermenu z-50 min-w-64 bg-main-2 flex flex-col">
      <main className="flex-1 overflow-y-scroll w-full">
        <ul className="min-w-max list-none">
          {Object.entries(nav)
            .filter(([key]) => !["privacy", "terms"].includes(key))
            .map(([key, value]) => (
              <li key={value.key} className="border-b-1 first:pt-0 py-lg border-main-11">
                <NavLink
                  onClick={() => setOpen(false)}
                  to={value.route}
                  className="flex items-center gap-md capitalize">
                  <Icon remix={value.icon} className="text-xl text-main-11" />
                  <Text size="lg" bold className="text-main-12">
                    {key}
                  </Text>
                </NavLink>
              </li>
            ))}
        </ul>
      </main>
      <footer className="mt-lg">
        <Group className="flex-col items-stretch">
          <Group className="items-center">
            <SearchBar />
            <SwitchMode />
          </Group>
          {!!smScreens && (
            <>
              <Divider look="soft" />
              <WalletButton />
            </>
          )}
        </Group>
      </footer>
    </div>
  );
};
