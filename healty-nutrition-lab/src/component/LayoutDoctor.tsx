import Nav from "./Nav.tsx";
import {Outlet, Route, Routes} from "react-router-dom";
import {LoginPage} from "./login/LoginPage.tsx";


export function LayoutDoctor() {

    return (
        <>
            <Nav/>

            <main className={"relative max-h-[100vh]"}>
                <Outlet/>
                <LoginPage/>
            </main>
            {/*<hr className={"my-12 opacity-5"}/>
            <Footer/>*/}
        </>
    );
}