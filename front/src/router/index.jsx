import { BrowserRouter, Routes, Route } from "react-router-dom";

// AUTHORIZATION
import { AuthProvider } from "../context/AuthProvider";
import Login from "../api/Login";
import RequireAuth from "../components/Authorization/RequireAuth";

// PAGES
import Home from "../pages/Home";
import Main from "../layout/main";
import Proveedores from "../pages/Proveedores";
import Clientes from "../pages/Clientes";

//SERVICES
import { ClientesProvider } from "../services/clientes";
import { ProveedoresProvider } from "../services/Proveedores";
import AddForm from "../pages/Clientes/addform";
import Provincias from "../pages/Mantenimiento/Provincias";

// LAYOUTS

const Router = () => {
  return (
    <BrowserRouter>
    <AuthProvider>
    <Routes>
        <Route element={<Main />}>
          
          {/* Rutas publicas */}
          <Route path="/login" element={<Login />} />
          
          {/* Rutas protegidas */}
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

              <Route
                path="/clientes/add"
                element={<AddForm
                />}
              />

              <Route
                path="/proveedores"
                element={
                  <ProveedoresProvider>
                    <Proveedores />
                  </ProveedoresProvider>
                }
              />
            </Route>
          </Route>

          

      </Routes>
    </AuthProvider>     
    </BrowserRouter>
  );
};

export default Router;
