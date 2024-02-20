import {SideBarUser} from "../userDir/SideBarUser.tsx";
import {DashboardUser} from "./DashboardUser.tsx";
import {useSelector} from "react-redux";
import {RootStore} from "../../redux/store";
import {DashboardDoc} from "./DashboardDoc.tsx";
import {Outlet, useParams, useRoutes} from "react-router-dom";

import {NavDoctor} from "../doctor/NavDoctor.tsx";


export function PersonalArea() {
    const role = useSelector((state: RootStore) => state.user.role)
    const {idCustomer}=useParams()
    const routesDoc=useRoutes([
        {path:'*', element:<DashboardDoc/>},
    ])
    const routeCust=useRoutes([
        {path:'/', element:<DashboardUser/>}
    ])

    return (
        <>
            {/*<div className="flex">
                <div className={"desktop:max-w-[15vw] flex"}>
                    {role == "CUSTOMER" && <SideBarUser/>}
                </div>*/}
                <main id="main-personal" className={"max-w-[100vw] h-[100vh] flex flex-grow bg-gradient-to-r from-[#4b752a] from-0% via-[#393939] via-20% to-[#383c40] to-90%"}>
                        {role === "CUSTOMER" && <DashboardUser/>}
                        {role === "NUTRITIONIST" && routesDoc}
                </main>
            {/*</div>*/}
        </>
    );
}