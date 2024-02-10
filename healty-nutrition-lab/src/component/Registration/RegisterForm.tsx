import {useState} from "react";
import {Simulate} from "react-dom/test-utils";


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

    const changeRegister = (event: React.ChangeEvent<HTMLInputElement>, name: keyof Register) => {
        const value = event.target.value;
        setRegisterForm((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }

    async function registerFetch(): Promise<undefined> {
        try {
            const response: Response = await fetch(APIUrl,
                {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(registerForm)
                });
            if (!response.ok) {
                throw response;
            } else {
                console.log(await response.json())
                setLogin({
                    email:registerForm.mail,
                    password:registerForm.password
                })
                await loginAfterRegister();
            }
        } catch (err) {
            console.log(await (err as Response).json());
        }

    }

    async function loginAfterRegister(): Promise<undefined> {
        try {
            const response: Response = await fetch(APIUrlLogin, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify(login)
            });
            if(!response.ok){
                throw response;
            }else{
                console.log(await response.json())
            }

        } catch (err) {
            console.log(await (err as Response).json())
        }
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
                        registerFetch()
                    }} type = {"submit"}>Register
                    </button>
                </form>
            </div>
        </>
    );
}