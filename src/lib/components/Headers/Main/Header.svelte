<script lang="ts">
  import Logo from "$lib/assets/logos/CombinationMarkNegative.svg";
  import { cn } from "$lib/utils";
  import { clsx } from "clsx";
  import { navScroll } from "./scroll";
  import { page } from "$app/state";
  import underline from "$lib/assets/underline.svg";

  let allowCollapse = $derived(page.data?.allowNavigationCollapse ?? false);

  const scrollState = navScroll();

  let marker: HTMLDivElement;

  function moveMarker(e: MouseEvent) {
    // if (!marker || !e.target) return;
    // const target = e.target as HTMLElement;
    // const elWidth = target.offsetWidth; //e.target.clientWidth;
    // console.log(target.offsetTop);
    // marker.style.left = `${target.offsetLeft + elWidth / 2 - marker.offsetWidth / 2}px`;
    // marker.style.top = `${target.offsetTop}px`;
    // marker.style.width = `${e.target.offsetWidth}px`;
  }
</script>

{#snippet link(text: string, href: string, className: string = "")}
  <li class="group">
    <a {href} class={cn("block text-sm px-4 py-2", className)}>
      <div class="relative">
        <div
          class="font-weight-fix-medium group-hover:font-medium w-fit"
          data-text={text}
        >
          {text}
        </div>

        <img
          src={underline}
          alt="underline"
          class="underline_int"
          aria-hidden="true"
        />
        <!-- invert scale-x-0 translate-y-full absolute bottom-0 duration-200 h-2 transition-all origin-bottom-left hover:origin-bottom-right group-hover:scale-x-100 -->
      </div>
    </a>
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

    <ul class="flex items-center gap-0">
      {@render link("Services", "/services")}
      {@render link("Pricing", "/pricing")}
      {@render link("About", "/about")}
    </ul>

    <ul class="place-self-end self-center">
      <!-- {@render link("Start now", "/contact", "bg-patina-500")} -->
      <li>
        <a href="/contact" class="btn btn-secondary">Start now</a>
      </li>
    </ul>
  </nav>
  <!-- <div
    bind:this={marker}
    class="absolute transition-all duration-750 top-0 translate-y-[calc(100%+0.5rem)] left-0 bg-patina-500 select-none w-6 h-1 rounded-xs"
  ></div> -->

  <div
    class="border-carbon-500 border-t absolute bottom-0 min-w-0 left-1/2 -translate-x-1/2 transition-all {$scrollState.hasScrolled
      ? 'w-full'
      : 'w-0'}"
  ></div>
</header>

<style>
  .underline_int {
    filter: invert(100%);
    transform: translateY(100%) scaleX(0);
    bottom: 0;
    left: 0;
    position: absolute;
    height: calc(var(--spacing) * 2);
    transition: all;
    transition-duration: 200ms;
    transform-origin: bottom left;
    transition-timing-function: ease-in;

    li:hover &,
    &.active {
      transform: translateY(100%) scaleX(100%);
    }
  }
</style>
