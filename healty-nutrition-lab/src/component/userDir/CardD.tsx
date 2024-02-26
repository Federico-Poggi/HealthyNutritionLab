interface CardDoctorProps {
    name: string
    surname: string
    email: string
    img: string
}

export function CardD({ name, surname, email, img}: CardDoctorProps) {
    return (
        <>
            <div
                className={`w-full bg-[#454A45] flex flex-col justify-center bg-opacity-50 rounded-lg p-5 mt-3`}>

                <div className="flex items-center">
                    {(img == undefined || false) &&
                            <svg className="w-10 h-10 me-3 text-gray-200 dark:text-gray-700" aria-hidden="true"
                                 xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                    d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
                            </svg>}
                    {(img != undefined) &&
                        <img className="w-10 h-10 rounded-full ring-1 ring-green-800 mr-5" src={img}  alt=""/>}
                    <span>
                        <h2 className="text-sm font-medium">{name}</h2>
                        <p className="text-sm font-medium">{surname}</p>
                        <p className="text-sm font-bold text-[#59BE7C]">{email}</p>
                    </span>
                </div>

            </div>
        </>
    );
}