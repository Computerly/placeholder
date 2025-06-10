<script lang="ts">
  import Logo from "$lib/assets/logos/CombinationMarkNegative.svg";
  import { cn } from "$lib/utils";
  import { clsx } from "clsx";
  import { navScroll } from "./scroll";
  import { page } from "$app/state";

  let allowCollapse = $derived(page.data?.allowNavigationCollapse ?? false);

  const scrollState = navScroll();

  let marker: HTMLDivElement;

  function moveMarker(e: MouseEvent) {
    return;
    if (!marker || !e.target) return;

    marker.style.left = `${e.target.offsetLeft}px`;
    marker.style.top = `${e.target.offsetTop + e.target.offsetHeight}px`;
    marker.style.width = `${e.target.offsetWidth}px`;
  }
</script>

{#snippet link(text: string, href: string, className: string = "")}
  <li class={cn("", className)}>
    <a {href} onclick={(e) => moveMarker(e)}>{text}</a>
  </li>
{/snippet}

<header
  class={clsx(
    "fixed inset-x-0 top-0 transition-all h-nav border-b ease-[cubic-bezier(0.45,0,0.55,1)] duration-200 origin-top z-[9999]",
    $scrollState.hasScrolled
      ? "bg-carbon-950 border-carbon-500"
      : "bg-transparent border-transparent",
    $scrollState.recommendingNav
      ? "translate-y-0"
      : allowCollapse
        ? "-translate-y-full"
        : "translate-y-0",
  )}
>
  <nav class="h-full flex items-center justify-between mx-sides">
    <a href="/" onclick={(e) => moveMarker(e)}>
      <img
        class="h-[calc(var(--spacing-nav,60px)*0.5)]"
        src={Logo}
        alt="Rebricks Digital Logo"
      /></a
    >

    <ul class="flex items-center gap-4">
      {@render link("Services", "/#services")}
      {@render link("Pricing", "/#pricing")}
      {@render link("About", "/#about")}
      {@render link("Case Studies", "/case-studies")}
      {@render link("Contact", "/#contact", "ml-8")}
    </ul>
  </nav>
  <!-- <div
    bind:this={marker}
    class="absolute transition-all duration-750 bottom-0 translate-y-full left-0 bg-patina-500 select-none w-1 h-1 rounded-xs"
  ></div> -->
</header>
