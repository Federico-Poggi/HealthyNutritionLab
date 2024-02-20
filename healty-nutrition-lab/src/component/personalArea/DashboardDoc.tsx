import {Patient} from "../doctor/Patient.tsx";
import {Outlet, Route, Routes, useParams, useRoutes} from "react-router-dom";
import {SideBarDocNutrition} from "../doctor/SideBarDocNutrition.tsx";
import {PazientePage} from "../doctor/PazientePage.tsx";
import {TabelleNutrizionali} from "../doctor/TabelleNutrizionali.tsx";
import {AssigedDiet} from "../userDir/AssigedDiet.tsx";

export function DashboardDoc() {
    const {idCustomer}=useParams();
    const routes = useRoutes([
        {path: '*', element: <Patient/>},
        {path: `pazienti/${idCustomer}`, element: <PazientePage/>},
        {path: "tabelle-nutrizionali", element: <TabelleNutrizionali/>},
        {path: 'pazienti/:idCustomer', element: <PazientePage/>},
        {path: 'diete', element: <AssigedDiet/>}
    ])
    return (
        <>
            <div className="flex w-[100vw] items-center">
                <SideBarDocNutrition/>
                <div className={"w-full"}>
                    {routes}
                    <Outlet/>
                </div>
            </div>
        </>
    );
}