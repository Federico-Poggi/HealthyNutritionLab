import {Patient} from "./Patient.tsx";
import {Calendar} from "./Calendar.tsx";

export const MainDocPage = () => {
    return (
        <>
            <div className={"flex w-[90%]"}>
            <Patient/>
            <div className="flex grow px-2">
                <Calendar/>
            </div>
            </div>
        </>
    );
};