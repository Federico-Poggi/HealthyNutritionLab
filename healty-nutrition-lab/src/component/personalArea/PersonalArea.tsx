import {useSelector} from "react-redux";
import {SideBarUser} from "../userDir/SideBarUser.tsx";
import {SideBarDocNutrition} from "../doctor/SideBarDocNutrition.tsx";
import {Outlet, Route, Routes, useLocation, useParams} from "react-router-dom";



interface StateLog {
    user: {
        logged: boolean
        role: string
    }
}

export function PersonalArea() {
    const role = useSelector((state: StateLog) => {
        return state.user.role
    })


    return (
        <>
            <div className = {"flex"}>
                {role === "NUTRITIONIST" ? <SideBarDocNutrition/> : <SideBarUser/>}
                <Outlet/>
            </div>
        </>
    );
}