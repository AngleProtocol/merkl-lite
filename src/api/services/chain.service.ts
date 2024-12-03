import type { Chain } from "@angleprotocol/merkl-api";
import { api } from "../index.server";

export abstract class ChainService {
  static async #fetch<R, T extends { data: R; status: number }>(
    call: () => Promise<T>,
    resource = "Chain",
  ): Promise<NonNullable<T["data"]>> {
    const { data, status } = await call();

    if (status === 404) throw new Response(`${resource} not found`, { status });
    if (status === 500) throw new Response(`${resource} unavailable`, { status });
    if (data == null) throw new Response(`${resource} unavailable`, { status });
    return data;
  }

  static async getAll(): Promise<Chain[]> {
    const chains = await ChainService.#fetch(async () => api.v4.chains.index.get({ query: {} }));

    //TODO: add some cache here
    return chains;
  }

  static async getMany(query: Parameters<typeof api.v4.chains.index.get>[0]["query"]): Promise<Chain[]> {
    const chains = await ChainService.#fetch(async () => api.v4.chains.index.get({ query }));

    //TODO: add some cache here
    return chains;
  }

  static async get(query: Parameters<typeof api.v4.chains.index.get>[0]["query"]): Promise<Chain> {
    const chains = await ChainService.#fetch(async () => api.v4.chains.index.get({ query }));

    if (chains.length === 0) throw new Response("Chain not found", { status: 404 });

    //TODO: add some cache here
    return chains?.[0];
  }
}
