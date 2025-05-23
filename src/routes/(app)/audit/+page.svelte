<script lang="ts">
  let url: string = $state("");
  let lhr = $state();
  let categories = $state();
  let audits = $state();

  async function generateReport() {
    console.log("running");
    let res = await fetch("/audit", {
      method: "POST",
      body: JSON.stringify({ website_url: url }),
      headers: { "Content-Type": "application/json" },
    });
    const { report } = await res.json();
    lhr = report.lhr;

    // Extract category scores
    categories = Object.entries(lhr.categories).map(([key, cat]) => ({
      id: key,
      title: cat.title,
      score: Math.round((cat.score || 0) * 100),
      description: cat.description || "",
    }));

    // Collect audit details
    audits = Object.values(lhr.audits).map((audit: any) => ({
      id: audit.id,
      title: audit.title,
      description: audit.description,
      score:
        audit.scoreDisplayMode === "notApplicable"
          ? "N/A"
          : Math.round((audit.score || 0) * 100) + "%",
      details: audit.details,
      helpUrl: audit.helpUrl,
    }));
    console.log(report);
  }
</script>

{#if lhr}
  <div class="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
    <header class="mb-8">
      <h1 class="text-3xl font-bold text-gray-800 dark:text-gray-100">
        Lighthouse Report for {lhr.finalUrl}
      </h1>
      <p class="text-sm text-gray-500 dark:text-gray-400">
        Generated on {new Date(lhr.fetchTime).toLocaleString()}
      </p>
    </header>

    <!-- Category Scores -->
    <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
      {#each categories as cat}
        <div class="p-4 bg-white dark:bg-gray-800 rounded-2xl shadow">
          <h2 class="text-xl font-semibold text-gray-700 dark:text-gray-200">
            {cat.title}
          </h2>
          <div class="mt-2 flex items-baseline">
            <span
              class="text-4xl font-bold text-indigo-600 dark:text-indigo-400"
              >{cat.score}</span
            >
            <span class="ml-1 text-lg text-gray-500 dark:text-gray-400"
              >/ 100</span
            >
          </div>
          {#if cat.description}
            <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">
              {cat.description}
            </p>
          {/if}
        </div>
      {/each}
    </section>

    <!-- Audit List -->
    <section>
      <h2 class="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
        Audits
      </h2>
      <div class="space-y-4">
        {#each audits as audit}
          <div class="p-4 bg-white dark:bg-gray-800 rounded-2xl shadow">
            <div class="flex justify-between items-center">
              <h3
                class="text-lg font-semibold text-gray-700 dark:text-gray-200"
              >
                {audit.title}
              </h3>
              <span class="text-sm font-mono text-gray-500 dark:text-gray-400"
                >{audit.score}</span
              >
            </div>
            {#if audit.description}
              <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">
                {audit.description}
              </p>
            {/if}
            {#if audit.helpUrl}
              <a
                href={audit.helpUrl}
                target="_blank"
                class="mt-2 inline-block text-sm text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                Learn more
              </a>
            {/if}
          </div>
        {/each}
      </div>
    </section>
  </div>
{:else}
  <div class="flex items-center gap-4">
    <input type="text" bind:value={url} class="text-black" />
    <button class="btn btn-primary" onclick={() => generateReport()}
      >Generate</button
    >
  </div>
{/if}
