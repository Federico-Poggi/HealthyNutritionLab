import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {IoHomeOutline, IoLogOut} from "react-icons/io5";
import {PiArticleLight} from "react-icons/pi";
import {useDispatch} from "react-redux";
import {notLoggedAction} from "../../redux/action";
import {TbLayoutDashboard} from "react-icons/tb";
import {BiImageAlt} from "react-icons/bi";
import {RxDashboard} from "react-icons/rx";
import {MeDoc, RespImg} from "../../interface/Interface.ts";
import {NewProfileImgModal} from "../userDir/NewProfileImgModal.tsx";


export function SideBarDocNutrition() {
    const NAVIGATE = useNavigate();
    const DISPATCH = useDispatch();
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const urlImg = 'http://localhost:5174/doctor/me/profileImg'
    const uploadImg = 'http://localhost:5174/doctor/me/uploadImg'
    const myProf='http://localhost:5174/doctor/me'

    const token = localStorage.getItem('token')
    const [imgProf, setImgProf] = useState<string>()
    const [myProfile,setMyProfile]=useState<MeDoc>()
    const logOut = () => {
        localStorage.removeItem('token')
        localStorage.removeItem("Role")
        DISPATCH(notLoggedAction())
        NAVIGATE("/")
    }
    useEffect(() => {
        profileImg();
        getMe();
    }, []);

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
                .then((me:MeDoc)=>{
                    setMyProfile(me);
                })
        }catch (err){
            console.log(err);
        }
    }

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


    return (
        <>

            <div className="w-full h-full rounded-xl p-3 bg-[#161616] bg-opacity-[70%]">
                <nav className="h-1/2">
                    <div className="flex items-center pb-5 relative">
                        {imgProf != undefined ?
                            <img src={imgProf} alt="logo"
                                 className="rounded-full w-10 h-10 me-3 text-gray-200 dark:text-gray-700"
                                 aria-hidden="true"/> :
                            <svg className="w-10 h-10 me-3 text-gray-200 dark:text-gray-700" aria-hidden="true"
                                 xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                    d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
                            </svg>
                        }
                        <span>
                            <h3 className="text-[12px]">{myProfile?.name} {myProfile?.surname}</h3>
                            <h3 className="text-[12px]">{myProfile?.role}</h3>
                        </span>

                    </div>
                    <hr/>
                    <aside className="py-2 flex flex-col">
                        <span
                            className="flex items-center py-2 px-1 hover:bg-[#545454] hover:bg-opacity-[8%] hover:text-[#17CF97] rounded-lg">
                            <TbLayoutDashboard/>
                            <p className="px-2 cursor-pointer text-[15px] "
                               onClick={() => NAVIGATE("tabelle-nutrizionali")}
                            >Tabelle Nutrizionali</p>
                        </span>
                        <span
                            className="flex items-center py-2 px-1 hover:bg-[#545454] hover:bg-opacity-[8%] hover:text-[#17CF97] rounded-lg"

                        onClick={()=>{NAVIGATE("write")}}>
                            <PiArticleLight/>
                            <p className="px-2 text-[15px]">Articoli</p>
                        </span>
                        <span
                            className="flex items-center cursor-pointer py-2 px-1 hover:bg-[#545454] hover:bg-opacity-[8%] hover:text-[#17CF97] rounded-lg">
                            <IoHomeOutline/>
                            <p onClick={() => {
                                NAVIGATE("/")
                            }} className="px-2 text-[15px]">Home</p>
                        </span>
                        <span
                            className="flex items-center cursor-pointer py-2 px-1 hover:bg-[#545454] hover:bg-opacity-[8%] hover:text-[#17CF97] rounded-lg">
                            <RxDashboard/>
                            <p onClick={() => {
                                NAVIGATE("/personalArea")
                            }} className="px-2 text-[15px]">Dashboard</p>
                        </span>
                    </aside>

                </nav>
                <div className="divider">Account</div>
                <footer className="">
                    <div className=" flex flex-col w-full">
                        <span
                            className="py-3 px-1 flex items-center hover:bg-[#545454] hover:bg-opacity-[8%] hover:text-[#17CF97] rounded-lg cursor-pointer"
                            onClick={() => setIsOpen(!isOpen)}>
                        <BiImageAlt size={20}/>
                            <p className="px-2 text-[15px]">Immagine Profilo</p>
                            </span>
                        <span
                            onClick={() => {
                                logOut()
                            }}
                            className="flex py-3 px-1 items-center cursor-pointer hover:bg-[#545454] hover:bg-opacity-[8%] hover:text-[#17CF97] rounded-lg">
                        <IoLogOut size={20}/>
                            <p className="px-2 text-[15px]">LogOut</p>
                        </span>
                    </div>
                </footer>
                <NewProfileImgModal setIsOpen={() => setIsOpen(!open)} open={isOpen} setImgProf={() => setImgProf}
                                    url={uploadImg}/>
            </div>
        </>
    );
}