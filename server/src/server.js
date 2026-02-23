import connectDB from "./config/db.js";
import app from "./index.js";
import "dotenv/config";
import "./services/subscriptionCron.js"; 
import cors from "cors";
const PORT = process.env.PORT || 3033;
let isConnected = false;
async function connectOnce() {
  if (!isConnected) {
    try {
      await connectDB();
      isConnected = true;
      console.log("MongoDB connected");
    } catch (err) {
      console.error("DB connection failed:", err);
    }
  }
}

app.use(cors({
  origin: "https://rentlordiq.vercel.app",
  credentials: true
}));

connectOnce();
if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Server running locally on port ${PORT}`);
  });
}
export default async function handler(req, res) {
  await connectOnce();
  return app(req, res);
}
