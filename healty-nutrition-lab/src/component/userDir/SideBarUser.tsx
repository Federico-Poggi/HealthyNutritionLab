import logo from "../../assets/Logo.svg";
import {Tooltip} from "flowbite-react";
import {IoHomeOutline, IoPeopleOutline} from "react-icons/io5";
import {CiViewTable} from "react-icons/ci";
import {MdArrowBackIos, MdArrowForwardIos} from "react-icons/md";
import {BiLogOut} from "react-icons/bi";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {notLoggedAction} from "../../redux/action";
import {useDispatch} from "react-redux";
import { IoIosArrowDown } from "react-icons/io";
export function SideBarUser() {
    const [isOpen, setIsopen] = useState<boolean>(false)

    const NAVIGATE = useNavigate();
    const DISPATCH=useDispatch();
    const setToggle = () => {
        isOpen ? setIsopen(false) : setIsopen(true)
    }
    const logOut=()=>{
        localStorage.removeItem('token')
        localStorage.removeItem("Role")
        DISPATCH(notLoggedAction())
        NAVIGATE("/")
    }
    return (
        <>
            <div className = {`desktop:w-[10vw] side-bar bg-[#121212] border border-[#75a602] absolute right-10 transition-all duration-300 my-3 ml-2 rounded-xl`}>
                {!isOpen &&
                    <nav className = {"relative transition-all duration-300 items-center flex justify-evenly p-2"}>
                        <p>
                            <img onClick = {() => {
                                NAVIGATE("/")
                            }} src = {logo} alt = {"logo"} className = {'desktop:w-[25px] mx-auto '}/>
                        </p>
                        <p>
                            <Tooltip content = {"Home"} placement = {"right"}>
                                <IoHomeOutline onClick = {() => {
                                    NAVIGATE("/")
                                }}
                                               className = {'mx-auto h-full desktop:w-[25px] text-gray-400 hover:text-[#579614] cursor-pointer'}/>
                            </Tooltip>
                        </p>
                        <p>
                            <Tooltip content = {"Apri"} placement = {"right"}>
                                <IoIosArrowDown onClick = {() => {
                                    setToggle()
                                }}size={25}
                                                className = {'mx-auto h-full desktop:w-[25px] text-gray-400 hover:text-[#579614] cursor-pointer'}/>
                            </Tooltip>
                        </p>
                        <Tooltip content = {"LogOut"} placement = {"right"}>
                            <BiLogOut onClick = {() => {
                                logOut()
                            }}
                                      className = {'mx-auto h-full desktop:w-[25px] text-gray-400 hover:text-[#579614] cursor-pointer'}/>
                        </Tooltip>
                    </nav>}
                {isOpen && <nav>
                    <p className = {"flex items-center justify-center my-2"}>
                        <img onClick = {() => {
                            NAVIGATE("/")
                        }} src = {logo} alt = {"logo"} className = {'desktop:w-1/12 ml-5 my-5'}/>
                        <h2 className = {"mx-2 text-white text-[1.2rem] text-medium"}>HealthyNutritionLab</h2>
                        <MdArrowBackIos size = {20} onClick = {() => {
                            setToggle()
                        }} className = {'flex-grow text-gray-400 hover:text-[#579614] cursor-pointer'}/>
                    </p>
                    <aside className = {"nav-open"}>
                        <p onClick = {() => {
                            NAVIGATE("pazienti")
                        }} className = {"flex items-center gap-2 my-3"}>
                            <IoPeopleOutline className = {'w-1/6 text-3xl text-gray-400 cursor-pointer'}/>
                            <h2 className = {"side_open"}>Pazienti</h2>
                        </p>
                        <p onClick = {() => {
                            NAVIGATE("tabelle-nutrizionali")
                        }} className = {"flex items-center gap-2 my-3"}>
                            <CiViewTable className = {'w-1/6 text-3xl text-gray-400 cursor-pointer'}/>
                            <h2 className = {"side_open"}>Tabelle Nutrizionali</h2>
                        </p>
                        <p onClick = {() => {
                            NAVIGATE("/")
                        }} className = {"flex items-center gap-2 my-3"}>
                            <IoHomeOutline className = {'w-1/6 text-3xl text-gray-400 cursor-pointer'}/>
                            <h2 className = {"side_open"}>Home</h2>
                        </p>
                    </aside>

                </nav>}
            </div>
        </>
    );
}