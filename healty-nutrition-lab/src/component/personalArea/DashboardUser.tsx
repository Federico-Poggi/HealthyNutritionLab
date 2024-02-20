import {AssigedDiet} from "../userDir/AssigedDiet.tsx";
import {TrainingPlan} from "../userDir/TrainingPlan.tsx";
import {MdOutlineRestaurantMenu} from "react-icons/md"

export function DashboardUser() {
    return (
        <>
            <div className={"h-[98vh] flex flex-col"}>
                <div className="h-1/2">
                    <span className="flex items-center justify-center">
                        <MdOutlineRestaurantMenu/>
                        <h3 className="font-medium px-2">Le tue diete</h3>
                    </span>
                    <AssigedDiet/>
                </div>
                <div>
                    <TrainingPlan/>
                </div>
            </div>
        </>
    );
}