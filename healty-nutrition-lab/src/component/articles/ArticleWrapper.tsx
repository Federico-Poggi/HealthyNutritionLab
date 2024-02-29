import {useEffect, useState} from "react";
import {RootArticle} from "../../interface/Interface.ts";
import {Articles} from "./Articles.tsx";
import {Route, Routes} from "react-router-dom";
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

    const [text, setText] = useState<string>('');


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
            <div className="mx-auto p-3 h-screen fixed w-screen flex">
                <div className="w-2/3 p-3 bg-[#414141] bg-opacity-25 mx-auto overflow-y-auto flex rounded-xl flex-wrap ">
                    {
                        article.content.map(a => (
                            <CardArticle key={a.id} article={a}/>
                        ))
                    }

                </div>
            </div>


        </>
    );
}