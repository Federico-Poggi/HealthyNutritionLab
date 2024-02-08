export function CardArticleHome() {
    return (
        <>
            {/*Size desktop 280x280*/}
            <div className={"phone:flex phone:flex-col phone:mt-10"}>
                <img className = {"rounded-2xl mx-auto desktop:w-[280px] desktop:h-[280px] tablet:w-[200px] tablet:h-[200px] phone:w-[250px] phone:h-[250px]"}
                     src = {"https://placedog.net/250/250"}/>
                <div className = {"text-left desktop:w-2/3 tablet:items-center tablet:w-[200px] tablet:pl-2 desktop:mx-auto phone:w-[250px] phone:mx-auto"}>
                    <p className = {"title-card desktop:text-[12px] desktop:pl-2"}>Title Articles</p>
                    <p className = {"object-articles pl-2 phone:pl-0 desktop:text-[14px] tablet:pl-0 "}>Lorem ipsum dolor sit amet, consectetur
                                                                                adipiscing elit. Sed non risus.
                                                                                Suspendisse </p>
                </div>
            </div>
        </>
    );
}