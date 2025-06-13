<script lang="ts">
  import Button from "$lib/components/Button/Button.svelte";

  let isTrue = false;
</script>


<button onclick={() => isTrue = !isTrue} class='btn'>Toggle Disabled</button> {isTrue}
<div class="mt-nav mx-sides p-16">
  <fieldset class="border border-carbon-500 p-4 rounded-md grid gap-4 w-fit">
    <legend>Buttons</legend>

    <fieldset class="border border-carbon-500 p-4 rounded-md inline-flex gap-4">
      <legend class="text-sm">Default</legend>
      <Button>Default</Button>
      <Button intent="primary" variant="fill" disabled={isTrue}>Primary</Button>

      <button class="btn">Outline</button>
      <button class="btn">Ghost</button>
      <button class="btn">Icon</button>
      <div class="vertical-divider"></div>
      <button class="btn">Primary</button>
    </fieldset>

    <fieldset class="border border-carbon-500 p-4 rounded-md inline-flex gap-4">
      <legend class="text-sm">Disabled</legend>
      <button disabled class="btn">Default</button>
      <button disabled class="btn">Solid</button>
      <button disabled class="btn">Outline</button>
      <button disabled class="btn">Ghost</button>
      <button disabled class="btn">Icon</button>
      <div class="vertical-divider"></div>
      <button disabled class="btn">Primary</button>
    </fieldset>
  </fieldset>
</div>
