interface CardDoctorProps {
    role: string
    name: string
    surname: string
    email: string
    img:string
}

export function CardD({role, name, surname, email,img}: CardDoctorProps) {
    return (
        <>
            <div className="w-1/3 bg-green-500 bg-opacity-20 ring-1 ring-[#387606] rounded-lg p-3">
                <header className="flex">
                    <h2>{role}</h2>
                </header>
                <div className="flex items-center">
                    <img className="w-10 h-10 rounded-full ring-1 ring-green-800 mx-3" src={img} alt="img"/>
                    <span className="">
                    <h2>{name}</h2>
                    <p>{surname}</p>
                        </span>
                </div>
                <p>{email}</p>
            </div>
        </>
    );
}