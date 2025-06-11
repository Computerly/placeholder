<script lang="ts">
  import Contact from "$lib/components/Contact/Contact.svelte";
  import { makePageTitle } from "$lib/utils";
</script>

<svelte:head>
  <title>{makePageTitle("Contact")}</title>
</svelte:head>

<!-- Book a call
send a generic message
Request a quote -->
<div class="mt-nav mx-sides">
  <Contact />
</div>
