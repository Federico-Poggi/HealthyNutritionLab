import sportImg from '../assets/foodSm.png'
import {TiTick} from "react-icons/ti";
import { HiArrowNarrowRight } from "react-icons/hi";

export default function SectionHomeService(){
    return(

        <div className={"flex justify-center mt-10 gap-4"}>
            <div className={"desktop:w-[500px] relative"}>
               <div id={"offers-section-home"}>
                   <h2 className={"desktop:text-[30px] tablet: phone:"}>Personalized Diet</h2>
                   <p className={"desktop:text-[15px] tablet: phone:"}>We offer personalized diets tailored to your needs.</p>
               </div>
                <ul>
                    <li className={"list-offers flex items-center desktop:text-[15px]"}><TiTick color={"gray"}/>Celiacs' diet</li>
                    <li className={"list-offers flex items-center desktop:text-[15px]"}><TiTick color={"gray"}/> Athletes' diets</li>
                    <li className={"list-offers flex items-center desktop:text-[15px]"}><TiTick color={"gray"}/> Diets for every health condition</li>
                </ul>
                <p id={"discover-more"} className={"absolute bottom-4 desktop:text-[13px] flex items-center"}>Discover more<HiArrowNarrowRight className={"mx-2"} size={15}/> </p>
            </div>
            <div id={"img-container-home"} className={"desktop:w-[500px] desktop:h-[400px] bg-[#1F1F1F] flex justify-center items-center"}>
                <img id={"img-sport"} src={sportImg} alt={"sportImg"} className={"w-[300px] h-[250px]"}/>
            </div>
        </div>

    )
}