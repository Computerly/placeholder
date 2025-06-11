<script lang="ts">
  import Copy from "lucide-svelte/icons/copy";
  import { onMount } from "svelte";
  import { copy } from "svelte-copy";
  import toast from "svelte-french-toast";
  import PaperTexture from "$lib/assets/white-paper-texture.jpg";
  /**
   * Name
   * Email
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

<div class="py-16">
  <h1 class="text-carbon-500 text-6xl font-medium text-center mb-4">
    Contact Us
  </h1>
  <h2 class="text-6xl font-medium text-center mb-16">
    Lorem ipsum dolor, sit amet consectetur adipisicing.
  </h2>
  <form action="">
    <div class="grid gap-4 max-w-prose mx-auto">
      <div class="flex gap-4">
        <label class="label-slide w-full">
          <span>Name</span>
          <input
            type="text"
            name="name"
            class="input w-full"
            placeholder="Name"
          />
        </label>
        <label class="label-slide w-full">
          <span>Email</span>
          <input
            type="text"
            name="email"
            class="input w-full"
            placeholder="Email"
          />
        </label>
      </div>
      <label class="label-slide">
        <span>Message</span>
        <textarea
          name="message"
          class="textarea resize-none w-full"
          rows="5"
          placeholder="Message"
        ></textarea>
      </label>
    </div>
    <!-- name -->
    <!-- email -->
    <!-- message -->
  </form>
</div>

<!-- <div
  id="contact"
  class="border-carbon-800 border-3 p-16 m-8 rounded-2xl contactContainer text-carbon-900/80"
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
</div> -->

<style>
  .contactContainer {
    background-image: url("/white-paper-texture.jpg");
    background-blend-mode: luminosity;
  }
</style>
