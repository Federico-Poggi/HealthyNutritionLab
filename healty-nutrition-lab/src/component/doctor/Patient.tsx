import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootStore} from "../../redux/store";
import {getPatientAll} from "../../redux/action";
import {Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow} from "flowbite-react";
import {useNavigate, useParams} from "react-router-dom";
import {CheckState, DocPatient, Pazienti} from "../../interface/Interface.ts";

interface StatePatient{
    patient:[]
}
export function Patient() {
    const [page, setPage] = useState<number>(0)
    const [size, setSize] = useState<number>(20)
    const [sortedBy, setSortedBy] = useState<string>("userId")
    const NAVIGATE=useNavigate();

    const URLPatient = `http://localhost:5174/doctor/me/patients?page=${page}&size=${size}&sortedBy=${sortedBy}`
    const token = localStorage.getItem('token')
    const doctorPatientState:DocPatient[]|string=useSelector((state:RootStore)=>(
        state.user.patient
    ))
    const checkState=():CheckState =>{
        if(Array.isArray(doctorPatientState)){
            return doctorPatientState as Array<DocPatient>
        }
    }

    console.log(doctorPatientState)
    const DISPATCH=useDispatch();

    const getPatient = async () => {
        try {
            const patients = await fetch(URLPatient, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            if(!patients.ok){
                throw new Error("Errore nella fetch")
            }
            return await patients.json();
        }catch (err){
            console.log("Errore: " + err)
        }
    }


    useEffect(()=>{
    const fetchPatient=async ()=>{
        try {
            const p:Pazienti=await getPatient();
            console.log(p)
            DISPATCH(getPatientAll(p.content))
        }catch (err){
            console.log(err);
        }
    }

    fetchPatient()

    },[])

    const {idCustomer}=useParams<string>();
    const nav=(id:number)=>{
        NAVIGATE(`/personalArea/pazienti/${id}`)
    }

    return (
        <>
            <div className = {"text-center flex flex-col"}>
                <div className = {"flex w-[50vw] justify-around py-4 items-center"}>
                    <h1 className = {"text-xl"}>Pazienti</h1>
                    <p className = {"text-white font-medium"}>Pagina: {page + 1} di {/*{pageNumber}*/}</p>
                </div>
                <div className = {"max-h-[70vh]  w-[40vw] rounded-2xl mx-auto overflow-y-auto p-0 border border-gray-700"}>
                    <Table hoverable className = {"h-full relative border-gray-700 "}>
                        <TableHead className = {"sticky top-0"}>
                            <TableHeadCell className = {"bg-gray-800 text-gray-400"}>NAME</TableHeadCell>
                            <TableHeadCell className = {"bg-gray-800 text-gray-400"}>SURNAME</TableHeadCell>
                            <TableHeadCell className = {"bg-gray-800 text-gray-400"}>CELLNUMBER</TableHeadCell>
                            <TableHeadCell className = {"bg-gray-800 text-gray-400"}>EMAIL</TableHeadCell>
                        </TableHead>
                        <TableBody className = {"divide-y p-0"}>
                            {checkState().map(paz =>
                                <TableRow onClick={()=>{
                                    nav(paz.idCliente)
                                }} key = {paz.idCliente}
                                          className = {"border-gray-700 hover:bg-gray-300 hover:text-gray-700 hover:cursor-pointer bg-transparent text-gray-400"}>
                                    <TableCell className = {"whitespace-nowrap font-medium"}>
                                        {paz.name}
                                    </TableCell>
                                    <TableCell>{paz.surname}</TableCell>
                                    <TableCell>{paz.cellNumber}</TableCell>
                                    <TableCell>{paz.email}</TableCell>
                                </TableRow>
                            )
                            }
                        </TableBody>
                    </Table>
                </div>
                {/*<Pagination currentPage = {currentPage}
                            onPageChange = {goNext}
                            totalPages = {pageNumber}
                            id = {"pagination-nutritionist"}
                            className = {"mt-2"}/>*/}

            </div>
        </>
    );
}