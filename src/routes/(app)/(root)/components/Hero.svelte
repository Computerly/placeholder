<script lang="ts">
  import Rocket from "$lib/assets/rocketshipTransparent.png";
  import { Send } from "@lucide/svelte";
</script>

<div
  class="h-[90dvh] grid place-items-center gridBG overflow-hidden p-8 border-b border-carbon-500"
>
  <div class="flex flex-col items-center relative">
    <h1 class="text-fluid-6xl text-center whitespace-pre mb-4 font-medium">
      Transforming<br />cool
      <span class="font-cursive whitespace-pre highlight">ideas</span>
      into<br />
      <span class="font-digital">digital</span> content
    </h1>
    <p class="text-center mb-8 max-w-prose">
      We help turn ideas into polished websites, tools, and digital
      experiences—built fast, built right, and ready to launch.
    </p>

    <form class="flex items-center gap-2" action="">
      <input
        type="text"
        name="idea"
        class="input placeholder:text-sm placeholder:text-carbon-300 px-4 w-full"
        placeholder="What's your cool idea?"
      />
      <button class="btn btn-square bg-primary">
        <Send size={20} />
      </button>
    </form>
    <!-- TODO: fix rocket on mobile/responsive -->
    <img
      src={Rocket}
      alt="Rocketship"
      class="absolute right-0 bottom-0 hidden md:block translate-x-3/4 translate-y-3/5 h-[40dvh]"
    />
  </div>
</div>

<style>
  .gridBG {
    background-image: radial-gradient(
      rgba(255, 255, 255, 0.1) 8%,
      transparent 0
    );
    background-size: 20px 20px;
  }
</style>
