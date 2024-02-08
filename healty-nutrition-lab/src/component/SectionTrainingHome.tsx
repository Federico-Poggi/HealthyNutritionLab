import {TiTick} from "react-icons/ti";
import {HiArrowNarrowRight} from "react-icons/hi";
import sportImg from "../assets/Sport.png";

export function SectionTrainingHome() {
    return (
        <div className = {"desktop:flex justify-center desktop:mt-32 tablet:mt-32 phone:mt-16 gap-4"}>
            <div id = {"img-container-home"}
                 className = {"desktop:w-[500px] desktop:h-[400px] tablet:w-[400px] tablet:mx-auto tablet:h-[300px] phone:w-[300px] phone:h-[250px] phone:mx-auto bg-[#1F1F1F] flex justify-center items-center"}>
                <img id = {"img-sport"} src = {sportImg} alt = {"sportImg"} className = {"desktop:w-[300px] desktop:h-[250px] tablet:w-[220px] tablet:h-[200px] phone:w-[200px] phone:h-[170px]"}/>
            </div>
            <div className = {"tablet:mt-5 desktop:w-[500px] desktop:relative tablet:flex tablet:flex-col tablet:w-[500px] tablet:mx-auto phone:w-[350px] phone:mt-3 phone:mx-auto px-10"}>
                <div id = {"offers-section-home"} className={"tablet:pl-5"}>
                    <h2 className = {"desktop:text-[30px] tablet: phone:text-[15px]"}>Personalized Diet</h2>
                    <p className = {"desktop:text-[15px] phone:text-[13px] tablet: phone:"}>We offer personalized diets tailored to your
                                                                          needs.</p>
                </div>
                <ul className={"tablet:pl-5 phone:text-[13px]"}>
                    <li className = {"list-offers flex items-center desktop:text-[15px] phone:leading-6"}><TiTick color = {"gray"}/>Celiacs'
                                                                                                                    diet
                    </li>
                    <li className = {"list-offers flex items-center desktop:text-[15px] phone:leading-6"}>
                        <TiTick color = {"gray"}/> Athletes' diets
                    </li>
                    <li className = {"list-offers flex items-center desktop:text-[15px] phone:leading-6"}>
                        <TiTick color = {"gray"}/> Diets for every health condition
                    </li>
                </ul>
                <p id = {"discover-more"}
                   className = {"tablet:pl-5 desktop:absolute bottom-4 desktop:text-[13px] phone:text-[13px] flex items-center phone:leading-9"}>Discover
                                                                                           more<HiArrowNarrowRight
                        className = {"mx-2"}
                        size = {15}/></p>
            </div>

        </div>
    );
}