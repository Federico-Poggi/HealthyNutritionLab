import {useSelector} from "react-redux";
import {SideBarUser} from "../userDir/SideBarUser.tsx";
import {SideBarDocNutrition} from "../doctor/SideBarDocNutrition.tsx";
import {useLocation} from "react-router-dom";
import {TabelleNutrizionali} from "../doctor/TabelleNutrizionali.tsx";


interface StateLog {
    user: {
        logged: boolean
        role: string
    }
}

export function PersonalArea() {
    const location = useLocation();
    const role = useSelector((state: StateLog) => {
        return state.user.role
    })


    return (
        <>
            <div className={"flex"}>
            {role === "NUTRITIONIST" ? <SideBarDocNutrition/> : <SideBarUser/>}
            {location.pathname === '/personalArea/tabelle-nutrizionali' && <TabelleNutrizionali/>}
            </div>
        </>
    );
}