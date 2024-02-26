import {AssigedDiet} from "./AssigedDiet.tsx";
import { GiChickenLeg } from "react-icons/gi";
import { GiMuscleUp } from "react-icons/gi";
import {TrainingPlan} from "./TrainingPlan.tsx";
export function YourDoc() {



    return (
        <>
            <div className=" max-h-[99%] bg-[#413F42] w-[40%] bg-opacity-35 rounded-xl p-2 overflow-y-auto flex flex-col justify-center">
                <AssigedDiet/>
                <div className="divider">
                    <GiChickenLeg size={50}/>
                    <GiMuscleUp size={50}/>
                </div>
                <TrainingPlan/>
            </div>
        </>
    );
}