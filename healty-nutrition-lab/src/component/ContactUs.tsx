import { FaUserDoctor } from "react-icons/fa6";
import { GiLifeBar } from "react-icons/gi";
export function ContactUs() {
    return (
        <>
            <div className = {"desktop:w-1/2 bg-[#1F1F1F] desktop:h-full tablet:h-[250px] phone:w-[300px] phone:h-[400px] flex flex-col items-center mx-auto rounded-[20px] phone:mt-10"}>
                <div className = {"text-center"}>
                    <h2 id = {"contact-space"} className = {"desktop:text-[30px] pt-10"}>Contact us for a first
                                                                                         consultancy</h2>
                    <p className = {"contact-us desktop:text-[15px] phone:text-[13px]"}>Start your journey with HealthyNutritionLab
                                                                      now</p>
                </div>
                <div className = {"flex desktop:my-10 tablet:my-7 phone:h-1/2 items-center"}>
                    <div className = {"flex flex-col items-center mx-10"}>
                        <FaUserDoctor size = {25} className = {"icon-section"}/>
                        <p className = {"contact-p desktop:text-[12px] tablet:text-[11px] phone:text-[12px] phone:text-center"}>Certificated Doctor</p>
                    </div>
                    <div className = {"flex flex-col items-center mx-10"}>
                        <GiLifeBar size = {25} className = {"icon-section"}/>
                        <p className = {"contact-p desktop:text-[12px] tablet:text-[11px] phone:text-[12px] phone:text-center"}>Better Lifestyle</p>
                    </div>

                </div>
                <div>
                    <button className={"btn-home mx-10 px-5 py-2 desktop:w-[200px] tablet:text-[10px] tablet:w-[150px] phone:w-[150px] phone:mt-2  phone:text-[12px]"}>Contact Us</button>
                </div>
            </div>
        </>
    );
}