import Nav from "./Nav.tsx";
import {Outlet} from "react-router-dom";
import {LoginPage} from "./login/LoginPage.tsx";
import {useSelector} from "react-redux";
import {RootStore} from "../redux/store";

/*import {Footer} from "./Footer.tsx";*/

function Layout() {
    const loginOpen = useSelector((state: RootStore) => state.loginModalState.isOpened)
    return (
        <>
            <Nav/>
            <main className = {"relative "}>
                <Outlet/>
                {loginOpen && <LoginPage/>}
            </main>
            {/*<hr className={"my-12 opacity-5"}/>
            <Footer/>*/}
        </>
    )
}

export default Layout;