export function CardArticleHome() {
    return (
        <>
            {/*Size desktop 280x280*/}
            <div>
                <img className = {"rounded-2xl mx-auto"} src = {"https://placedog.net/280/280"}/>
                <div className = {"text-left flex flex-col w-2/3 mx-auto"}>
                    <p className = {"title-card desktop:text-[12px] pl-2"}>Title Articles</p>
                    <p className = {"object-articles pl-2 desktop:text-[14px]"}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse </p>
                </div>
            </div>
        </>
    );
}