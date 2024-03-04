import {BiPlus} from "react-icons/bi";
import {useState} from "react";
import {ModalAddAuthor} from "./ModalAddAuthor.tsx";
import {useNavigate} from "react-router-dom";

export interface NewArticle {
    title: string
    text: string
    autoriEmail: Array<string>
}

export interface ResponseId{
    idArticolo:number
}
export function WriteArticle() {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [autori, setAutori] = useState<Array<string>>([]);
    const token = localStorage.getItem('token');
    const [title, setTitle] = useState<string>('');
    const [text, setText] = useState<string>('');
    const [imgArticle, setImgArticle] = useState<File>();
    const URLInsert = 'http://localhost:5174/api/article/insert';

    const NAV=useNavigate();

    const pubblica = () => {
        const newArt: NewArticle = {
            title: title,
            text: text,
            autoriEmail: autori
        }
        try {
            fetch(URLInsert, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(newArt)
            })
                .then((e) => {
                    if (e.ok) {
                        return e.json()
                    } else {
                        throw e.json();
                    }
                })
                .then((id:ResponseId) => {
                    return id.idArticolo;
                })
                .then((id) => {
                    allegaImmagine(id);
                })

        } catch (err) {
            console.log(err)
        }


    }

    const allegaImmagine = (id:number) => {
        try {
            const formData = new FormData();
            formData.append('imgArticle', imgArticle)
            fetch(`http://localhost:5174/api/article/uploadArticleImage?idArticolo=${id}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            })
                .then((e) => {
                    if (e.ok) {
                        alert("Articolo pubblicato")
                        NAV("/")
                    } else {
                        return e.json()
                    }
                })
        } catch (err) {
            console.log(err);
        }

    }

    const setIm = (e) => {
        const file = e.target.files
        const thisFile = file[0];
        if (thisFile) {
            setImgArticle(thisFile);
        } else {
            return
        }
    }

    return (
        <>
            <div className="w-2/3 rounded-xl mx-auto bg-[#1B1C19] bg-opacity-40 h-[99%] p-5">
                <div>

                    <h2 className="font-medium">Nuovo Articolo</h2>
                    <div className="flex justify-evenly items-center">
                        <div className="flex flex-col w-3/12">
                            <label>Titolo</label>
                            <input type="text" placeholder="Title"
                                   value={title}
                                   onChange={(e) => setTitle(e.target.value)}
                                   className="rounded-xl bg-transparent border-0 border-b ring-0 outline-none focus:ring-0 focus:border-green-400"/>
                        </div>
                        <div className="flex items-center">
                            <h3>Aggiungi Autori</h3>
                            <BiPlus size={20}
                                    className="mx-3 rounded-md hover:bg-green-500 cursor-pointer hover:text-gray-700"
                                    onClick={() => setIsOpen(!isOpen)}/>
                        </div>
                    </div>
                    <div className="flex flex-col w-2/3 mx-auto overflow-y-auto  overflow-x-auto">
                        <label>Articolo</label>
                        <textarea
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            className="bg-transparent border-opacity-0 rounded-xl resize-none h-[600px] focus:ring-0 focus:border-gray-400"></textarea>
                        <div className="p-2">
                            <input type="file" placeholder="Carica immagine articolo" onChange={(e) => {
                                setIm(e);
                            }}/>
                            <button className="float-end p-2 bg-blue-900 bg-opacity-35 rounded-lg"
                                    onClick={() => {
                                        pubblica()
                                    }}
                            >Pubblica
                            </button>
                        </div>
                    </div>

                </div>
                {
                    isOpen && <div className="backdrop-blur-sm fixed inset-0 flex justify-center items-center">
                        <ModalAddAuthor isOpen={isOpen} setIsOpen={setIsOpen} autori={autori} setAutori={setAutori}/>
                    </div>
                }

            </div>
        </>
    );
}