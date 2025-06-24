<script lang="ts">
  import { globalData, stepper } from "$lib/helloBrick/engine.svelte";
  import { fade } from "svelte/transition";

  let isValid = $state(false);
  $effect(() => {
    isValid = stepper.isValid();
  });
  let CurrentComponent = $derived(stepper.getCurrentComponent());
</script>

<div class="mx-sides py-16 h-screen">
  <div class="h-full gap-2 flex flex-col">
    <div class="h-full">
      <CurrentComponent />
    </div>
    <div class="ml-auto flex gap-2 items-center">
      {#if stepper.canGoBack()}
        <button class="btn btn-ghost" onclick={() => stepper.back()}>
          Previous
        </button>
      {/if}

      <button
        class="btn btn-secondary w-fit disabled:opacity-0 opacity-100 transition-all"
        onclick={() => {
          console.log("clicking next");
          stepper.next();
        }}
        disabled={!isValid}
      >
        {#if stepper.isLast()}
          Finish
        {:else}
          Next
        {/if}
      </button>
    </div>
  </div>
</div>

<pre class="mx-sides bg-black/90 rounded-xl p-4">
	{JSON.stringify(globalData, null, 2)}
</pre>
