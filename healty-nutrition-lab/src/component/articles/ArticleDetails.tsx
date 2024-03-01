import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Article} from "../../interface/Interface.ts";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;

type props = string;

export function ArticleDetails() {
    const {id} = useParams();
    const token = localStorage.getItem('token');
    const UrlGet = `http://localhost:5174/api/article/single?id=${id}`;
    const [article, setArticle] = useState<Article>()
    const getThis = async () => {
        try {
            const art = await fetch(UrlGet, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            if (art.ok) {
                const thisArt=await art.json()
                thisArt!=undefined?setArticle(thisArt):null
            }
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getThis()
        console.log(id)
    }, []);

    const decode = (base64: string) => {
        if(base64!=undefined){
            const articlesText = atob(base64);
            return articlesText;
        }
        return null;
    }

    return (
        <>
            <div className="w-1/2 mx-auto bg-gray-800 bg-opacity-25 rounded-xl mt-2 h-[89vh] overflow-y-auto">
                <div className="w-full h-[200px] bg-cover bg-no-repeat bg-center" style={{backgroundImage: `url(${article?.urlImg})`}}>
                </div>
                <div className="p-5">
                    <h2 className="text-2xl font-bold">{article?.title}</h2>
                    <text>
                        {article != undefined && decode(article.content)}
                    </text>
                    <p className="pt-2">Autori:</p>
                    <p>{article?.authorsName.map((item) => (
                        <div>
                            {item}
                        </div>
                    ))}</p>
                </div>

            </div>
        </>
    );
}