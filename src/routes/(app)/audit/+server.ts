import lighthouse from "lighthouse";
import { ReportGenerator } from "lighthouse/report/generator/report-generator.js";
import * as chromeLauncher from "chrome-launcher";
import { json } from "@sveltejs/kit";

async function generateReport(url: string) {
  const chrome = await chromeLauncher.launch({ chromeFlags: ["--headless"] });
  const options = {
    logLevel: "info",
    output: "html",
    onlyCategories: ["performance"],
    port: chrome.port,
  };
  const runnerResult = await lighthouse(url, options);
  return runnerResult;
}

export async function POST({ locals, url, request }) {
  let { website_url } = await request.json();
  console.log(website_url);
  const report = await generateReport(website_url);

  return json({ report }, { status: 200 });
}
