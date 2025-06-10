<script lang="ts">
  import Copy from "lucide-svelte/icons/copy";
  import { onMount } from "svelte";
  import { copy } from "svelte-copy";
  import toast from "svelte-french-toast";
  import PaperTexture from "$lib/assets/white-paper-texture.jpg";
  /**
   * Name
   * Email
   * company
   * Message
   * communication preference?
   */
  onMount(() => {
    email = "hello@rebricksdigital.com";
    phone = "612-208-6588";
  });
  let email = "";
  let phone = "";
</script>

<div
  class=" border-carbon-800 border-3 p-16 m-8 rounded-2xl contactContainer text-carbon-900/80"
>
  <h2 class="text-5xl font-semibold">Let's Chat</h2>
  <p class="text-xl">(we don't bite)</p>
  <div class="grid gap-8">
    <div class="flex items-center gap-2 text-4xl pt-8">
      <a href="mailto:{email}" class="font-medium hover:underline pl-0 text-5xl"
        >{email}</a
      >
      <button
        use:copy={{
          text: email,
          events: ["click"],
          onCopy({ text, event }) {
            toast.success("Email copied");
          },
        }}
        class="hover:bg-carbon-900/10 p-1 rounded-md cursor-pointer flex items-center gap-1 text-sm"
      >
        <Copy size={18} /> Copy
      </button>
    </div>
    <div class="flex items-center gap-2 text-4xl">
      <a href="tel:{phone}" class="font-medium hover:underline pl-0 text-5xl"
        >{phone}</a
      >
      <button
        use:copy={{
          text: phone,
          events: ["click"],
          onCopy({ text, event }) {
            toast.success("Phone copied");
          },
        }}
        class="hover:bg-carbon-900/10 p-1 rounded-md cursor-pointer flex items-center gap-1 text-sm"
      >
        <Copy size={18} /> Copy
      </button>
    </div>
  </div>
</div>

<style>
  .contactContainer {
    background-image: url("/white-paper-texture.jpg");
    background-blend-mode: luminosity;
  }
</style>
