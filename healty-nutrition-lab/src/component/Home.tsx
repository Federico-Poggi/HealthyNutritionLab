import imgP from "../assets/Risorsa 1@2x.png"

function Home() {
    return (
        <>
            <header id = {"header-home"} className = {"desktop:h-[600px] flex flex-col items-center justify-center"}>
                <span>
                    <h1 id = {"title-home"} className = {"text-white desktop:text-[50px]"}>
                    HealthyNutritionLab
                    </h1>
                    <p id={"slogan"} className={"text-center"}>
                        Nutri il tuo corpo, ottimizza il tuo potenziale
                    </p>
                </span>

                <img src = {imgP} className = {"desktop:w-2/12"}/>
            </header>
        </>
    )
}

export default Home