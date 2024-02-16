import {Dropdown, Label} from "flowbite-react";
import {useState} from "react";
import {AssignDiet, DietSpec, Paziente} from "../../interface/Interface.ts";
import {ModalDiet} from "./ModalDiet.tsx";

export function NewDiet(paziente:Paziente) {
    const [tipoDieta, setTipo] = useState<string>("")
    const [durata, setDurata] = useState<string>("")
    const [dietAssign, setDietAssign] = useState<AssignDiet>({
        duration: '',
        dietType: '',
        AlimentoAndQuantita:[]
    })
    const [alimentoQuantita,setAlimentoQuantita]=useState<DietSpec>({
        idAlimento:null,
        quantita:'',
    })
    const [modalOpen, setModalOpen] = useState<boolean>(false)
    const closeModal = () => {
        setModalOpen(false)
    }
    const setTipologia = (e: string) => {
        const value: string = e;
        setTipo(value)
    }
    const setDur = (e: string) => {
        const dur: string = e;
        setDurata(dur);
    }
    return (
        <div className = {"max-w-[90%] h-[97%] w-[40%] border rounded-2xl my-4"}>
            <h2 className = {"text-white"}>NUOVA DIETA</h2>

            <div className = {"flex items-center"}>
                <Label className = {"text-white mx-2"}>Paziente: </Label>
                <p>{paziente.name} {paziente.surname}</p>
            </div>
            <div className = {"flex items-center"}>
                <Label className = {"text-white mx-2"}>Email: </Label>
                <p>{paziente.email}</p>
            </div>
            <div className = {"flex items-center"}>
                <Label className = {"text-white mx-2"}>Cell: </Label>
                <p>{paziente.cellNumber}</p>
            </div>
            <section className = {"flex"}>
            <span className = {"flex items-center"}>
                        <Label className = {"text-[17px] text-white font-medium mx-5"}>Tipologia</Label>
                        <Dropdown label = {tipoDieta || 'TIPO DIETA'}>
                            <Dropdown.Item onClick = {() => {
                                setTipologia("DIMAGRIMENTO")
                            }}>DIMAGRIMENTO</Dropdown.Item>
                            <Dropdown.Item onClick = {() => {
                                setTipologia("MASSA MUSCOLARE")
                            }}>MASSA MUSCOLARE</Dropdown.Item>
                            <Dropdown.Item onClick = {() => {
                                setTipologia("VEGANA")
                            }}>VEGANA</Dropdown.Item>
                            <Dropdown.Item onClick = {() => {
                                setTipologia("VEGETARIANA")
                            }}>VEGETARIANA</Dropdown.Item>
                            <Dropdown.Item onClick = {() => {
                                setTipologia("ALTRO")
                            }}>ALTRO...</Dropdown.Item>
                        </Dropdown>
                        </span>
                <span className = {"flex items-center"}>
                        <Label className = {"text-[17px] text-white font-medium mx-5"}>Durata</Label>
                        <Dropdown label = {durata || "DURATA"}>
                            <Dropdown.Item
                                onClick = {() => {
                                    setDur("BIMESTRALE")
                                }}
                            >BIMESTRALE</Dropdown.Item>
                            <Dropdown.Item
                                onClick = {() => {
                                    setDur("MENSILE")
                                }}
                            >MENSILE</Dropdown.Item>
                            <Dropdown.Item
                                onClick = {() => {
                                    setDurata("SETTIMANALE")
                                }}
                            >SETTIMANALE</Dropdown.Item>

                        </Dropdown>
                        </span>
            </section>
            <button onClick = {() => setModalOpen(true)} className = {"text-white"}>Aggiungi dieta</button>
            <ModalDiet isOpenProps = {modalOpen} onClose = {closeModal}/>
        </div>
    );
}