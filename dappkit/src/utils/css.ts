import clsx, { type ClassValue } from "clsx";
import { boxStyles } from "src/components/primitives/Box";
import { twMerge } from "tailwind-merge";

/**
 * Merges classes together with the most compatibility possible
 * @returns finalized class
 */
export function mergeClass(...classes: ClassValue[]) {
  return twMerge(clsx(...classes));
}
