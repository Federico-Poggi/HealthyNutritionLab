import './App.css'

import { Route, Routes } from "react-router-dom";
import Layout from "./component/Layout.tsx";
import Home from "./component/home/Home.tsx";
import { Articles } from "./component/articles/Articles.tsx";



function App() {

    /*const dispatch= useDispatch();*/
    /*const handleClick=()=>{
        dispatch({type:INCREMENT})
    }*/
    return (
        <>
            <Routes>
                <Route path={"/"} element={<Layout />}>
                    <Route path={"/"} index element={<Home />} />
                    <Route path={"/articles"} element={<Articles/>} />
                </Route>
            </Routes>
        </>
    )
}

export default App
