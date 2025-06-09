<script lang="ts">
  import { DateTime } from "luxon";
  import { onMount } from "svelte";

  let { showDigitalClock = true, time } = $props();

  let hours = $derived(time.hour);
  let minutes = $derived(time.minute);
  let seconds = $derived(time.second);
</script>

<div class="flex flex-col items-center gap-2 relative">
  <svg viewBox="-50 -50 100 100" class="size-14">
    <circle class="stroke-carbon-500 fill-none stroke-4" r="48" />

    <!-- hour hand -->
    <line
      class="stroke-carbon-500 stroke-3"
      y1="2"
      y2="-20"
      transform="rotate({30 * hours + minutes / 2})"
    />

    <!-- minute hand -->
    <line
      class="stroke-carbon-500 stroke-3"
      y1="4"
      y2="-30"
      transform="rotate({6 * minutes + seconds / 10})"
    />

    <!-- second hand -->
    <g transform="rotate({6 * seconds})">
      <line class="stroke-redstone-500" y1="10" y2="-38" />
    </g>
  </svg>
  {#if showDigitalClock}
    {time.toLocaleString(DateTime.TIME_SIMPLE, {
      locale: "en-US",
    })}
  {/if}
</div>
