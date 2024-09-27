import * as RadixSelect from "@radix-ui/react-select";
import React, { type PropsWithChildren, type ReactNode } from "react";
import { tv } from "tailwind-variants";
import Icon from "../../components/primitives/Icon";
import { useTheme } from "../../context/Theme.context";
import { mergeClass } from "../../utils/css";
import type { Component, GetSet, Variant } from "../../utils/types";
import { boxStyles } from "../primitives/Box";
import List from "../primitives/List";

export const selectStyles = tv({
  base: [
    "text-main-11 flex items-center justify-between gap-1 border-1 outline-offset-0 outline-0 text-nowrap font-main font-medium",
  ],
  slots: {
    dropdown: "animate-drop mt-sm",
    item: "cursor-pointer select-none p-sm outline-offset-0 outline-0 text-nowrap",
    icon: "border-l-1 h-full flex items-center",
    value: "flex",
  },
  variants: {
    look: {
      soft: {
        base: "bg-main-0 border-main-0 hover:bg-main-4 active:bg-main-3 hover:text-main-12  focus-visible:border-main-9",
        icon: "border-main-0",
        item: "hover:bg-main-5 data-[highlighted]:bg-main-5 active:bg-main-4 text-main-12 focus-visible:border-main-8",
      },
      base: {
        base: "bg-main-2 border-main-6 hover:bg-main-4 active:bg-main-3 hover:text-main-12  focus-visible:border-main-9",
        icon: "border-main-6",
        item: "hover:bg-main-5 data-[highlighted]:bg-main-5 active:bg-main-4 text-main-12 focus-visible:border-main-8",
      },
      bold: {
        base: "bg-main-4 border-main-4 hover:bg-main-5 active:bg-main-3 text-main-12 focus-visible:border-main-9",
        icon: "border-main-6",
        item: "hover:bg-main-6 data-[highlighted]:bg-main-6 active:bg-main-5 text-main-12 focus-visible:border-main-8",
      },
      tint: {
        base: "bg-accent-4 border-accent-4 hover:bg-accent-5 active:bg-accent-3 text-main-12 focus-visible:border-accent-9",
        icon: "border-accent-6",
        item: "hover:bg-accent-6 data-[highlighted]:bg-accent-6 active:bg-accent-5 text-main-12 focus-visible:border-main-8",
      },
      hype: {
        base: "bg-accent-9 border-accent-9 hover:bg-accent-10 active:bg-accent-8 text-accent-12 focus-visible:border-accent-10",
        icon: "border-accent-11",
        item: "hover:bg-accent-10 data-[highlighted]:bg-accent-10 active:bg-accent-4 text-main-12 focus-visible:border-accent-10",
      },
    },
    size: {
      xs: {
        base: "text-xs rounded-xs",
        value: "px-xs*2 py-xs*2",
        icon: "px-0",
        item: "px-sm text-xs rounded-xs",
      },
      sm: {
        base: "text-sm rounded-sm",
        value: "px-sm py-sm/2",
        icon: "px-xs/2",
        item: "px-md text-sm rounded-sm",
      },
      md: {
        base: "text-md rounded-md",
        value: "px-md text-md py-md/2",
        icon: "px-md/2",
        item: "px-md text-md rounded-md",
      },
      lg: {
        base: " text-lg rounded-lg",
        value: "px-lg py-lg/2",
        icon: "px-md/2",
        item: "px-lg text-lg rounded-lg",
      },
      xl: {
        base: "text-xl rounded-xl",
        value: "px-lg py-lg/2",
        icon: "px-lg/2",
        item: "px-xl text-xl rounded-xl",
      },
    },
  },
  defaultVariants: {
    look: "base",
    size: "md",
  },
  compoundVariants: [
    {
      size: "xs",
      look: "soft",
      class: { icon: "!pl-0", value: "!pr-0" },
    },
    {
      size: "sm",
      look: "soft",
      class: { icon: "!pl-0", value: "!pr-0" },
    },
    {
      size: "md",
      look: "soft",
      class: { icon: "!pl-0", value: "!pr-sm/2" },
    },
    {
      size: "lg",
      look: "soft",
      class: { icon: "!pl-0", value: "!pr-md/2" },
    },
    {
      size: "xl",
      look: "soft",
      class: { icon: "!pl-0", value: "!pr-lg/2" },
    },
  ],
});

export type SelectProps<Value extends string | number | symbol = string> = Component<{
  size?: Variant<typeof selectStyles, "size">;
  look?: Variant<typeof selectStyles, "look">;
  value?: Value;
  placeholder?: string;
  state?: GetSet<Value>;
  options?: { [key: string | number | symbol]: ReactNode };
}> &
  RadixSelect.SelectProps;

const SelectItem = React.forwardRef<
  HTMLDivElement,
  PropsWithChildren<{ className: string } & RadixSelect.SelectItemProps>
>(({ children, ...props }, forwardedRef) => (
  <RadixSelect.Item {...props} ref={forwardedRef}>
    <RadixSelect.ItemText>{children}</RadixSelect.ItemText>
    <RadixSelect.ItemIndicator className="absolute left-0 w-[25px] inline-flex items-center justify-center" />
  </RadixSelect.Item>
));

export default function Select({ look, size, state, options, placeholder, className, ...props }: SelectProps<string>) {
  const { vars } = useTheme();
  const [getter, setter] = state ?? [];

  const { base, dropdown, item, icon, value } = selectStyles({
    look: look ?? "base",
    size: size ?? "md",
  });

  return (
    <RadixSelect.Root {...props} value={getter && `${String(getter)}`} onValueChange={n => setter?.(n)}>
      <RadixSelect.Trigger className={mergeClass(base({ look, size }), className)} aria-label="Food">
        <div className={value()}>
          <RadixSelect.Value placeholder={placeholder ?? "Select"} />
        </div>
        <div className={icon()}>
          <Icon remix="RiArrowDropDownLine" />
        </div>
      </RadixSelect.Trigger>
      <RadixSelect.Portal>
        <RadixSelect.Content
          position="popper"
          style={vars}
          className={mergeClass(
            boxStyles({ size: "xs", content: size }),
            dropdown(),
            "min-w-[var(--radix-select-trigger-width)]",
          )}>
          <RadixSelect.Viewport>
            <RadixSelect.Group className="max-h-[400px]">
              <List look="soft" size={size}>
                {Object.entries(options ?? {}).map(([value, label]) => {
                  return (
                    <SelectItem className={item()} key={value} value={value}>
                      {label}
                    </SelectItem>
                  );
                })}
              </List>
            </RadixSelect.Group>
          </RadixSelect.Viewport>
        </RadixSelect.Content>
      </RadixSelect.Portal>
    </RadixSelect.Root>
  );
}
