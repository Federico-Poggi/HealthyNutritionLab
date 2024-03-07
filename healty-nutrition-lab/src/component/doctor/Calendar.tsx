import {IoMdArrowBack} from "react-icons/io";
import {IoMdArrowForward} from "react-icons/io";
import {useEffect, useState} from "react";
import {format, isToday} from "date-fns";
import {CustomerReservation, DoctorReservation, Reservation, ReservationType} from "../../interface/Interface.ts";

export type ReservationPage = DoctorReservation | CustomerReservation;

export const Calendar = () => {
    const date = new Date()
    const [mothSelected, setMoth] = useState(date.getMonth() + 1)
    const [year, setYear] = useState(date.getFullYear())
    const MESI = ["GENNAIO", "FEBBRAIO", "MARZO", "APRILE", "MAGGIO", "GIUGNO", "LUGLIO", "AGOSTO", "SETTEMBRE", "OTTOBRE", "NOVEMBRE", "DICEMBRE"];
    const [page, setPage] = useState<number>(0);
    const [size, setSize] = useState<number>(20);
    const [sortedBy, setSortedBy] = useState<string>("id");
    const [reservation, setReservation] = useState<Reservation>()
    const URLReservation = `http://localhost:5174/doctor/me/reservation?page=${page}&size=${size}&sortedBy=${sortedBy}`
    const token = localStorage.getItem('token');
    const day = (year: number, moth: number) => {
        return new Date(year, moth, 0).getDate();
    }
    useEffect(() => {
        reservationFetch();

    }, []);
    console.log()

    const countAppointmentsForDate = (year: number, month: number, day: number) => {

        return reservation?.content.filter(appointment => {
            const DAYAPP = appointment.reservationDate[2];
            const MONTHAPP = appointment.reservationDate[1];
            const YEARAPP = appointment.reservationDate[0];
            const appointmentDate = new Date(YEARAPP, MONTHAPP, DAYAPP); // Supponendo che 'date' sia la chiave che contiene la data dell'appuntamento
            return (
                appointmentDate.getFullYear() === year &&
                appointmentDate.getMonth() === month - 1 &&
                appointmentDate.getDate() === day
            );
        }).length;
    };
    const getCalendar = () => {

        const days = day(year, mothSelected);
        const first = 1

        const cal = [];

        for (let day = first; day <= days; day++) {
            const date = new Date(year, mothSelected - 1, day);
            const app = countAppointmentsForDate(year, mothSelected, day);
            cal.push({day, date, app})
        }
        return cal;
    }

    const reservationFetch = async () => {
        try {
            const all = await fetch(URLReservation, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            if (!all.ok) {
                return all.json();
            } else {
                setReservation(await all.json());
            }

        } catch (err) {
            console.log(err);
        }
    }

    const getDat=(number:number[])=>{
        const date=new Date(number[0],number[1]-1,number[2]);
        const formatted=format(date,'dd-MM-yyyy');
        return formatted;
    }
    return (
        <>
            <div className="max-h-[50%] w-full bg-[#413F42] bg-opacity-35 rounded-xl p-3 flex">
                <div className="w-1/3 h-full bg-[#413F42] bg-opacity-50 rounded-xl">
                    <span className="flex items-center justify-evenly py-5">
                        <IoMdArrowBack onClick={() => {
                            if (mothSelected == 1) {
                                setMoth(12)
                                setYear(year - 1)
                            } else {
                                setMoth(mothSelected - 1)
                            }
                        }}/>
                        <p>{MESI[mothSelected - 1]} {year}</p>
                        <IoMdArrowForward onClick={() => {
                            if (mothSelected == 12) {
                                setMoth(1)
                                setYear(year + 1)
                            } else {
                                setMoth(mothSelected + 1)
                            }
                        }}/>
                    </span>
                    <div className="grid grid-cols-6 gap-2 p-3">
                        {getCalendar().map((d) => <><p
                            className={`${isToday(new Date(year, mothSelected - 1, d.day)) ? "bg-gray-800 bg-opacity-70 rounded-xl" : null} p-2 text-center`}
                            key={d.day}>
                            {d.day}
                        </p>
                            </>)}
                    </div>
                </div>
                {/*<Reservations content={reservation}/>*/}
                <div className="bg-[#413F42] bg-opacity-35 rounded-xl flex-grow mx-2 p-3 ">
                    <h2>Appuntamenti</h2>
                    {reservation?.content.map((c)=>(<>
                        <div key={c} className="bg-[#3d4159] bg-opacity-30 p-2 rounded-xl my-2 ">
                        <span className="flex">
                        <p className="text-[12px] w-1/2">{getDat(c.reservationDate)}</p>
                        </span>
                            <span className="flex">
                        <p className="text-[12px] w-1/2">{c.nameCustomer} {c.surnameCustomer}</p>
                        <p className="text-[12px] w-1/2">{c.emailCustomer}</p>
                        </span>
                        </div>

                    </>))}
                </div>
            </div>
        </>
    );
};