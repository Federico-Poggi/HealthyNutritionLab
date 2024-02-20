import logo from "../../assets/Logo.svg";
import {Tooltip} from "flowbite-react";
import {IoHomeOutline} from "react-icons/io5";
import {BiLogOut} from "react-icons/bi";
import {useNavigate} from "react-router-dom";
import {notLoggedAction} from "../../redux/action";
import {useDispatch} from "react-redux";

export function SideBarUser() {
    const NAVIGATE = useNavigate();
    const DISPATCH = useDispatch();
    const logOut = () => {
        localStorage.removeItem('token')
        localStorage.removeItem("Role")
        DISPATCH(notLoggedAction())
        NAVIGATE("/")
    }
    return (
        <>
            <div className={`desktop:w-[10vw] side-bar bg-[#121212] border border-[#75a602] absolute right-10 transition-all duration-800 my-3 ml-2 rounded-xl`}>
                <nav className={"relative transition-all duration-300 items-center flex justify-evenly p-2"}>
                    <p>
                        <img onClick={() => {
                            NAVIGATE("/")
                        }}
                             src={logo}
                             alt={"logo"}
                             className={'desktop:w-[25px] mx-auto '}
                        />
                    </p>
                    <p>
                        <Tooltip content={"Home"}
                                 placement={"bottom"}
                        >
                            <IoHomeOutline onClick={() => {
                                NAVIGATE("/")
                            }}
                                           className={'mx-auto h-full desktop:w-[25px] text-gray-400 hover:text-[#579614] cursor-pointer'}
                            />
                        </Tooltip>
                    </p>

                    <Tooltip content={"LogOut"}
                             placement={"bottom"}
                    >
                        <BiLogOut onClick={() => {
                            logOut()
                        }}
                                  className={'mx-auto h-full desktop:w-[25px] text-gray-400 hover:text-[#579614] cursor-pointer'}
                        />
                    </Tooltip>
                </nav>
            </div>
        </>
    );
}