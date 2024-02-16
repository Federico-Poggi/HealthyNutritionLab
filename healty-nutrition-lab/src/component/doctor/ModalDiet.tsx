import {useEffect, useState} from "react";
import {Banner, BannerCollapseButton, Checkbox, Dropdown, Label, Modal, ModalBody, ModalHeader} from "flowbite-react";
import {useDispatch, useSelector} from "react-redux";
import {RootStore} from "../../redux/store";
import {allDataActionAliments} from "../../redux/reducers/alimentiDatasetReducer.ts";
import {Alimento, ModalDietProps} from "../../interface/Interface.ts";
import {Input} from "postcss";
import {HiArrowRight, HiX} from "react-icons/hi";
import {MdPercent} from "react-icons/md";

export function ModalDiet({isOpenProps, onClose}: ModalDietProps) {
    /*STATI*/
    const [isOpen, setIsOpen] = useState<boolean>(isOpenProps)
    const [inputSearch, setInputSearch] = useState<string>("");
    const URLAlimenti = `http://localhost:5174/doctor/aliments`
    const token = localStorage.getItem('token')
    const DISPATCH = useDispatch();
    const [alimentiDietaSelected, setAlimentiDieta] = useState<Array<Alimento>>([])
    useEffect(() => {
        const data = async () => {
            const resp = await fetchAliments()
            /*console.log(resp)*/
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

    const handleFilter = (e) => {
        const inputValue: string = e.target.value
        setInputSearch(inputValue)
        console.log(filter(inputValue, alimenti))
        return filter(inputValue, alimenti)
    }

    const remove=(ali:Alimento)=>{
        const alimentiFiltrati=alimentiDietaSelected.filter((a)=>a.idAlimento!==ali.idAlimento);
        setAlimentiDieta(alimentiFiltrati)
    }
    const changeCheck=(al:Alimento,isChecked:boolean)=>{
        setAlimentiDieta(prevState => isChecked?[...prevState,al]:prevState.filter(it=>it.idAlimento!==al.idAlimento));
    }

    return (
        <>

            <Modal show = {isOpenProps} onClose = {() => {
                onClose()
            }} size = {"7xl"}>
                <ModalHeader>
                    Dieta
                </ModalHeader>
                <ModalBody className = {"flex flex-col"}>

                    <div className = {"flex"}>

                        <div>
                            <div>
                                Alimenti
                                <input type = {"search"} onChange = {(e) => {
                                    handleFilter(e)
                                }}/>
                            </div>
                            {alimenti.filter((al) => al.name.includes(inputSearch.toUpperCase())).map((al) => {
                                return (
                                    <div key = {al.idAlimento} className = {"flex"}>
                                        <Checkbox
                                            checked = {alimentiDietaSelected.includes(al)}
                                            onChange = {(e) => {changeCheck(al,e.target.checked)}}
                                        />
                                        <p>{al.name}</p>
                                    </div>
                                )

                            })}
                        </div>
                        <div className = {"border w-full f-full"}>
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
                                                <BannerCollapseButton color = "gray" onChange = {() => {
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