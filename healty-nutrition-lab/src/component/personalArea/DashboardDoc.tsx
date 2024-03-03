import {Outlet, useParams, useRoutes} from "react-router-dom";
import {SideBarDocNutrition} from "../doctor/SideBarDocNutrition.tsx";
import {PazientePage} from "../doctor/PazientePage.tsx";
import {TabelleNutrizionali} from "../doctor/TabelleNutrizionali.tsx";
import {AssigedDiet} from "../userDir/AssigedDiet.tsx";
import {NavDoctor} from "../doctor/NavDoctor.tsx";
import {MainDocPage} from "../doctor/MainDocPage.tsx";
import {WriteArticle} from "../articles/WriteArticle.tsx";

export function DashboardDoc() {
    const {idCustomer} = useParams();
    const routes = useRoutes([
        {path: '*', element: <MainDocPage/>},
        {path: `pazienti/${idCustomer}`, element: <PazientePage/>},
        {path: "tabelle-nutrizionali", element: <TabelleNutrizionali/>},
        {path: 'pazienti/:idCustomer', element: <PazientePage/>},
        {path: 'diete', element: <AssigedDiet/>},
        {path:'write', element:<WriteArticle/>}
    ])
    return (
        <>
            <div className="flex w-[100vw]  mt-20 ">
                <NavDoctor/>
                <div className="max-h-[99%] w-[15%] pl-1">
                    <SideBarDocNutrition/>
                </div>
                <div className="flex w-full px-2 justify-between">
                    {routes}
                    <Outlet/>
                </div>
            </div>
        </>
    );
}