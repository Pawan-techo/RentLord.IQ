import express from "express";
import cors from "cors";
import authRouters from "./routes/auth.route.js"
import invitationRoutes from "./routes/invitation.route.js"
import userRouters from "./routes/user.route.js";
import propertyRoutes from "./routes/property.route.js"
import subPropertyRoutes from "./routes/subProperty.route.js"
import notificationRoutes from "./routes/notification.route.js";
import userDetailsRoutes from "./routes/getTenantandLandlord.route.js";
import tenantHistoryRoutes from "./routes/tenantHistory.route.js"
import maintenanceRoutes from "./routes/maintenance.route.js"
import paymentRoutes from "./routes/payment.route.js"
import dueRoutes from "./routes/due.route.js"
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send({message:"Wellcome",status:true});
});
app.use("/auth",authRouters);
app.use("/api/invitations", invitationRoutes);
app.use("/api/users",userRouters);
app.use("/api/properties", propertyRoutes);
app.use("/api/sub-properties", subPropertyRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/me",userDetailsRoutes);
app.use("/api/tenants-history",tenantHistoryRoutes);
app.use("/api/maintenance",maintenanceRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/dues", dueRoutes);
export default app;