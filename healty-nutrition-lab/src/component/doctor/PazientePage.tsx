import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {
    Badge
} from "flowbite-react";


import {AssignDiet, Diet, Paziente} from "../../interface/Interface.ts";
import {NewDiet} from "./NewDiet.tsx";
import {HiX} from "react-icons/hi";
import {format, formatDate, isAfter, isBefore} from "date-fns";

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

    const convertToDate=(dateArray:number[]):string=>{
        const year=dateArray[0];
        const month=dateArray[1]-1;
        const day=dateArray[2];
        const date:Date=new Date(year,month,day)
        return format(date,"dd-MM-yyyy")
    }

    const checkData = (expiredDate: number[]) => {
        const current = new Date();
        const date=new Date(expiredDate[0],expiredDate[1]-1,expiredDate[2])
        if (isAfter(date, current)) {
            return <Badge className={"justify-center bg-green-500 text-green-950"} color={"success"}>IN USE</Badge>
        } else {
            return <Badge className={"justify-center text-red-900 bg-red-400"}
                          color={"failure"}>EXPIRED</Badge>
        }
    }

    const deleteDiet = async (idDieta: number) => {
        const deleteFetch = `http://localhost:5174/doctor/diet?idDieta=${idDieta}`
        await fetch(deleteFetch, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
    }

    return (
        <>
            <div className="max-h-[99%] bg-[#413F42] w-2/5 bg-opacity-35 rounded-xl p-2 overflow-y-auto">
                <div className="p-3 bg-[#545454] bg-opacity-[30%] rounded-xl flex">
                    <h2 className="w-1/3 text-center">DIETE</h2>
                    <p className="w-1/3 text-center">Paziente: {paziente.name} {paziente.surname}</p>
                    <p className="w-1/3 text-center">Id: {paziente.idCliente}</p>
                </div>
                <table className="table table-auto w-full mt-5">
                    <thead>
                    <tr className="text-center">
                        <th>TIPO DIETA</th>
                        <th>STATO DIETA</th>
                        <th>DATA ASSEGNAZIONE</th>
                        <th>DATA SCADENZA</th>
                        <th>KCAL TOT</th>
                        <th>ELIMINA</th>
                    </tr>
                    </thead>
                    <tbody>
                    {diete.map((d) => (
                        <tr className="text-center font-medium text-[90%] li cursor-pointer transition-all duration-100]"
                            key={d.dietId}
                        >
                            <td>{d.dietType}</td>
                            <td>{checkData(d.expirationDate)}</td>
                            <td>{convertToDate(d.issueDate)}</td>
                            <td>{convertToDate(d.expirationDate)}</td>
                            <td>{d.kcalTot}</td>
                            <td><HiX
                                onClick={() => {
                                    deleteDiet(d.dietId).then(() => window.location.reload())
                                }}
                                className="hover:text-[#17CF97] mx-auto"/></td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <div className="max-h-[99%] w-2/5 mx-auto bg-[#413F42] bg-opacity-35 rounded-xl p-3 flex relative">
                <NewDiet idCliente={paziente.idCliente}
                         name={paziente.name}
                         surname={paziente.surname}
                         email={paziente.email}
                         cellNumber={paziente.cellNumber}
                         diets={paziente.diets}
                         trainingPlans={paziente.trainingPlans}
                />
            </div>
        </>
    );
}