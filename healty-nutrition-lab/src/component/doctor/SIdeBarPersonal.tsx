export function SIdeBarPersonal() {
    return (
        <>
            <div className = {"relative"}>
                <div id = {"sideBar-user"} className = {"fixed left-2 rounded-2xl top-24 desktop:w-1/6 h-[88vh]"}>
                    <ul className = {"pl-4"}>
                        <li>Clienti</li>
                        <li>Tabelle esercizi</li>
                        <li>Profilo</li>
                    </ul>
                </div>
            </div>
        </>
    );
}