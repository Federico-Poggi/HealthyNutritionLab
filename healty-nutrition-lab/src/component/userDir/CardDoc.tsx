import {CardD} from "./CardD.tsx";
import {useEffect, useState} from "react";
import {MyDoc, RespImg, RootMe} from "../../interface/Interface.ts";
import {NoAssignedDoc} from "./NoAssignedDoc.tsx";

export function CardDoc() {
    const urlImg = 'http://localhost:5174/doctor/me/profileImg'
    const meProfile = 'http://localhost:5174/user/me/profile'
    const myDocFetch = 'http://localhost:5174/user/me/myDoc'
    const token = localStorage.getItem('token')
    const [imgProf, setImgProf] = useState<string>()
    const [myProf, setMyProf] = useState<RootMe>({
        birthday: undefined,
        cellNumber: "",
        diets: [],
        email: "",
        name: "",
        password: "",
        role: "",
        surname: "",
        trainingPlans: [],
        urlImg: undefined,
        idCliente: 0
    })
    const [myDoctor, setMyDoctor] = useState<MyDoc>({
        nutriotionist: null,
        personalTrainer: null
    })
    console.log(imgProf)
    useEffect(() => {
        profileImg();
        me();
        myDoc();
        console.log(myDoctor)
        console.log(myProf);
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
    const me = async () => {
        try {
            const me = await fetch(meProfile, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            if (me.ok) {
                const myProfile: RootMe = await me.json();
                setMyProf(myProfile);
                return myProfile;
            }

        } catch (err) {
            console.log(err)
        }
    }

    const myDoc = async () => {
        try {
            const me = await fetch(myDocFetch, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            if (me.ok) {
                const myD: MyDoc = await me.json();
                setMyDoctor(() => (myD));
                return myD;
            }

        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            <div
                className="max-h-[60%] py-2 w-full h-full mt-2 bg-[#413F42] bg-opacity-35 rounded-xl  flex justify-around">
                <span>
                <h2 className="px-3 font-medium first-letter:uppercase">Nutritionist</h2>
                    {myDoctor.nutriotionist != null &&
                        <CardD name={`${myDoctor.nutriotionist?.name}`} surname={`${myDoctor.nutriotionist?.surname}`}
                               email={`${myDoctor.nutriotionist?.email}`}
                               img={`${myDoctor.nutriotionist?.urlImg}`}/>
                    }
                        </span>

                <span>
                    <h2 className="px-3 font-medium">Personal-Trainer</h2>
                    {myDoctor.personalTrainer!=null?
                        <CardD name="FEDERICO" surname="POGGI" email="federicoPoggi2@gmail.com"
                            img={`${myDoctor.personalTrainer?.urlImg}`}/>:<NoAssignedDoc/>}
                </span>
            </div>
        </>
    );
}