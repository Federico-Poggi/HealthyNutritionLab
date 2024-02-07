import Nav from "./Nav.tsx";
import {Outlet} from "react-router-dom";
import {Footer} from "./Footer.tsx";

function Layout() {
    return (
        <>
            <Nav/>

            <main className = {"h-[100%]"}>
                <Outlet/>
            </main>
            <hr className={"my-12 opacity-5"}/>
            <Footer/>
        </>
    )
}

export default Layout;