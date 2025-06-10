<script lang="ts">
  import { ArrowRight } from "lucide-svelte";
  import chessPiece from "$lib/assets/services_icons/ChessWSpace.png?enhanced";
  import hammerTransparent from "$lib/assets/services_icons/HammerWSpace.png?enhanced";
  import lightBulb from "$lib/assets/services_icons/LightBulbWSpace.png?enhanced";
  import plant from "$lib/assets/services_icons/PlantWSpace.png";
  import { cn } from "$lib/utils";
  import SectionLabel from "./Misc/SectionLabel.svelte";
  // TODO: Fix image sizes for responsive design
  // FUTURE: Add lottie animations

  const services = [
    {
      title: "Strategy",
      icon: chessPiece,
      services: [
        "Brand Development",
        "User Research",
        "Consulting",
        "Project Management",
        "Market Research",
        "Analysis",
        "User Personas",
      ],
    },
    {
      title: "Design",
      icon: lightBulb,
      services: [
        "User Experience",
        "User Interface",
        "Design Systems",
        "User Testing",
        "Brand Guidelines",
      ],
    },
    {
      title: "Development",
      icon: hammerTransparent,
      services: [
        "CMS",
        "Analytics",
        "Monitoring",
        "Hosting",
        "Maintenance",
        "Infrastructure Setup",
        "Content writing",
      ],
    },
  ];
</script>

<div class="border-b border-carbon-500 grid grid-cols-2">
  <div class="p-8">
    <h2 class="highlight text-xl w-fit px-4 py-2">Services</h2>
  </div>
  <div class="grid grid-cols-3">
    {#each services as service}
      <div class="border-l border-carbon-500 p-8 flex flex-col justify-between">
        <div>
          <h3 class="text-2xl font-medium mb-8 mt-8">{service.title}</h3>
          <ul class="text-carbon-300">
            {#each service.services as item}
              <li>
                {item}
              </li>
            {/each}
          </ul>
        </div>
        <div class="mt-16">
          <enhanced:img
            src={service.icon}
            alt="{service.title} icon"
            class="w-40 aspect-square"
          />
        </div>
      </div>
    {/each}
  </div>
</div>
