<script lang="ts">
  import Logo from "$lib/assets/logos/Icon.svelte";
  import { Linkedin } from "@lucide/svelte";
  import { onMount } from "svelte";
  import ConfettiOnClick from "$lib/components/Confetti/ConfettiOnClick.svelte";

  type Link = {
    title: string;
    url: string;
  };

  let links: Link[] = $state([
    {
      title: "Services",
      url: "/#services",
    },
    {
      title: "Process",
      url: "/#process",
    },
    {
      title: "About",
      url: "/#about",
    },
    {
      title: "Pricing",
      url: "/#pricing",
    },
  ]);

  const socials: (Link & { icon?: any })[] = [
    {
      title: "Linkedin",
      url: "https://www.linkedin.com/company/rebricks-digital",
      icon: Linkedin,
    },
  ];

  onMount(() => {
    // sort links alphabetically
    links.sort((a, b) => a.title.localeCompare(b.title));
  });
</script>

<footer class="p-8 border-t border-carbon-500 overflow-hidden">
  <div class="grid grid-cols-[min-content_1fr] gap-8">
    <div class="relative">
      <Logo class="fill-carbon-600 h-64 w-64 p-8" />

      <ConfettiOnClick />
    </div>
    <div class="grid place-items-center">
      <div>
        <p class="text-xl max-w-prose text-center text-carbon-600">
          Our mission is to transform ambitious ideas into innovative digital
          experiences that shape businesses and lives. We are driven by
          creativity, forward-thinking, and a relentless pursuit of delivering
          transformative solutions that shape the future.
        </p>
      </div>
    </div>
  </div>

  <div class="text-sm text-carbon-600 flex justify-between">
    <span class=""
      >Rebricks Digital™ {new Date().getFullYear()} – Digital Design and Development
    </span>

    <ul class="gap-y-2 gap-x-8 flex flex-wrap">
      {#each links as item}
        <li class="text-carbon-300 hover:underline">
          <a href={item.url}>{item.title}</a>
        </li>
      {/each}
    </ul>

    <div>
      <ul class="gap-2 flex">
        {#each socials as item}
          {@const Icon = item.icon}
          <li class="hover:text-white transition-all">
            <a href={item.url} class="flex items-center gap-1">
              {#if item.icon}
                <Icon size={18} />
              {:else}
                {item.title}
              {/if}
            </a>
          </li>
        {/each}
      </ul>
    </div>
  </div>
</footer>
