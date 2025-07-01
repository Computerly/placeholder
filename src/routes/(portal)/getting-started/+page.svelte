<script lang="ts">
  import {
    FormFlow,
    type StepDefinition,
    defineStep,
  } from "$lib/formFlow/index";
  import Welcome from "./steps/Welcome.svelte";
  import ProjectType from "./steps/ProjectType.svelte";
  import Budget from "./steps/Budget.svelte";
  import Contact from "./steps/Contact.svelte";
  import Timeline from "./steps/Timeline.svelte";
  import OtherType from "./steps/OtherType.svelte";

  const welcomeStep = defineStep({
    name: "Welcome",
    component: Welcome,
    nextStep: projectTypeStep,
    validator: () => true,
  });
  const projectTypeStep = defineStep({
    name: "Project Type",
    component: Welcome,
    nextStep: "",
    validator: () => true,
  });

  const steps = defineSteps([
    {
      name: "Welcome",
      component: Welcome,
      nextStep: "",
      validator: () => true,
    },
    {
      name: "ProjectType",
      component: ProjectType,
      nextStep: "",
      validator: () => true,
    },
    {
      name: "OtherType",
      component: OtherType,
      nextStep: "",
      validator: () => true,
    },
    {
      name: "Budget",
      component: Welcome,
      nextStep: "",
      validator: () => true,
    },
    {
      name: "Timeline",
      component: Timeline,
      nextStep: "",
      validator: () => true,
    },
    {
      name: "Contact",
      component: Contact,
      nextStep: "",
      validator: () => true,
    },
  ]);
  const gettingStarted = new FormFlow(steps);
</script>
