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
    if (!marker || !e.target) return;

    const target = e.target as HTMLElement;
    const elWidth = target.offsetWidth; //e.target.clientWidth;
    console.log(target.offsetTop);

    marker.style.left = `${target.offsetLeft + elWidth / 2 - marker.offsetWidth / 2}px`;
    marker.style.top = `${target.offsetTop}px`;
    // marker.style.width = `${e.target.offsetWidth}px`;
  }
</script>

{#snippet link(text: string, href: string, className: string = "")}
  <li>
    <a
      {href}
      class={cn(
        "text-sm py-1 px-3 transition-all hover:bg-carbon-500/50 border  rounded-md border-carbon-500 bg-carbon-950",
        className,
      )}
      onclick={(e) => moveMarker(e)}>{text}</a
    >
  </li>
{/snippet}

<header
  class={clsx(
    "fixed inset-x-0 top-0 transition-all h-nav ease-[cubic-bezier(0.45,0,0.55,1)] duration-200 origin-top z-[9999]",
    $scrollState.hasScrolled ? "bg-carbon-950 " : "bg-transparent",
    $scrollState.recommendingNav
      ? "translate-y-0"
      : allowCollapse
        ? "-translate-y-full"
        : "translate-y-0",
  )}
>
  <nav
    class="h-full grid grid-cols-3 items-center justify-items-center mx-sides"
  >
    <a
      href="/"
      onclick={(e) => moveMarker(e)}
      class="transition-all place-self-start self-center"
    >
      <img
        class="h-[calc(var(--spacing-nav,60px)*0.5)]"
        src={Logo}
        alt="Rebricks Digital Logo"
      /></a
    >

    <ul class="flex items-center gap-4">
      {@render link("Services", "/services")}
      {@render link("Pricing", "/pricing")}
      {@render link("About", "/about")}
    </ul>

    <ul class="place-self-end self-center">
      {@render link("Start now", "/contact", "bg-patina-500")}
      <!-- <a href="/contact" class="btn btn-primary font-medium text-white">Start now</a> -->
    </ul>
  </nav>
  <div
    bind:this={marker}
    class="absolute transition-all duration-750 top-0 translate-y-[calc(100%+0.5rem)] left-0 bg-patina-500 select-none w-6 h-1 rounded-xs"
  ></div>

  <div
    class="border-carbon-500 border-t absolute bottom-0 min-w-0 left-1/2 -translate-x-1/2 transition-all {$scrollState.hasScrolled
      ? 'w-full'
      : 'w-0'}"
  ></div>
</header>
