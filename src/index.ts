import "dotenv/config";
import { client, v2 } from "@datadog/datadog-api-client";

const apiKey = process.env.DATADOG_API_KEY;
const site = "us3.datadoghq.com";
const metricName = "autofind.input.files";

const sleep = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

let metricsApi: v2.MetricsApi | undefined;

function getMetricsApi(): v2.MetricsApi {
	if (!apiKey) {
		throw new Error("DATADOG_API_KEY is required to send metrics to Datadog.");
	}

	if (!metricsApi) {
		const configuration = client.createConfiguration({
			authMethods: {
				apiKeyAuth: apiKey,
			},
		});
		configuration.setServerVariables({ site });
		metricsApi = new v2.MetricsApi(configuration);
	}

	return metricsApi;
}

async function sendMetric(): Promise<void> {
	const now = Math.floor(Date.now() / 1000);
	const params: v2.MetricsApiSubmitMetricsRequest = {
		body: {
			series: [
				{
					metric: metricName,
					type: 1, // Counter
					points: [
						{
							timestamp: now,
							value: 1,
						},
					],
					tags: ["app:simple-datadog"],
				},
			],
		},
	};

	await getMetricsApi().submitMetrics(params);
	console.log(`Metric ${metricName} sent at ${new Date(now * 1000).toISOString()}`);
}

async function main(): Promise<void> {
	for (let i = 0; i < 100; i++) {
		try {
			await sendMetric();
		} catch (error) {
			console.error("Failed to send metric:", error);
		}

		await sleep(1000);
	}
}

void main();
