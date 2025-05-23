<script lang="ts">
  import Addons from "./Addons.svelte";
  import SectionLabel from "../Misc/SectionLabel.svelte";
  import Plans from "./Plans.svelte";
  import { book_a_meeting_url } from "$lib/config";
</script>

<div class="border-b border-carbon-500">
  <SectionLabel name="Pricing" />

  <div class="p-8 border-b border-carbon-500">
    <div class="grid grid-cols-2 mb-8">
      <p>
        Every project we take on is a little different—different goals,
        different constraints, different quirks. That’s why we don’t list fixed
        prices. It wouldn’t be fair to you or realistic for us.
      </p>
      <p>
        If you’ve got something in mind, we’d love to hear about it. Book a
        meeting or drop us a message. Once we understand what you’re building,
        we’ll put together a detailed proposal with a custom quote—clear, no
        fluff, and tailored to your project.
      </p>
    </div>
    <div class="flex gap-4 items-center">
      <a href={book_a_meeting_url} target="_blank" class="btn btn-outline"
        >Book a meeting</a
      >
      <a href="/#contact" class="btn btn-dash">Request proposal</a>
    </div>
  </div>

  <Addons />

  <Plans />
</div>
