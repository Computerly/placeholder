<script lang="ts">
  import { globalData } from "$lib/helloBrick/engine.svelte";
  import websiteIllustration from "$lib/assets/Website.png?enhanced";
  import otherIllustration from "$lib/assets/other.png?enhanced";
  import { fade } from "svelte/transition";
</script>

<h1 class="text-5xl font-medium text-center">
  What kind of project are you interested in?
</h1>
<div class="flex justify-center gap-4 items-center h-full" transition:fade>
  <div>
    <input
      type="radio"
      name="projectType"
      id="website"
      value="website"
      class="peer hidden"
      bind:group={globalData.projectType}
    />
    <label
      for="website"
      class="grid cursor-pointer gap-4 justify-center text-center text-xl p-8 peer-checked:border-carbon-500 border transition-all hover:bg-carbon-50/10 peer-checked:bg-carbon-50/10 border-transparent rounded-2xl"
    >
      <enhanced:img
        src={websiteIllustration}
        class="h-96 w-auto"
        alt="website illustration"
      ></enhanced:img>
      <span>Website</span>
    </label>
  </div>
  <span class="text-carbon-500 text-2xl font-medium">or</span>
  <div>
    <input
      type="radio"
      name="projectType"
      id="other"
      value="other"
      class="peer hidden"
      bind:group={globalData.projectType}
    />

    <label
      for="other"
      class="grid cursor-pointer gap-4 justify-center text-center text-xl p-8 peer-checked:border-carbon-500 border transition-all hover:bg-carbon-50/10 peer-checked:bg-carbon-50/10 border-transparent rounded-2xl"
    >
      <enhanced:img
        src={otherIllustration}
        class="h-96 w-auto"
        alt="other illustration"
      ></enhanced:img>
      <span>Something else</span>
    </label>
  </div>
</div>
