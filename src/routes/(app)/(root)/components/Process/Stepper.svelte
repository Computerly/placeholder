<script lang="ts">
  import { ChevronRight, ChevronLeft } from "@lucide/svelte";
  import {
    useSvelteFlow,
    useNodeConnections,
    getConnectedEdges,
  } from "@xyflow/svelte";

  type Step = {
    title: string;
    description: string; // html or plain text
    nodeList: { id: string }[] | undefined;
  };

  const steps: Step[] = [
    {
      title: "Wondering how the process goes?",
      description:
        "We would too! That's why we try to make understanding the process as easy as possible.",
      nodeList: undefined,
    },
    {
      title: "Discovery",
      description:
        "We start by listening. Through conversations with you and a bit of digging into your space, we figure out what matters—goals, challenges, user needs, and context.",
      nodeList: [{ id: "discovery" }],
    },
    {
      title: "Proposal",
      description:
        "Once we understand the scope, we'll send over a straightforward proposal: what we'll deliver, when you'll get it, how much it'll cost, and everything else you'll need to know.",
      nodeList: [{ id: "proposal" }],
    },
    {
      title: "Research",
      description:
        "We look at the data, the market, and your users. That might mean checking analytics, surveying your audience, or sketching out key personas—whatever gives us the clearest picture.",
      nodeList: [{ id: "research" }],
    },
    {
      title: "Design",
      description:
        "Using everything we’ve learned, we start shaping your solution—wireframes, moodboards, and clean, high-fidelity mockups that align with your brand and keep accessibility front and center.",
      nodeList: [{ id: "design" }],
    },
    {
      title: "Design Review",
      description:
        "You review the work and tell us what you think. Happy? Great, we move forward. Need changes? No problem—we'll iterate until it's right.",
      nodeList: [{ id: "good" }, { id: "design" }],
    },
    {
      title: "Development",
      description:
        "This is where the designs come to life. You’ll start seeing real, interactive pages come together—fast, reliable, and ready to use.",
      nodeList: [{ id: "develop" }],
    },
    {
      title: "QA & Testing",
      description:
        "We test the product top to bottom—functionality, speed, accessibility—so it not only works, but works well.",
      nodeList: [{ id: "works" }, { id: "develop" }],
    },
    {
      title: "Launch",
      description:
        "Once you give the green light, we launch. We handle the deployment, monitor for any hiccups, and make sure everything runs smoothly.",
      nodeList: [{ id: "launch" }],
    },
    {
      title: "Post-Launch Review",
      description:
        "After launch, we don’t just disappear. We check performance, gather feedback, and help fine-tune anything that needs adjusting to keep things on track.",
      nodeList: [{ id: "perfect" }],
    },
    {
      title: "Rinse and repeat",
      description: `Once the dust settles, we take a step back together. What’s working well? What could be better? From there, we plan the next round—because great digital products aren’t one-and-done. They evolve.`,
      nodeList: [{ id: "start" }],
    },
  ];

  let currentStep = $state(0);
  const { fitView, getEdges, updateEdge, getNodes } = useSvelteFlow();

  // Makes the edge(s) from the last node to the current animated and highlighted.
  // Also resets active state to remove highlights
  function animateConnections(target: string) {
    const nodes = getNodes();

    if (nodes.length < 2) {
      return;
    }

    let currentNode = null,
      currentNodeIdx = null;
    // Find currentNode and its index
    for (let i = 0; i < nodes.length; i += 1) {
      if (nodes[i].id == target) {
        currentNode = nodes[i];
        currentNodeIdx = i;
      }
    }

    if (currentNode == null || currentNodeIdx == null) {
      // error cannot find target
      console.error("Cannot find target node in animateConnections");
      return;
    }

    const edges = getEdges();
    // Find the edges from nodes[currentNode - 1, currentNode)
    let connectedEdges = getConnectedEdges(nodes, edges);
    // if (currentNodeIdx == nodes.length - 1) {
    //   connectedEdges = getConnectedEdges([nodes[0]], edges);
    // } else {
    //   connectedEdges = getConnectedEdges(
    //     [nodes[currentNodeIdx - 1], currentNode],
    //     edges,
    //   );
    // }

    console.log(connectedEdges);
    console.log(target);

    // Active edge is the edge from the previous to the target or where the edge's target is the target node
    const activeEdge = connectedEdges.filter((e) => e.target == target);
    console.log(activeEdge);
    // Remove active attr from all edges
    edges.forEach((e) =>
      updateEdge(e.id, {
        data: { active: false },
        markerEnd: "sketchedArrow",
        animated: false,
      }),
    );

    // Animate edge and assign to be active
    updateEdge(activeEdge[0].id, {
      animated: true,
      data: { active: true },
      markerEnd: "sketchedArrow-active",
    });
  }

  function putToView() {
    let nodes = steps[currentStep].nodeList;
    if (nodes && nodes.length > 0) {
      console.log("target from puttoview: ", nodes[0].id);
      animateConnections(nodes[0].id);
    }

    // Previous node's connected edges should become animated
    // if (nodes && nodes.length > 0) {
    //   console.log(nodes);
    //   console.log(nodes[0].id);
    //   // Get all edges and find the one(s) connected to the first node in nodelist
    //   let edges = getEdges();
    //   console.log(edges);
    //   let connectedEdges = edges.filter((edge) => {
    //     console.log(edge.target);
    //     return edge.target == nodes[0].id;
    //   });

    //   connectedEdges.forEach((cEdge) =>
    //     updateEdge(cEdge.id, { animated: true }),
    //   );
    //   console.log(connectedEdges);
    // }

    fitView({
      padding: "5%",
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

<div class=" h-full p-8 bg-carbon-950 border-carbon-500 border-r">
  <div class="flex flex-col justify-between h-full">
    <div class="overflow-y-auto">
      <h2 class="text-3xl mb-4 font-medium">{steps[currentStep].title}</h2>
      <div class="text-base">
        {@html steps[currentStep].description}
      </div>
    </div>

    <div class="ml-auto">
      <button
        class="btn disabled:opacity-0"
        disabled={currentStep == 0}
        onclick={() => prevStep()}
      >
        <ChevronLeft size={18} />
      </button>
      <button
        class="btn"
        disabled={currentStep == steps.length - 1}
        onclick={() => nextStep()}
      >
        <ChevronRight size={18} />
      </button>
    </div>
  </div>
</div>
