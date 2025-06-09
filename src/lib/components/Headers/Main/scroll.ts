// Credit https://github.com/significa/significa.co/blob/main/src/components/top-navigation.svelte
import { browser } from "$app/environment";
import { readable } from "svelte/store";

const SCROLL_THRESHOLD = 78;

type ScrollStatus = {
  hasScrolled: boolean;
  recommendingNav: boolean;
};

export const navScroll = () => {
  let lastScrollY = 0;
  let showNav = true;

  const initialState = {
    hasScrolled: false,
    recommendingNav: true,
  };

  if (browser) {
    lastScrollY = window.scrollY;
    initialState.recommendingNav = lastScrollY < SCROLL_THRESHOLD;
    initialState.hasScrolled = lastScrollY > SCROLL_THRESHOLD;
  }

  return readable<ScrollStatus>(initialState, (_, update) => {
    if (!browser) return;

    const onScroll = () => {
      const scrollY = window.scrollY;
      const direction = scrollY > lastScrollY ? "down" : "up";
      lastScrollY = scrollY;

      if (scrollY < SCROLL_THRESHOLD) {
        showNav = true;
      } else if (direction === "up") {
        showNav = true;
      } else if (direction === "down") {
        showNav = false;
      }

      update(() => ({
        hasScrolled: scrollY > SCROLL_THRESHOLD,
        recommendingNav: showNav,
      }));
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    lastScrollY = window.scrollY;

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  });
};
