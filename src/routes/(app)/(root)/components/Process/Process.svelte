<script lang="ts">
  import {
    SvelteFlow,
    Background,
    BackgroundVariant,
    ConnectionMode,
    SvelteFlowProvider,
    type Node,
    type Edge,
    type NodeTypes,
  } from "@xyflow/svelte";
  import CustomNode from "./CustomNode.svelte";
  import DecisionNode from "./DecisionNode.svelte";
  import StandardEdge from "./StandardEdge.svelte";
  import StartNode from "./StartNode.svelte";
  import { initialNodes, initialEdges } from "./nodes-edges";
  import Stepper from "./Stepper.svelte";
  import "@xyflow/svelte/dist/style.css";

  let nodes = $state.raw<Node[]>(initialNodes);
  let edges = $state.raw<Edge[]>(initialEdges);

  const nodeTypes: NodeTypes = {
    custom: CustomNode,
    decision: DecisionNode,
    start: StartNode,
  };
  const edgeTypes = {
    // floating: SimpleFloatingEdge,
    standard: StandardEdge,
  };
</script>

<SvelteFlowProvider>
  <div class="w-full h-96 relative">
    <SvelteFlow
      bind:nodes
      bind:edges
      colorMode="dark"
      {nodeTypes}
      {edgeTypes}
      fitView
      connectionMode={ConnectionMode.Loose}
    >
      <Background
        variant={BackgroundVariant.Dots}
        bgColor="var(--color-carbon-950)"
      />
    </SvelteFlow>
    <div
      class="absolute top-4 left-4 bottom-4 w-[30%] p-4 rounded-md bg-white/10 backdrop-blur-sm"
    >
      <Stepper />
    </div>
  </div>
</SvelteFlowProvider>
