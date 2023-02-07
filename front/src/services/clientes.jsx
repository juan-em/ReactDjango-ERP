import axios from "axios"
import { createContext , useState  } from "react";

const ClientesContext = createContext()


export const ClientesProvider = ({children}) => {

    const URL = "http://localhost:8000/api/clientes/"
    let [clientes , setClientes] = useState([]);

    //Get all clients
    const getClientes = async () =>{
        const res_per = await axios.get(`${URL}per/`)
        const res_emp = await axios.get(`${URL}emp/`)
        setClientes(res_per.data.content.concat(res_emp.data.content))
    }

    //Searcher
    const searcher = (fields, list) =>{
        let resultData = list;
        
        resultData = fields.id ? resultData.filter(item=>item.id.toString().includes(fields.id.toString())) : resultData
        resultData = fields.ruc ? resultData.filter(item=>{
            if (item.persona) return item.persona.dni.toString().includes(fields.ruc.toString())
            else return item.empresa.ruc.toString().includes(fields.ruc.toString())
        }) : resultData
        resultData = fields.nombre ? resultData.filter(item=>{
            if (item.persona) return item.persona.nombre.toLowerCase().includes(fields.nombre.toLocaleLowerCase())
            else return item.empresa.nombre.toString().includes(fields.nombre.toString())
        }) : resultData
        resultData = fields.telefono ? resultData.filter(item=>{
            if (item.persona) return item.persona.telefono.toString().includes(fields.telefono.toString())
            else return item.empresa.telefono.toString().includes(fields.telefono.toString())
        }) : resultData
        resultData = fields.provincia ? resultData.filter(item=>{
            if (item.persona) return item.persona.codprovincia == fields.provincia
            else return item.empresa.codprovincia == fields.provincia
        }) : resultData
        resultData = fields.per_emp != "" ? resultData.filter(item=>{
            if (fields.per_emp == "persona") return item.persona
            else if (fields.per_emp == "empresa") return item.empresa
        }) : resultData

        return resultData
    }








    let contextData = {
        clientes,
        getClientes,
        searcher
    }

    return(
        <ClientesContext.Provider value={contextData}>
            {children}
        </ClientesContext.Provider>
    )
}


export default ClientesContext;