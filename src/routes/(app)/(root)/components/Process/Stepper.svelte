<script lang="ts">
  import { useSvelteFlow, useNodeConnections } from "@xyflow/svelte";

  type Step = {
    title: string;
    description: string; // html or plain text
    nodeList: { id: string }[];
  };

  const startingNodeID = "start";

  const steps = [
    {
      title: "Process",
      description: "DESCRIPTION OF PROCESS",
      nodeList: undefined,
    },
    {
      title: "Discovery",
      description:
        "Through stakeholder interviews, competitive analysis, and user research, we uncover insights and requirements that will inform every subsequent phase.",
      nodeList: [{ id: "discovery" }],
    },
    {
      title: "Proposal",
      description:
        "We deliver a detailed proposal outlining deliverables, timeline, budget, and success criteria so you know exactly what to expect.",
      nodeList: [{ id: "proposal" }],
    },
    {
      title: "Research",
      description:
        "Our team conducts in-depth market and user research—surveys, analytics review, and persona development—to ensure our solution is data-driven.",
      nodeList: [{ id: "research" }],
    },
    {
      title: "Design",
      description:
        "We translate insights into wireframes, moodboards, and high-fidelity mockups, focusing on user experience, brand consistency, and accessibility.",
      nodeList: [{ id: "design" }],
    },
    {
      title: "Design Review",
      description:
        "You review the designs and provide feedback. If everything looks good, we move on; otherwise, we iterate until you’re fully satisfied.",
      nodeList: [{ id: "good" }],
    },
    {
      title: "Development",
      description:
        "Our developers turn approved designs into a working product—writing clean, maintainable code and integrating any required functionality or APIs.",
      nodeList: [{ id: "develop" }],
    },
    {
      title: "QA & Testing",
      description:
        "We rigorously test functionality, performance, and usability. This phase ensures the product works as intended and meets quality standards.",
      nodeList: [{ id: "works" }],
    },
    {
      title: "Launch",
      description:
        "After final sign-off, we deploy your product to the live environment, monitor the rollout, and ensure everything runs smoothly.",
      nodeList: [{ id: "launch" }],
    },
    {
      title: "Post-Launch Review",
      description:
        "We conduct a post-launch assessment—collecting feedback, monitoring KPIs, and optimizing as needed—to ensure ongoing success.",
      nodeList: [{ id: "perfect" }],
    },
    {
      title: "Have more questions?",
      description: `<p class="text-sm mb-8">We want you to be excited about starting a project with us! If your'e not sure or have questions, schedule a call/meeting or send us a message, no commitment, just an opportunity to learn and make a friend.</p><div class="flex gap-4 flex-wrap items-center"><button class="btn btn-neutral">Schedule a meeting</button><a href="/#contact" class="btn btn-neutral">Send a message</a></div> `,
      nodeList: [{ id: "perfect" }],
    },
  ];

  let currentStep = $state(steps.length - 1);
  const { fitView } = useSvelteFlow();

  function putToView() {
    let nodes = steps[currentStep].nodeList;
    // if (currentStep > 0)
    //   nodes = [
    //     ...(steps[currentStep].nodeList || []),
    //     ...(steps[currentStep - 1].nodeList || []),
    //   ];
    if (nodes && nodes.length && nodes[0].id != undefined) {
      let nodeId = nodes[0].id! as string;
      //   const connectedEdg = useNodeConnections({
      //     id: nodeId,
      //     handleType: "source",
      //   });
      //   console.log(connectedEdg);
    }
    fitView({
      padding: { left: "35%", right: "5%", top: "5%", bottom: "5%" },
      nodes,
      duration: 500,
    });
  }

  function nextStep() {
    if (currentStep >= steps.length - 1) return;
    currentStep += 1;
    putToView();
  }
  function prevStep() {
    if (currentStep <= 0) return;
    currentStep -= 1;
    putToView();
  }
</script>

<div class="flex flex-col justify-between h-full">
  <div class="overflow-y-auto">
    <h2 class="text-3xl mb-4">{steps[currentStep].title}</h2>
    <div class="text-base">
      {@html steps[currentStep].description}
    </div>
  </div>

  <div class="ml-auto">
    <button class="btn" disabled={currentStep == 0} onclick={() => prevStep()}
      >Prev</button
    >
    <button
      class="btn"
      disabled={currentStep == steps.length - 1}
      onclick={() => nextStep()}>Next</button
    >
  </div>
</div>
