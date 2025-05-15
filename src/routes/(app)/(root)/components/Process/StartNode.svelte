<script lang="ts">
  import { Handle, Position, type NodeProps } from "@xyflow/svelte";

  let { data, id }: NodeProps = $props();
</script>

<div class="node">
  <Handle type="source" position={Position.Right} id="b" class="handle" />
  <Handle type="target" position={Position.Bottom} id="c" class="handle" />
</div>

<style>
  @reference "../../../../../app.css";
  .node {
    font-family: "Indie Flower", cursive;
    @apply font-semibold;
    width: auto;
    aspect-ratio: 1/1;
    padding: 1rem;
    background-color: #fff;
    color: #000;
    height: 50px;
    @apply border-2 border-emerald-600 bg-emerald-400 text-lg;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 9999px;
  }
</style>
