import {useEffect, useState} from "react";
import {Dropdown, Label, Modal, ModalBody, ModalHeader} from "flowbite-react";
import {useDispatch, useSelector} from "react-redux";
import {RootStore} from "../../redux/store";
import {allDataActionAliments} from "../../redux/reducers/alimentiDatasetReducer.ts";
import {Alimento} from "./TabelleNutrizionali.tsx";


interface Props {
    isOpenProps: boolean
    onClose: () => void
}


export function ModalDiet({isOpenProps, onClose}: Props) {
    /*STATI*/
    const [isOpen, setIsOpen] = useState<boolean>(isOpenProps)
    const [tipoDieta, setTipo] = useState<string>("")
    const [durata, setDurata] = useState<string>("")
    const [inputSearch, setInputSearch]=useState<string>("");

    const URLAlimenti = `http://localhost:5174/doctor/aliments`
    const token = localStorage.getItem('token')
    const DISPATCH=useDispatch();

    useEffect(() => {
        const data = async ()=> {
            const resp = await fetchAliments()
            /*console.log(resp)*/
            DISPATCH(allDataActionAliments(resp))
        }

        data()
    }, []);

    /*FUNZIONI*/
    const alimenti:Alimento[]=useSelector((state:RootStore)=>{
        return state.alimentiDataSet.content
    })
    const fetchAliments = async () => {
        try {
            const resp = await fetch(URLAlimenti, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            if (!resp.ok) {
                throw new Error('Errore nella fetch');
            } else {
                const alimenti = await resp.json()
                return alimenti
            }
        } catch (err) {
            console.log(err);
        }

    }
    const setTipologia = (e: string) => {
        const value: string = e;
        setTipo(value)
    }
    const setDur = (e: string) => {
        const dur: string = e;
        setDurata(dur);
    }

    const filter=(e:string,aliment:Alimento[])=>{
        return aliment.filter(al=>al.name.toLocaleLowerCase().includes(e.toLocaleLowerCase()));

    }

    const handleFilter=(e)=>{
        const inputValue:string=e.target.value
        setInputSearch(inputValue)
        console.log(filter(inputValue,alimenti))
        return filter(inputValue,alimenti)

    }


    return (
        <>

            <Modal show = {isOpenProps} onClose = {() => {
                onClose()
            }} size = {"full"}>
                <ModalHeader>
                    Dieta
                </ModalHeader>
                <ModalBody className = {"flex justify-evenly"}>
                    <div className = {"flex justify-evenly"}>
                        <span className = {"flex items-center"}>
                        <Label className = {"text-[17px] font-medium mx-5"}>Durata</Label>
                        <Dropdown label = {durata}>
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
                        <span className = {"flex items-center"}>
                        <Label className = {"text-[17px] font-medium mx-5"}>Durata</Label>
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
                    </div>
                    <div>
                        Alimenti
                        <input type={"search"} onChange={(e)=>{
                            handleFilter(e)
                        }}/>
                        {/*<div className={"overflow-y-auto"}>
                                {alimenti.map((item) => (
                                    <div className={"flex"}>
                                        <p>{item.idAlimento}</p>
                                        <p>{item.name}</p>
                                    </div>
                                ))}
                            </div>*/}
                    </div>
                </ModalBody>
            </Modal>

        </>
    );
}