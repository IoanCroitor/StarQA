import { r as redirect } from "../../../../../chunks/index.js";
import { d as private_env } from "../../../../../chunks/shared-server.js";
const GET = async ({ locals, url, cookies }) => {
  const provider = JSON.parse(cookies.get("provider") || "{}");
  console.log(provider);
  if (provider.state !== url.searchParams.get("state")) {
    throw new Error("State parameters don't match");
  }
  try {
    const res = await locals.pb.collection("users").authWithOAuth2Code(
      provider.name,
      url.searchParams.get("code") || "",
      provider.codeVerifier,
      private_env.REDIRECT_URL + provider.name
    );
  } catch (error) {
    console.error(error);
    return redirect(303, "/login?fail=true");
  }
  throw redirect(303, "/login");
};
export {
  GET
};
