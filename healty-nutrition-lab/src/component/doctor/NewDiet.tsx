import {Dropdown, Label} from "flowbite-react";
import {useEffect, useState} from "react";
import {Alimento, AssignDiet, Paziente} from "../../interface/Interface.ts";
import {ModalDiet} from "./ModalDiet.tsx";
import {useParams} from "react-router-dom";
import {PiBowlFood} from "react-icons/pi";
import {RxPaperPlane} from "react-icons/rx";

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

    const changeInput = (newV: number, idAliment: number) => {

        const updatedAlimentoAndQuantita = dietAssign.alimentoAndQuantita.map(item => {
            if (item.idAlimento === idAliment) {
                return {...item, quantita: newV};
            }
            return item;
        });
        setDietAssign(prevState => ({
            ...prevState,
            alimentoAndQuantita: updatedAlimentoAndQuantita
        }));
    };

    return (
        <div className="w-full overflow-y-auto">
            <div
                className="p-3 bg-[#545454] bg-opacity-[60%] z-30  w-[97%] rounded-xl flex justify-between px-5 top-3  absolute">
                <h2 className={"text-white "}>Nuova dieta</h2>
                <div
                    className="flex items-center hover:text-[#17CF97] hover:scale-105 transition-all duration-500 cursor-pointer">
                    <button onClick={(e) => {
                        pushDiet()
                        window.location.reload()
                    }}>Invia
                    </button>
                    <RxPaperPlane className="mx-2"/>
                </div>
            </div>
            <section className={"flex justify-evenly mt-16"}>
            <span className={"flex items-center"}>
                        <Label className={"text-white font-medium mx-4"}>Tipologia</Label>
                        <Dropdown label={tipoDieta || 'TIPO DIETA'} inline>
                            <Dropdown.Item onClick={() => {
                                setTipologia("DIMAGRIMENTO")
                            }}>DIMAGRIMENTO</Dropdown.Item>
                            <Dropdown.Item onClick={() => {
                                setTipologia("MASSA MUSCOLARE")
                            }}>MASSA MUSCOLARE</Dropdown.Item>
                            <Dropdown.Item onClick={() => {
                                setTipologia("VEGANA")
                            }}>VEGANA</Dropdown.Item>
                            <Dropdown.Item onClick={() => {
                                setTipologia("VEGETARIANA")
                            }}>VEGETARIANA</Dropdown.Item>
                            <Dropdown.Item onClick={() => {
                                setTipologia("ALTRO")
                            }}>ALTRO...</Dropdown.Item>
                        </Dropdown>
                        </span>
                <span className={"flex items-center"}>
                        <Label className={"text-white mx-4"}>Durata</Label>
                        <Dropdown label={durata || "DURATA"} inline size="sm">
                            <Dropdown.Item
                                onClick={() => {
                                    setDur("BIMESTRALE")
                                }}
                            >BIMESTRALE</Dropdown.Item>
                            <Dropdown.Item
                                onClick={() => {
                                    setDur("MENSILE")
                                }}
                            >MENSILE</Dropdown.Item>
                            <Dropdown.Item
                                onClick={() => {
                                    setDur("SETTIMANALE")
                                }}
                            >SETTIMANALE</Dropdown.Item>

                        </Dropdown>
                        </span>
                <button onClick={() => setModalOpen(true)} className={"text-white flex text-sm items-center"}>
                    <PiBowlFood className=""/>
                    <p className="px-2"> Aggiungi alimento</p>
                </button>
            </section>

            <ModalDiet isOpenProps={modalOpen}
                       onClose={closeModal}
                       alimentiDietaSelected={alimentiDietaSelected}
                       setAlimentiDieta={setAlimentiDieta}/>

            <div className="w-full my-5 max-h-full" >
                <table className="table-auto text-center overflow-y-auto mx-auto">
                    <thead>
                    <tr>
                        <th>Alimento</th>
                        <th>Quantita</th>
                    </tr>
                    </thead>
                    <tbody className="max-h-full overflow-y-auto">
                    {alimentiDietaSelected.map((a, index) => {
                        return (
                            <tr key={index}
                                className={`ring-1 ring-green-800 text-[12px] shadow-lg rounded-xl bg-green-500 bg-opacity-10 h-[50px] `}>
                                <td>
                                    <p className={"text-white font-medium "}>{a.name}</p>
                                </td>
                                <td>
                                    <input type={"text"}
                                           className="w-1/2 bg-gray-800 h-[2em] border-0 outline-none"
                                           onChange={(e) => {
                                               const v = e.target.value
                                               const newV = parseInt(v);
                                               if (newV <= 0 || isNaN(newV)) {
                                                   e.target.value = '';
                                               } else {
                                                   changeInput(newV, a.idAlimento)
                                               }
                                           }}
                                    />
                                </td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}