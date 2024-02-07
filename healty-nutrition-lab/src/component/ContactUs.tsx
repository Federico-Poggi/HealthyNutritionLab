import { FaUserDoctor } from "react-icons/fa6";
import { GiLifeBar } from "react-icons/gi";
export function ContactUs() {
    return (
        <>
            <div className = {"desktop:w-1/2 bg-[#1F1F1F] desktop:h-full flex flex-col items-center mx-auto rounded-[20px]"}>
                <div className = {"text-center"}>
                    <h2 id = {"contact-space"} className = {"desktop:text-[30px] pt-10"}>Contact us for a first
                                                                                         consultancy</h2>
                    <p className = {"contact-us desktop:text-[15px]"}>Start your journey with HealthyNutritionLab
                                                                      now</p>
                </div>
                <div className={"flex my-10"}>
                    <div className={"flex flex-col items-center mx-10"}>
                        <FaUserDoctor className={""}/>
                        <p className={"contact-p"}>Certificated Doctor</p>
                    </div>
                    <div className={"flex flex-col items-center mx-10"}>
                        <GiLifeBar className={""}/>
                        <p className={"contact-p"}>Better LifeTime</p>
                    </div>
                </div>
            </div>
        </>
    );
}