export function RegisterForm() {
    return (
        <>
            <div id = {"registration-form"} className = {"desktop:w-1/2 mx-auto h-[800px] flex"}>
                <form className={"mx-auto flex flex-col items-center justify-center "}>
                    <h2 className = {"desktop:text-[40px] text-[#FFFF]"}>
                        Register
                    </h2>
                    <div className = {"flex flex-col"}>
                        <input placeholder = {"name"}
                               className = {"text-[#C9F31DDD] desktop:w-[250px] desktop:py-1 desktop:my-5 px-1 outline-0 bg-[transparent] border-b font-normal"}/>
                        <input placeholder = {"surname"}
                               className = {"text-[#C9F31DDD] desktop:w-[250px] desktop:py-1 desktop:my-5 px-1 outline-0 bg-[transparent] border-b font-normal"}/>
                        <input placeholder = {"email"}
                               className = {"text-[#C9F31DDD] desktop:w-[250px] desktop:py-1 desktop:my-5 px-1 outline-0 bg-[transparent] border-b font-normal"}/>
                        <input placeholder = {"repeat email"}
                               className = {"text-[#C9F31DDD] desktop:w-[250px] desktop:py-1 desktop:my-5 px-1 outline-0 bg-[transparent] border-b font-normal"}/>
                        <input placeholder = {"password"}
                               className = {"text-[#C9F31DDD] desktop:w-[250px] desktop:py-1 desktop:my-5 px-1 outline-0 bg-[transparent] border-b font-normal"}/>
                    </div>
                    <div className = {"flex flex-col desktop:w-[250px] items-start"}>
                    <span className = {"flex"}>
                        <input required = {true} placeholder = {"repeat password"} type = {"checkbox"}/>
                        <p className = {"text-[#FFFF] desktop:text-[12px] font-normal desktop:ml-2"}>Accetta i termini e condizioni</p>
                    </span>
                        <span className = {"flex"}>
                        <input  placeholder = {"repeat password"} type = {"checkbox"}/>
                        <p className = {"text-[#FFFF] desktop:text-[12px] font-normal desktop:ml-2"}>Aggiungimi alla mailing list</p>
                    </span>
                    </div>
                    <button>Register</button>
                </form>
            </div>
        </>
    );
}