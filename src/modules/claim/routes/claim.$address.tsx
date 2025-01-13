import type { ActionFunctionArgs } from "@remix-run/node";
import { loader } from "src/modules/user/routes/user.$address.header";

export async function action({ params, request, context }: ActionFunctionArgs) {
  return loader({ params, request, context });
}
