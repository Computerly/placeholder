import type * as LH from "lighthouse/types/lh";

/** @type {LH.Config} */
export default {
  // 1. Run your custom tests along with all the default Lighthouse tests.
  extends: 'lighthouse:default',
  settings: {
    locale: 'en-us',
    usePassiveGathering: true,
    formFactor: 'desktop',
    skipAudits: [],
    output: 'json',
    screenEmulation: {
      disabled: true
    },
    disableFullPageScreenshot: true,

  },


  // 2. Register new artifact with custom gatherer.
  // artifacts: [
  //   {id: 'FaviconGather', gatherer: './src/lib/components/Audit/gatherers/favicon-gatherer'},
  // ],

  // 3. Add custom audit to the list of audits 'lighthouse:default' will run.
  // audits: [
  //   {path: './src/lib/components/Audit/audits/favicon-audit'},
  // ],

  // 4. Create a new 'My site audits' section in the default report for our results.
  // categories: {
  //   mysite: {
  //     title: 'My site audits',
  //     description: 'Audits for our super awesome site',
  //     auditRefs: [
  //       // When we add more custom audits, `weight` controls how they're averaged together.
  //       {id: 'favicon-audit', weight: 1},
  //     ],
  //   },
  // },
};