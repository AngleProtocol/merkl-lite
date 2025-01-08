import { MerklApi } from "@merkl/api";

const apiUrl =
  (typeof window === "undefined" ? process.env.API_URL : (window as { ENV?: { API_URL?: string } })?.ENV?.API_URL) ??
  "https://api.merkl.xyz";
const api = MerklApi(apiUrl);

export { api };
