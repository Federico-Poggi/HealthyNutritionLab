import sportImg from '../../assets/foodSm.png'
import {TiTick} from "react-icons/ti";
import {HiArrowNarrowRight} from "react-icons/hi";

export default function SectionHomeService() {
    return (

        <div className = {"desktop:flex justify-center tablet:mt-10 desktop:mt-10 phone:mt-12 gap-4"}>
            <div className = {"desktop:w-[500px] tablet:hidden phone:hidden relative"}>
                <div id = {"offers-section-home"}>
                    <h2 className = {"desktop:text-[30px] tablet: phone:"}>Personalized Diet</h2>
                    <p className = {"desktop:text-[15px] tablet: phone:"}>We offer personalized diets tailored to your
                                                                          needs.</p>
                </div>
                <ul>
                    <li className = {"list-offers flex items-center desktop:text-[15px]"}><TiTick color = {"gray"}/>Celiacs'
                                                                                                                    diet
                    </li>
                    <li className = {"list-offers flex items-center desktop:text-[15px]"}>
                        <TiTick color = {"gray"}/> Athletes' diets
                    </li>
                    <li className = {"list-offers flex items-center desktop:text-[15px]"}>
                        <TiTick color = {"gray"}/> Diets for every health condition
                    </li>
                </ul>
                <p id = {"discover-more"}
                   className = {"absolute bottom-4 desktop:text-[13px] flex items-center"}>Discover
                                                                                           more<HiArrowNarrowRight
                        className = {"mx-2"}
                        size = {15}/></p>
            </div>


            <div id = {"img-container-home"}
                 className = {"desktop:w-[500px] desktop:h-[400px] tablet:w-[400px] tablet:h-[300px] phone:w-[300px] phone:h-[250px] phone:mx-auto tablet:mx-auto bg-[#1F1F1F] flex justify-center items-center"}>
                <img id = {"img-sport"}
                     src = {sportImg}
                     alt = {"sportImg"}
                     className = {"desktop:w-[300px] desktop:h-[250px] phone:w-[200px] phone:h-[170px]"}/>
            </div>
            <div className = {"desktop:hidden tablet:flex flex-col w-[400px] phone:w-[350px] phone:mt-3 mx-auto phone:px-10 phone:leading-5 mt-5 pl-2 "}>
                <div id = {"offers-section-home"}>
                    <h2 className = {"desktop:text-[30px] tablet: phone:text-[15px]"}>Personalized Diet</h2>
                    <p className = {"desktop:text-[15px] tablet: phone:text-[13px]"}>We offer personalized diets tailored to your
                                                                          needs.</p>
                </div>
                <ul className={"phone:text-[13px]"}>
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
                   className = {" bottom-4 desktop:text-[13px] phone:text-[13px] flex items-center phone:leading-9"}>Discover
                                                                                           more<HiArrowNarrowRight
                        className = {"mx-2"}
                        size = {15}/></p>
            </div>
        </div>

    )
}