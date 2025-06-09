<script lang="ts">
  import Logo from "$lib/assets/logos/CombinationMarkNegative.svg";
  import { book_a_meeting_url } from "$lib/config";
</script>

<div class="pr-16 py-24 flex flex-col lg:items-start items-center">
  <a href="/" title="Home" class="mb-8">
    <img src={Logo} alt="Rebricks Logo" class="max-w-40 w-full" />
  </a>

  <h1 class="text-4xl font-medium mb-4 text-center lg:text-left">
    We make clicks that stick.
  </h1>

  <p class="text-carbon-300 mb-8 lg:text-left">
    Websites, apps, and digital products that are built for businesses to solve
    real problems.
  </p>

  <div class="inline-flex gap-4">
    <a href="/#contact" class="btn btn-accent">Get started</a>
    <a href={book_a_meeting_url} target="_blank" class="btn btn-neutral"
      >Book a call</a
    >
  </div>
</div>
