import type { Campaign, Opportunity } from "@angleprotocol/merkl-api";
import config from "merkl.config";
import { api } from "../index.server";

export type ZyfiApi = {
  "erc20_sponsored_paymaster/v1": {
    payload: {
      /**
       * Defaults to ZKsync Era
       */
      chainId?: number,
      feeTokenAddress?: string,
      /**
       * [0-100] how much of the tx to sponsor
       */
      sponsorshipRatio: number,
      /**
       * Defaults to 5, how many time can the user replay the tx
       */
      replayLimit?: string,
      txData: {
        from: string,
        to: string,
        data: string
      }
    },
    response: {
      expirationTime: string,
      expiresIn: string,
      feeTokenAmount: string,
      feeTokendecimals: string
      feeUSD: string,
      gasLimit: string,
      gasPrice: string,
      markup: string,
      maxNonce: string,
      protocolAddress: string,
      sponsorshipRatio: string,
      tokenAddress: string,
      tokenPrice: string,
      txData: {
        from: string,
        to: string,
        data: string
      },
      warnings: string[]
    }
  }
}

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
export abstract class ZyfiService {
  static async #fetch<R, T extends { data: R; status: number }>(
    call: () => Promise<T>,
    resource = "Opportunity",
  ): Promise<NonNullable<T["data"]>> {
    const { data, status } = await call();

    if (status === 404) throw new Response(`${resource} not found`, { status });
    if (status === 500) throw new Response(`${resource} unavailable`, { status });
    if (data == null) throw new Response(`${resource} unavailable`, { status });
    return data;
  }

  static async #post<R extends keyof ZyfiApi>(route: R, payload: ZyfiApi[R]["payload"]): Promise<ZyfiApi[R]["response"]> {
    console.log("hun", {
      'Content-Type': 'application/json',
      'X-API-Key': (window as { ENV?: { ZYFI_API_KEY?: string } })?.ENV?.ZYFI_API_KEY ?? "",
    });
    
    const response = await fetch(`https://api.zyfi.org/api/${route}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': (window as { ENV?: { ZYFI_API_KEY?: string } })?.ENV?.ZYFI_API_KEY ?? "",
      },
      body: JSON.stringify(payload),
    });

    return await response.json() as ZyfiApi[R]["response"];
  }

  /**
   * Get sponsored tx from raw payload
   * @param transaction to wrap
   * @returns query
   */
  static async wrapTx(
    transaction: ZyfiApi["erc20_sponsored_paymaster/v1"]["payload"]["txData"],
  ) {
    const res = await ZyfiService.#post("erc20_sponsored_paymaster/v1", {
      txData: transaction,
      sponsorshipRatio: 100,
    })

    return res;
  }
}
