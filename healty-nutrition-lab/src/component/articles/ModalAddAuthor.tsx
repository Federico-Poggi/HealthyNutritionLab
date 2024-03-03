import {Dispatch, SetStateAction, useEffect, useState} from "react";
import {HiX} from "react-icons/hi";

export interface ArticlePropsModal {
    isOpen: boolean
    setIsOpen: Dispatch<SetStateAction<boolean>>
    setAutori:Dispatch<SetStateAction<Array<string>>>
    autori:Array<string>
}

export function ModalAddAuthor({isOpen, setIsOpen,setAutori,autori}: ArticlePropsModal) {
    const [mail, setMail] = useState<string>('')
    const addAutori = (e, mail: string) => {
        e.preventDefault();
        if (mail == '') {
            return;
        }
        setAutori((prevState) => [...prevState, mail])
    }
    const closeModal = () => {
        setIsOpen(!isOpen)
    }
    const removeAutor=(a:string)=>{
        console.log(a)
       setAutori(prevState => prevState.filter(aut=>aut!==a));
    }
    return (
        <>
            {isOpen && <div className=" bg-green-500 bg-opacity-25 w-1/3 z-30 rounded-xl">

                <div className="flex items-center justify-between p-4">
                    <h2>Mail autore</h2>
                    <div className="flex">
                        <input placeholder="mail" type="email"
                               className="bg-transparent focus:ring-0 focus:border-gray-600 rounded-xl"
                               value={mail}
                               onChange={(e) => setMail(e.target.value)}
                        />
                        <button className="mx-5 bg-green-300 bg-opacity-25 p-2 rounded-lg"
                                onClick={(e) => addAutori(e, mail)}
                        >Ok
                        </button>
                    </div>
                    <HiX size={20} onClick={closeModal} className="hover:bg-gray-800 rounded-md cursor-pointer"/>
                </div>
                <div className="justify-evenly grid grid-cols-2 text-center gap-y-2 gap-x-2 p-2">
                    {autori.map((a) => (
                        <span className="p-2 bg-gray-500 rounded-lg bg-opacity-30 flex items-center justify-between">
                            <p >{a}</p>
                            <HiX
                                onClick={()=>removeAutor(a)}
                                size={15} className="hover:bg-gray-500 hover:rounded-md cursor-pointer"/>
                        </span>
                    ))}
                </div>
            </div>}
        </>
    );
}
