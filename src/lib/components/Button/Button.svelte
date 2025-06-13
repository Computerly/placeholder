<script lang="ts">
  import { button } from "./button";
  import { type VariantProps } from "class-variance-authority";
  import type { Snippet } from "svelte";

  interface ButtonProps {
    href?: string | undefined;
    type?: "button" | "submit" | "reset" | undefined;
    intent?: VariantProps<typeof button>["intent"];
    variant?: VariantProps<typeof button>["variant"];
    class?: string;
    children?: Snippet;
    disabled?: boolean;
    ref?: unknown;
    restProps?: { [key: string]: any };
  }

  let {
    href,
    type,
    intent,
    variant,
    class: className,
    children,
    disabled = false,
    ref = $bindable(null),
    ...restProps
  }: ButtonProps = $props();

  const classNames = button({ variant, disabled, intent, class: className });
</script>

<svelte:element
  this={href ? "a" : "button"}
  class={classNames}
  type={href ? undefined : type}
  href={href && !disabled ? href : undefined}
  disabled={href ? undefined : disabled}
  aria-disabled={href ? disabled : undefined}
  role={href && disabled ? "link" : undefined}
  tabindex={href && disabled ? -1 : 0}
  bind:this={ref}
  {...restProps}
>
  {@render children?.()}
</svelte:element>
