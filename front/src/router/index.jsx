import { BrowserRouter, Routes, Route } from "react-router-dom";

// PAGES
import Home from "../pages/Home";
import Main from "../layout/main";
import Proveedores from "../pages/Proveedores";
import Clientes from "../pages/Clientes";

//SERVICES
import AddForm from "../pages/Clientes/addform";
import Provincias from "../pages/Mantenimiento/Provincias";
import FormasPago from "../pages/Mantenimiento/FormasPago";
import Venta from "../pages/Ventas/Venta";
import Categorias from "../pages/Productos/Categorías";
import Articulos from "../pages/Productos/Artículos";

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
              <Clientes />
            }
          />
          <Route path="/clientes/add" element={<AddForm />} />
          <Route path="/proveedores" element={<Proveedores />} />
          <Route path="/productos/categorias" element={<Categorias />} />
          <Route path="/productos/articulos" element={<Articulos />} />
          <Route path="/mantenimientos/provincias" element={<Provincias />} />
          <Route path="/mantenimientos/provincias/editar/:id" element={<Provincias />} />
          <Route path="/mantenimientos/formapago" element={<FormasPago/>} />
          <Route path="/ventas/venta" element={<Venta />} />
          
          <Route
            path="/mantenimientos/formapago/editar/:id"
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
