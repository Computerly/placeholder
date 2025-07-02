<script lang="ts">
  import { cn } from "$lib/utils";

  let { name, level = 1, id = name } = $props();

  type HeadingAttributes = {
    tag: string;
    className: string;
  };

  const headingLevelMap: Record<number, HeadingAttributes> = {
    1: { tag: "h2", className: "text-3xl font-medium py-8" },
    2: { tag: "h3", className: "text-2xl font-medium py-4" },
    3: { tag: "h4", className: "text-xl font-medium py-4" },
    4: { tag: "h5", className: "text-lg font-medium py-2" },
    5: { tag: "h6", className: "text-base font-medium py-2" },
  };

  function getHeadingAttributes(level: number): HeadingAttributes {
    return headingLevelMap[level] || headingLevelMap[6];
  }

  let { tag, className } = $state(getHeadingAttributes(level));
</script>

<div class={cn("border-b border-carbon-500 bg-carbon-500/10", className)} {id}>
  <div class="mx-sides">
    {@html `<${tag} >${name}</${tag}>`}
  </div>
</div>
