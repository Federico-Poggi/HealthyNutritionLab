import {AssigedDiet} from "../userDir/AssigedDiet.tsx";
import {TrainingPlan} from "../userDir/TrainingPlan.tsx";
import {MdOutlineRestaurantMenu} from "react-icons/md"
import {NavDoctor} from "../doctor/NavDoctor.tsx";
import {SideBarDocNutrition} from "../doctor/SideBarDocNutrition.tsx";
import {Outlet, useParams, useRoutes} from "react-router-dom";
import {MainDocPage} from "../doctor/MainDocPage.tsx";
import {PazientePage} from "../doctor/PazientePage.tsx";
import {TabelleNutrizionali} from "../doctor/TabelleNutrizionali.tsx";
import {UserMain} from "../userDir/UserMain.tsx";
import {SideBarUser} from "../userDir/SideBarUser.tsx";

export function DashboardUser() {
    const {idCustomer} = useParams();
    const routes = useRoutes([
        {path: '*', element: <UserMain/>},
        {path: `pazienti/${idCustomer}`, element: <PazientePage/>},
        {path: "tabelle-nutrizionali", element: <TabelleNutrizionali/>},
        {path: 'pazienti/:idCustomer', element: <PazientePage/>},
        {path: 'diete', element: <AssigedDiet/>}
    ])
    return (
        <>
            {/*<div className={"h-[98vh] flex flex-col"}>
                <div className="h-1/2">
                    <span className="flex items-center justify-center">
                        <MdOutlineRestaurantMenu/>
                        <h3 className="font-medium px-2">Le tue diete</h3>
                    </span>
                    <AssigedDiet/>
                </div>
                <div>
                    <TrainingPlan/>
                </div>
            </div>*/}
            <div className="flex w-[100vw]  mt-20 ">
                <NavDoctor/>
                <div className="max-h-[99%] w-[15%] pl-1">
                    <SideBarUser/>
                </div>
                <div className="flex w-full px-2 justify-between">
                    {routes}
                    <Outlet/>
                </div>
            </div>
        </>
    );
}