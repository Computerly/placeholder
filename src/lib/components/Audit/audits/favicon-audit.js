import { Audit } from 'lighthouse';
import * as LH from "lighthouse/types/lh.js";

export default class FaviconAudit extends Audit {
	/** @type {LH.Audit.Meta} */
	static get meta() {
		return {
			id: "favicon-audit",
			scoreDisplayMode: Audit.SCORING_MODES.BINARY,
			title: "Checks if there is a favicon.",
			description: "There should be a favicon located at /favicon.ico",
			requiredArtifacts: ["FaviconGather"],
			failureTitle: "No favicon found.",
			supportedModes: ['navigation', 'snapshot', 'timespan']
		};
	}
	/**
	 *  @param {LH.Artifacts} artifacts 
	 * @param {LH.Audit.Context} context
	 * @return {any}
	 * */
	static audit(artifacts, context) {
		const value = artifacts.FaviconGather.status;

		return {
			score: value == 200 ? 1 : 0
		};
	}
}

