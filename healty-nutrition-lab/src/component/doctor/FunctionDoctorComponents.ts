import {useState} from "react";

export function NewDietState(){
    const [modalOpen, setModalOpen] = useState<boolean>(false)
    function open(){
        setModalOpen(true)
    }
    function close(){
        setModalOpen(false)
    }

    return{
        modalOpen,
        open,
        close
    }
}