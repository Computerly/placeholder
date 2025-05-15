<script lang="ts">
  import {
    getBezierPath,
    BaseEdge,
    EdgeLabel,
    type EdgeProps,
  } from "@xyflow/svelte";

  let {
    id,
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
    label,
    ...restProps
  }: EdgeProps = $props();

  let [edgePath, labelX, labelY] = $derived(
    getBezierPath({
      sourceX,
      sourceY,
      sourcePosition,
      targetX,
      targetY,
      targetPosition,
      curvature: 0.8,
    }),
  );
</script>

<BaseEdge path={edgePath} {id} {...restProps} />
{#if label}
  <EdgeLabel x={labelX} y={labelY} transparent={true}>
    <div>
      {label}
    </div>
  </EdgeLabel>
{/if}
