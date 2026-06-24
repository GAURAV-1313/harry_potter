import 'dotenv/config'
import cron from "cron";
import https from "https";

/**
 * @fileoverview Periodic health check utility to keep the server warm
 * @module utils/cron
 */

/**
 * Cron job that pings the health check endpoint every 14 minutes
 * @constant {CronJob} job - Scheduled health check task
 */
const url = `${process.env.API_URL}/api/v1/health-check`

const job = new cron.CronJob("*/14 * * * *", function () {
  https
    .get(url, (res) => {
      if (res.statusCode === 200) console.log("GET request sent successfully");
      else console.log("GET request failed", res.statusCode);
    })
    .on("error", (e) => console.error("Error while sending request", e));
});

export default job;