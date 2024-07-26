import { r as redirect } from "../../../chunks/index.js";
const actions = {
  default: async ({ locals }) => {
    locals.pb.authStore.clear();
    locals.user = null;
    redirect(303, "/");
  }
};
export {
  actions
};
