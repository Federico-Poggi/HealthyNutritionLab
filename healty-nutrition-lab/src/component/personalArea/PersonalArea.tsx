import {useSelector} from "react-redux";
import {SideBarUser} from "../userDir/SideBarUser.tsx";
import {SideBarDocNutrition} from "../doctor/SideBarDocNutrition.tsx";
import {Outlet} from "react-router-dom";
import {RootStore} from "../../redux/store";

export function PersonalArea() {
    const role: string = useSelector((state: RootStore) => {
        return state.user.role
    })

    return (
        <>
            <div className = {"flex"}>
                {/* eslint-disable-next-line no-constant-condition */}
                {role === "NUTRITIONIST" || "PERSONAL_TRAINER" ? <SideBarDocNutrition/> : <SideBarUser/>}
                <main className={"max-w-[100vw] flex-grow"}>
                    <Outlet/>
                </main>
            </div>
        </>
    );
}