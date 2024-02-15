import {useSelector} from "react-redux";
import {SideBarUser} from "../userDir/SideBarUser.tsx";
import {SideBarDocNutrition} from "../doctor/SideBarDocNutrition.tsx";
import {Outlet} from "react-router-dom";



interface StateLog {
    user: {
        logged: boolean
        role: string
    }
}

export function PersonalArea() {
    const role:string = useSelector((state: StateLog) => {
        return state.user.role
    })


    


    return (
        <>
            <div className = {"flex"}>
                {/* eslint-disable-next-line no-constant-condition */}
                {role === "NUTRITIONIST"||"PERSONAL_TRAINER" ? <SideBarDocNutrition/> : <SideBarUser/>}
                <Outlet/>
            </div>
        </>
    );
}