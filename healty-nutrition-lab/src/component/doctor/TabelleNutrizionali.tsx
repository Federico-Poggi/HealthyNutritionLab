import {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {setDataset} from "../../redux/action";
import {Checkbox, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow, Pagination} from "flowbite-react";
import {RootStore} from "../../redux/store";

interface DataSet {
    content: Alimento[]
    totalPages: number
    totalElements: number
}


export interface Alimento {
    idAlimento: number
    name: string
    parteEdibile: number
    kcal: number
    kj: number
    acqua: number
    totProt: number
    protAnimali: number
    protVeg: number
    glucidiTot: number
    lipidiTot: number
    lipidiSaturi: number
    lipidiMonoinsaturi: number
}

export function TabelleNutrizionali() {
    const dataset = useSelector((state: RootStore) => state.alimentiDataSet)
    const alimenti: Alimento[] = dataset.content
    const [pageNumber, setPageNumber] = useState<number>(0);
    const [totalElement, setTotalElement] = useState<number>(0)
    const [currentPage, setCurrentPage] = useState<number>(0)
    const [page, setPage] = useState<number>(0)
    const [size, setSize] = useState<number>(20)
    const [sortedBy, setSortedBy] = useState<string>("idAlimento")


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

    const goNext = (pagex: number) => {
        /*setCurrentPage(pageCurrent+1)*/
        setCurrentPage(pagex)
        setPage(pagex - 1)

    }


    return (
        <>

            <div className = {"text-center flex flex-col w-[100vw]"}>
                <div className={"flex w-[80vw] justify-around py-4"}>
                    <h1 className = {"text-2xl"}>Tabella Nutrizionale</h1>
                    <p className = {"text-white font-medium"}>Pagina: {page + 1} di {pageNumber}</p>
                </div>
                <div className = {"max-h-[70vh] my-auto w-[80vw] rounded-2xl mx-auto overflow-y-auto p-0 border border-gray-700"}>
                    <Table hoverable className = {"h-full w-[80vw] relative border-gray-700 "}>
                        <TableHead className = {"sticky top-0"}>
                            <TableHeadCell className = {"p-4 bg-gray-800"}>
                                <Checkbox/>
                            </TableHeadCell>
                            <TableHeadCell className = {"bg-gray-800 text-gray-400"}>ID</TableHeadCell>
                            <TableHeadCell className = {"bg-gray-800 text-gray-400"}>NAME</TableHeadCell>
                            <TableHeadCell className = {"bg-gray-800 text-gray-400"}>KCAL/100gr</TableHeadCell>
                            <TableHeadCell className = {"bg-gray-800 text-gray-400"}>PROTEINE</TableHeadCell>
                            <TableHeadCell className = {"bg-gray-800 text-gray-400"}>GLUCIDI</TableHeadCell>
                            <TableHeadCell className = {"bg-gray-800 text-gray-400"}>LIPIDI</TableHeadCell>
                        </TableHead>
                        <TableBody className = {"divide-y"}>
                            {/*SE LA DATA DI SCADENZA E' UGUALE ALLA DATA ODIERNA O SUPERATA CAMBIARE LO STATO IN EXPIRIED E DIPACHARE L'AZIONE*/}
                            {alimenti.map(al =>
                                <TableRow key = {al.idAlimento}
                                          className = {"border-gray-700 hover:bg-gray-300 hover:text-gray-700 hover:cursor-pointer bg-transparent text-gray-400"}>
                                    <TableCell className = {"p-4 "}>
                                        <Checkbox/>
                                    </TableCell>
                                    <TableCell className = {"whitespace-nowrap font-medium"}>
                                        {al.idAlimento}
                                    </TableCell>
                                    <TableCell className = {"whitespace-nowrap font-medium"}>
                                        {al.name}
                                    </TableCell>
                                    <TableCell>{al.kcal}</TableCell>
                                    <TableCell>{al.totProt}</TableCell>
                                    <TableCell>{al.glucidiTot}</TableCell>
                                    <TableCell>{al.lipidiTot}</TableCell>
                                </TableRow>
                            )
                            }
                        </TableBody>
                    </Table>
                </div>
                <Pagination currentPage = {currentPage}
                            onPageChange = {goNext}
                            totalPages = {pageNumber}
                            id = {"pagination-nutritionist"}
                            className = {"mt-2"}/>

            </div>
        </>
    );
}