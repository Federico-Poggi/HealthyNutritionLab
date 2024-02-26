import {CardD} from "./CardD.tsx";
import {useEffect, useState} from "react";
import {notLoggedAction} from "../../redux/action";
import {RespImg} from "../../interface/Interface.ts";

export function CardDoc() {
    const urlImg='http://localhost:5174/doctor/me/profileImg'
    const token = localStorage.getItem('token')
    const [imgProf,setImgProf]=useState<string>()
    useEffect( () => {
        profileImg();
    }, []);

    const profileImg= async ()=>{
        try {
            const resp=await fetch(urlImg,{
                method:'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            if(!resp.ok){
                throw new Error("error")
            }else{
                const img:RespImg= await resp.json();
                setImgProf(img.imgUrl);
                return img;
            }
        }catch (Err){
            console.log(Err)
        }
    }
    return (
        <>
            <div className="max-h-[50%] w-full h-[48%] mt-2 bg-[#413F42] bg-opacity-35 rounded-xl p-3 flex justify-around">
                <CardD role="NUTRITIONIST" name="FEDERICO" surname="POGGI" email="federicoPoggi2@gmail.com" img={imgProf}/>
                <CardD role="NUTRITIONIST" name="FEDERICO" surname="POGGI" email="federicoPoggi2@gmail.com" img={imgProf}/>
            </div>
        </>
    );
}