import type { StepDefinition } from "$lib/formFlow/core/types";
import Step from "$lib/formFlow/core/Step.svelte";

export function defineStep<T>(step: StepDefinition<T>): Step<T> {
  return new Step(step);
}
