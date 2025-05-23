<script lang="ts">
  import { ArrowRight } from "lucide-svelte";
  import chessPiece from "$lib/assets/services_icons/ChessWSpace.png";
  import hammerTransparent from "$lib/assets/services_icons/HammerWSpace.png";
  import lightBulb from "$lib/assets/services_icons/LightBulbWSpace.png";
  import plant from "$lib/assets/services_icons/PlantWSpace.png";
  import { cn } from "$lib/utils";
  import SectionLabel from "./Misc/SectionLabel.svelte";
  // TODO: Fix image sizes for responsive design
  // FUTURE: Add lottie animations

  // import hammerLottie from "$lib/assets/lotties/hammer.json";
  // import { onMount } from "svelte";

  // let show = $state(false);
  // onMount(() => {
  //   show = true;
  // });
</script>

<!-- <svelte:head>
  <script
    src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/tgs-player.js"
  ></script>
</svelte:head> -->
<div class="@container" id="services">
  <SectionLabel name="Services" />
  <div class="flex @3xl:flex-row flex-col border-b border-carbon-500">
    <div class="p-8">
      <h3 class="text-3xl font-medium mb-4">Goal focused digital solutions.</h3>
      <p class="text-carbon-300 mb-4">
        There is no room for shortcuts when building a great digital experience.
        Everything starts with thorough research and iterative design.
      </p>
      <button class="btn btn-neutral items-center"
        >See services<ArrowRight size={18} />
      </button>
    </div>
    <div
      class="aspect-square w-full grid grid-cols-2 border-t border-carbon-500 md:border-t-0"
    >
      {#snippet service(
        img: string,
        name: string,
        url: string,
        classes: string = "",
      )}
        <a
          href={url}
          class={cn(
            "block group p-8 border-l border-carbon-500 service hover:bg-carbon-50/10 transition-colors duration-300",
            classes,
          )}
        >
          <img
            src={img}
            alt={name}
            class="group-hover:scale-125 transition-all duration-200"
          />
          <div
            class="text-carbon-300 text-center text-sm font-medium whitespace-nowrap"
          >
            {name}
          </div>
        </a>
      {/snippet}

      {@render service(
        chessPiece,
        "Strategy",
        "/",
        "border-y @3xl:border-t-0 border-l-0 @3xl:border-l",
      )}
      {@render service(lightBulb, "Design", "/", "border-y @3xl:border-t-0")}
      {@render service(
        hammerTransparent,
        "Development",
        "/",
        "border-l-0 @3xl:border-l",
      )}
      {@render service(plant, "Growth + Upkeep", "/")}
    </div>
  </div>
</div>
