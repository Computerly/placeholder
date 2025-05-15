<script lang="ts">
  import { Handle, Position, type NodeProps } from "@xyflow/svelte";

  let { id, ...restProps }: NodeProps = $props();
</script>

<div class="subflow" {...restProps}>
  <Handle type="source" position={Position.Top} id="a" class="handle" />
  <Handle type="source" position={Position.Right} id="b" class="handle" />
  <Handle type="source" position={Position.Bottom} id="c" class="handle" />
  <Handle type="source" position={Position.Left} id="d" class="handle" />
</div>

<style>
  .subflow {
    height: 100%;
    width: 100%;
    min-width: 100px;
    min-height: 10px;
    border-top-left-radius: 255px 15px;
    border-top-right-radius: 15px 225px;
    border-bottom-right-radius: 225px 15px;
    border-bottom-left-radius: 15px 255px;
    border: dashed 3px #dfddd9;
  }
</style>
