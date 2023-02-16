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
import Categorias from "../pages/Mantenimiento/Categorías";
import Articulos from "../pages/Productos/Artículos";
import Embalajes from "../pages/Mantenimiento/Embalajes";
import Entidades from "../pages/Mantenimiento/Entidades";
import Impuestos from "../pages/Mantenimiento/Impuestos";

// LAYOUTS

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Main />}>
          <Route path="/" element={<Home />} />
          <Route path="/clientes" element={<Clientes />} />
          {/*  */}
          <Route path="/clientes/add" element={<AddForm />} />
          <Route path="/proveedores" element={<Proveedores />} />
          {/*  */}
          <Route path="/productos/articulos" element={<Articulos />} />
          {/*  */}
          <Route path="/mantenimientos/provincias" element={<Provincias />} />
          <Route path="/mantenimientos/categorias" element={<Categorias />} />
          <Route path="/mantenimientos/embalajes" element={<Embalajes />} />
          <Route path="/mantenimientos/formaspago" element={<FormasPago />} />
          <Route path="/mantenimientos/entidades" element={<Entidades />} />
          <Route path="/mantenimientos/impuestos" element={<Impuestos />} />
          

          {/*  */}
          <Route path="/ventas/venta" element={<Venta />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
