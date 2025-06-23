import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async (event) => {
  const token = event.params.proposal;

  // Look up the proposal by token

  // If the proposal is not found, return a 404 error
  // If the proposal is expired, return a 410 error
  // If the proposal is found, return the proposal data

  return {};
};
