import { MerklApi } from "@merkl/api";

const api = MerklApi((window as { ENV?: { API_URL?: string } })?.ENV?.API_URL ?? "https://api.merkl.xyz");

export { api };
