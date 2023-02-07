import axios from "axios";
import { createContext, useState } from "react";

const ClientesContext = createContext();
const URL = "http://localhost:8000/clientes/";

export const ClientesProvider = ({ children }) => {
  let [clientes, setClientes] = useState([]);

  //Get all clients
  const getClientes = async () => {
    const res_per = await axios.get(`${URL}per/`);
    const res_emp = await axios.get(`${URL}emp/`);
    setClientes(res_per.data.content.concat(res_emp.data.content));
  };

  //Searcher
  const searcher = (fields, list) => {
    let resultData = [];
    fields.forEach((element) => {
      resultData = !element
        ? list
        : list.filter((item) => item.id.toString() === element.toString());
    });
    return resultData;
  };

  let contextData = {
    clientes,
    getClientes,
    searcher,
  };

  return (
    <ClientesContext.Provider value={contextData}>
      {children}
    </ClientesContext.Provider>
  );
};

export default ClientesContext;

export const postClienteper = async (data) => {
  try {
    const response = await axios.post(`${URL}per/`, data);
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
