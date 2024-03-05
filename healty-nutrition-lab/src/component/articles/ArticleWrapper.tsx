import {useEffect, useState} from "react";
import {RootArticle} from "../../interface/Interface.ts";
import {CardArticle} from "./CardArticle.tsx";

export function ArticleWrapper() {
    const page = 0;
    const size = 30;
    const sortedBy = "id";
    const token = localStorage.getItem('token');
    const URLArticles = `http://localhost:5174/api/article?page=${page}&size=${size}&sortedBy=${sortedBy}`;

    const [article, setArticle] = useState<RootArticle>({
        content: [],
    })

    const decode = (base64: string) => {
        const articlesText = atob(base64);
        return articlesText;
    }

    useEffect(() => {
        getArticles();
    }, []);
    const getArticles = async () => {
        try {
            const data = await fetch(URLArticles, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            if (data.ok) {
                const articles: RootArticle = await data.json();
                const stateUpdateble = {...articles};
                stateUpdateble.content.forEach((a, index) => {
                    const decoded = decode(a.content);
                    stateUpdateble.content[index].content = decoded;
                })
                setArticle(() => (stateUpdateble));
                console.log(articles)
            }
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <>
            <div className="h-[89vh] mt-2 w-2/3 p-3 bg-[#414141]  bg-opacity-25 mx-auto rounded-xl overflow-y-auto overflow-x-auto">
                <div>
                    <h2 className="p-3 text-xl font-medium">I nostri articoli</h2>
                </div>
                <div className="h-full p-5 pb-10 flex flex-wrap gap-4 justify-around">
                {

                    article.content.map(a => (
                        <div className="relative flex h-1/3 w-2/5 hover:text-[#B7F803] shadow-[0px_7px_31px_2px_#38b2ac] bg-[#676464]  bg-opacity-20">
                            <CardArticle key={a.id} article={a}/>
                        </div>
                    ))

                }
                </div>
            </div>

        </>
    );
}