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
  import CustomMarker from "./CustomMarker.svelte";
  import { initialNodes, initialEdges } from "./nodes-edges";
  import Stepper from "./Stepper.svelte";
  import "@xyflow/svelte/dist/style.css";
  import ClickDrag from "$lib/assets/clickDrag.gif";
  import SectionLabel from "../Misc/SectionLabel.svelte";

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

<div id="process">
  <SectionLabel name={"Process"} />
  <SvelteFlowProvider>
    <div
      class="xyflow w-full auto-rows-fr h-[60dvh] relative items-start content-start grid grid-cols-[30%_auto] border-b border-carbon-500"
    >
      <Stepper />
      <div class="h-full w-full relative group">
        <SvelteFlow
          bind:nodes
          bind:edges
          proOptions={{ hideAttribution: true }}
          colorMode="dark"
          {nodeTypes}
          {edgeTypes}
          fitView
          connectionMode={ConnectionMode.Loose}
        >
          <CustomMarker />
          <Background
            variant={BackgroundVariant.Dots}
            bgColor="var(--color-carbon-950)"
          />
        </SvelteFlow>
        <img
          src={ClickDrag}
          alt=""
          class="absolute right-4 bottom-4 h-12 w-auto group-hover:opacity-0 transition-all duration-600"
        />
      </div>
    </div>
  </SvelteFlowProvider>
</div>
