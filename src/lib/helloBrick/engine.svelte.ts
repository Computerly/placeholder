import { History } from "$lib/helloBrick/classes/History.svelte";
import { StepNode } from "$lib/helloBrick/classes/Step.svelte";
import { projectTypeStep } from "$lib/helloBrick/steps";
import type { Component as SvelteComponent } from "svelte";

class Stepper {
  private _current: StepNode;

  constructor(start: StepNode) {
    if (!start) {
      throw Error("Head is unset");
    }
    this._current = $state(start);

    $effect.root(() => {
      $effect(() => {
        // whenever data changes in the store, trigger update on current component
        if (globalData) this._current.update();
      });
    });
  }

  getCurrentComponent(): SvelteComponent {
    return this._current.component;
  }

  next(): void {
    console.log("Next!");
    if (!this.isValid()) return;

    if (!this._current.next()) {
      // Finish
      this.submit();
    }

    history.add(this._current);
    this._current = this._current.next()!;
    console.log(`Current: ${this._current.name}`);
  }

  back(): void {
    this._current = history.prev() || this._current;
  }

  canGoBack(): boolean {
    return history.length > 1;
  }

  isLast(): boolean {
    return this._current.isLast();
  }

  isValid(): boolean {
    return this._current.isValid();
  }

  private submit(): boolean {
    // submit
    return true;
  }
}

export const head: StepNode = projectTypeStep;
export const history = new History<StepNode>([head]);
export const stepper = new Stepper(head);
export const globalData = $state({
  projectType: null,
});
