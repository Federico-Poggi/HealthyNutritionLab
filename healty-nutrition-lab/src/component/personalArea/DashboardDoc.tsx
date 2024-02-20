import {Patient} from "../doctor/Patient.tsx";
import {Outlet, Route, Routes, useParams, useRoutes} from "react-router-dom";
import {SideBarDocNutrition} from "../doctor/SideBarDocNutrition.tsx";
import {PazientePage} from "../doctor/PazientePage.tsx";
import {TabelleNutrizionali} from "../doctor/TabelleNutrizionali.tsx";
import {AssigedDiet} from "../userDir/AssigedDiet.tsx";
import {NavDoctor} from "../doctor/NavDoctor.tsx";

export function DashboardDoc() {
    const {idCustomer} = useParams();
    const routes = useRoutes([
        {path: '*', element: <Patient/>},
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
                <div className={"flex w-[90%]"}>
                    {routes}
                    <div>
                        <Outlet/>
                    </div>
                </div>
            </div>
        </>
    );
}