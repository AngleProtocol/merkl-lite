import type { Campaign, Opportunity } from "@angleprotocol/merkl-api";
import config from "merkl.config";
import { api } from "../index.server";

export abstract class OpportunityService {
  static async #fetch<R, T extends { data: R; status: number }>(
    call: () => Promise<T>,
    resource = "Opportunity"
  ): Promise<NonNullable<T["data"]>> {
    const { data, status } = await call();

    if (status === 404) throw new Response(`${resource} not found`, { status });
    if (status === 500)
      throw new Response(`${resource} unavailable`, { status });
    if (data == null) throw new Response(`${resource} unavailable`, { status });
    return data;
  }

  /**
   * Retrieves opportunities query params from page request
   * @param request request containing query params such as chains, status, pagination...
   * @param override params for which to override value
   * @returns query
   */
  static #getQueryFromRequest(
    request: Request,
    override?: Parameters<typeof api.v4.opportunities.index.get>[0]["query"]
  ) {
    const status = new URL(request.url).searchParams.get("status");
    const action = new URL(request.url).searchParams.get("action");
    const chainId = new URL(request.url).searchParams.get("chain");
    const page = new URL(request.url).searchParams.get("page");

    const items = new URL(request.url).searchParams.get("items");
    const search = new URL(request.url).searchParams.get("search");
    const [sort, order] =
      new URL(request.url).searchParams.get("sort")?.split("-") ?? [];

    const filters = Object.assign(
      { status, action, chainId, items, sort, order, name: search, page },
      override ?? {},
      page !== null && { page: Number(page) - 1 }
    );

    const query = Object.entries(filters).reduce(
      (_query, [key, filter]) =>
        Object.assign(_query, filter == null ? {} : { [key]: filter }),
      {}
    );

    return query;
  }

  static async getManyFromRequest(request: Request) {
    return OpportunityService.getMany(
      OpportunityService.#getQueryFromRequest(request)
    );
  }

  static async getMany(
    query: Parameters<typeof api.v4.opportunities.index.get>[0]["query"]
  ): Promise<{ opportunities: Opportunity[]; count: number }> {
    //TODO: updates tags to take an array
    const opportunities = await OpportunityService.#fetch(async () =>
      api.v4.opportunities.index.get({
        query: Object.assign(
          { ...query },
          config.tags?.[0] ? { tags: config.tags?.[0] } : {}
        ),
      })
    );
    const count = await OpportunityService.#fetch(async () =>
      api.v4.opportunities.count.get({ query })
    );

    return { opportunities: opportunities.filter((o) => o !== null), count };
  }

  static async getCampaigns(query: {
    chainId: number;
    type: string;
    identifier: string;
  }): Promise<Campaign[]> {
    const { chainId, type, identifier } = query;

    type T = Parameters<typeof api.v4.campaigns.index.get>[0]["query"]["type"];
    const campaigns = await OpportunityService.#fetch(async () =>
      api.v4.campaigns.index.get({
        query: { chainId, type: type as T, identifier },
      })
    );

    return campaigns.filter((c) => c !== null);
  }

  static async get(query: {
    chainId: number;
    type: string;
    identifier: string;
  }): Promise<Opportunity> {
    const { chainId, type, identifier } = query;
    const opportunity = await OpportunityService.#fetch(async () =>
      api.v4.opportunities({ id: `${chainId}-${type}-${identifier}` }).get()
    );

    //TODO: updates tags to take an array
    if (config.tags && !opportunity.tags.includes(config.tags?.[0]))
      throw new Response("Opportunity inacessible", { status: 403 });

    return opportunity;
  }
}
