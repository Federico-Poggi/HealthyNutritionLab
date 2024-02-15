import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {IoPeopleOutline} from "react-icons/io5";
import {SidebarLogo, Tooltip} from "flowbite-react";
import logo from '../../assets/Logo.svg'
import { CiViewTable } from "react-icons/ci";
import { MdArrowForwardIos, MdArrowBackIos } from "react-icons/md";

export function SideBarDocNutrition() {
    const NAVIGATE = useNavigate();
    const [isOpen, setIsOpen] = useState<boolean>(false)

    const setToggle = () => {
        isOpen === true ? setIsOpen(false) : setIsOpen(true)
    }

    return (
        <>
            {/*<div className = {"relative"}>
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
            </div>*/}
            <div className = {`${isOpen ? 'desktop:w-[14%]' : 'desktop:w-[3%]'} bg-gray-800 transition-all duration-300 my-3 ml-2 max-h-[97vh] h-[97vh] rounded-xl`}>
                {!isOpen &&
                    <nav className={"relative transition-all duration-300 flex flex-col items-center"}>
                        <p>
                            <img onClick = {() => {
                                NAVIGATE("/")
                            }} src = {logo} alt = {"logo"} className = {'desktop:w-1/2 mx-auto my-5'}/>
                        </p>
                        <p>
                            <Tooltip content = {"Pazienti"} placement = {"right"}>
                                <IoPeopleOutline onClick={()=>{
                                    NAVIGATE("pazienti")
                                }} className = {'desktop:w-1/2 mx-auto h-20 text-gray-400 hover:text-[#579614] cursor-pointer'}/>
                            </Tooltip>
                        </p>
                        <p>
                            <Tooltip content = {"Tabelle"} placement = {"right"}>
                                <CiViewTable onClick={()=>{
                                    NAVIGATE("tabelle-nutrizionali")
                                }} className = {'desktop:w-1/2 mx-auto h-20 text-gray-400 hover:text-[#579614] cursor-pointer'}/>
                            </Tooltip>
                        </p>
                        <p>
                            <Tooltip content = {"Apri"} placement = {"right"}>
                                <MdArrowForwardIos onClick={()=>{
                                    setToggle()
                                }} className = {'desktop:w-1/2 mx-auto h-20 text-gray-400 hover:text-[#579614] cursor-pointer'}/>
                            </Tooltip>
                        </p>
                    </nav>}
            </div>
        </>
    );
}