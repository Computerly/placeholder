<script lang="ts">
  import Button from "$lib/components/Button/Button.svelte";
  import type { ButtonVariantProps } from "$lib/components/Button/button";

  type Props = {
    label: string;
    disabled: boolean;
    /** The onclick event handler */
    onclick?: () => void;
  } & ButtonVariantProps;

  const { label, onclick, variant, disabled, intent, ...props }: Props =
    $props();
</script>

<Button {...props} {variant} {disabled} {intent} {onclick}>
  {label}
</Button>
