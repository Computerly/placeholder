<script lang="ts">
  import SectionLabel from "../Misc/SectionLabel.svelte";
  import { Minus, CircleCheck } from "@lucide/svelte";

  type Supported = "none" | "limited" | "full";

  type Feature =
    | {
        name: string;
        type: "supported";
        value: Supported;
        note?: string;
      }
    | {
        name: string;
        type?: "string"; // Optional, default type
        value: string;
        note?: string;
      };

  type Plan = {
    name: string;
    description: string;
    features: Feature[];
  };

  const featuresList: string[] = [
    "Payment Type",
    "Ownership",
    "Support",
    "Edits",
    "Hosting Included",
    "Contract Length",
    "Best For",
  ] as const;

  const plans: Plan[] = [
    {
      name: "Upfront",
      description:
        "One-time payment. Best if you know what you need. Support is extra. Hosting is up to you.",
      features: [
        { name: "One-time payment", value: "One-time payment" },
        { name: "Ownership", value: "Full" },
        {
          name: "Support",
          type: "supported",
          value: "full",
          note: "Charged hourly",
        },
        { name: "Edits", value: "Critical security only" },
        { name: "Hosting Included", type: "supported", value: "none" },
        { name: "Contract Length", type: "supported", value: "none" },
        {
          name: "Best For",
          value:
            "Small projects or teams with dedicated IT and development teams",
        },
      ],
    },
    {
      name: "Subscription",
      description:
        "Monthly plan with support and hosting included. Great for ongoing needs or if you're still figuring things out.",
      features: [
        { name: "One-time payment", value: "Recurring" },
        {
          name: "Ownership",
          value: "100% after minimum contract",
          note: "Ownership transfers after minimum contract length has been met. Typicall contract length is 12 months from launch.",
        },
        {
          name: "Support",
          type: "supported",
          value: "full",
          note: "Charged hourly",
        },
        {
          name: "Edits",
          value: "Unlimited",
          note: "Unlimited number of edits, limited to 10 hours each month. Additional billed separately.",
        },
        { name: "Hosting Included", type: "supported", value: "full" },
        { name: "Contract Length", value: "12 months" },
        {
          name: "Best For",
          value:
            "Customer facing websites or projects needing ongoing support and edits.",
        },
      ],
    },
  ];

  const supportStyles: { [K in Supported]: { icon: any; class?: string } } = {
    full: { icon: CircleCheck, class: "text-success" },
    limited: { icon: CircleCheck, class: "text-carbon-500" },
    none: { icon: Minus, class: "text-carbon-500" },
  };
  function getSupportedIcon(v: Supported) {
    return supportStyles[v];
  }

  let notes: string[] = [];

  function addNote(note: string): number {
    notes.push(note);
    return notes.length;
  }
</script>

<SectionLabel name="Plans" level={2} />

<div class="grid grid-cols-3 grid-rows-[auto_1fr] border-b border-carbon-500">
  {#snippet supportedItem(v: Supported)}
    {@const { class: className, icon: Icon } = getSupportedIcon(v)}
    <div class={className}>
      <Icon />
    </div>
  {/snippet}
  {#snippet listItem(feat: Feature | string)}
    <li
      class="border-y last:border-b-0 flex items-center gap-2 border-carbon-800 px-8 py-2 mt-[-1px]"
    >
      {#if typeof feat == "string"}
        {feat}
      {:else}
        {#if feat?.type == "supported"}
          {@render supportedItem(feat.value)}
        {:else}
          {feat.value}
        {/if}

        {#if feat.note}
          <sup class="text-xs text-carbon-300">{addNote(feat.note)}</sup>
        {/if}
      {/if}
    </li>
  {/snippet}

  {#each plans as plan, idx}
    <div class="p-8 {idx == 0 && 'border-x border-carbon-500 col-start-2'}">
      <h3 class="text-2xl font-medium mb-4">{plan.name}</h3>
      <p class="mb-8">
        {plan.description}
      </p>
    </div>
  {/each}
  <div>
    <ul>
      {#each featuresList as feat}
        {@render listItem(feat)}
      {/each}
    </ul>
  </div>
  {#each plans as plan, idx}
    <div class={(idx == 0 && "border-x border-carbon-500") || ""}>
      <ul>
        {#each plan.features as feat}
          {@render listItem(feat)}
        {/each}
      </ul>
    </div>
  {/each}
</div>

{#if notes}
  <div class="text-carbon-300 text-xs px-8 py-4">
    {#each notes as note, idx}
      <div>
        <span class="text-xs">{idx + 1}</span>
        <span>{note}</span>
      </div>
    {/each}
  </div>
{/if}
