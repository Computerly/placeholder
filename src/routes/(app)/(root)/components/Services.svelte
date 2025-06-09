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
  <div></div>
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
        <img
          src={service.icon}
          alt="{service.title} icon"
          class="h-40 w-40 mt-16"
        />
      </div>
    {/each}
  </div>
</div>
