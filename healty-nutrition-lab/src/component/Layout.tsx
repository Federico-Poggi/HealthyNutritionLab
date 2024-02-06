import Nav from "./Nav.tsx";
import {Outlet} from "react-router-dom";

function Layout() {
    return (
        <>
            <Nav/>
            <main>
                <Outlet/>
            </main>
        </>
    )
}

export default Layout;