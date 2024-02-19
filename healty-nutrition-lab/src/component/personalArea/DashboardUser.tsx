import {AssigedDiet} from "../userDir/AssigedDiet.tsx";
import {TrainingPlan} from "../userDir/TrainingPlan.tsx";

export function DashboardUser() {
    return (
        <>
            <div className={"h-[98vh] flex flex-col"}>
                <AssigedDiet/>
                <TrainingPlan/>
            </div>
        </>
    );
}