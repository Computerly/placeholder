import type {
  StepDefinition,
  StepContext,
  NextStep,
  FormData,
} from "$lib/formFlow/core/types";
import type { Component as SvelteComponent } from "svelte";

class Step<T> {
  public readonly name;
  public readonly component;
  public isValid: boolean = $state(false);

  protected possibleSteps;
  protected readonly validator: NonNullable<StepDefinition<T>["validator"]>;
  protected nextStep: NextStep<T>;
  protected nextEvaluator: (args: StepContext<T>) => NextStep<T>;

  public getComponent(): SvelteComponent {
    return this.component;
  }

  public next(): NextStep<T> {
    if (this.possibleSteps == null) return null;
    return this.nextStep;
  }

  public update(formData: T): void {
    const ctx: StepContext<T> = { formData, currentStep: this };
    this.isValid = this.validator(ctx);
    if (this.isValid) {
      this.nextStep = this.nextEvaluator(ctx);
    }
  }

  public constructor(data: StepDefinition<T>) {
    this.name = data.name;
    this.component = data.component;
    this.possibleSteps = data.possibleSteps;
    this.nextStep = this.possibleSteps?.[0] || null;
    this.nextEvaluator =
      data.nextEvaluator || ((ctx: StepContext<T>) => this.nextStep);
    this.validator = data.validator || ((ctx: StepContext<T>) => true);
  }
}

export default Step;
