import './App.css'

import { Route, Routes } from "react-router-dom";
import Layout from "./component/Layout.tsx";
import Home from "./component/home/Home.tsx";
import { Articles } from "./component/articles/Articles.tsx";
import {RegisterForm} from "./component/Registration/RegisterForm.tsx";
import {PersonalArea} from "./component/personalArea/PersonalArea.tsx";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {loggedUserAction, notLoggedAction} from "./redux/action";


interface TokenString{
    token: string|null
}

function App() {


    const tokenFrom=localStorage.getItem('token');
    const body:TokenString={
        token: tokenFrom,
    }
    const dispatch=useDispatch();
    const APIUrl = "http://localhost:5174/auth/verifyToken";
    useEffect(()=>{
        verifyValidLogin()
    },[])

    const verifyValidLogin=()=>{
        fetch(APIUrl,{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(body)
        })
            .then((response:Response)=>{
                console.log(JSON.stringify(body))
                if(response.status===200){
                    console.log(response.status)
                    console.log("valid Token")
                    dispatch(loggedUserAction())
                }else{
                    dispatch(notLoggedAction())
                    throw new Error("Rieffettua il login")
                }
            })
            .catch((er:Error)=>{
                console.log(er)
            })
    }

    return (
        <>
            <Routes>
                <Route path={"/"} element={<Layout />}>
                    <Route path={"/"} index element={<Home />} />
                    <Route path={"/articles"} element={<Articles/>} />
                    <Route path={"/register"} element={<RegisterForm/>}/>
                    <Route path={"/personalArea"} element={<PersonalArea/>}/>
                </Route>
            </Routes>
        </>
    )
}

export default App
