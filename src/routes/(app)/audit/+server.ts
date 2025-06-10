import lighthouse from "lighthouse";
import * as chromeLauncher from "chrome-launcher";
import { runAudit } from "./audit";
import lighthouseConfig from "./customConfig";
import type * as LH from "lighthouse/types/lh";


const launchChromeAndRunLighthouse = (url: string) => {
  return chromeLauncher
    .launch({ chromeFlags: ["--headless", "--enable-automate"] })
    .then((chrome) => {
      const opts: LH.Flags = {
        port: chrome.port,
        logLevel: 'info'
      };
      return lighthouse(url, opts).then((results) => {
        chrome.kill();
        return results;
      });
    });
};

function normalizeUrl(inputUrl: string): string {
  try {
    // If no protocol, default to https
    let url = inputUrl.trim();
    if (!/^https?:\/\//i.test(url)) {
      url = 'https://' + url;
    }

    const parsed = new URL(url);

    // Add www. if it's not a subdomain and not already present
    const hostnameParts = parsed.hostname.split('.');
    const hasWww = parsed.hostname.startsWith('www.');

    if (!hasWww && hostnameParts.length === 2) {
      parsed.hostname = 'www.' + parsed.hostname;
    }

    return parsed.href;
  } catch (err) {
    throw new Error(`Invalid URL provided: ${inputUrl}`);
  }
}

export async function GET({ url: requestUrl }) {
  const target = requestUrl.searchParams.get("url");
  if (!target) {
    return new Response("Missing ?url=", { status: 400 });
  }
  const normalizedUrl = normalizeUrl(target);
  try {
    console.time("Lighthouse")
    const lightHouseReport = await launchChromeAndRunLighthouse(normalizedUrl);
    console.timeEnd("Lighthouse")

    if (!lightHouseReport || !lightHouseReport.lhr) {
      return new Response("Lighthouse report generation failed", {
        status: 500,
      });
    }

    const businessReport = await runAudit(lightHouseReport.lhr);

    return new Response(JSON.stringify({ businessReport, lightHouseReport }), {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=300",
      },
    });
  } catch (err: any) {
    console.error(err)
    return new Response(err.message, { status: 500 });
  }
}
