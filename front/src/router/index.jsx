import { BrowserRouter, Routes, Route } from "react-router-dom";

// PAGES
import Home from "../pages/Home";
import Main from "../layout/main";
import Comerciales from "../pages/Comerciales";
import Clientes from "../pages/Clientes";

//SERVICES
import { ProveedoresProvider } from "../services/proveedores";
import { ClientesProvider } from "../services/clientes";


// LAYOUTS

const Router = () =>{
    return(
        <BrowserRouter>
            <Routes>
                <Route element={<Main />}>
                    <Route path="/" element={<Home />}/>
                    <Route path="/comerciales" element={<Comerciales />}/>
                    <Route path="/comerciales/clientes" element={<ClientesProvider><Clientes /></ClientesProvider>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Router;