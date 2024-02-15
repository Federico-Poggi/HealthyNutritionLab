import {useLocation, useParams} from "react-router-dom";
import {useEffect, useState} from "react";


interface Paziente {
    idCliente: number
    name: string
    surname: string
    cellNumber: string
    email: string
    diets: []
    trainingPlans: []
}

export function PazientePage() {
    const {idCustomer} = useParams()
    const custFetchURL = `http://localhost:5174/user/${idCustomer}`
    const LOCATION = useLocation()
    const token = localStorage.getItem('token')
    const [paziente, setPaziente] = useState<Paziente>()

    useEffect(() => {
        const fetch = async () => {
            try {
                const p: Paziente = await getPatient();
                console.log(p);
                setPaziente(p);
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

    return (
        <>
            <div className = {"text-white desktop:w-1/2 mx-auto"}>
                <h1>Scheda Paziente</h1>

            </div>


        </>
    );
}