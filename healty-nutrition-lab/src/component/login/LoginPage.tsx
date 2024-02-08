//Login Page nel momento del login ricavarsi il ruolo
import Logo from '../../assets/Logo.svg'
import imgLogin from '../../assets/loinimg.jpg'
import { RxCross2 } from "react-icons/rx";

interface LoginProps {
    isOpen: boolean
    setIsOpen:(isOpen:boolean)=>void
}
export function LoginPage({isOpen,setIsOpen}: LoginProps) {
    /*const [isOpen, setIsOpen] = useState(false);*/
    // const isOpen = useSelector((state: RootState) => state.loginModalState.isOpen)
    /*console.log(isOpen);*/
    return (
        <>
            {isOpen &&

                <div className={"fixed z-30 inset-0 flex items-center justify-center bg-black bg-opacity-50"}>

                    <div className={"relative border border-green-400 flex items-center justify-between desktop:w-[700px] desktop:h-[300px] tablet: phone:  bg-[#333232]"}>

                        <div id={"login-brand"} className={"h-full justify-end]"}>
                            <img src={imgLogin} alt={"login"} className={"desktop:h-full desktop:w-[300px]"} />
                        </div>
                        <div className={"desktop:w-[350px] flex flex-col mx-10"}>
                            <RxCross2 className={"absolute right-5 top-2 cursor-pointer"} onClick={()=>setIsOpen(false)} />
                            <div className={"flex items-center w-[320px] mx-auto justify-center absolute top-5"}>
                                <img src={Logo} alt={"logo"} className={"flex desktop:w-[30px] z-30 mr-3"} />
                                <h2 id={"name-brand"} className={"desktop:text-[15px]"}>HealthyNutritionLab</h2>
                            </div>
                            <span className="input-container desktop:w-[300px] mx-auto flex flex-col mt-10 relative ">
                                <label className="label-form ">Email</label>
                                <input
                                    name="username"
                                    className=" input-form"
                                    type="text" />
                            </span>
                            <span className="input-container desktop:w-[300px] mx-auto flex flex-col mt-10 relative">
                                <label className="label-form ">Password</label>
                                <input
                                    name="password"
                                    className="input-form font-bold"
                                    type="password" />
                            </span>
                            <button className={"btn-home mx-auto mt-10 px-5 py-1 desktop:w-[150px] tablet:w-[220px] phone:w-[200px] phone:mt-2 phone:text-[12px] desktop:text-[15px]"}>Login</button>
                        </div>

                    </div>
                </div>}
        </>
    );
}