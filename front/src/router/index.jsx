import { BrowserRouter, Routes, Route } from "react-router-dom";

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
import FormasPago from "../pages/Mantenimiento/FormasPago";
import Venta from "../pages/Ventas/Venta";

// LAYOUTS

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Main />}>
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
          <Route
            path="/ventas/venta"
            element={
              <Venta/>
            }
          />
          <Route
            path="/mantenimientos/provincias"
            element={
              <Provincias/>
            }
          />
          <Route
            path="/mantenimientos/provincias/editar/:id"
            element={
              <Provincias/>
            }
          />
          <Route
            path="/mantenimientos/formaspago"
            element={
              <FormasPago/>
            }
          />
          <Route
            path="/mantenimientos/formaspago/editar/:id"
            element={
              <FormasPago/>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
