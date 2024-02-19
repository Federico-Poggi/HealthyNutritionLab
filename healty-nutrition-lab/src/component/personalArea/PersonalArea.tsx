import {SideBarUser} from "../userDir/SideBarUser.tsx";
import {SideBarDocNutrition} from "../doctor/SideBarDocNutrition.tsx";
import {Outlet} from "react-router-dom";
import {DashboardUser} from "./DashboardUser.tsx";


export function PersonalArea() {
    const role: string | null = localStorage.getItem("Role")

    return (
        <>
            <div className = {"flex"}>
                {/* eslint-disable-next-line no-constant-condition */}
                {role === "NUTRITIONIST" || role === "PERSONAL_TRAINER" && <SideBarDocNutrition/>}
                {role === "CUSTOMER" && <SideBarUser/>}
                <main className = {"max-w-[100vw] flex-grow"}>
                    {/*<Outlet/>*/}
                    <div className = {"w-1/2 flex-col justify-evenly"}>
                        <DashboardUser/>
                    </div>
                </main>
            </div>
        </>
    );
}