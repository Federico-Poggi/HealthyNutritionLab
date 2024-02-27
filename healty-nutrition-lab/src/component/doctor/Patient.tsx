import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootStore} from "../../redux/store";
import {getPatientAll} from "../../redux/action";
import {useNavigate} from "react-router-dom";
import {CheckState, DocPatient, Pazienti} from "../../interface/Interface.ts";


export function Patient() {
    const [page, setPage] = useState<number>(0)
    const [size, setSize] = useState<number>(20)
    const [sortedBy, setSortedBy] = useState<string>("userId")
    const NAVIGATE = useNavigate();
    const URLPatient = `http://localhost:5174/doctor/me/patients?page=${page}&size=${size}&sortedBy=${sortedBy}`
    const token = localStorage.getItem('token')
    const doctorPatientState: DocPatient[] | string = useSelector((state: RootStore) => (
        state.user.patient
    ))
    const checkState = (): CheckState => {
        if (Array.isArray(doctorPatientState)) {
            return doctorPatientState as Array<DocPatient>
        }
    }

    console.log(doctorPatientState)
    const DISPATCH = useDispatch();

    const getPatient = async () => {
        try {
            const patients = await fetch(URLPatient, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            if (!patients.ok) {
                throw new Error("Errore nella fetch")
            }
            return await patients.json();
        } catch (err) {
            console.log("Errore: " + err)
        }
    }


    useEffect(() => {
        const fetchPatient = async () => {
            try {
                const p: Pazienti = await getPatient();
                console.log(p)
                DISPATCH(getPatientAll(p.content))
            } catch (err) {
                console.log(err);
            }
        }

        fetchPatient()

    }, [])

    const nav = (id: number) => {
        NAVIGATE(`/personalArea/pazienti/${id}`)
    }

    return (
        <>
            <div className="max-h-[99%] bg-[#413F42] w-[33%] bg-opacity-35 rounded-xl p-2 overflow-y-auto">
                <h2 className="p-3 bg-[#545454] bg-opacity-[30%] rounded-xl">I tuoi Pazienti</h2>
                <table className="table table-auto w-full mt-5">
                    <thead>
                    <tr className="text-center">
                        <th>NOME</th>
                        <th>COGNOME</th>
                        <th>N.CELLULARE</th>
                        <th>EMAIL</th>
                    </tr>
                    </thead>
                    <tbody>
                    {checkState().map((paz) => (
                        <tr className="text-center hover:bg-[#545454] hover:bg-opacity-[8%] hover:text-[#17CF97] font-medium text-[90%] li cursor-pointer transition-all duration-100]"
                            key={paz.idCliente}
                            onClick={() => {
                                nav(paz.idCliente)
                            }}
                        >
                            <td>{paz.name}</td>
                            <td>{paz.surname}</td>
                            <td>{paz.cellNumber}</td>
                            <td>{paz.email}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}