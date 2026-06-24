import 'dotenv/config'
import cron from "cron";
import https from "https";

const url = process.env.API_URL ? `${process.env.API_URL}/api/v1/health-check` : null

const MAX_RETRIES = 3;
let consecutiveFailures = 0;

const job = new cron.CronJob("*/14 * * * *", function () {
  if (!url) {
    console.log("API_URL not set, skipping health check");
    return;
  }
  https
    .get(url, (res) => {
      if (res.statusCode === 200) {
        consecutiveFailures = 0;
        console.log("Health check passed");
      } else {
        consecutiveFailures++;
        console.warn(`Health check failed: ${res.statusCode} (${consecutiveFailures}/${MAX_RETRIES})`);
        if (consecutiveFailures >= MAX_RETRIES) {
          console.error(`Max retries (${MAX_RETRIES}) reached. Consider checking API_URL.`);
        }
      }
    })
    .on("error", (e) => {
      consecutiveFailures++;
      console.error(`Request error (${consecutiveFailures}/${MAX_RETRIES}):`, e.message);
      if (consecutiveFailures >= MAX_RETRIES) {
        console.error(`Max retries (${MAX_RETRIES}) reached. Consider checking API_URL.`);
      }
    });
});

export default job;