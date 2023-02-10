import axios from "axios"
import { createContext , useState  } from "react";
import Clientes from "../pages/Clientes";

const ClientesContext = createContext()


export const ClientesProvider = () => {

    const URL = "http://localhost:8000/api/clientes/"
    let [clientes , setClientes] = useState([]);

    //Get all clients
    const getClientes = async () =>{
        const res_per = await axios.get(`${URL}per/`).catch((error)=>console.log({error})) 
        const res_emp = await axios.get(`${URL}emp/`).catch((error)=>console.log({error})) 
        setClientes(res_per.data.content.concat(res_emp.data.content))
        return {clientesPersonas: res_per.data, clientesEmpresas:res_emp.data}
    }

    //Searcher
    const searcher = (fields, list) =>{
        let resultData = list;
        
        resultData = fields.id ? resultData.filter(item=>item.id.toString()===fields.id.toString()) : resultData
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
        console.log(resultData)
        return resultData
    }

    let contextData = {
        clientes,
        getClientes,
        searcher
    }

    return(
        <ClientesContext.Provider value={contextData}>
            <Clientes/>
        </ClientesContext.Provider>
    )
}


export default ClientesContext;

export const postClienteper = async (data) => {
    console.log(data)
  try {
    const response = await axios.post('http://localhost:8000/api/clientes/per/', data);
    // set(response.data)
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const postClienteemp = async (data) => {
  try {
    const response = await axios.post(`${URL}emp/`, data);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const putClienteper = async (id, data) => {
  try {
    const response = await axios.put(`${URL}per/${id}/`, data);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const putClienteemp = async (id, data) => {
  try {
    const response = await axios.put(`${URL}emp/${id}/`, data);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const deleteClienteper = async (id, data) => {
  try {
    const response = await axios.put(`${URL}per/${id}/`, data);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const deleteClienteemp = async (id, data) => {
  try {
    const response = await axios.put(`${URL}emp/${id}/`, data);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
