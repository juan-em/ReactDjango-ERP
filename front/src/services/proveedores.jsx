import axios from "axios"
import { createContext , useState  } from "react";

const ProveedoresContext = createContext()


export const ProveedoresProvider = ({children}) => {

    const URL = "http://locsalhost:8000/api/proveedores/"
    let [proveedores , setProveedores] = useState([]);
    let [proveedor , setProveedor] = useState({});

    //Axios
    const getProveedores = async () =>{
        const res_per = await axios.get(`${URL}per/`)
        const res_emp = await axios.get(`${URL}emp/`)
        setProveedores(res_per.data.content.concat(res_emp.data.content))
    }


    //Fetch
    const getProveedores_1 = async() => {
        const res_per = await fetch(`${URL}per/`)
        const res_emp = await fetch(`${URL}emp/`)
        const data_per = await res_per.json()
        const data_emp = await res_emp.json()
        setProveedores(data_per.content.concat(data_emp.content))
    }
    

    const getProveedor = async(obj) => {
        const res = await obj.persona ?  fetch(`${URL}per/${obj.id}`) : fetch(`${URL}emp/${obj.id}`)
        const data = await res.json()
        setProveedor(data.content)
    }







    let contextData = {
        a : ()=>"bruhhhh",
        proveedores,
        getProveedores_1,
        getProveedores
    }

    return(
        <ProveedoresContext.Provider value={contextData}>
            {children}
        </ProveedoresContext.Provider>
    )
}


export default ProveedoresContext;

export const postProveedoresper = async (prov) => {
    try {
      const response = await axios.post(`${URL}per/`, prov);
      return response.data;
    } catch (error) {
      console.log(error);
      return error;
    }
  };
  
  export const postProveedoresemp = async (prov) => {
    try {
      const response = await axios.post(`${URL}emp/`, prov);
      return response.data;
    } catch (error) {
      console.log(error);
      return error;
    }
  };
