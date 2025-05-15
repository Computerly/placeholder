<script lang="ts">
  import {
    getBezierPath,
    useInternalNode,
    BaseEdge,
    EdgeLabel,
    type EdgeProps,
  } from "@xyflow/svelte";
  import { getEdgeParams } from "./utils";

  let { id, source, target, label, ...restProps }: EdgeProps = $props();

  const sourceNode = useInternalNode(source);
  const targetNode = useInternalNode(target);

  let path = $derived.by(() => {
    if (sourceNode.current && targetNode.current) {
      const edgeParams = getEdgeParams(sourceNode.current, targetNode.current);
      return getBezierPath({
        sourceX: edgeParams.sx,
        sourceY: edgeParams.sy,
        sourcePosition: edgeParams.sourcePos,
        targetPosition: edgeParams.targetPos,
        targetX: edgeParams.tx,
        targetY: edgeParams.ty,
        curvature: 0.8,
      });
    }
    return undefined;
  });
</script>

{#if path}
  <BaseEdge {id} path={path[0] || ""} {...restProps} />
  {#if label}
    <EdgeLabel x={path[1]} y={path[2]}>
      <div>
        {label}
      </div>
    </EdgeLabel>
  {/if}
{/if}
