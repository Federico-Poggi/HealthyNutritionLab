import {CardArticleHome} from "./CardArticleHome.tsx";

export function ArticlesHome() {
    return (
        <>
            <div id={"learn-section"} className={"text-center"}>
                <h2 className={"desktop:text-[30px]"}>
                    Learn more about the Nutrition world
                </h2>
                <p>
                    Read about nutrition from our articles section
                </p>
                <div className={"flex phone:flex-col desktop:w-2/3 tablet:w-full mx-auto justify-evenly mt-16"}>
                    <CardArticleHome/>
                    <CardArticleHome/>
                    <CardArticleHome/>
                </div>
            </div>

        </>
    );
}