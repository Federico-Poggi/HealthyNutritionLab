import './App.css'

import {BrowserRouter, redirect, Route, Routes, useParams} from "react-router-dom";
import {PersonalArea} from "./component/personalArea/PersonalArea.tsx";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {loggedUserAction, notLoggedAction} from "./redux/action";
import {jwtDecode} from "jwt-decode";
import {LayoutDoctor} from "./component/LayoutDoctor.tsx";
import {TabelleNutrizionali} from "./component/doctor/TabelleNutrizionali.tsx";
import {PazientePage} from "./component/doctor/PazientePage.tsx";
import {AssigedDiet} from "./component/userDir/AssigedDiet.tsx";
import {DashboardDoc} from "./component/personalArea/DashboardDoc.tsx";
import {DashboardUser} from "./component/personalArea/DashboardUser.tsx";
import Home from "./component/home/Home.tsx";
import {RegisterForm} from "./component/Registration/RegisterForm.tsx";

import {ArticleWrapper} from "./component/articles/ArticleWrapper.tsx";
import {ArticleDetails} from "./component/articles/ArticleDetails.tsx";
import {WriteArticle} from "./component/articles/WriteArticle.tsx";


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
                role = ((decoded as JwtPayload)).Role
            }
        } catch (er) {
            console.log(er);
        }
    }
    const redirectTo = (roleUser: string) => {
        if (roleUser != "CUSTOMER") {
            redirect("/")
        }
    }
    const {idCustomer, id} = useParams<{ idCustomer: string,id:string }>();
    return (

        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<LayoutDoctor/>}>
                    <Route path="/" element={<Home/>}/>
                    <Route path="register" element={<RegisterForm/>}/>
                    <Route path="articles" element={<ArticleWrapper/>}>
                        </Route>
                    <Route path={`articles/:id`} element={<ArticleDetails/>}/>
                </Route>
                <Route path={"personalArea"} element={<PersonalArea/>}>
                    {role === "CUSTOMER" && <Route path={""} element={<DashboardUser/>}/>}
                    {(role === "PERSONAL_TRAINER" || role === "NUTRITIONIST") &&
                        <Route path={"*"} index element={<DashboardDoc/>}/>}
                    <Route path={"tabelle-nutrizionali"} element={<TabelleNutrizionali/>}/>
                    <Route path={`pazienti/:idCustomer`} element={<PazientePage/>}/>
                    <Route path={"diete"} element={<AssigedDiet/>}/>
                    <Route path="write" element={<WriteArticle/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App
