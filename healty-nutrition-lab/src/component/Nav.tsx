import Logo from '../assets/Logo.svg'
import {useNavigate} from "react-router-dom";

import {useDispatch} from "react-redux";
import {openAction} from "../redux/action";

function Nav() {

    const navigate=useNavigate();
    /*const isOpen=useSelector((state:RootState)=>{return state.loginModalState.isOpen})*/
    const dispatch=useDispatch();

    return (
        <>
            <nav id={"navbar"} className={"bg-[#121212ff] flex text-white py-5"}>
                <div id={"navbar-brand"}
                    className={"flex desktop:w-2/12 tablet:w-3/12 items-center desktop:text-[30px] tablet:text-[20px] px-4"}>
                    <img src={Logo} className={"brand-img mr-2 desktop:w-[30px] tablet:w-[20px] phone:w-[17px]"}  alt={"logo"}/>
                    <h2>HealthyNutritionLab</h2>
                </div>
                <div id={"navigation-option"}
                    className={"phone:hidden desktop:w-8/12 desktop:flex tablet:flex tablet:w-6/12 tablet:text-[16px] items-center justify-center font-medium"}>
                    <p
                        onClick={()=>navigate("/")}
                    >Home</p>
                    <p
                    onClick={()=>navigate("/articles")}
                    >Articles</p>
                    <p>Contact</p>
                </div>
                <div id={"registration-login"}
                    className={"desktop:2/12 tablet:w-3/12 phone:hidden tablet:flex desktop:flex justify-center items-center"}>
                    <span className={"flex items-center"}>
                        <button className={"mx-4"} onClick={()=>{
                            navigate("/register")
                        }}>Register</button>
                        <button className={"mx-4"} onClick={()=>dispatch(openAction())}>Login</button>
                    </span>
                </div>
                <div className={"desktop:hidden tablet:hidden phone:flex"}>
                    <span>
                        <p className={"text-black"}>Ciao</p>
                    </span>
                </div>
            </nav>
        </>
    )
}

export default Nav