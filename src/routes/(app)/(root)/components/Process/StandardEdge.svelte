<script lang="ts">
  import {
    getBezierPath,
    BaseEdge,
    EdgeLabel,
    type EdgeProps,
  } from "@xyflow/svelte";
  import { getQuadraticPath } from "./utils";
  let {
    id,
    data,
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
    getQuadraticPath({
      sourceX,
      sourceY,
      sourcePosition,
      targetX,
      targetY,
      targetPosition,
      curvature: 0.8,
    }),
  );
  let isActive = $derived(data?.active);
</script>

<BaseEdge
  data-path={edgePath}
  path={edgePath}
  {id}
  {...restProps}
  style={`--xy-edge-stroke-width-default: ${isActive ? 2 : 2};  
  --xy-edge-stroke-default: ${isActive ? "var(--color-patina-500)" : "inherit"};
  ${isActive && "--xyflow-marker-fill: var(--color-patina-500);"}
  `}
/>
{#if label}
  <EdgeLabel x={labelX} y={labelY} transparent={true}>
    <div>
      {label}
    </div>
  </EdgeLabel>
{/if}
