import { StepNode } from "$lib/helloBrick/classes/Step.svelte";
import ProjectType from "$lib/helloBrick/components/ProjectType.svelte";
import Budget from "$lib/helloBrick/components/Budget.svelte";
import Contact from "$lib/helloBrick/components/ContactInfo.svelte";
import Goal from "$lib/helloBrick/components/Goal.svelte";
import Timeline from "$lib/helloBrick/components/Timeline.svelte";
import { globalData } from "$lib/helloBrick/engine.svelte";

export const contactStep = new StepNode({
  name: "Contact",
  component: Contact,
});

export const budgetStep = new StepNode({
  name: "Budget",
  component: Budget,
  nextStep: contactStep,
});

export const timelineStep = new StepNode({
  name: "Timeline",
  component: Timeline,
  nextStep: budgetStep,
});

export const goalsStep = new StepNode({
  name: "Goals",
  component: Goal,
  nextStep: timelineStep,
  nextStepResolver: null,
});

export const projectTypeStep = new StepNode({
  name: "Project Type",
  component: ProjectType,
  nextStep: contactStep,
  validator: () => {
    return !!globalData.projectType;
  },
  nextStepResolver: ({ data, self }) => {
    switch (data.projectType) {
      case "website":
        self.setNext(goalsStep);
        break;
      case "other":
        break;
      default:
        break;
    }

    return null;
  },
});
