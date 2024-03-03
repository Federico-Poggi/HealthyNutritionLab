import {DashboardUser} from "./DashboardUser.tsx";
import {useSelector} from "react-redux";
import {RootStore} from "../../redux/store";
import {DashboardDoc} from "./DashboardDoc.tsx";
import {useParams, useRoutes} from "react-router-dom";



export function PersonalArea() {
    const role = useSelector((state: RootStore) => state.user.role)
    const {idCustomer} = useParams()
    const routesDoc = useRoutes([
        {path: '*', element: <DashboardDoc/>}
    ])


    return (
        <>
            <main id="main-personal"
                  className={"max-w-[100vw] h-[100vh] flex flex-grow bg-gradient-to-r from-[#4b752a] from-0% via-[#393939] via-20% to-[#383c40] to-90%"}>
                {role === "CUSTOMER" && <DashboardUser/>}
                {role === "NUTRITIONIST" && routesDoc}
            </main>
        </>
    );
}