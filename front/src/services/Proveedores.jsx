import axios from "axios"
import { createContext , useState  } from "react";

const ProveedoresContext = createContext()


export const ProveedoresProvider = ({children}) => {

    const url_prov = "http://localhost:8000/proveedores/"
    let [proveedores , setProveedores] = useState([]);
    let [proveedor , setProveedor] = useState({});

    //Axios
    const getProveedores = async () =>{
        const res_per = await axios.get(`${url_prov}per`)
        const res_emp = await axios.get(`${url_prov}emp`)
        setProveedores(res_per.data.content.concat(res_emp.data.content))
    }


    //Fetch
    const getProveedores_1 = async() => {
        const res_per = await fetch(`${url_prov}per`)
        const res_emp = await fetch(`${url_prov}emp`)
        const data_per = await res_per.json()
        const data_emp = await res_emp.json()
        setProveedores(data_per.content.concat(data_emp.content))
    }
    


    const getProveedor = async(obj) => {
        const res = await obj.persona ?  fetch(`${url_prov}per/${obj.id}`) : fetch(`${url_prov}emp/${obj.id}`)
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