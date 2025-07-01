<script lang="ts">
  import { book_a_meeting_url } from "$lib/config";
</script>

<div
  class="min-h-[90dvh] grid place-items-center-safe shadow-base-100 rounded-b-4xl bg-patina-500"
>
  <div class="mx-sides grid items-center text-center justify-items-center-safe">
    <div class="badge badge-neutral mb-2">Digital Services for Business</div>
    <div class="mb-8">
      <h1
        class="text-6xl leading-tight
		   mb-4 font-medium"
      >
        Unlock the power<br /> of 🕑 24/7, 🗓️ 365<br /> sales staff
      </h1>
      <p class="text-carbon-50 max-w-prose">
        Stop treating your website as a virtual brochure. It is the first
        salesmen your customers interact with, and the first impression of your
        company.
      </p>
    </div>
    <div class="flex gap-2 items-center">
      <a href="/contact" class="btn btn-ghost">Find something</a>
      <a href={book_a_meeting_url} class="btn btn-secondary">Book a call</a>
    </div>
  </div>
</div>
