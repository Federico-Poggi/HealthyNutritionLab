import './App.css'

import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./component/home/Home.tsx";
import {Articles} from "./component/articles/Articles.tsx";
import {RegisterForm} from "./component/Registration/RegisterForm.tsx";
import {PersonalArea} from "./component/personalArea/PersonalArea.tsx";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {loggedUserAction, notLoggedAction} from "./redux/action";
import {jwtDecode} from "jwt-decode";
import {LayoutDoctor} from "./component/LayoutDoctor.tsx";
import {TabelleNutrizionali} from "./component/doctor/TabelleNutrizionali.tsx";
import {Patient} from "./component/doctor/Patient.tsx";
import {PazientePage} from "./component/doctor/PazientePage.tsx";


interface TokenString {
    token: string | null
}

interface JwtPayload {
    exp: number,
    jti: string,
    iat: number,
    Role: string,
    sub: number
}

interface Userstate {
    logged: boolean
    role: string
}

function App() {


    const tokenFrom: string | null = localStorage.getItem('token');
    const body: TokenString = {
        token: tokenFrom,
    }
    let role: string = useSelector((state: Userstate): string | any => {
        state.role
    })
    const dispatch = useDispatch();
    const APIUrl = "http://localhost:5174/auth/verifyToken";
    useEffect(() => {
        verifyValidLogin()
        if (tokenFrom != null) {
            decodeTokent(tokenFrom)
        }
        /*console.log(role)*/
    }, [])

    const verifyValidLogin = () => {
        fetch(APIUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
            .then((response: Response) => {
                /*console.log(JSON.stringify(body))*/
                if (response.status === 200) {
                    dispatch(loggedUserAction(role))
                } else {
                    dispatch(notLoggedAction())
                    throw new Error("Rieffettua il login")
                }
            })
            .catch((er: Error) => {
                console.error(Error + er.message)
            })
    }
    const decodeTokent = (token: string) => {
        try {
            if (token != null) {
                const decoded: JwtPayload = jwtDecode(token);
                /*console.log(decoded);
                console.log(((decoded as JwtPayload)).Role)*/
                role = ((decoded as JwtPayload)).Role
            }
        } catch (er) {
            console.log(er);
        }
    }


    return (
        <BrowserRouter>
            <Routes>
                <Route path = {"/"} element = {<LayoutDoctor/>}>
                    <Route path = {"/"} index element = {<Home/>}/>
                    <Route path = {"articles"} element = {<Articles/>}/>
                    <Route path = {"register"} element = {<RegisterForm/>}/>
                    <Route path = {"personalArea"} element = {<PersonalArea/>}>
                        <Route path = {"tabelle-nutrizionali"} element = {<TabelleNutrizionali/>}/>
                        <Route path = {"pazienti"} element = {<Patient/>}/>
                        <Route path = {`pazienti/:idCustomer`} element = {<PazientePage/>}/>
                    </Route>

                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App
