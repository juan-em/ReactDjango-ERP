import axios from "axios";
import { createContext, useState } from "react";

const ProveedoresContext = createContext();

export const ProveedoresProvider = ({ children }) => {
  const URL = "http://localhost:8000/proveedores/";
  const [proveedores, setProveedores] = useState([]);

  const getProveedores = async () => {
    try {
      const res_per = await axios.get(`${URL}per/`);
      const res_emp = await axios.get(`${URL}emp/`);
      setProveedores(res_per.data.content.concat(res_emp.data.content));
    } catch (error) {
      console.log(error);
      return error;
    }
  };
  let contextData = {
    a: () => "bruhhhh",
    proveedores,
    getProveedores,
  };

  return (
    <ProveedoresContext.Provider value={contextData}>
      {children}
    </ProveedoresContext.Provider>
  );
};

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
