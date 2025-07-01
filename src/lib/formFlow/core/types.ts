import type { Component as SvelteComponent } from "svelte";
import Step from "$lib/formFlow/core/Step.svelte";

export type FormData = Record<string, any>;

export type StepContext<TFormData> = {
  formData: TFormData;
  currentStep: Step<TFormData>;
};

export type LastStep = null;

export type NextStep<TFormData> = Step<TFormData> | LastStep | undefined;

export interface StepDefinition<TFormData = unknown> {
  name: string;
  component: SvelteComponent; // Componet to render
  possibleSteps: Step<TFormData>[] | null; // All posible next steps
  nextEvaluator?: (ctx: StepContext<TFormData>) => NextStep<TFormData>;
  validator?: (ctx: StepContext<TFormData>) => boolean; // Validates the step is complete. If no validator, then the step is always valid
}
