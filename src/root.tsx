import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  json,
  useLoaderData,
} from "@remix-run/react";
import { DAppProvider } from "dappkit";
import config from "../merkl.config";
import { api } from "./api/index.server";
import dappkitStyles from "../packages/dappkit/src/style.css?url";
import styles from "./index.css?url";

export const links: LinksFunction = () => [
  {
    rel: "stylesheet",
    href: dappkitStyles,
    as: "style",
  },
  {
    rel: "stylesheet",
    href: styles,
    as: "style",
  },
];

export async function loader(_args: LoaderFunctionArgs) {
  const { data: chains } = await api.v4.chains.index.get({ query: {} });

  if (!chains) throw "";

  return json({ ENV: { API_URL: process.env.API_URL }, chains });
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const data = useLoaderData<typeof loader>();

  return (
    <DAppProvider
      chains={data.chains}
      themes={config.themes}
      sizing={config.sizing}
      config={config.wagmi}
    >
      <Outlet />
      <script
        // biome-ignore lint/security/noDangerouslySetInnerHtml: needed for browser ENV
        dangerouslySetInnerHTML={{
          __html: `window.ENV = ${JSON.stringify(data?.ENV)}`,
        }}
      />
    </DAppProvider>
  );
}
