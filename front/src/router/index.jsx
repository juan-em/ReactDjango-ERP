import { BrowserRouter, Routes, Route } from "react-router-dom";

// AUTHORIZATION
import { AuthProvider } from "../context/AuthProvider";
import Login from "../components/Authorization/Login";
import Register from "../components/Authorization/Register";
import RequireAuth from "../components/Authorization/RequireAuth";

// LOGIN PERSISTENCE
import PersistLogin from "../components/Authorization/PersistLogin";

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
import Compra from "../pages/Compras/Compra";
import Categorias from "../pages/Mantenimiento/Categorías";
import Articulos from "../pages/Productos/Artículos";
import Embalajes from "../pages/Mantenimiento/Embalajes";
import Entidades from "../pages/Mantenimiento/Entidades";
import Impuestos from "../pages/Mantenimiento/Impuestos";
import Almacenes from "../pages/Mantenimiento/Almacenes";
import CategoriasProductos from "../pages/Mantenimiento/CategoríasProductos";
import Areas from "../pages/Mantenimiento/Áreas";
import Produccion from "../pages/Produccion/Produccion";

// LAYOUTS

const Router = () => {
  return (
    <BrowserRouter>
    <AuthProvider>
    <Routes>
        <Route element={<Main />}>
          
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Private routes */}
          <Route element={<PersistLogin/>}>
            <Route element={<RequireAuth/>}>
              <Route path="/" element={<Home />} />
              
              {/* Clientes */}
              <Route path="/clientes" element={<Clientes />} />
              <Route path="/clientes/add" element={<AddForm />} />
              
              {/* Proveedores */}
              <Route path="/proveedores" element={<Proveedores />} />

              {/* Productos */}
              <Route path="/productos/articulos" element={<Articulos />} />

              {/* Produccion */}
              <Route path="/produccion/produccion" element={<Produccion />} />

              {/* Otros */}
              <Route path="/mantenimientos/provincias" element={<Provincias />} />
              <Route path="/mantenimientos/categorias" element={<Categorias />} />
              <Route path="/mantenimientos/embalajes" element={<Embalajes />} />
              <Route path="/mantenimientos/formaspago" element={<FormasPago />} />
              <Route path="/mantenimientos/entidades" element={<Entidades />} />
              <Route path="/mantenimientos/impuestos" element={<Impuestos />} />
              <Route path="/mantenimientos/almacenes" element={<Almacenes />} />
              <Route path="/mantenimientos/categoriasproductos" element={<CategoriasProductos />} />
              <Route path="/mantenimientos/areas" element={<Areas />} />

              {/* Venta */}
              <Route path="/ventas/venta" element={<Venta />} />
              <Route path="/compras/compra" element={<Compra />} />
            </Route>
          </Route>

        </Route>

    </Routes>
    </AuthProvider>     
    </BrowserRouter>
  );
};

export default Router;
