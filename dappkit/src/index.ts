//Primitives
export { default as Block } from "./components/primitives/Block";
export * from "./components/primitives/Block";

export { default as Box } from "./components/primitives/Box";
export * from "./components/primitives/Box";

export { default as Button } from "./components/primitives/Button";
export * from "./components/primitives/Button";

// export * from "./components/primitives/Checkbox";
export * from "./components/primitives/Divider";
export * from "./components/primitives/Icon";
export * from "./components/primitives/Image";
export * from "./components/primitives/Input";
// export * from "./components/primitives/Switch";
export * from "./components/primitives/Text";

//Extenders
export * from "./components/extenders/Dropdown";
export { default as Dropdown } from "./components/extenders/Dropdown";
export * from "./components/extenders/Group";
export * from "./components/extenders/Modal";
export * from "./components/extenders/Select";

//DApp
export * from "./context/Dapp.context";
export * from "./context/Theme.context";
export * from "./components/dapp/WalletButton";
export * from "./components/dapp/WalletConnectors";

//Utils
export * from "./utils/tailwind";

import "./theming/tailwind.css";