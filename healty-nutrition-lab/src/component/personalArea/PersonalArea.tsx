import {SideBarUser} from "../userDir/SideBarUser.tsx";
import {SideBarDocNutrition} from "../doctor/SideBarDocNutrition.tsx";
import {Outlet} from "react-router-dom";
import {DashboardUser} from "./DashboardUser.tsx";
import {useSelector} from "react-redux";
import {RootStore} from "../../redux/store";
import {DashboardDoc} from "./DashboardDoc.tsx";


export function PersonalArea() {
    const role=useSelector((state:RootStore)=>state.user.role)

    return (
        <>
            <div className={"desktop:max-w-[15vw] flex"}>
            {(role === "NUTRITIONIST" || role === "PERSONAL_TRAINER") && <SideBarDocNutrition/>}
            {role == "CUSTOMER" && <SideBarUser/>}
            </div>
            <div className = {"flex flex-grow"}>

                <main className = {"max-w-[100vw] flex-grow"}>
                    <div className = {"w-1/2 flex-col justify-evenly"}>
                        {role === "CUSTOMER" && <DashboardUser/>}
                        {role==="NUTRITIONIST" && <DashboardDoc/>}
                    </div>

                </main>
            </div>
        </>
    );
}