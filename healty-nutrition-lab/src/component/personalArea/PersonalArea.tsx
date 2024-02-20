import {SideBarUser} from "../userDir/SideBarUser.tsx";
import {DashboardUser} from "./DashboardUser.tsx";
import {useSelector} from "react-redux";
import {RootStore} from "../../redux/store";
import {DashboardDoc} from "./DashboardDoc.tsx";
import {Outlet, useParams, useRoutes} from "react-router-dom";
import {PazientePage} from "../doctor/PazientePage.tsx";
import {TabelleNutrizionali} from "../doctor/TabelleNutrizionali.tsx";
import {AssigedDiet} from "../userDir/AssigedDiet.tsx";


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
            <div className="flex">
                <div className={"desktop:max-w-[15vw] flex"}>
                    {role == "CUSTOMER" && <SideBarUser/>}
                </div>

                <main className={"max-w-[100vw] flex flex-grow"}>
                    <div className={"w-1/2 flex-col justify-evenly"}>
                        {role === "CUSTOMER" && <DashboardUser/>}
                        {role === "NUTRITIONIST" && routesDoc}
                    </div>

                </main>
            </div>
        </>
    );
}