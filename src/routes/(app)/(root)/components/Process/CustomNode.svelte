<script lang="ts">
  import {
    Handle,
    Position,
    type NodeProps,
    useNodes,
    type Node,
  } from "@xyflow/svelte";

  let { data, id }: NodeProps = $props();
  // $effect(() => {
  //   // Print all node ids, sizes, positions
  //   const nodes: Node[] = useNodes().current;
  //   nodes.forEach((node) => {
  //     console.log(`ID: ${node.id}
  //       Height: ${node.measured?.height}
  //       Width: ${node.measured?.width}
  //       Position: ${JSON.stringify(node.position)}
  //       `);
  //   });

  //   console.log(`\n\n\================================================\n\n`);
  // });
</script>

<div class="process">
  {data.label}
  <Handle type="source" position={Position.Top} id="a" class="handle" />
  <Handle type="source" position={Position.Right} id="b" class="handle" />
  <Handle type="source" position={Position.Bottom} id="c" class="handle" />
  <Handle type="source" position={Position.Left} id="d" class="handle" />
</div>

<style>
  @reference "../../../../../app.css";
  .process {
    font-family: "Indie Flower", cursive;
    @apply font-semibold;
    font-style: normal;
    width: auto;
    padding: 1rem;
    background-color: #fff;
    color: #000;
    height: 50px;
    @apply text-lg;
    display: flex;
    align-items: center;
    justify-content: center;
    border-top-left-radius: 255px 15px;
    border-top-right-radius: 15px 225px;
    border-bottom-right-radius: 225px 15px;
    border-bottom-left-radius: 15px 255px;
    border: solid 3px #dfddd9;
  }

  /* handing down scoped styles to child components not possible :(  */
  /* https://github.com/sveltejs/svelte/issues/6972 */
  :global(.svelte-flow .handle) {
    opacity: 0;
  }
</style>
