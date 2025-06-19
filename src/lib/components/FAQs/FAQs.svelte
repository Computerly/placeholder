<script lang="ts">
  import { faqs } from "$lib/components/FAQs/faqs";
  import { ChevronDown } from "lucide-svelte";
  import { Accordion } from "bits-ui";
  import SectionLabel from "$lib/components/SectionLabel/SectionLabel.svelte";
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
</div>
