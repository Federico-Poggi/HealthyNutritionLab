//Login Page nel momento del login ricavarsi il ruolo
import Logo from '../../assets/Logo.svg'
import imgLogin from '../../assets/loinimg.jpg'
import { RxCross2 } from "react-icons/rx";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from 'react-redux';
import {closeAction, loggedUserAction} from "../../redux/action";
import {NavigateFunction, useNavigate} from "react-router-dom";

interface StateLogin{
    loginModalState:{
        isOpened:boolean
    }
}
interface Login {
    email: string
    password: string
}
interface DataLoginResponse {
    token: string
    role:string
}
export function LoginPage() {
    const APIUrlLogin = "http://localhost:5174/auth/login";
    const dispatch=useDispatch();
    const opened = useSelector((state: StateLogin) => state.loginModalState.isOpened)
    const [login, setLogin] = useState<Login>({
        email: "",
        password: ""
    })
    const navigate:NavigateFunction=useNavigate();
    useEffect(() => {

        //Funzione per rendere lo scroll del body di sfondo non scrollabile
        if (opened) {
            document.body.classList.add('modal-open');
        } else {
            document.body.classList.remove('modal-open');
        }

        return () => {
            document.body.classList.remove('modal-open');
        };
    }, [opened])

    const changeRegister = (event: React.ChangeEvent<HTMLInputElement>, name: keyof Login) => {
        const value = event.target.value;
        setLogin((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }

    const loginFunctin = () => {
        fetch(APIUrlLogin, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(login)
        })
            .then((response: Response) => {
                if (response.ok) {
                    return response.json();
                }
            })
            .then((data: DataLoginResponse) => {
                localStorage.setItem("token", data.token);
                localStorage.setItem("Role", data.role)
                navigate("/personalArea")
                dispatch(closeAction())
                dispatch(loggedUserAction(data.role))
            })
            .catch((error: Error) => {
                console.log(error);
            })
    }

    return (
        <>
            {opened &&
                <div className={"fixed z-30 inset-0  flex items-center justify-center bg-black bg-opacity-50"}>
                    <div className={"modal phone:flex phone:flex-col relative border border-green-400 flex items-center phone:justify-start  justify-between desktop:w-[700px] desktop:h-[300px] tablet:w-[600px] tablet:h-[400px] phone:w-[350px] phone:h-[500px] bg-[#333232]"}>
                        <div id={"login-brand"} className={"h-full phone:h-[200px] phone:w-full justify-end"}>
                            <img src={imgLogin}
                                alt={"login"}
                                className={"desktop:h-full desktop:w-[300px] phone:w-full tablet:h-full phone:h-full phone:"} />
                        </div>
                        <div className={"desktop:w-[350px] flex flex-col mx-10"}>
                            <RxCross2 className={"absolute right-5 top-2 cursor-pointer"}
                                onClick={() => dispatch(closeAction())} />
                            <div className={"flex items-center desktop:w-[320px] tablet:w-[320px] mx-auto desktop:justify-center tablet:justify-center absolute top-5 phone:top-52 tablet:left-72"}>
                                <img src={Logo}
                                    alt={"logo"}
                                    className={"flex desktop:w-[30px] tablet:w-[18px] phone:w-[18px] z-30 mr-3"} />
                                <h2 id={"name-brand"} className={"desktop:text-[15px]"}>HealthyNutritionLab</h2>
                            </div>
                            <span className="input-container desktop:w-[300px] mx-auto flex flex-col mt-10 phone:mt-16 relative ">
                                <label className="label-form ">Email</label>
                                <input
                                    name="email"
                                    className=" input-form"
                                    type="text"
                                    onChange = {(e) => {
                                        changeRegister(e, 'email');
                                    }}/>
                            </span>
                            <span className="input-container desktop:w-[300px] mx-auto flex flex-col mt-10 phone:mt-5 tablet:mt-6 relative">
                                <label className="label-form ">Password</label>
                                <input
                                    name="password"
                                    className="input-form font-bold"
                                    type="password"
                                    onChange = {(e) => {
                                        changeRegister(e, 'password');
                                    }}/>
                            </span>
                            <button
                                onClick={loginFunctin}
                                className={"btn-home mx-auto mt-10 px-5 py-1 desktop:w-[150px] tablet:w-[220px] phone:w-[200px] phone:mt-14 phone:py-3 phone:text-[12px] desktop:text-[15px]"}>Login</button>
                        </div>

                    </div>
                </div>}
        </>
    );
}