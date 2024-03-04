import {useState} from "react";
import {useDispatch} from "react-redux";
import {loggedUserAction} from "../../redux/action";
import {useNavigate} from "react-router-dom";

interface Register {
    name: string
    surname: string
    cellNumber: string
    mail: string
    password: string
}

interface Login {
    email: string
    password: string
}

interface DataLoginResponse {
    token: string
    role:string
}

export function RegisterForm() {
    const APIUrl = "http://localhost:5174/auth/register";
    const APIUrlLogin = "http://localhost:5174/auth/login";
    const [registerForm, setRegisterForm] = useState<Register>({
        name: "",
        surname: "",
        cellNumber: "",
        mail: "",
        password: ""
    })
    const [login, setLogin] = useState<Login>({
        email: "",
        password: ""
    })

    const DISPATCH=useDispatch();
    const NAV=useNavigate();
    const changeRegister = (event: React.ChangeEvent<HTMLInputElement>, name: keyof Register) => {
        const value = event.target.value;
        setRegisterForm((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }
    const registerFunction = () => {
        fetch(APIUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(registerForm)
        })
            .then((res:Response)=>{
                if(res.ok){
                    return res.json();
                }
            })
            .then((data)=>{
                console.log(data)
                setLogin({
                    email: registerForm.mail,
                    password: registerForm.password
                })
                loginFunctin();
            })
            .catch((Err:Error)=>{
                console.log(Err);
            })
    }

    const loginFunctin = () => {
        const loginState={
            email:registerForm.mail,
            password:registerForm.password
        }
        fetch(APIUrlLogin, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginState)
        })
            .then((response: Response) => {
                if (response.ok) {
                    return response.json();
                }
            })
            .then((data: DataLoginResponse) => {
                localStorage.setItem("token", data.token);
                localStorage.setItem("Role", data.role);
                DISPATCH(loggedUserAction(data.role));
                NAV("/personalArea")
            })
            .catch((error: Error) => {
                console.log(error);
            })
    }


    return (
        <>
            <div id = {"registration-form"} className = {"desktop:w-1/2 mx-auto h-[800px] flex"}>
                <form
                    className = {"mx-auto flex flex-col items-center justify-center"}>
                    <h2 className = {"desktop:text-[40px] text-[#FFFF]"}>
                        Register
                    </h2>
                    <div className = {"flex flex-col"}>
                        <input placeholder = {"name"}
                               className = {"text-[#C9F31DDD] desktop:w-[250px] desktop:py-1 desktop:my-5 px-1 outline-0 bg-[transparent] border-b font-normal"}
                               name = {"name"}
                               required = {true}
                               onChange = {(e) => {
                                   changeRegister(e, 'name');
                               }}/>
                        <input placeholder = {"surname"}
                               className = {"text-[#C9F31DDD] desktop:w-[250px] desktop:py-1 desktop:my-5 px-1 outline-0 bg-[transparent] border-b font-normal"}
                               name = {"surname"}
                               required = {true}
                               onChange = {(e) => {
                                   changeRegister(e, 'surname');
                               }}/>
                        <input placeholder = {"cellNumber"}
                               className = {"text-[#C9F31DDD] desktop:w-[250px] desktop:py-1 desktop:my-5 px-1 outline-0 bg-[transparent] border-b font-normal"}
                               required = {true}
                               name = {"cellNumber"}
                               onChange = {(e) => {
                                   changeRegister(e, 'cellNumber');
                               }}/>
                        <input placeholder = {"email"}
                               className = {"text-[#C9F31DDD] desktop:w-[250px] desktop:py-1 desktop:my-5 px-1 outline-0 bg-[transparent] border-b font-normal"}
                               required = {true}
                               name = {"mail"}
                               onChange = {(e) => {
                                   changeRegister(e, 'mail');
                               }}/>
                        <input placeholder = {"repeat email"}
                               className = {"text-[#C9F31DDD] desktop:w-[250px] desktop:py-1 desktop:my-5 px-1 outline-0 bg-[transparent] border-b font-normal"}
                        />
                        <input placeholder = {"password"}
                               required = {true}
                               className = {"text-[#C9F31DDD] desktop:w-[250px] desktop:py-1 desktop:my-5 px-1 outline-0 bg-[transparent] border-b font-normal"}
                               name = {"password"}
                               onChange = {(e) => {
                                   changeRegister(e, 'password');
                               }}/>
                    </div>
                    <div className = {"flex flex-col desktop:w-[250px] items-start"}>
                    <span className = {"flex"}>
                        <input required = {true} placeholder = {"repeat password"} type = {"checkbox"}/>
                        <p className = {"text-[#FFFF] desktop:text-[12px] font-normal desktop:ml-2"}>Accetta i termini e condizioni</p>
                    </span>
                        <span className = {"flex"}>
                        <input placeholder = {"repeat password"} type = {"checkbox"}/>
                        <p className = {"text-[#FFFF] desktop:text-[12px] font-normal desktop:ml-2"}>Aggiungimi alla mailing list</p>
                    </span>
                    </div>
                    <button onClick = {(e) => {
                        e.preventDefault();
                        registerFunction()
                    }} type = {"submit"}>Register
                    </button>
                </form>
            </div>
        </>
    );
}