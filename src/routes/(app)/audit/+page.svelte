<script lang="ts">
  import { onMount } from "svelte";
  import type { AuditResult } from "./types";
  import type { RunnerResult } from "lighthouse/types/externs";
  let url = "https://www.pcafterhours.net"; // Default URL
  let loading = false;
  let error = false;

  let lighthouseReport: RunnerResult;
  let businessReport: AuditResult;
  function sanitizeLhrImages(obj: any): any {
    if (typeof obj === "string") {
      // Match common Base64 image data URI patterns
      if (obj.startsWith("data:image/")) {
        return "IMAGE_REMOVED";
      }
      return obj;
    }

    if (Array.isArray(obj)) {
      return obj.map(sanitizeLhrImages);
    }

    if (typeof obj === "object" && obj !== null) {
      const sanitized: Record<string, any> = {};
      for (const key in obj) {
        sanitized[key] = sanitizeLhrImages(obj[key]);
      }
      return sanitized;
    }

    return obj; // numbers, booleans, etc.
  }
  function prepareLHRForDownload(lhr: RunnerResult["lhr"]) {
    // strip images
    return sanitizeLhrImages(lhr);
  }
  function downloadJson(data: object, title: string): void {
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${title}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  async function audit() {
    loading = true;
    error = false;
    const encodedUrl = encodeURIComponent(url); //https://www.pcafterhours.net
    const endpoint = `/audit?url=${encodedUrl}`;

    try {
      const response = await fetch(endpoint, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}`);
      }
      const jsonResponse = await response.json();
      businessReport = jsonResponse.businessReport;
      lighthouseReport = jsonResponse.lightHouseReport;
      loading = false;
      console.log("Audit response:", jsonResponse);
    } catch (err) {
      loading = false;
      error = true;
      console.error("Error fetching HTML:", err);
      throw err;
    }
  }

  function getProgressColor(percentage: number): string {
    if (percentage >= 0.8) return "text-green-500";
    if (percentage >= 0.6) return "text-yellow-500";
    return "text-red-500";
  }
</script>

<div
  class="mt-nav mx-sides py-8 grid place-items-center {!businessReport &&
    'min-h-[90dvh]'}"
>
  <div class="flex flex-col items-center text-center">
    <h1 class="text-4xl mb-4 font-medium max-w-prose">
      Find what's slowing your business down
    </h1>
    <form action="" class="flex w-3/5 gap-4">
      <input
        type="text"
        name="url"
        class="input w-full"
        placeholder="https://example.com"
        bind:value={url}
      />

      <button class="btn btn-primary" onclick={() => audit()}>
        {#if loading}
          <span class="loading loading-spinner loading-md"></span>
        {:else}
          Audit
        {/if}
      </button>
    </form>
  </div>
  {#if businessReport && !loading}
    <div class="mt-16 w-full max-w-3xl">
      <div class="flex items-center justify-between mb-16">
        <h2 class="text-2xl font-semibold">
          Audit of <span class="font-normal bg-carbon-900 p-1 rounded"
            >{businessReport.initialUrl}</span
          >
        </h2>
        <div>
          <button
            class="btn btn-secondary"
            onclick={() => downloadJson(businessReport, "businessReport")}
            >Download</button
          >
          <button
            class="btn btn-outline"
            onclick={() =>
              downloadJson(
                prepareLHRForDownload(lighthouseReport.lhr),
                "lighthouseReport",
              )}>Download LHR</button
          >
        </div>
      </div>
      <div>
        <div class="grid place-items-center mb-8">
          <div
            class="radial-progress {getProgressColor(
              businessReport.compositeScore,
            )}"
            style="--value:{businessReport.compositeScore * 100};"
            aria-valuenow={businessReport.compositeScore * 100}
            role="progressbar"
          >
            {Math.round(businessReport.compositeScore * 100)}%
          </div>
          <p class="text-lg mb-2">
            Overall Grade: <span class="font-bold"
              >{businessReport.overallGrade}</span
            >
          </p>
        </div>

        <div class="flex items-start justify-between mb-16">
          {#each businessReport.categories as category}
            <div class="grid place-items-center gap-2">
              <div
                class="radial-progress text-xs {getProgressColor(
                  category.grade,
                )}"
                style="--value:{category.grade * 100}; --size:3rem;"
                aria-valuenow={category.grade * 100}
                role="progressbar"
              >
                {Math.round(category.grade * 100)}%
              </div>
              <span class="text-sm">{category.category}</span>
            </div>
          {/each}
        </div>
        <div>
          {#each businessReport.categories as category}
            <div class="mb-6">
              <h3 class="text-xl font-semibold mb-2">{category.category}</h3>
              <p class="text-sm text-gray-500 mb-2">
                Grade: {Math.round(category.grade * 100)}%
              </p>
              <ul class="list-disc pl-5">
                {#each category.criteria as criterion}
                  <li>
                    {criterion.title} - Score: {criterion.score} /{" "}
                    {criterion.maximumScore}
                  </li>
                {/each}
              </ul>
            </div>
          {/each}
        </div>
      </div>
    </div>
  {:else if loading}
    <div class="mt-16 w-full max-w-3xl">
      <div class="flex items-center justify-between mb-16">
        <h2 class="text-2xl font-semibold">
          Audit of <span
            class="font-normal w-[12ch] inline-block h-4 skeleton bg-carbon-900 p-1 rounded"
          ></span>
        </h2>
        <div>
          <button
            class="btn btn-secondary"
            disabled={loading || !businessReport}>Download</button
          >
          <button
            class="btn btn-outline"
            disabled={loading || !lighthouseReport}>Download LHR</button
          >
        </div>
      </div>
      <div>
        <div class="grid place-items-center mb-8">
          <div
            class="radial-progress text-carbon-500"
            style="--value: 100;"
            aria-valuenow="0"
            role="progressbar"
          >
            <span class="skeleton h-4 w-[2ch]"></span>%
          </div>
          <p class="text-lg mb-2">
            Overall Grade: <span class="skeleton h-4 w-[1ch]"></span>
          </p>
        </div>

        <div class="flex items-start justify-between mb-16">
          {#each Array(5) as _}
            <div class="grid place-items-center gap-2">
              <div
                class="radial-progress text-xs text-carbon-500"
                style="--value:0; --size:3rem;"
                aria-valuenow="0"
                role="progressbar"
              >
                <span class="skeleton h-4 w-[2ch]"></span> %
              </div>
              <span class="skeleton h-4 w-[10ch]"></span>
            </div>
          {/each}
        </div>
        <div>
          {#each Array(5) as _}
            <div class="mb-6">
              <h3
                class="text-xl font-semibold mb-2 skeleton h-4"
                style="width: {getRandomInt(10, 30)}ch"
              ></h3>
              <p class="text-sm text-gray-500 mb-2">
                Grade: <span class="skeleton h-4 w-[2ch]"></span>%
              </p>
              <ul class="list-disc pl-5">
                {#each Array(getRandomInt(3, 10)) as _}
                  <li>
                    <span class="skeleton h-4 w-[30ch] inline-block"></span>
                  </li>
                {/each}
              </ul>
            </div>
          {/each}
        </div>
      </div>
    </div>
  {:else if error}
    <p>Error loading that url</p>
  {/if}
</div>
