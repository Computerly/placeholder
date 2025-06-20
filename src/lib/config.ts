import { dev } from "$app/environment";

export const baseTitle = "Rebricks Digital";
export const seperator = " | ";
export const description =
  "Rebricks Digital is a digital design and development agency, specializing in small businesses.";
export const url = dev
  ? "http://localhost:5173/"
  : "https://rebricksdigital.com/";
export const book_a_meeting_url =
  "https://calendly.com/caleb-rebricksdigital/30min";
export const defaultImages = {
  og: "/og-default.png",
  twitterCard: "/twitter-card.png",
  twitterSummary: "/twitter-summary.png",
};
