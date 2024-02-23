import {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {setDataset} from "../../redux/action";
import {SlArrowRight} from "react-icons/sl";
import {SlArrowLeft} from "react-icons/sl";
import {RootStore} from "../../redux/store";
import {Alimento, DataSet} from "../../interface/Interface.ts";
import {IoWater} from "react-icons/io5";
import {PiGrains} from "react-icons/pi";
import { GiFat } from "react-icons/gi";
import {TbMeat} from "react-icons/tb";

export function TabelleNutrizionali() {
    const dataset = useSelector((state: RootStore) => state.alimentiDataSet)
    const alimenti: Array<Alimento> = dataset.content
    const [pageNumber, setPageNumber] = useState<number>(0);
    const [totalElement, setTotalElement] = useState<number>(0)
    const [currentPage, setCurrentPage] = useState<number>(0)
    const [page, setPage] = useState<number>(0)
    const [size, setSize] = useState<number>(20)
    const [sortedBy, setSortedBy] = useState<string>("idAlimento")
    const [allAliments, setAllAliments] = useState<Array<Alimento>>([]);
    const [alimentFiltered, setAlimentFiltered] = useState<Array<Alimento>>([])
    const [inputSearch, setInputSearch] = useState<string>("");
    const [alimentoSelected, setAlimentoSelected] = useState<Alimento>()
    const [isSelected, setIsSeleted] = useState<boolean>(false)

    const URLAlimenti = `http://localhost:5174/doctor/aliments`
    const URLDataSet = `http://localhost:5174/doctor/nutritionist/aliments?page=${page}&size=${size}&sortedBy=${sortedBy}`;
    useLocation().pathname
    const token = localStorage.getItem('token')
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data: DataSet = await getDataSet();
                dispatch(setDataset(data));
                setPageNumber(() => data.totalPages)
                setTotalElement(() => data.totalElements)
                console.log(data)
            } catch (error) {
                console.error("Errore nella fetch:", error);
            }
        };
        fetchData();

    }, [page])
    useEffect(() => {
        const data = async () => {
            const resp = await fetchAliments()
            setAllAliments(resp);
        }
        data()
    }, []);
    const handleFilter = (e) => {
        const inputValue: string = e.target.value.toLowerCase();
        const filtered = allAliments?.filter(al => al.name.toLowerCase().includes(inputValue))
        setAlimentFiltered(filtered)
    }
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

    const getDataSet = async () => {
        const response = await fetch(URLDataSet, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        if (!response.ok) {
            throw new Error("Errore nella fetch");
        }
        const resp = await response.json()
        console.log(resp)
        return resp;

    }


    return (
        <>
            <div
                className="max-h-[99%] bg-[#413F42] relative w-1/2 bg-opacity-35 rounded-xl px-2 overflow-y-auto py-3">
                <div
                    className="p-3 w-full bg-[#545454] sticky top-0 bg-opacity-[100%] z-30 rounded-xl flex items-center justify-between">
                    <h2>Tabella Alimenti</h2>
                    <div className="flex items-center">
                        <span
                            onClick={() => {
                                page == 0 ? setPage(page) : setPage(page - 1)
                            }}
                            className="cursor-pointer rounded-full hover:bg-gray-800 w-8 h-8 flex items-center">
                        <SlArrowLeft
                            className="mx-auto"
                        />
                        </span>
                        <p className={"text-white font-medium px-5"}>Pagina: {page + 1} di {pageNumber}</p>
                        <span
                            onClick={() => {
                                page == pageNumber - 1 ? setPage(page) : setPage(page + 1)
                            }}
                            className=" cursor-pointer rounded-full hover:bg-gray-800 w-8 h-8 flex items-center">
                        <SlArrowRight
                            className="mx-auto"
                        />
                        </span>
                    </div>
                </div>
                <table className="table table-auto w-full mt-5 ">
                    <thead>
                    <tr className="text-center">
                        <th className="">ID</th>
                        <th className="desktop:w-[300px]">ALIMENTO</th>
                        <th className="">KCAL/100</th>
                        <th className="">PROTEINE</th>
                        <th className="">GLUCIDI</th>
                        <th className="">LIPIDI</th>
                    </tr>
                    </thead>
                    <tbody>
                    {alimenti.map((al) => (
                        <tr className="text-center hover:bg-[#545454] hover:bg-opacity-[8%] hover:text-[#17CF97] font-medium text-[90%] li cursor-pointer transition-all duration-100]"
                            key={al.idAlimento}
                        >
                            <td>{al.idAlimento}</td>
                            <td>{al.name}</td>
                            <td>{al.kcal}</td>
                            <td>{al.totProt}</td>
                            <td>{al.glucidiTot}</td>
                            <td>{al.lipidiTot}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <div
                className="max-h-[99%] bg-[#413F42] relative w-1/2 bg-opacity-35 rounded-xl ml-2 px-2 overflow-y-auto py-3">
                <div
                    className="p-3 w-full bg-[#545454] sticky top-0 bg-opacity-[100%] z-30 rounded-xl flex items-center justify-between">
                    <h2>Cerca Alimenti</h2>
                    <input type="search"
                           className="rounded-xl h-1/2 bg-[#413F42] border-0 focus:border-0 focus:outline-none focus:ring-0 text-[13px] appearance-none"
                           placeholder="Cerca alimento..."
                           onChange={handleFilter}
                    />
                </div>
                <div
                    className="w-full  h-[92%] mt-2 rounded-xl flex flex-col px-5  bg-transparent justify-evenly">
                    <div className="w-full h-1/2  overflow-y-auto p-2 gap-y-2 gap-x-2 grid  grid-cols-2 flex-wrap">
                        {alimentFiltered?.map((al) => (
                            <div onClick={() => {
                                setAlimentoSelected(al)
                                setIsSeleted(true)
                            }} key={al.idAlimento}
                                 className={`ring-1 ring-green-800 cursor-pointer text-[12px] shadow-lg rounded-xl bg-green-500 bg-opacity-10 h-[50px] flex items-center justify-center`}>
                                {al.name}
                            </div>
                        ))}
                    </div>
                    <div className="divider divider-primary">Valori Nutrizionali</div>
                    <div className="w-full h-1/2 border">
                        {alimentoSelected &&
                            <>
                                <h2 className="text-center">{alimentoSelected.name}</h2>
                                <table className="mx-auto w-1/2 table">
                                    <tbody>
                                    <tr className="text-center border-0">
                                        <th>Acqua</th>
                                        <td className="flex items-center text-center">
                                            <label><IoWater color="#2DC5BE"/></label>
                                            <p className="px-2">{alimentoSelected.acqua}%</p>
                                        </td>
                                    </tr>
                                    <tr className="border-0">
                                        <th className="text-center ">Carboidrati</th>
                                        <td className="flex items-center text-center">
                                            <label><PiGrains color="#8E8603"/></label>
                                            <p className="px-2">{alimentoSelected.glucidiTot}%</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th className="text-center">Lipidi</th>
                                        <td className="flex items-center text-center">
                                            <label><GiFat color="#E77FAA"/></label>
                                            <p className="px-2">{alimentoSelected.lipidiTot}%</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th className="text-center">Proteine</th>
                                        <td className="flex items-center text-center">
                                            <label><TbMeat color="#935E60"/></label>
                                            <p className="px-2">{alimentoSelected.lipidiTot}%</p>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </>
                        }

                    </div>
                </div>
            </div>
        </>
    );
}