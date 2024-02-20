import Nav from "./Nav.tsx";
import {Outlet, Route, Routes} from "react-router-dom";
import {LoginPage} from "./login/LoginPage.tsx";
import Home from "./home/Home.tsx";
import {Articles} from "./articles/Articles.tsx";
import {RegisterForm} from "./Registration/RegisterForm.tsx";

export function LayoutDoctor() {
    return (
        <>
            <Nav/>

            <main className={"relative"}>
                <Outlet/>
                <Routes>
                    <Route path={"/"} index element={<Home/>}/>
                    <Route path={"articles"} element={<Articles/>}/>
                    <Route path={"register"} element={<RegisterForm/>}/>
                </Routes>
                <LoginPage/>
            </main>
            {/*<hr className={"my-12 opacity-5"}/>
            <Footer/>*/}
        </>
    );
}