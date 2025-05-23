<script lang="ts">
  import { faqs } from "$lib/faqs";
  import { ChevronDown } from "lucide-svelte";
  import { Accordion } from "bits-ui";
  import { math } from "mathlifier";
  import SectionLabel from "./Misc/SectionLabel.svelte";

  let avgLexicon = $state(35000);
  let questionLenMin = $state(3);
  let questionLenMax = $state(20);
  let ans = $derived(
    Array.from(
      { length: Number(questionLenMax) - Number(questionLenMin) },
      (_, i) => Math.pow(Number(avgLexicon), i) / 1000,
    ).reduce((a, b) => a + b, 0),
  );
  let latexEQ =
    $derived(`\\sum_{n=${questionLenMin}}^{${questionLenMax}} \\frac{(${avgLexicon})^n}{1000}
= ${Intl.NumberFormat("us-en", { style: "decimal", notation: "standard" }).format(ans)}  \\approx a lot
`);
  let percentAnswered = $derived(faqs.length / ans);
</script>

<SectionLabel name="FAQs" />

<div class="p-8 border-b border-carbon-500">
  <Accordion.Root type="single" class="w-full" value={"item-0"}>
    {#each faqs as faq, index}
      <Accordion.Item
        value="item-{index}"
        class="border-carbon-700 group border-b px-1.5"
      >
        <Accordion.Header>
          <Accordion.Trigger
            class="flex cursor-pointer w-full flex-1 select-none items-center justify-between py-5  text-lg font-medium transition-all [&[data-state=open]>span>svg]:rotate-180"
          >
            <span class="w-full text-left hover:underline">
              {faq.title}
            </span>
            <span
              class="hover:bg-carbon-800 inline-flex size-8 items-center justify-center rounded-[7px] bg-transparent"
            >
              <ChevronDown
                class="size-[18px] transition-transform duration-200"
              />
            </span>
          </Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Content
          class="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden tracking-[-0.01em]"
        >
          <div class="pb-5 max-w-prose text-base">
            {@html faq.description}
          </div>
        </Accordion.Content>
      </Accordion.Item>
    {/each}
  </Accordion.Root>

  <div class="my-8 text-carbon-200 text-sm">
    <div class="badge mr-2">Fun Fact</div>
    If an average person knows around {Intl.NumberFormat("us-en", {
      style: "decimal",
    }).format(avgLexicon)}
    words, and assuming a question length of
    {Intl.NumberFormat("us-en", { style: "decimal" }).format(questionLenMin)}
    to
    {Intl.NumberFormat("us-en", { style: "decimal" }).format(questionLenMax)}
    words and about every 1 in 1000 word combinations are valid, there are
    <div class="inline-block my-2">
      {@html math(latexEQ)}
    </div>
    combinations of questions you could ask. So we took the time and answered around
    {Intl.NumberFormat("us-en", {
      style: "percent",
      notation: "scientific",
      maximumFractionDigits: 3,
      maximumSignificantDigits: 3,
      minimumSignificantDigits: 1,
    }).format(percentAnswered)}
    {percentAnswered < 0.001 && "(≈ 0%)"}
    of those questions.
  </div>
</div>
