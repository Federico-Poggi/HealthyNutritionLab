import './App.css'

import {Route, Routes} from "react-router-dom";
import Layout from "./component/Layout.tsx";
import Home from "./component/home/Home.tsx";
import {Articles} from "./component/articles/Articles.tsx";
import {RegisterForm} from "./component/Registration/RegisterForm.tsx";
import {PersonalArea} from "./component/personalArea/PersonalArea.tsx";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {loggedUserAction, notLoggedAction} from "./redux/action";
import {jwtDecode} from "jwt-decode";
import {LayoutDoctor} from "./component/LayoutDoctor.tsx";


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
                console.log(JSON.stringify(body))
                if (response.status === 200) {
                    console.log(response.status)
                    console.log("valid Token")
                    dispatch(loggedUserAction())
                } else {
                    dispatch(notLoggedAction())
                    throw new Error("Rieffettua il login")
                }
            })
            .catch((er: Error) => {
                console.log(er)
            })
    }
    const decodeTokent = (token: string) => {
        try {
            if (token != null) {
                const decoded: JwtPayload = jwtDecode(token);
                console.log(decoded);
                console.log(((decoded as JwtPayload)).Role)
                role = ((decoded as JwtPayload)).Role
            }
        } catch (er) {
            console.log(er);
        }
    }
    return (
        <>
            {
                role === 'USER' ? <Routes>
                        <Route path = {"/"} element = {<Layout/>}>
                            <Route path = {"/"} index element = {<Home/>}/>
                            <Route path = {"/articles"} element = {<Articles/>}/>
                            <Route path = {"/register"} element = {<RegisterForm/>}/>
                            <Route path = {"/personalArea"} element = {<PersonalArea/>}/>
                        </Route>
                    </Routes> :
                    role === "NUTRITIONIST" ? <Routes>
                        <Route path = {"/"} element = {<LayoutDoctor/>}>
                            <Route path = {"/"} index element = {<Home/>}/>
                            <Route path = {"/articles"} element = {<Articles/>}/>
                            <Route path = {"/register"} element = {<RegisterForm/>}/>
                            <Route path = {"/personalArea"} element = {<PersonalArea/>}/>
                        </Route>
                    </Routes> : role === "PERSONAL_TRAINER" ? <Routes>
                        <Route path = {"/"} element = {<LayoutDoctor/>}>
                            <Route path = {"/"} index element = {<Home/>}/>
                            <Route path = {"/articles"} element = {<Articles/>}/>
                            <Route path = {"/register"} element = {<RegisterForm/>}/>
                            <Route path = {"/personalArea"} element = {<PersonalArea/>}/>
                        </Route>
                    </Routes> : <Routes>
                        <Route path = {"/"} element = {<LayoutDoctor/>}>
                            <Route path = {"/"} index element = {<Home/>}/>
                            <Route path = {"/articles"} element = {<Articles/>}/>
                            <Route path = {"/register"} element = {<RegisterForm/>}/>
                            <Route path = {"/personalArea"} element = {<PersonalArea/>}/>
                        </Route>
                    </Routes>
            }


        </>
    )
}

export default App
