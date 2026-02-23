import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { thunk } from "redux-thunk";
import { authReducer } from "./Auth/Reducer";
import { notificationReducer } from "./Notification/Reducer";
import { maintenanceReducer } from "./Maintenance/Reducer";
import { propertyReducer} from "./Property/Reducer"
import { paymentReducer } from "./Payment/Reducer";
import { dueReducer } from "./Due/Reducer"
import { subPropertyReducer } from "./SubProperty/Reducer";
import { invitationReducer } from "./Invitation/Reducer";
import tenantHistoryReducer from "./TenantHistory/Reducer";

const rootReducers = combineReducers({
  auth: authReducer,
  notification: notificationReducer,
  maintenance: maintenanceReducer,
  property: propertyReducer,
  subproperty:subPropertyReducer,
  payment:paymentReducer,
  due:dueReducer,
  invitation:invitationReducer,
  tenanthistory: tenantHistoryReducer,
});
export const store = legacy_createStore(rootReducers, applyMiddleware(thunk));
