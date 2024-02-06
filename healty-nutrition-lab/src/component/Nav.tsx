
function Nav() {
    return (
        <>
            <nav id = {"navbar"} className = {"bg-[#121212ff] flex text-white py-5"}>
                <div id = {"navbar-brand"}
                     className = {"desktop:w-2/12 tablet:w-3/12 items-center desktop:text-[30px] tablet:text-[20px] px-4"}>
                    <img className = {"brand-img"}/>
                    <h2>HealthyNutritionLab</h2>
                </div>
                <div id = {"navigation-option"}
                     className = {"phone:hidden desktop:w-8/12 desktop:flex tablet:flex tablet:w-6/12 tablet:text-[16px] items-center justify-center font-medium"}>
                    <p>Home</p>
                    <p>Articles</p>
                    <p>Contact</p>
                </div>
                <div id = {"registration-login"}
                     className = {"desktop:2/12 tablet:w-3/12 phone:hidden tablet:flex desktop:flex justify-center items-center"}>
                <span className = {"flex items-center"}>
                    <button className={"mx-4"}>Register</button>
                    <button className={"mx-4"}>Login</button>
                </span>
                </div>
                <div className = {"desktop:hidden tablet:hidden phone:flex"}>
                    <span>
                        <p className = {"text-black"}>Ciao</p>
                    </span>
                </div>
            </nav>
        </>
    )
}

export default Nav