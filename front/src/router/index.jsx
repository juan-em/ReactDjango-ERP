import { BrowserRouter, Routes, Route } from "react-router-dom";

// PAGES
import Home from "../pages/Home";
import Main from "../layout/main";
import Proveedores from "../pages/Proveedores";
import Clientes from "../pages/Clientes";

//SERVICES
import { ProveedoresProvider } from "../services/proveedores";
import { ClientesProvider } from "../services/clientes";
import AddForm from "../pages/Clientes/addform";

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
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
