import {DietModalProps} from "../../interface/Interface.ts";
import {Label} from "flowbite-react";

export function ModalDietSelected({isOpen,diet,setIsOpen}:DietModalProps) {
    return (
        <>
            <dialog className = "modal w-full backdrop-blur-[5px]"open={isOpen}>
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
                    <div className={"fixed bottom-5"}>
                        <button className={"btn btn-ghost float-end"} onClick = {() => setIsOpen(!isOpen)}>Chiudi</button>
                    </div>
                </div>

            </dialog>


        </>
    );
}