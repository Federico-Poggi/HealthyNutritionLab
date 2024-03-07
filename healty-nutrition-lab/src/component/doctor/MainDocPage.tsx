import {Patient} from "./Patient.tsx";
import {Calendar} from "./Calendar.tsx";
import {AllMyArticle, MyArticle} from "./MyArticle.tsx";
import {useEffect, useState} from "react";
import {Reservation} from "../../interface/Interface.ts";


export const MainDocPage = () => {
    const [page, setPage] = useState<number>(0);
    const [size, setSize] = useState<number>(20);
    const [sortedBy, setSortedBy] = useState<string>("id");
    const [myArticle, setMyArticle] = useState<AllMyArticle>()


    const UrlMyArticles = `http://localhost:5174/api/article/me/myArticle?page=${page}&size=${size}&sortedBy=${sortedBy}`
    const token = localStorage.getItem('token');

    useEffect(() => {
        allMyArticle();

    }, []);

    const allMyArticle = async () => {
        try {
            const all = await fetch(UrlMyArticles, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            if (!all.ok) {
                return all.json();
            } else {
                setMyArticle(await all.json())
            }
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        allMyArticle();
    }, []);



    return (
        <>
            <div className={"flex w-[100%]"}>
                <Patient/>
                <div className="flex flex-col grow px-2">
                    <Calendar/>
                    <div className="w-full h-1/2 flex justify-center items-center bg-[#413F42] bg-opacity-35 rounded-xl mt-3">
                        <h2 className="text_fill">HealthyNutritionLab</h2>
                    </div>
                </div>
            </div>
        </>
    );
};