import { Route, Routes } from "react-router-dom";
import TenantDashboard from "../components/tenant/TenantDashboard";
const  TenantRoutes =()=>{
    return(
        <div>
            <Routes>
                 <Route path='/' element={<TenantDashboard/>}/>
            </Routes>
        </div>
    )
}
export default TenantRoutes;