import {Article, ArticleProps} from "../../interface/Interface.ts";
import {CiHeart} from "react-icons/ci";
import {FaBookReader} from "react-icons/fa";
import {Link, useNavigate} from "react-router-dom";


export function CardArticle({article}: ArticleProps) {

    const NAV = useNavigate();
    const navTo = (article: Article) => {
        NAV(`${article.id}`)
    }


    return (
        <>
            <img src={article.urlImg} alt="img" className="h-full w-[50%]"/>
            <div className="flex truncate flex-col">
                <p>{article.title}</p>
                <p className="truncate">
                    {article.content}
                </p>
            </div>

            <div
                className="absolute top-0  w-[100%] z-30 h-full bg-black opacity-0 transition-opacity duration-300 hover:opacity-60 flex justify-center ">
                <div className="flex items-center">
                    <CiHeart className="mx-2" size={40}/>
                    <Link to={`${article.id}`}><FaBookReader
                        onClick={() => {
                            navTo(article)
                        }}
                        className="mx-2" size={25}/></Link>
                </div>
            </div>

        </>

    );
}