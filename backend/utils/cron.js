import 'dotenv/config'
import cron from "cron";
import https from "https";

const healthCheckUrl = process.env.API_URL
  ? `${process.env.API_URL}/api/v1/health-check`
  : null;

const job = new cron.CronJob("*/14 * * * *", function () {
  if (!healthCheckUrl) {
    console.warn("API_URL not set, skipping health check");
    return;
  }
  https
    .get(healthCheckUrl, (res) => {
      if (res.statusCode === 200) console.log("Health check: OK");
      else console.warn("Health check: failed with status", res.statusCode);
    })
    .on("error", (e) => console.error("Health check request failed:", e.message));
});

export default job;