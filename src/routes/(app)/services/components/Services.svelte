<script lang="ts">
</script>

{#snippet section(
  name: string,
  id: string,
  description: string,
  services: string[],
)}
  <section
    class="pt-8 grid scroll-mt-nav grid-rows-subgrid lg:first:border-l row-span-2 px-8 pb-16 w-full lg:border-r border-carbon-500"
    {id}
  >
    <div>
      <h2 class="text-4xl font-medium mb-4 capitalize">{name}</h2>
      <p class="mb-16 text-carbon-300">{description}</p>
    </div>
    <ul class="space-y-0">
      {#each services as ser}
        <li
          class="p-4 border-t last:border-b flex gap-4 items-center border-carbon-500"
        >
          <span>{ser}</span>
        </li>
      {/each}
    </ul>
  </section>
{/snippet}

<div class="mx-sides grid lg:grid-cols-3 grid-rows-[auto_1fr] py-16">
  {@render section(
    "Strategy",
    "strategy",
    "Identifying problems and opportunities.",
    ["Consulting", "Website Audits", "Market Research"],
  )}
  {@render section(
    "Design & Development",
    "design-development",
    "Building web-centric solutions for business.",
    [
      "Websites",
      "Web Apps",
      "User Interfaces (UI)",
      "User Experience (UX)",
      "Design Systems",
    ],
  )}
  {@render section(
    "Branding",
    "branding",
    "Creating a look people will remember.",
    ["Brand Guides", "Email Signatures", "Brand Voice & Messaging"],
  )}
  <!-- <section class="pt-8 pb-16 border-l px-8 w-full border-carbon-500" id="audit">
    <h2 class="text-4xl font-medium mb-4 capitalize">Strategy</h2>
    <p>Identifying problems & oportunites.</p>
    <ul>
      <li></li>
    </ul>
  </section>
  <section
    class="pt-8 pb-16 border-x px-8 w-full border-carbon-500"
    id="design-development"
  >
    <h2 class="text-4xl font-medium mb-4 capitalize">Design & Development</h2>
    <p>Crafting interfaces, sites & apps that work.</p>
    <ul>
      <li></li>
    </ul>
  </section>
  <section
    class="pt-8 pb-16 border-r px-8 w-full border-carbon-500"
    id="branding"
  >
    <h2 class="text-4xl font-medium mb-4 capitalize">branding</h2>
    <p>Building visual identity & voice.</p>
    <ul>
      <li></li>
    </ul>
  </section> -->
</div>
