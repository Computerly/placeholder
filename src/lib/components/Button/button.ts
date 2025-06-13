import { cva, type VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";
// export type Intent = | "primary" | "warning" | "danger" | "success" | "default";
// export type Variants = | "solid" | "outline" | "ghost" | "icon" | "fill";

function makeColorScheme(color: string): string {
  return `bg-${color}-500 border-${color}-300 text-${color}-950`;
}

export type ButtonVariantProps = VariantProps<typeof buttonVariants>;
export const buttonVariants = cva(
  [
    "whitespace-nowrap border-2 border-transparent rounded-md cursor-pointer px-4 py-2 text-center inline-flex items-center gap-2 transition-all font-medium duration-300 touch-manipulation disabled:cursor-not-allowed disabled:opacity-75",
  ],
  {
    variants: {
      intent: {
        primary: "bg-patina-500 border-patina-500 text-carbon-50",
        warning: "bg-amber-500 border-amber-500 text-carbon-50",
        danger: "bg-redstone-500 border-redstone-500 text-carbon-50",
        success: "bg-emerald-500 border-emerald-500 text-carbon-50",
        default: "bg-carbon-500 border-carbon-500 text-carbon-50",
      },
      variant: {
        solid: "",
        outline: "bg-transparent",
        ghost: "border-white/0",
        icon: "aspect-square",
        fill: "",
      },
    },
    compoundVariants: [
      // Solid
      { variant: "solid", intent: "primary", class: "hover:bg-patina-500/80" },
      { variant: "solid", intent: "warning", class: "hover:bg-amber-500/80" },
      { variant: "solid", intent: "danger", class: "hover:bg-redstone-500/80" },
      { variant: "solid", intent: "success", class: "hover:bg-emerald-500/80" },
      { variant: "solid", intent: "default", class: "hover:bg-carbon-500/80" },

      // Outline
      {
        variant: "outline",
        intent: "primary",
        class: "text-patina-500 border-patina-500 bg-patina-500/10",
      },
      {
        variant: "outline",
        intent: "warning",
        class: "text-amber-500 border-amber-500 bg-amber-500/10",
      },
      {
        variant: "outline",
        intent: "danger",
        class: "text-redstone-500 border-redstone-500 bg-redstone-50/0",
      },
      {
        variant: "outline",
        intent: "success",
        class: "text-emerald-500 border-emerald-500 bg-emerald-500/10",
      },
      {
        variant: "outline",
        intent: "default",
        class: "text-carbon-500 border-carbon-500 bg-carbon-500/10",
      },

      // Ghost
      {
        variant: "ghost",
        intent: "primary",
        class:
          "text-inheirt hover:bg-patina-500/10 bg-patina-500/0 hover:border-patina-500/10 border-patina-500/0",
      },
      {
        variant: "ghost",
        intent: "warning",
        class:
          "text-inheirt hover:bg-amber-500/10 bg-amber-500/0 hover:border-amber-500/10 border-amber-500/0",
      },
      {
        variant: "ghost",
        intent: "danger",
        class:
          "text-inheirt hover:bg-redstone-500/10 bg-redstone-500/0 hover:border-redstone-500/10 border-redstone-500/0",
      },
      {
        variant: "ghost",
        intent: "success",
        class:
          "text-inheirt hover:bg-emerald-500/10 bg-emerald-500/0 hover:border-emerald-500/10 border-emerald-500/0",
      },
      {
        variant: "ghost",
        intent: "default",
        class:
          "text-inheirt hover:bg-carbon-500/10 bg-carbon-500/0 hover:border-carbon-500/10 border-carbon-500/0",
      },

      // Fill
      {
        variant: "fill",
        intent: "primary",
        class: "bg-patina-500/90 text-patina-950 border-transparent",
      },
      {
        variant: "fill",
        intent: "warning",
        class: "bg-amber-500/90 text-amber-950 border-transparent",
      },
      {
        variant: "fill",
        intent: "danger",
        class: "bg-redstone-500/90 text-redstone-950 border-transparent",
      },
      {
        variant: "fill",
        intent: "success",
        class: "bg-emerald-500/90 text-emerald-950 border-transparent",
      },
      {
        variant: "fill",
        intent: "default",
        class: "bg-carbon-500/90 text-carbon-50 border-transparent",
      },
    ],
    defaultVariants: {
      variant: "fill",
      intent: "default",
      disabled: false,
    },
  },
);
type PropsType = Parameters<ReturnType<typeof cva>>[0];
export type ButtonProps = VariantProps<typeof buttonVariants> & PropsType;
// export type ButtonProps = {
// 	variant?: Variants;
// 	intent?: Intent;
// 	disabled?: boolean;

// } & PropsType

export const button = (props: ButtonProps) => twMerge(buttonVariants(props));
