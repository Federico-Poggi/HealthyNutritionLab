import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {LayoutDoctor} from "./component/LayoutDoctor.tsx";
import Home from "./component/home/Home.tsx";

import {RegisterForm} from "./component/Registration/RegisterForm.tsx";
import {PersonalArea} from "./component/personalArea/PersonalArea.tsx";
import {DashboardUser} from "./component/personalArea/DashboardUser.tsx";
import {DashboardDoc} from "./component/personalArea/DashboardDoc.tsx";
import {PazientePage} from "./component/doctor/PazientePage.tsx";
import {TabelleNutrizionali} from "./component/doctor/TabelleNutrizionali.tsx";
import {AssigedDiet} from "./component/userDir/AssigedDiet.tsx";

interface StateThis{
    role:string
    idCustomer:string
}


export const AppRoutes = ({role, idCustomer}:StateThis) => {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<LayoutDoctor/>}>
                        <Route path="/"element={<Home/>}/>
                        {/*<Route path={"articles"} element={<Articles/>}/>*/}
                        <Route path={"register"} element={<RegisterForm/>}/>
                    </Route>
                    <Route path={"personalArea"} element={<PersonalArea/>}>
                        {role === "CUSTOMER" ? (<Route path={""} element={<DashboardUser/>}/>) : (
                            <Route path={" "}  element={<DashboardDoc/>}>
                                <Route path="pazienti/:idCustomer" element={<PazientePage/>}/>

                            </Route>)
                        }
                        <Route path={"tabelle-nutrizionali"} element={<TabelleNutrizionali/>}/>
                        <Route path={`pazienti/${idCustomer}`} element={<PazientePage/>}/>
                        <Route path={"diete"} element={<AssigedDiet/>}/>
                    </Route>
                </Routes>
            </Router>
        </>
    );
};