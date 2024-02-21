import {IoMdArrowBack} from "react-icons/io";
import {IoMdArrowForward} from "react-icons/io";
import {useState} from "react";
import {isToday} from "date-fns";
import {Reservations} from "./Reservations.tsx";

export const Calendar = () => {
    const date = new Date()
    const [currentDate, setCurrentDate] = useState(date)
    const [mothSelected, setMoth] = useState(date.getMonth() + 1)
    const [year, setYear] = useState(date.getFullYear())
    const MESI = ["GENNAIO", "FEBBRAIO", "MARZO", "APRILE", "MAGGIO", "GIUGNO", "LUGLIO", "AGOSTO", "SETTEMBRE", "OTTOBRE", "NOVEMBRE", "DICEMBRE"];

    const day = (year: number, moth: number) => {
        return new Date(year, moth, 0).getDate();
    }

    const firstDAy = (date: Date) => {
        return new Date(date.getFullYear(), date.getMonth(), 1).getDate();
    }
    const getCalendar = () => {
        const days = day(year, mothSelected);
        const first = 1

        const cal = [];

        for (let day = first; day <= days; day++) {
            cal.push(day)
        }
        return cal;
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
                        {getCalendar().map((d) => <p
                            className={`${isToday(new Date(year, mothSelected - 1, d)) ? "bg-gray-800 bg-opacity-70 rounded-xl" : null} p-2 text-center`}
                            key={d}>
                            {d}
                        </p>)}
                    </div>
                </div>
                <Reservations/>
            </div>
        </>
    );
};