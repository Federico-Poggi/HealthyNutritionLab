import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppStore, RootStore} from "../../redux/store";
import {getPatientAll} from "../../redux/action";

interface Pazienti{
    content:[]
}
export function Patient() {
    const [page, setPage] = useState<number>(0)
    const [size, setSize] = useState<number>(20)
    const [sortedBy, setSortedBy] = useState<string>("userId")


    const URLPatient = `http://localhost:5174/doctor/me/patients?page=${page}&size=${size}&sortedBy=${sortedBy}`
    const token = localStorage.getItem('token')
    const doctorPatientState=useSelector((state:RootStore)=>(
        state.user.patient
    ))
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
            const response=await patients.json();
            console.log(response)
            return response;
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


    return (
        <>


        </>
    );
}