import axios from "axios";
import { createContext, useState } from "react";

const ProveedoresContext = createContext();
const URL = "http://localhost:8000/api/proveedores/";
// let [proveedores, setProveerores] = useState([]);

export const getProveedores = async (set) => {
  const res_per = await axios
    .get(`${URL}per`)
    .catch((error) => console.log({ error }));
  const res_emp = await axios
    .get(`${URL}emp`)
    .catch((error) => console.log({ error }));
  set(res_per.data.content.concat(res_emp.data.content));
  return { clientesPersonas: res_per.data, clientesEmpresas: res_emp.data };
};

export const postProveedoresPer = async (prov) => {
  try {
    const response = await axios.post(`${URL}per`, prov);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const postProveedoresEmp = async (prov) => {
  try {
    const response = await axios.post(`${URL}emp`, prov);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const putProveedoresPer = async (prov, id) => {
  try {
    const response = await axios.put(`${URL}per/${id}`, prov);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const putProveedoresEmp = async (prov, id) => {
  try {
    const response = await axios.put(`${URL}emp/${id}`, prov);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const delProveedoresPer = async (id) => {
  try {
    const response = await axios.delete(`${URL}per/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const delProveedoresEmp = async (id) => {
  try {
    const response = await axios.delete(`${URL}emp/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const searcher = (fields, list) => {
  let resultData = list;
  resultData = fields.codigo
    ? resultData.filter(
        (item) => item.codigo.toString() === fields.codigo.toString()
      )
    : resultData;
  resultData = fields.ruc
    ? resultData.filter((item) => {
        return item.ruc.toString() === fields.ruc.toString();
      })
    : resultData;
  resultData = fields.nombre
    ? resultData.filter((item) => {
        if (item.persona)
          return item.persona.nombre === fields.nombre.toString()
        else
          return item.empresa.nombre === fields.nombre.toString()
      })
    : resultData;
  resultData = fields.telefono
    ? resultData.filter((item) => {
        if (item.persona)
          return item.persona.telefono.toString() === fields.telefono.toString()
        else
          return item.empresa.telefono.toString() === fields.telefono.toString()
      })
    : resultData;
  resultData = fields.provincia
    ? resultData.filter((item) => {
        if (item.persona) return item.persona.codprovincia == fields.provincia;
        else return item.empresa.codprovincia == fields.provincia;
      })
    : resultData;
  if (fields.radio === "persona") {
    resultData.filter((item) => {
      return item.empresa === null;
    });
  } else if (fields.radio === "empresa") {
    resultData.filter((item) => {
      return item.persona === null;
    });
  } else {
    return resultData;
  }
  return resultData;
};
