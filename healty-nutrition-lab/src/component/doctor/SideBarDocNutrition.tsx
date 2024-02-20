import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {IoPeopleOutline} from "react-icons/io5";
import {Tooltip} from "flowbite-react";
import logo from '../../assets/Logo.svg'
import {CiViewTable} from "react-icons/ci";
import {MdArrowForwardIos, MdArrowBackIos} from "react-icons/md";
import {IoHomeOutline} from "react-icons/io5";
import {BiLogOut} from "react-icons/bi";
import { PiArticleLight } from "react-icons/pi";
import {useDispatch} from "react-redux";
import {notLoggedAction} from "../../redux/action";
import {TbLayoutDashboard} from "react-icons/tb";

export function SideBarDocNutrition() {
    const NAVIGATE = useNavigate();
    const DISPATCH = useDispatch();
    const [isOpen, setIsOpen] = useState<boolean>(false)

    const setToggle = () => {
        isOpen === true ? setIsOpen(false) : setIsOpen(true)
    }

    const logOut = () => {
        localStorage.removeItem('token')
        localStorage.removeItem("Role")
        DISPATCH(notLoggedAction())
        NAVIGATE("/")
    }
    return (
        <>

            {/*<div
                className={`fixed side-bar ${isOpen ? 'desktop:w-[14%]' : 'desktop:w-[3%]'} bg-[#121212] border border-[#75a602] transition-all duration-300 ml-2 max-h-[97vh] h-[90%] rounded-xl`}>
                {!isOpen &&
                    <nav className={"relative transition-all duration-300 flex flex-col items-center"}>
                        <p>
                            <img onClick={() => {
                                NAVIGATE("/")
                            }} src={logo} alt={"logo"} className={'desktop:w-1/2 mx-auto my-5'}/>
                        </p>
                        <p>
                            <Tooltip content={"Pazienti"} placement={"right"}>
                                <TbLayoutDashboard onClick={() => {
                                    NAVIGATE("")
                                }}
                                                   className={'desktop:w-1/2 mx-auto h-20 text-gray-400 hover:text-[#579614] cursor-pointer'}/>
                            </Tooltip>
                        </p>
                        <p>
                            <Tooltip content={"Tabelle"} placement={"right"}>
                                <CiViewTable onClick={() => {
                                    NAVIGATE("tabelle-nutrizionali")
                                }}
                                             className={'desktop:w-1/2 mx-auto h-20 text-gray-400 hover:text-[#579614] cursor-pointer'}/>
                            </Tooltip>
                        </p>
                        <p>
                            <Tooltip content={"Home"} placement={"right"}>
                                <IoHomeOutline onClick={() => {
                                    NAVIGATE("/")
                                }}
                                               className={'desktop:w-1/2 mx-auto h-20 text-gray-400 hover:text-[#579614] cursor-pointer'}/>
                            </Tooltip>
                        </p>
                        <p>
                            <Tooltip content={"Apri"} placement={"right"}>
                                <MdArrowForwardIos onClick={() => {
                                    setToggle()
                                }}
                                                   className={'desktop:w-1/2 mx-auto h-20 text-gray-400 hover:text-[#579614] cursor-pointer'}/>
                            </Tooltip>
                        </p>
                        <Tooltip content={"LogOut"} placement={"right"}>
                            <BiLogOut onClick={() => {
                                logOut()
                            }}
                                      className={'desktop:w-1/2 mx-auto h-20 text-gray-400 hover:text-[#579614] cursor-pointer'}/>
                        </Tooltip>
                    </nav>}
                {isOpen && <nav>
                    <p className={"flex items-center justify-center my-2"}>
                        <img onClick={() => {
                            NAVIGATE("/")
                        }} src={logo} alt={"logo"} className={'desktop:w-1/12 ml-5 my-5'}/>
                        <h2 className={"mx-2 text-white text-[1.2rem] text-medium"}>HealthyNutritionLab</h2>
                        <MdArrowBackIos size={20} onClick={() => {
                            setToggle()
                        }} className={'flex-grow text-gray-400 hover:text-[#579614] cursor-pointer'}/>
                    </p>
                    <aside className={"nav-open"}>
                        <p onClick={() => {
                            NAVIGATE("pazienti")
                        }} className={"flex items-center gap-2 my-3"}>
                            <IoPeopleOutline className={'w-1/6 text-3xl text-gray-400 cursor-pointer'}/>
                            <h2 className={"side_open"}>Pazienti</h2>
                        </p>
                        <p onClick={() => {
                            NAVIGATE("tabelle-nutrizionali")
                        }} className={"flex items-center gap-2 my-3"}>
                            <CiViewTable className={'w-1/6 text-3xl text-gray-400 cursor-pointer'}/>
                            <h2 className={"side_open"}>Tabelle Nutrizionali</h2>
                        </p>
                        <p onClick={() => {
                            NAVIGATE("/")
                        }} className={"flex items-center gap-2 my-3"}>
                            <IoHomeOutline className={'w-1/6 text-3xl text-gray-400 cursor-pointer'}/>
                            <h2 className={"side_open"}>Home</h2>
                        </p>
                    </aside>

                </nav>}
            </div>*/}
            <div className="w-full h-full rounded-xl p-3 bg-[#161616] bg-opacity-[70%]">
                <nav>
                    <div className="flex items-center pb-5">
                        <svg className="w-10 h-10 me-3 text-gray-200 dark:text-gray-700" aria-hidden="true"
                             xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path
                                d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
                        </svg>
                        <span>
                            <h3 className="text-[12px]">Nome Cognome</h3>
                            <h3 className="text-[12px]">Ruolo</h3>
                        </span>
                    </div>
                    <hr/>
                    <aside className="py-2">
                        <span className="flex items-center">
                            <TbLayoutDashboard/>
                            <p className="px-2">Tabelle Nutrizionali</p>
                        </span>
                        <span className="flex items-center">
                            <PiArticleLight/>
                            <p className="px-2">Articoli</p>
                        </span>
                        <span className="flex items-center">
                            <IoHomeOutline/>
                            <p className="px-2">Home</p>
                        </span>

                    </aside>
                </nav>
            </div>
        </>
    );
}