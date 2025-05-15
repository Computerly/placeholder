<script lang="ts">
  import { Handle, Position, type NodeProps } from "@xyflow/svelte";

  let { data, id }: NodeProps = $props();
</script>

<div class="decision-node">
  {data.label}
  <Handle type="source" position={Position.Top} id="a" class="handle" />
  <Handle type="source" position={Position.Right} id="b" class="handle" />
  <Handle type="source" position={Position.Bottom} id="c" class="handle" />
  <Handle type="source" position={Position.Left} id="d" class="handle" />
</div>

<style>
  @reference "../../../../../app.css";

  .decision-node {
    font-family: "Indie Flower", cursive;
    font-style: normal;
    width: auto;
    aspect-ratio: 1/1;
    padding: 1rem;
    color: #000;
    @apply text-sm font-semibold;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden; /* ensure clipping works */
    clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
  }

  .decision-node:before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 141.4%; /* sqrt(2) ≈ 1.414 to account for 45deg rotation */
    height: 141.4%;
    z-index: -1;
    @apply bg-uranium-500;
    transform: translate(-50%, -50%) rotate(45deg);
    border-top-left-radius: 255px 15px;
    border-top-right-radius: 15px 225px;
    border-bottom-right-radius: 225px 15px;
    border-bottom-left-radius: 15px 255px;
    border: solid 3px #000;
  }
</style>
