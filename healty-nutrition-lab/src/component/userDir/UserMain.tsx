import {YourDoc} from "./YourDoc.tsx";
import {Calendar} from "../doctor/Calendar.tsx";
import {CardDoc} from "./CardDoc.tsx";

export function UserMain() {
    return (
        <>
            <div className={"flex w-[100%]"}>
                <YourDoc/>
                <div className="flex flex-col grow px-2 justify-start">
                    <Calendar/>
                    <div className="h-1/3">
                    <CardDoc/>
                    </div>
                </div>
            </div>
        </>
    );
}