import {Article, ArticleProps} from "../../interface/Interface.ts";
import {CiHeart} from "react-icons/ci";
import {FaBookReader} from "react-icons/fa";
import {Link, useNavigate} from "react-router-dom";


export function CardArticle({article}: ArticleProps) {

    const NAV=useNavigate();
    const navTo=(article:Article)=>{
        NAV(`${article.id}`)
    }


    return (
        <>

            <div
                className="relative bg-gray-800 max-w-60 flex flex-col rounded-xl h-[250px] bg-center bg-cover bg-no-repeat hover:text-[#B7F803] hover:text-opacity-70"
                style={{backgroundImage: `url(${article.urlImg})`}}>
                <div
                    className=" rounded-t-xl w-full h-full bg-black opacity-0 transition-opacity duration-300 hover:opacity-60 flex justify-center ">
                    <div className="flex items-center">
                        <CiHeart className="mx-2" size={40}/>
                        <Link to={`${article.id}`}><FaBookReader
                            onClick={() => {
                                navTo(article)
                            }}
                            className="mx-2" size={25}/></Link>
                    </div>
                </div>
                <div className="px-3 py-2 font-medium bg-gray-800 rounded-b-xl bg-opacity-80 taxt-[#AFADAD] cursor-pointer"
                     onClick={() => {
                         navTo(article)
                     }}>
                    <p>{article.title}</p>
                </div>
            </div>


        </>
    );
}