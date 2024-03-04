import Logo from "../../assets/Logo.svg";
import {useEffect, useState} from "react";
import {MeUser, RespImg} from "../../interface/Interface.ts";

export const NavDoctor = () => {
    const [imgProf, setImgProf] = useState<string>()
    const urlImg = 'http://localhost:5174/doctor/me/profileImg'
    const token = localStorage.getItem('token')
    const role=localStorage.getItem('Role');
    const [profileUser, setProfileUser]=useState<MeUser>()
    const myProf=`http://localhost:5174/user/me`
    useEffect(() => {
        if(role=="CUSTOMER"){
            getMe();
        }else{
            profileImg();
        }
    }, []);
    const profileImg = async () => {
        try {
            const resp = await fetch(urlImg, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            if (!resp.ok) {
                throw new Error("error")
            } else {
                const img: RespImg = await resp.json();
                setImgProf(img.imgUrl);
                return img;
            }
        } catch (Err) {
            console.log(Err)
        }
    }

    const getMe=()=>{
        try {
            fetch(myProf,{
                method:'GET',
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
                .then((e)=>{
                    if(e.ok){
                        return e.json();
                    }
                })
                .then((me:MeUser)=>{
                    setProfileUser(me);
                })
        }catch (err){
            console.log(err);
        }
    }

    return (
        <>
            <nav
                className="w-full flex justify-between px-10 py-4 shadow-2xl fixed top-0 z-30 bg-[#232121] bg-opacity-[80%]">
                <div className="flex items-center shadow-[rgba(0,_0,_0,_0.2)_0px_60px_40px_-7px]">
                    <img src={Logo}
                         className={"brand-img mr-2 desktop:w-[30px] tablet:w-[20px] phone:w-[17px]"}
                         alt={"logo"}/>
                    <h3>HealthyNutritionLab</h3>
                </div>
                {role == "CUSTOMER" ?(profileUser?.urlImg!=undefined? <img src={profileUser?.urlImg} alt="logo"
                                           className="rounded-full w-10 h-10 me-3 text-gray-200 dark:text-gray-700"
                                           aria-hidden="true"/> :
                    <svg className="w-10 h-10 me-3 text-gray-200 dark:text-gray-700" aria-hidden="true"
                         xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path
                            d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
                    </svg>): (imgProf != undefined ?
                    <img src={imgProf} alt="logo"
                         className="rounded-full w-10 h-10 me-3 text-gray-200 dark:text-gray-700"
                         aria-hidden="true"/> :
                    <svg className="w-10 h-10 me-3 text-gray-200 dark:text-gray-700" aria-hidden="true"
                         xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path
                            d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
                    </svg>)}
            </nav>
        </>
    );
};