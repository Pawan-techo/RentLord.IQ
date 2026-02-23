import cron from "node-cron";
import User from "../models/User_Model.js";

// Run daily at midnight to expire subscriptions
cron.schedule("0 0 * * *", async () => {
  try {
    console.log("Running subscription expiry check...");

    const now = new Date();

    const result = await User.updateMany(
      {
        role: "LANDLORD",
        "subscription.status": "ACTIVE",
        "subscription.endDate": { $lte: now },
      },
      { $set: { "subscription.status": "EXPIRED" } }
    );

    console.log(`Subscription expiry job complete. Updated ${result.modifiedCount} users.`);
  } catch (err) {
    console.error("Error in subscription expiry cron:", err);
  }
});