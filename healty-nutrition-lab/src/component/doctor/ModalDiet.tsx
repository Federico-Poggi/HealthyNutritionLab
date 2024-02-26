import {useEffect, useState} from "react";
import {Banner, BannerCollapseButton, Label, Modal, ModalBody, ModalHeader} from "flowbite-react";
import {useDispatch, useSelector} from "react-redux";
import {RootStore} from "../../redux/store";
import {allDataActionAliments} from "../../redux/reducers/alimentiDatasetReducer.ts";
import {Alimento, ModalDietProps} from "../../interface/Interface.ts";
import {HiX} from "react-icons/hi";
import { IoMdAdd } from "react-icons/io";
export function ModalDiet({isOpenProps, onClose,alimentiDietaSelected,setAlimentiDieta}: ModalDietProps) {
    const [inputSearch, setInputSearch] = useState<string>("");
    const URLAlimenti = `http://localhost:5174/doctor/aliments`
    const token = localStorage.getItem('token')
    const DISPATCH = useDispatch();

    useEffect(() => {
        const data = async () => {
            const resp = await fetchAliments()
            DISPATCH(allDataActionAliments(resp))
        }

        data()
    }, []);

    /*FUNZIONI*/
    const alimenti: Alimento[] = useSelector((state: RootStore) => {
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

    const filter = (e: string, aliment: Alimento[]) => {
        return aliment.filter(al => al.name.toLocaleLowerCase().includes(e.toLocaleLowerCase())&&al);

    }

    const handleFilter = (e:React.ChangeEvent<HTMLInputElement>):Array<Alimento> => {
        const inputValue: string = e.target.value
        setInputSearch(inputValue)
        console.log(filter(inputValue, alimenti))
        return filter(inputValue, alimenti)
    }

    const remove=(ali:Alimento)=>{
        const index:number=alimentiDietaSelected.findIndex((i)=>i.idAlimento===ali.idAlimento)
        if(index!==-1){
            const arrayAggiornato=[...alimentiDietaSelected]
            arrayAggiornato.splice(index,1)
            setAlimentiDieta(arrayAggiornato);
        }
    }

    return (
        <>

            <Modal show = {isOpenProps} className={"backdrop-blur-[10px] relative"} onClose = {() => {
                onClose()
            }} size={'5xl'}>
                <ModalHeader className={"flex"}>
                    <h2>Dieta</h2>
                </ModalHeader>
                <ModalBody className = {"flex flex-col"}>
                    <div className = {"flex justify-between py-2 "}>
                            <div>
                                <Label>Cerca Alimenti</Label>
                                <input className={"rounded h-8 mx-2"} type = {"search"} onChange = {(e) => {
                                    handleFilter(e)
                                }}/>
                            </div>
                            <button
                                onClick={()=>onClose()}
                                className = {"bg-green-500 text-white font-medium rounded px-2"}>Conferma</button>
                        </div>
                        <div className = {"flex"}>
                            <div className={"w-1/2 overflow-y-auto max-h-[600px]"}>
                            {alimenti.filter((al) => al.name.includes(inputSearch.toUpperCase())).map((al) => {
                                return (
                                    <div key = {al.idAlimento} className = {"flex items-center justify-between"}>
                                        <p>{al.name}</p>
                                        <IoMdAdd
                                            onClick = {() => setAlimentiDieta((prevState) => [...prevState, al])}
                                            className = {"w-10 h-5"}/>
                                    </div>
                                )

                            })}
                        </div>
                        <div className = {"border w-1/2 max-h-[600px] overflow-y-auto"}>
                            {
                                alimentiDietaSelected.map((ali: Alimento) => {
                                    return (
                                        <Banner key = {ali.idAlimento}>
                                            <div className = "flex w-full justify-between border-t border-gray-200 bg-gray-50 p-4 dark:border-gray-600 dark:bg-gray-700">
                                                <div className = "mx-auto flex items-center">
                                                    <p className = "flex items-center text-sm font-normal text-gray-500 dark:text-gray-400">
                                                        <span className = "[&_p]:inline">
                                                            {ali.name}
                                                        </span>
                                                    </p>
                                                </div>
                                                <BannerCollapseButton color = "gray" onClick = {() => {
                                                    remove(ali)
                                                }}
                                                                      className = "border-0 bg-transparent text-gray-500 dark:text-gray-400">
                                                    <HiX className = "h-4 w-4"/>
                                                </BannerCollapseButton>
                                            </div>
                                        </Banner>
                                    )
                                })
                            }
                        </div>
                    </div>
                </ModalBody>
            </Modal>

        </>
    );
}