<script lang="ts">
  import {
    ChartCandlestick,
    SwatchBook,
    SlidersVertical,
    HandHelping,
    Server,
    Briefcase,
  } from "@lucide/svelte";
  import { cn } from "$lib/utils";

  type AddonBadge = {
    title: string;
    options?: {
      class?: string;
    };
  };
  type Addon = {
    name: string;
    description: string;
    icon: any;
    price: number;
    priceUnit: string; // empty string means one time
    startingOrFixed: "starting" | "fixed";
    badge?: AddonBadge;
  };

  const addons: Addon[] = [
    {
      name: "Brand Hub",
      description:
        "A centralized, always-up-to-date microsite with your brand colors, fonts, logos, and usage guidelines. No more digging through folders or emails.",
      icon: SwatchBook,
      price: 500,
      priceUnit: "",
      startingOrFixed: "starting",
    },
    {
      name: "Content Management (CMS)",
      description:
        "Lets you update and manage content through a clean admin interface. Starts at $750 depending on scope. Hosting not included.",
      icon: SlidersVertical,
      price: 750,
      priceUnit: "",
      startingOrFixed: "starting",
    },
    {
      name: "Ongoing Support",
      description:
        "Covers small updates, tweaks, and advice month-to-month. Great for businesses without in-house tech help.",
      icon: HandHelping,
      price: 150,
      priceUnit: "monthly",
      startingOrFixed: "starting",
    },
    {
      name: "Analytics & Visibility Reports",
      description:
        "Monthly insights into how your site is performing: Google Analytics, Apple Maps, Google My Business, SEO basics.",
      icon: ChartCandlestick,
      price: 50,
      priceUnit: "monthly",
      startingOrFixed: "starting",
    },
    {
      name: "Advanced Hosting",
      description:
        "Includes database support, backups, staging environment, and faster performance.",
      icon: Server,
      price: 35,
      priceUnit: "monthly",
      startingOrFixed: "starting",
    },
    {
      name: "Brand Toolkit",
      description:
        "Email signatures, business cards, letterheads, and branded templates — all designed to match your visual identity.",
      icon: Briefcase,
      price: 600,
      priceUnit: "",
      startingOrFixed: "starting",
      badge: {
        title: "New!",
        options: {
          class: "",
        },
      },
    },
  ];
</script>

<!-- <SectionLabel name="Add-ons" level={2} /> -->

<!-- Addons -->
<div class="grid grid-cols-3 addons border-b border-carbon-500">
  {#each addons as item}
    <div
      class="p-8 addon flex overflow-hidden flex-col justify-between gap-8 relative"
    >
      <div>
        <svelte:component this={item.icon} size={32} class="mb-2" />
        <h4 class="text-xl font-medium mb-4">{item.name}</h4>
        <p class="text-carbon-300">
          {item.description}
        </p>
      </div>
      <div>
        <div class="text-xs text-carbon-200">Starting at</div>
        <span class="text-emerald-500/70 text-xl">${item.price}</span>
        {#if item.priceUnit}
          <span class="text-sm text-carbon-200"> /{item.priceUnit} </span>
        {/if}
      </div>

      {#if item.badge?.title}
        <div
          class="absolute grid place-items-center bottom-0 right-0 aspect-square"
        >
          <div
            class={cn(
              " before:!bg-emerald-500/10 before:!border before:!border-emerald-500/40 text-emerald-50 px-4 py-2 -translate-y-full -rotate-45 text-sm origin-bottom-right relative ribbon",
              item.badge.options?.class,
            )}
          >
            {item.badge.title}
          </div>
        </div>
      {/if}
    </div>
  {/each}
</div>

<style>
  @reference "../../../app.css";
  .addon {
    @apply border-carbon-500 border-0;
  }
  .addon:nth-child(3n + 1),
  .addon:nth-child(3n + 2) {
    @apply border-carbon-500 border-r;
  }
  .addon:nth-last-child(-n + 3) {
    @apply border-carbon-500 border-t;
  }

  .ribbon:before {
    content: "";
    background-color: inherit;
    position: absolute;
    z-index: -10;
    inset: 0;
    width: 250%;
    height: 100%;
    transform: translateX(-25%);
  }
</style>
