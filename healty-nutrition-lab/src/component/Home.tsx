import imgP from "../assets/Risorsa 1@2x.png"
import CollabSec from "./CollabSec.tsx";
import Service from "./Service.tsx";
import {ArticlesHome} from "./ArticlesHome.tsx";
import {ContactUs} from "./ContactUs.tsx";


function Home() {
    return (
        <>
            <header id = {"header-home"}
                    className = {"desktop:h-[700px] desktop:w-[900px] tablet:h-[600px] tablet:w-[600px] phone:h-[400px] phone:w-[250px] flex flex-col items-center justify-center mt-10 mx-auto m-0 max-w-[100vw]"}>
                <span className = {"mb-10"}>

                    <h1 id = {"title-home"}
                        className = {"text-center text-white desktop:text-[50px] tablet:text-[35px] phone:text-[20px]"}>
                        HealthyNutritionLab
                    </h1>
                    <p id = {"slogan"}
                       className = {"text-center leading-6 tablet:text-[15px] phone:text-[10px] phone:leading-4 max-w-[100vw]"}>
                        Fuel Your Body, Maximize Your Potential <br/>
                        In HealthyNutritionLab, we care for your well-being.
                    </p>
                </span>

                <img src = {imgP} className = {"desktop:w-6/12 tablet:w-6/12 phone:w-10/12 "}/>
            </header>
            <div className = {"flex flex-wrap mt-10 justify-center"}>
                <button className = {"btn-home mx-10 px-5 py-2 desktop:w-[250px] tablet:w-[220px] phone:w-[200px] phone:mt-2 phone:text-[12px]"}>Prenota
                                                                                                                                                 una
                                                                                                                                                 consulenza
                </button>
                <button className = {"btn-home mx-10 px-5 py-2 desktop:w-[250px] tablet:w-[220px] phone:w-[200px] phone:mt-2 phone:text-[12px]"}>Contattaci</button>
            </div>
            <CollabSec/>
            <hr className = {"w-2/3 mt-5 mx-auto opacity-10"}/>
            <Service/>
            <div className={"desktop:my-40 desktop:h-[300px]"}>
                <ContactUs/>
            </div>
            <div className={"mt-28 mb-28"}>
                <ArticlesHome/>
            </div>
        </>
    )
}

export default Home