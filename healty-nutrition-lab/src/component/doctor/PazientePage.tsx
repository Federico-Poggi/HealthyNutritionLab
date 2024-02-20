import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {
    Badge, Dropdown,
    Label,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeadCell,
    TableRow
} from "flowbite-react";


import {AssignDiet, Diet, Paziente} from "../../interface/Interface.ts";
import {NewDiet} from "./NewDiet.tsx";
import {HiX} from "react-icons/hi";

export function PazientePage() {
    const {idCustomer} = useParams()
    const custFetchURL = `http://localhost:5174/user/${idCustomer}`
    const token = localStorage.getItem('token')
    const [paziente, setPaziente] = useState<Paziente>({
        idCliente: null,
        name: '',
        surname: '',
        cellNumber: '',
        email: '',
        diets: [],
        trainingPlans: []
    })
    const [diete, setDiete] = useState<Array<Diet>>([])




    useEffect(() => {
        const fetch = async () => {
            try {
                const p: Paziente = await getPatient();
                console.log(p);
                setPaziente(p);
                setDiete(p.diets)
            } catch (err) {
                console.log(err)
            }
        }
        fetch();
    }, []);
    const getPatient = async () => {
        try {
            const cust = await fetch(custFetchURL, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            if (!cust.ok) {
                return await cust.json()
            } else {
                const res = await cust.json();
                return res;
            }
        } catch (err) {
            throw new Error("Erorre:");
        }
    }
    const date =new Date()
    const checkData = (expiredDate: string) => {
        const year=date.toISOString().split("T")[0]
        if (expiredDate>=year) {
            return <Badge className = {"justify-center bg-green-500 text-green-950"} color = {"success"}>IN
                                                                                                         USE</Badge>
        } else {
            return <Badge className = {"justify-center text-red-900 bg-red-400"}
                          color = {"failure"}>EXPIRED</Badge>
        }
    }

    const deleteDiet=async (idDieta:number)=>{
        const deleteFetch=`http://localhost:5174/doctor/diet?idDieta=${idDieta}`
        await fetch(deleteFetch,{
            method:'DELETE',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
    }

    return (
        <>
            <div className = {"flex items-center h-[100vh] justify-around flex-grow"}>
                <div className = {"max-w-[50%]  rounded-2xl my-auto mx-10"}>
                    <div className = {"text-white desktop:max-w-[100%] mx-auto my-2 max-h-[70%] overflow-y-auto px-3"}>
                        <h1 className = {"text-center mb-10"}>DIETE CLIENTE</h1>
                        <div className = {"flex items-center justify-evenly"}>
                    <span className = {"flex items-center"}>
                        <Label className = {"text-white"}>Nome paziente: </Label>
                        <p className = {"font-medium text-[17px] px-3"}>{paziente?.name}</p>
                    </span>
                            <span className = {"flex items-center"}>
                        <Label className = {"text-white"}>Cognome:</Label>
                        <p className = {"font-medium text-[17px] px-3"}>{paziente?.surname}</p>
                    </span>
                            <span className = {"flex items-center"}>
                    <Label className = {"text-white"}>Email:</Label>
                    <p className = {"font-medium text-[17px] px-3"}>{paziente?.email}</p>
                    </span>
                        </div>
                        {/*SEZIONE DIETE*/}
                        <div className = {"max-h-[70vh] rounded-2xl mx-auto overflow-y-auto p-0 border border-gray-700 mt-5"}>
                            <Table hoverable className = {"h-full  relative border-gray-700 "}>
                                <TableHead className = {"sticky top-0"}>
                                    {/*<TableHeadCell className = {"bg-gray-800 text-gray-400"}>ID</TableHeadCell>*/}
                                    <TableHeadCell className = {"bg-gray-800 text-gray-400"}>TIPO DIETA</TableHeadCell>
                                    <TableHeadCell className = {"bg-gray-800 text-gray-400"}>STATO DIETA</TableHeadCell>
                                    <TableHeadCell className = {"bg-gray-800 text-gray-400"}>DATA
                                                                                             ASSEGNAZIONE</TableHeadCell>
                                    <TableHeadCell className = {"bg-gray-800 text-gray-400"}>DATA
                                                                                             SCADENZA</TableHeadCell>
                                    <TableHeadCell className = {"bg-gray-800 text-gray-400"}>KCAL TOTALI</TableHeadCell>
                                    <TableHeadCell className={"bg-gray-800 text-gray-400"}></TableHeadCell>
                                </TableHead>
                                <TableBody className = {"divide-y p-0"}>
                                    {diete.map(d => {
                                        return <TableRow key = {d.dietId}>
                                            <TableCell>{d.dietType}</TableCell>
                                            <TableCell>
                                                {checkData(d.actually)}
                                            </TableCell>
                                            <TableCell>{d.issueDate}</TableCell>
                                            <TableCell>{d.expirationDate}</TableCell>
                                            <TableCell>{d.kcalTot}</TableCell>
                                            <TableCell onClick={()=>{
                                                deleteDiet(d.dietId).then(() => window.location.reload())
                                            }}><HiX></HiX></TableCell>
                                        </TableRow>
                                    })
                                    }
                                </TableBody>
                            </Table>

                        </div>
                    </div>

                </div>

                <NewDiet idCliente = {paziente.idCliente}
                         name = {paziente.name}
                         surname = {paziente.surname}
                         email = {paziente.email}
                         cellNumber = {paziente.cellNumber}
                         diets={paziente.diets}
                         trainingPlans={paziente.trainingPlans}
                />
            </div>
        </>
    );
}