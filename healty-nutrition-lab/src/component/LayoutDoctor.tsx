import Nav from "./Nav.tsx";
import {Outlet, Route, Routes} from "react-router-dom";
import {LoginPage} from "./login/LoginPage.tsx";
import {Footer} from "./Footer.tsx";


export function LayoutDoctor() {

    return (
        <>
            <Nav/>

            <main className={"relative max-h-[100vh]"}>
                <Outlet/>
                <LoginPage/>
                <Footer/>
            </main>
            {/*<hr className={"my-12 opacity-5"}/>
            <Footer/>*/}

        </>
    );
}