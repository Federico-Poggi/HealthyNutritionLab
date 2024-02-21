
import {Outlet, useParams, useRoutes} from "react-router-dom";
import {SideBarDocNutrition} from "../doctor/SideBarDocNutrition.tsx";
import {PazientePage} from "../doctor/PazientePage.tsx";
import {TabelleNutrizionali} from "../doctor/TabelleNutrizionali.tsx";
import {AssigedDiet} from "../userDir/AssigedDiet.tsx";
import {NavDoctor} from "../doctor/NavDoctor.tsx";
import {MainDocPage} from "../doctor/MainDocPage.tsx";

export function DashboardDoc() {
    const {idCustomer} = useParams();
    const routes = useRoutes([
        {path: '*', element: <MainDocPage/>},
        {path: `pazienti/${idCustomer}`, element: <PazientePage/>},
        {path: "tabelle-nutrizionali", element: <TabelleNutrizionali/>},
        {path: 'pazienti/:idCustomer', element: <PazientePage/>},
        {path: 'diete', element: <AssigedDiet/>}
    ])
    return (
        <>
            <div className="flex w-[100vw] mt-20 relative">
                <NavDoctor/>
                <div className="max-h-[99%] w-[15%] px-2">
                    <SideBarDocNutrition/>
                </div>
                {routes}
                <Outlet/>
            </div>
        </>
    );
}