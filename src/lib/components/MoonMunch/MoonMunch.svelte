<script lang="ts">
  import { Game } from "$lib/components/MoonMunch";
  import { onMount } from "svelte";

  let canvas: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D | null = null;

  onMount(() => {
    ctx = canvas.getContext("2d");
  });

  $effect(() => {
    if (!ctx) return;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const game = new Game(ctx, width, height);
  });
</script>

<canvas bind:this={canvas} class="w-full h-full min-h-32"></canvas>
