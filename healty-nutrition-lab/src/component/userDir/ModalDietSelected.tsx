import {DietModalProps} from "../../interface/Interface.ts";
import {Label, Tooltip} from "flowbite-react";
import {TbFileDownload} from "react-icons/tb";
import {useDownload} from "../../interface/funzioni.ts";

export function ModalDietSelected({isOpened,diet,setIsOpen}:DietModalProps) {
    const download=useDownload()
    return (
        <>
            <dialog className = "modal w-1/2 mx-auto" open={isOpened}>
                <div className = "modal-box max-w-[50vw] h-[100vh]">
                    <h3 className = "font-bold text-lg py-2">Dieta</h3>
                    <header className = {"flex justify-evenly items-center"}>
                        <Label className = {"font-bold text-gray-500"}>TIPO DIETA: {diet.dietType}</Label>
                        <Label className = {"font-bold text-gray-500"}>Data assegnamento: {diet.issueDate}</Label>
                        <Label className = {"font-bold text-gray-500"}>Data scadenza: {diet.expirationDate}</Label>
                    </header>
                    <p className = "py-4">Alimenti:</p>
                    <div className={"flex flex-col flex-shrink"}>
                        {Object.entries(diet.alimentiQuantita).map(([alimento, quantita]: [string, number]) => (
                            <div className = {"text-white list-unstyled flex w-2/3 mx-auto py-1"} key = {alimento}>
                                <span className = {"flex-grow"}>
                                    {alimento}
                                </span>
                                <span className = {"flex"}>
                                        {quantita}
                                    <p className = {"px-2"}>gr</p>
                                    </span>
                            </div>
                        ))}
                    </div>
                    <div className={"fixed bottom-5 flex items-center"}>
                        <Tooltip content={"Scarica dieta"}>
                            <TbFileDownload size={25} className={"cursor-pointer"} onClick={()=>download(diet.pdfDiet)}/>
                        </Tooltip>
                        <button className={"btn btn-ghost"} onClick = {() => setIsOpen(!isOpened)}>Chiudi</button>
                    </div>
                </div>

            </dialog>


        </>
    );
}