import {motion, AnimatePresence} from "framer-motion";

import {HiX} from "react-icons/hi";
import {RespImg} from "../../interface/Interface.ts";
import {ChangeEvent, useState} from "react";
import {GiConfirmed} from "react-icons/gi";

interface IsOpenProps {
    setIsOpen: () => void
    open: boolean
    setImgProf: (imgUrl: string) => void
    url:string
}

export function NewProfileImgModal({open, setIsOpen, setImgProf,url}: IsOpenProps) {
    const [fileSelec, setFile] = useState<File>()

    const token = localStorage.getItem('token')
    const [thisImg, setThis] = useState<string | null | undefined>(null)
    const uploadImg = async () => {
        try {
            const formData = new FormData();
            formData.append("avatar", fileSelec);

            const resp = await fetch(url, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            })
            if (!resp.ok) {
                throw new Error("error")
            } else {
                const img: RespImg = await resp.json();
                setImgProf(img.imgUrl);
                return img;
            }
        } catch (Err) {
            console.log(Err)
        }
    }

    const setIm = (ev: ChangeEvent<HTMLInputElement>) => {
        const file = ev.target.files;
        if (file) {
            setFile(file[0]);
        } else {
            return;
        }
    }

    const takeImg = (ev) => {
        const file = ev.target.files;
        const thisFile = file[0];
        if (file) {
            const render = new FileReader();
            render.onload = () => {
                setThis(render.result as string);
            };
            render.readAsDataURL(thisFile);
        }

    }
    return (
        <>
            <AnimatePresence>
                {open &&
                    <motion.div
                        initial={{opacity: 0, translateX: -100}}
                        animate={{opacity: 1, translateX: 0}}
                        exit={{opacity: 0, translateX: -100}}
                        transition={{duration: 0.2}}
                        className="modal-img modal-img fixed inset-0 z-50 flex justify-center items-center backdrop-blur-md"
                    >
                        <div
                            className="modal-img-content p-5 w-[550px] h-[400px] bg-[#434643] ring-1-300 rounded-xl transition-all duration-1000 ease-in-out">
                        <span className="flex items-center justify-between p-2">
                            <h1 className="">Cambia Immagine profilo</h1>
                            <HiX onClick={setIsOpen} className="hover:text-[#17CF97] cursor-pointer"/>
                        </span>
                            <div className="flex justify-center items-center h-[75%]">
                                <img src={thisImg} alt="ciao" className="w-[200px] h-[200px] z-50 rounded-full"/>
                            </div>
                            <div
                                className="flex items-center text-white justify-between">
                                <input type="file" onChange={(e) => {
                                    setIm(e)
                                    takeImg(e);
                                }} className="rounded-xl border border-accent border-opacity-25"/>
                                <div className="flex items-center hover:text-[#17CF97] transition-all duration-500">
                                    <button className="" onClick={()=>{
                                        uploadImg()
                                        setIsOpen()
                                    }}>Conferma</button>
                                    <GiConfirmed className="mx-2"/>
                                </div>
                            </div>
                        </div>

                    </motion.div>
                }
            </AnimatePresence>
        </>
    );
}