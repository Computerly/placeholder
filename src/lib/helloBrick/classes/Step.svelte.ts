//aka Node
import type { Component as SvelteComponent } from "svelte";
import lodash from "lodash";

// Generic interface for metadata to allow flexible typing
interface StepMetadata {
  [key: string]: any;
}

// Next step resolver function type
type NextStepResolver = (...args: any) => string | null;

// Configuration interface for creating a new step
interface StepConfig<T extends StepMetadata = StepMetadata> {
  component: SvelteComponent;
  validator?: () => boolean;
  name: string;
  nextStep?: StepNode<any> | null;
  metaData?: T;
}

class StepNode<T extends StepMetadata = StepMetadata> {
  public readonly component: SvelteComponent;
  public readonly name: string;
  public readonly id: string;
  public metaData: T;
  public readonly validator: () => boolean;
  private _nextStep: StepNode<any> | null;

  constructor(config: StepConfig<T>) {
    this.component = config.component;
    this.name = config.name;
    this.id = lodash.kebabCase(this.name);
    this._nextStep = config.nextStep || null;
    this.metaData = config.metaData || ({} as T);
    this.validator = config.validator || (() => true);
  }

  // Method to check if this is the last step
  isLast(): boolean {
    return this._nextStep === null;
  }

  // Method to get the next step. Peaks
  next(): StepNode<any> | null {
    return this._nextStep;
  }

  // Method to update metadata
  updateMetadata(newMetadata: Partial<T>): void {
    this.metaData = { ...this.metaData, ...newMetadata };
  }

  // Method to get specific metadata value
  getMetadata<K extends keyof T>(key: K): T[K] {
    return this.metaData[key];
  }

  // Checks if the current step is valid
  isValid() {
    return this.validator();
  }

  getComponent(): SvelteComponent {
    return this.component;
  }
}

export { StepNode, type StepConfig, type StepMetadata };
