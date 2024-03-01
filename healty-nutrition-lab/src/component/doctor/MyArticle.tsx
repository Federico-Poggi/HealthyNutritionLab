import {Article} from "../../interface/Interface.ts";

export interface AllMyArticle{
    content:Article[]
}

interface MyArticleProps {
    article: AllMyArticle | undefined
}

export function MyArticle({ article }:MyArticleProps) {

    return (
        <>
            <div className="max-h-[96%] max-w-[50%] mx-auto h-[100%] mt-2 w-full bg-[#413F42] bg-opacity-35 rounded-xl p-3 overflow-y-auto">
                <div>
                    <h2 className="font-medium text-lg">I tuoi articoli</h2>
                </div>
                <div className="flex flex-col flex-wrap justify-evenly">
                {article!=undefined&&article.content.map((i)=>(
                    <div className="bg-gray-800 my-2 p-5 rounded-xl" key={i.id}>
                        <h2>{i.title}</h2>
                    </div>
                ))}
                </div>
            </div>

        </>
    );
}