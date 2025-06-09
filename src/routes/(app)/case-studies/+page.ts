import type { PageLoad } from "../(root)/$types";

export const load: PageLoad = async (event) => {
  return {
    allowNavigationCollapse: true,
  };
};
