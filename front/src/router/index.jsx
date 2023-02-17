import { BrowserRouter, Routes, Route } from "react-router-dom";

// AUTHORIZATION
import { AuthProvider } from "../context/AuthProvider";
import Login from "../api/Login";
import RequireAuth from "../components/Authorization/RequireAuth";

// LOGIN PERSISTENCE
import PersistLogin from "../components/Authorization/PersistLogin";

// PAGES
import Home from "../pages/Home";
import Main from "../layout/main";
import Proveedores from "../pages/Proveedores";
import Clientes from "../pages/Clientes";

//SERVICES
import { ClientesProvider } from "../services/clientes";
import { ProveedoresProvider } from "../services/proveedores";
import AddForm from "../pages/Clientes/addform";
import Provincias from "../pages/Mantenimiento/Provincias";
import FormasPago from "../pages/Mantenimiento/FormasPago";
import Venta from "../pages/Ventas/Venta";
import Categorias from "../pages/Mantenimiento/Categorías";
import Articulos from "../pages/Productos/Artículos";
import Embalajes from "../pages/Mantenimiento/Embalajes";
import Entidades from "../pages/Mantenimiento/Entidades";
import Impuestos from "../pages/Mantenimiento/Impuestos";

// LAYOUTS

const Router = () => {
  return (
    <BrowserRouter>
    <AuthProvider>
    <Routes>
        <Route element={<Main />}>
          
          {/* Rutas publicas */}
          <Route path="/login" element={<Login />} />
          
          {/* Rutas privadas */}
          <Route element={<PersistLogin/>}>
            <Route element={<RequireAuth/>}>
              <Route path="/" element={<Home />} />
                <Route
                  path="/clientes"
                  element={
                    <ClientesProvider>
                      <Clientes />
                    </ClientesProvider>
                  }
                />

                <Route path="/clientes/add" element={<AddForm/>}/>

                <Route
                  path="/proveedores"
                  element={
                    <ProveedoresProvider>
                      <Proveedores />
                    </ProveedoresProvider>
                  }
                />

                <Route path="/mantenimientos/provincias" element={<Provincias/>}/>
                
                <Route path="/mantenimientos/provincias/editar/:id" element={<Provincias/>}/>
            </Route>
          </Route>

        </Route>

    </Routes>
    </AuthProvider>     
    </BrowserRouter>
  );
};

export default Router;
