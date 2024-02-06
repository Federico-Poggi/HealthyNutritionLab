import Nav from "./Nav.tsx";
import {Outlet} from "react-router-dom";

function Layout() {
    return (
        <>

                <Nav/>

            <main className = {"h-[100%]"}>
                <Outlet/>
            </main>
        </>
    )
}

export default Layout;