import {Patient} from "../doctor/Patient.tsx";
import {Outlet, Route, Routes, useRoutes} from "react-router-dom";

export function DashboardDoc() {
    return (
        <>
            <div className={"w-1/2"}>
                <Patient/>
            </div>


        </>
    );
}