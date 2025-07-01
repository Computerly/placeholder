import Welcome from "./Welcome.svelte";
import ProjectType from "./ProjectType.svelte";
import Budget from "./Budget.svelte";
import Contact from "./Contact.svelte";
import Timeline from "./Timeline.svelte";
import OtherType from "./OtherType.svelte";
import { createFormFlow } from "$lib/formFlow/core/FormFlow";
//import { defineStep } from "$lib/formFlow";

const { defineStep } = createFormFlow<{
  projectType: "website" | "audit" | "other";
}>();

const websiteParticularsStep = defineStep({
  name: "Website",
  component: Welcome,
  possibleSteps: [],
  validator: () => true,
});

const projectTypeStep = defineStep({
  name: "Project Type",
  component: ProjectType,
  possibleSteps: [websiteParticularsStep],
  nextEvaluator: ({ formData }) => {
    switch (formData.projectType) {
      case "website":
        return websiteParticularsStep;
      default:
        throw new Error("Invalid Project Type");
    }
  },
  validator: () => true,
});

const welcomeStep = defineStep({
  name: "Welcome",
  component: Welcome,
  possibleSteps: [projectTypeStep],
  validator: () => true,
});

export { welcomeStep, projectTypeStep };
