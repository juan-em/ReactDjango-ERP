import { BrowserRouter, Routes, Route } from "react-router-dom";

// PAGES
import Home from "../pages/Home";
import Main from "../layout/main";
import Comerciales from "../pages/Comerciales";
import Test from "../services/test";

//SERVICES
import { ClientesProvider } from "../services/clientes";


const Router = () =>{
    return(
        <BrowserRouter>
            <Routes>
                <Route element={<Main />}>
                    <Route path="/" element={<Home />}/>
                    <Route path="/comerciales" element={<Comerciales />}/>
                    <Route path="/comerciales/clientes" element={<ClientesProvider/>}/>
                    <Route path="/test" element={<Test/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Router;