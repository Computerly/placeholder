import { Gatherer } from 'lighthouse';
import * as LH from "lighthouse/types/lh.js";

export default class FaviconGather extends Gatherer {
	static symbol = Symbol("FaviconGather")
	/** @type {LH.Gatherer.GathererMetaNoDependencies} */
	meta = {
		supportedModes: ['navigation', 'timespan', 'snapshot'],
		symbol: FaviconGather.symbol
	};

	async startInstrumentation(context) {
		const session = context.driver.defaultSession;
		await session.sendCommand('Memory.startSampling');
	}

	async stopInstrumentation(context) {
		const session = context.driver.defaultSession;
		await session.sendCommand('Memory.stopSampling');
	}

	/** @param {LH.Gatherer.Context} context @return {Promise<any>} */
	async getArtifact(context) {
		const { driver } = context;
		const value = await driver.executionContext.evaluateAsync(`await fetch("/favicon.ico")`);
		return { status: value.status };
	}
}