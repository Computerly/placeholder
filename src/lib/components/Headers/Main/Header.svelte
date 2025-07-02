<script lang="ts">
  import Logo from "$lib/assets/logos/CombinationMarkNegative.svg";
  import { cn } from "$lib/utils";
  import { clsx } from "clsx";
  import { navScroll } from "./scroll";
  import { page } from "$app/state";
  import underline from "$lib/assets/underline.svg";
  import { onMount } from "svelte";

  let allowCollapse = $derived(page.data?.allowNavigationCollapse ?? false);

  const scrollState = navScroll();

  let isOpen = $state(false);

  let previousWidth = $state(0);
  const breakPoint = 768;

  function resizeHandler() {
    const currentWidth = window.screen.width;
    if (breakPoint - previousWidth > 0 != breakPoint - currentWidth > 0) {
      isOpen = false;
    }
  }
  $effect(() => {
    if (isOpen) {
      // overflip clip and 100dvh on body
      document.body.style.overflow = "hidden";
      document.body.style.height = "100dvh";
    } else {
      document.body.style.overflow = "visible";
      document.body.style.height = "auto";
    }
  });
  onMount(() => {
    previousWidth = window.screen.width;

    window.addEventListener("deviceorientation", () => {
      isOpen = false;
    });
    window.addEventListener("resize", resizeHandler);
  });
</script>

{#snippet link(text: string, href: string, className: string = "")}
  <li class="group">
    <a
      {href}
      class={cn("block text-3xl md:text-sm px-4 py-2", className)}
      onclick={() => (isOpen = false)}
    >
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
      </div>
    </a>
  </li>
{/snippet}

<header
  class={clsx(
    "fixed inset-x-0 top-0 transition-all h-nav ease-[cubic-bezier(0.45,0,0.55,1)] duration-200 origin-top z-[9999]",
    $scrollState.hasScrolled && !isOpen ? "bg-carbon-950 " : "bg-transparent",
    $scrollState.recommendingNav
      ? "translate-y-0"
      : allowCollapse
        ? "-translate-y-full"
        : "translate-y-0",
  )}
>
  <nav
    class="h-full grid grid-cols-2 md:grid-cols-3 items-center justify-items-center mx-sides"
  >
    <a href="/" class="transition-all place-self-start self-center">
      <img
        class="h-[calc(var(--spacing-nav,60px)*0.5)]"
        src={Logo}
        alt="Rebricks Digital Logo"
      /></a
    >

    <ul
      class="flex flex-col items-center gap-0 bg-carbon-950/80 backdrop-blur-md origin-top fixed z-[-1] md:z-0 h-[100dvh] inset-0 pt-nav md:flex-row md:scale-y-100 {isOpen
        ? 'scale-y-full transition-transform'
        : 'scale-y-0 '} overflow-hidden md:bg-transparent md:backdrop-blur-none md:static md:h-auto md:pt-0"
    >
      {@render link("Services", "/services")}
      {@render link("Pricing", "/pricing")}
      {@render link("About", "/about")}
    </ul>

    <div class="flex gap-4 place-self-end self-center">
      <ul class="hidden sm:block">
        <li>
          <a href="/contact" class="btn btn-secondary">Start now</a>
        </li>
      </ul>
      <button
        type="button"
        class="md:hidden"
        onclick={() => (isOpen = !isOpen)}
      >
        <span class="sr-only">Open main menu</span>
        <div class="hamburger" class:open={isOpen}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </button>
    </div>
  </nav>

  <div
    class="border-carbon-500 border-t absolute bottom-0 min-w-0 left-1/2 -translate-x-1/2 transition-all {$scrollState.hasScrolled &&
    !isOpen
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

  .hamburger {
    --height: 2px;
    aspect-ratio: 1.5 / 1;
    height: 18px;
    transition: 0.5s ease-in-out;
    cursor: pointer;
    position: relative;

    gap: --height;

    & span {
      display: block;
      position: absolute;
      inset-inline: 0;
      top: 0;
      height: var(--height);
      width: 100%;
      background: var(--color-carbon-50);
      border-radius: 9px;
      transition: 0.25s ease-in-out;
    }
    & span:nth-child(2) {
      top: 50%;
    }
    & span:nth-child(3) {
      top: 100%;
    }
    &.open :not(:nth-child(2)) {
      top: 50%;
    }
  }
</style>
