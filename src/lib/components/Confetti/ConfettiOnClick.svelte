<script lang="ts">
  import { Confetti } from "svelte-confetti";

  const duration = 2000;

  let things: any[] = [];
  let timeout: string | number | NodeJS.Timeout | undefined;

  async function moveConfetti(event: {
    target: any;
    clientX: any;
    clientY: any;
  }) {
    const { target, clientX, clientY } = event;

    const elementY = target.getBoundingClientRect().top;
    const elementX = target.getBoundingClientRect().left;

    const x = clientX - elementX;
    const y = clientY - elementY;

    things = [...things, { x, y }];

    clearTimeout(timeout);

    timeout = setTimeout(() => (things = []), duration);
  }
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<div
  class="absolute box inset-0 select-none cursor-pointer"
  onclick={(e) => moveConfetti(e)}
>
  {#each things as thing}
    <div class="mover" style="left: {thing.x}px; top: {thing.y}px">
      <Confetti y={[-0.5, 0.5]} fallDistance="20px" amount={10} {duration} />
    </div>
  {/each}
</div>

<style>
  .mover {
    position: absolute;
  }
</style>
