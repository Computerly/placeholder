import type { StepDefinition, StepContext } from "$lib/formFlow/core/types";
import { defineStep } from "$lib/formFlow/core/defineStep";

type GenericFormData = {} | { [key: string]: any };

export class FormFlow<TFormData extends GenericFormData> {
  // private stepMap: Map<string, StepDefinition>;
  // public currentStep: StepDefinition;
  public formData: TFormData = {} as TFormData;

  getCurrentComponent() {
    //return this.currentStep.component;
  }

  isCurrentStepValid(): boolean {
    return false;
    // return this.currentStep.validator({
    //   formData: this.formData,
    //   currentStep: this.currentStep.name,
    // });
  }

  goToNextStep(): void {
    // const ctx: StepContext = {
    //   formData: this.formData,
    //   currentStep: this.currentStep.name,
    // };
    // const next =
    //   typeof this.currentStep.nextStep === "function"
    //     ? this.currentStep.nextStep(ctx)
    //     : this.currentStep.nextStep;
    // const nextStep = this.stepMap.get(next);
    // if (!nextStep) {
    //   throw new Error(`Step "${next}" not found.`);
    // }
    // this.currentStep = nextStep;
  }

  public constructor(formData: TFormData) {
    this.formData = formData;
    // this.stepMap = new Map(steps.map((step) => [step.name, step]));
    // this.currentStep = steps[0];
  }
}

export function createFormFlow<TFormData extends GenericFormData>(
  initalData: TFormData = {} as TFormData,
) {
  const form = new FormFlow<TFormData>(initalData);

  return { defineStep: defineStep<TFormData>, form };
}

export default FormFlow;
