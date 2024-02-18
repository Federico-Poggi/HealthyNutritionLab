import {Dropdown, Label} from "flowbite-react";
import {useEffect, useState} from "react";
import {Alimento, AssignDiet, DietSpec, Paziente} from "../../interface/Interface.ts";
import {ModalDiet} from "./ModalDiet.tsx";
import {useParams} from "react-router-dom";

export function NewDiet(paziente: Paziente) {
    const [tipoDieta, setTipo] = useState<string>("")
    const [durata, setDurata] = useState<string>("")
    const [dietAssign, setDietAssign] = useState<AssignDiet>({
        duration: '',
        dietType: '',
        alimentoAndQuantita: []
    })
    const [modalOpen, setModalOpen] = useState<boolean>(false)
    const [alimentiDietaSelected, setAlimentiDieta] = useState<Array<Alimento>>([])
    const {idCustomer} = useParams()
    const URL = `http://localhost:5174/doctor/me/diet?idCustomer=${paziente.idCliente}`
    const token = localStorage.getItem('token')

    const pushDiet = async () => {
        try {
            const resp = await fetch(URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(dietAssign)
            })
            if (!resp.ok) {
                throw new Error("ERROR:")
            }
            console.log(resp)
            return await resp.json()
        } catch (er) {
            console.log(er)
        }
    }

    useEffect(() => {
        const initializeAlimentoAndQuantita = () => {
            const initialAlimentoAndQuantita = alimentiDietaSelected.map(alimento => ({
                idAlimento: alimento.idAlimento,
                quantita: 0
            }));
            setDietAssign(prevState => ({
                ...prevState,
                alimentoAndQuantita: initialAlimentoAndQuantita
            }));
        };
        initializeAlimentoAndQuantita();
    }, [alimentiDietaSelected]);


    const closeModal = () => {
        setModalOpen(false)
    }
    const setTipologia = (e: string) => {
        const value: string = e;
        setDietAssign((prevState) => ({
            ...prevState,
            dietType: value
        }))
        setTipo(value)
    }
    const setDur = (e: string) => {
        const dur: string = e;
        setDurata(dur);
        setDietAssign((prevState) => ({
            ...prevState,
            duration: dur
        }))
    }

    const changeInput = (ev: React.ChangeEvent<HTMLInputElement>, idAliment: number) => {
        const value = parseInt(ev.target.value);
        if (value < 0 || isNaN(value)) {
            return
        }
        const updatedAlimentoAndQuantita = dietAssign.alimentoAndQuantita.map(item => {
            if (item.idAlimento === idAliment) {
                return {...item, quantita: value};
            }
            return item;
        });
        setDietAssign(prevState => ({
            ...prevState,
            alimentoAndQuantita: updatedAlimentoAndQuantita
        }));
    };

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
                                    setDur("SETTIMANALE")
                                }}
                            >SETTIMANALE</Dropdown.Item>

                        </Dropdown>
                        </span>
            </section>
            <button onClick = {() => setModalOpen(true)} className = {"text-white"}>Aggiungi dieta</button>
            <ModalDiet isOpenProps = {modalOpen}
                       onClose = {closeModal}
                       alimentiDietaSelected = {alimentiDietaSelected}
                       setAlimentiDieta = {setAlimentiDieta}/>

            <div className = {"flex flex-col"}>
                {alimentiDietaSelected.map((a, index) => {
                    return (
                        <div key = {index} className = {"flex items-center"}>
                            <Label className = {"text-white font-medium"}>{a.name}</Label>
                            <input type = {"number"}
                                   onChange = {(e) => changeInput(e, a.idAlimento)}
                            />
                        </div>
                    )
                })}
            </div>
            <button onClick = {(e) => {
                pushDiet()
                window.location.reload()
            }}>Assegna dieta
            </button>
        </div>
    );
}