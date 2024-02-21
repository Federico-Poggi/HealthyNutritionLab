import {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {setDataset} from "../../redux/action";
import {Checkbox, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow, Pagination} from "flowbite-react";
import {SlArrowRight} from "react-icons/sl";
import {SlArrowLeft} from "react-icons/sl";

import {RootStore} from "../../redux/store";
import {Alimento, DataSet} from "../../interface/Interface.ts";

export function TabelleNutrizionali() {
    const dataset = useSelector((state: RootStore) => state.alimentiDataSet)
    const alimenti: Array<Alimento> = dataset.content
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

            {/*<div className = {"text-center flex flex-col"}>
                <div className = {"flex w-[80vw] justify-around py-4"}>
                    <h1 className = {"text-2xl"}>Tabella Nutrizionale</h1>
                    <p className = {"text-white font-medium"}>Pagina: {page + 1} di {pageNumber}</p>
                </div>
                <div className = {"max-h-[70vh] my-auto w-[80vw] rounded-2xl mx-auto overflow-y-auto p-0 border border-gray-700"}>
                    <Table hoverable className = {"h-full w-[80vw] relative border-gray-700 "}>
                        <TableHead className = {"sticky top-0"}>
                            <TableHeadCell className = {"bg-gray-800 text-gray-400"}>ID</TableHeadCell>
                            <TableHeadCell className = {"bg-gray-800 text-gray-400"}>NAME</TableHeadCell>
                            <TableHeadCell className = {"bg-gray-800 text-gray-400"}>KCAL/100gr</TableHeadCell>
                            <TableHeadCell className = {"bg-gray-800 text-gray-400"}>PROTEINE</TableHeadCell>
                            <TableHeadCell className = {"bg-gray-800 text-gray-400"}>GLUCIDI</TableHeadCell>
                            <TableHeadCell className = {"bg-gray-800 text-gray-400"}>LIPIDI</TableHeadCell>
                        </TableHead>
                        <TableBody className = {"divide-y"}>
                            {alimenti.map(al =>
                                <TableRow key = {al.idAlimento}
                                          className = {"border-gray-700 hover:bg-gray-300 hover:text-gray-700 hover:cursor-pointer bg-transparent text-gray-400"}>
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

            </div>*/}
            <div
                className="max-h-[99%] bg-[#413F42] relative w-2/3 bg-opacity-35 rounded-xl px-2 overflow-y-auto py-3 mx-auto">
                <div
                    className="p-3 w-[66%] bg-[#545454] bg-opacity-[100%] z-30 rounded-xl fixed flex items-center justify-between">
                    <h2>Tabella Alimenti</h2>
                    <div className="flex items-center">
                        <span className="rounded-full hover:bg-gray-800 w-8 h-8 flex items-center">
                        <SlArrowLeft
                            className="mx-auto"
                            onClick={() => {
                                page == 0 ? setPage(page) : setPage(page - 1)
                            }}/>
                        </span>
                        <p className={"text-white font-medium px-5"}>Pagina: {page + 1} di {pageNumber}</p>
                        <span className="rounded-full hover:bg-gray-800 w-8 h-8 flex items-center">
                        <SlArrowRight
                            className="mx-auto"
                            onClick={() => {
                            page == pageNumber - 1 ? setPage(page) : setPage(page + 1)
                        }}/>
                        </span>
                    </div>
                </div>
                <table className="table table-auto w-full mt-16 ">
                    <thead>
                    <tr className="text-center">
                        <th>ID</th>
                        <th>ALIMENTO</th>
                        <th>KCAL/100</th>
                        <th>PROTEINE</th>
                        <th>GLUCIDI</th>
                        <th>LIPIDI</th>
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
        </>
    );
}