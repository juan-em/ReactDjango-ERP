import axios from "axios"
import { createContext , useState  } from "react";

const ClientesContext = createContext()


export const ClientesProvider = ({children}) => {

    const URL = "http://localhost:8000/clientes/"
    let [clientes , setClientes] = useState([]);

    //Get all clients
    const getClientes = async () =>{
        const res_per = await axios.get(`${URL}per/`)
        const res_emp = await axios.get(`${URL}emp/`)
        setClientes(res_per.data.content.concat(res_emp.data.content))
    }

    //Searcher
    const searcher = (fields, list) =>{
        let resultData = [];
        fields.forEach((element) => {
            resultData = !element ? list : list.filter(item=>item.id.toString()===element.toString())
        })
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