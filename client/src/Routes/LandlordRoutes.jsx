import { Routes, Route } from "react-router-dom";
import DashboardLayout from "../components/Landlord/DashbordLayout";
import Properties from "../components/Landlord/Menus/Properties";
import Insights from "../components/Landlord/Menus/Insights";
import SubProperties from "../components/Landlord/Menus/SubProperty";
import { Navigate } from "react-router-dom";
import TenantHistory from "../components/Landlord/Menus/TenantHistory";
import Notifications from "../components/Landlord/Menus/Notifications";
import PropertyForm from "../components/Landlord/Menus/Forms/PropertyForm";
import SubPropertyForm from "../components/Landlord/Menus/Forms/SubPropertyForm";
import Maintenance from "../components/Landlord/Menus/Maintenance";
import InviteTenantForm from "../components/Landlord/Menus/Forms/InviteTenantForm";
import ViewTenantDetails from "../components/Landlord/Menus/Forms/ViewTenantDetails";
import DueRent from "../components/Landlord/Menus/DueRent";
import MyAccount from "../components/Landlord/Menus/MyAccount";
import Subscription from "../components/Landlord/Menus/Subscription";
const LandlordRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Navigate to="insights" replace />} />
          <Route path="insights" element={<Insights />} />
          <Route path="properties" element={<Properties />} />
          <Route path="sub-properties" element={<SubProperties />} />
          <Route path="tenants" element={<TenantHistory />} />
          <Route path="due" element={<DueRent />} />
          <Route path="maintenance" element={<Maintenance />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="add-property" element={<PropertyForm />} />
          <Route path="add-sub-property" element={<SubPropertyForm />} />
          <Route path="invite-tenant" element={<InviteTenantForm />} />
          <Route path="tenant-details/:tenantId" element={<ViewTenantDetails/>} />
          <Route path="my-account" element={<MyAccount/>} />
          <Route path="subscription" element={<Subscription/>} />
        </Route>
      </Routes>
    </div>
  );
};
export default LandlordRoutes;
