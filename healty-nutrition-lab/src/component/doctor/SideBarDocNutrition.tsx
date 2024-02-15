import {useNavigate} from "react-router-dom";
import {Sidebar} from "flowbite-react";





export function SideBarDocNutrition() {
    const NAVIGATE=useNavigate();

    return (
        <>
            <div className = {"relative"}>
                <div id = {"sideBar-user"} className = {" left-2 rounded-2xl top-24 desktop:w-[350px] h-[88vh]"}>
                    <ul className = {"pl-4"}>
                        <li onClick={()=>{
                            NAVIGATE("pazienti")
                        }}>Clienti</li>
                        <li onClick={()=>{
                            NAVIGATE("tabelle-nutrizionali")
                        }}>Tabelle Nutrizionali</li>
                        <li>Profilo</li>
                    </ul>
                </div>
            </div>
        </>
    );
}