import axios from "axios";
import { createContext, useState } from "react";
import Clientes from "../pages/Clientes";

const URL = "http://localhost:8000/api/clientes/";

export const getClientes = async (set) => {
  const res_per = await axios
    .get(`${URL}per/`)
    .catch((error) => console.log({ error }));
  const res_emp = await axios
    .get(`${URL}emp/`)
    .catch((error) => console.log({ error }));
  set(res_per.data.content.concat(res_emp.data.content));
  return { clientesPersonas: res_per.data, clientesEmpresas: res_emp.data };
};

export const searcher = (fields, list) => {
  let resultData = list;
  console.log(resultData);
  resultData = fields.codigo
    ? resultData.filter(
        (item) => item.codigo.toString() === fields.codigo.toString()
      )
    : resultData;
  console.log(resultData);
  resultData = fields.dni
    ? resultData.filter((item) => {
        if (item.persona)
          return item.persona.dni.toString() === fields.dni.toString();
        else return item.empresa.ruc.toString() === fields.dni.toString();
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
  if (fields.radio === "persona"){
    resultData.filter((item) => {
      return item.hasOwnProperty('persona')
    })
  } else if (fields.radio === "empresa"){
    resultData.filter((item) => {
      return item.hasOwnProperty('empresa')
    })
  } else {
    return resultData
  }
  return resultData;
};

export const postClienteper = async (data) => {
  try {
    const response = await axios.post(
      "http://localhost:8000/api/clientes/per/",
      data
    );
    // set(response.data)
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const postClienteemp = async (data) => {
  try {
    const response = await axios.post(
      "http://localhost:8000/api/clientes/emp/",
      data
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const putClienteper = async (id, data) => {
  console.log(data);
  try {
    const response = await axios.put(
      `http://localhost:8000/api/clientes/mod/per/${id}`,
      data
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const putClienteemp = async (id, data) => {
  try {
    const response = await axios.put(
      `http://localhost:8000/api/clientes/mod/emp/${id}`,
      data
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const deleteClienteper = async (id, data) => {
  try {
    const response = await axios.delete(
      `http://localhost:8000/api/clientes/mod/per/${id}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const deleteClienteemp = async (id, data) => {
  try {
    const response = await axios.delete(
      `http://localhost:8000/api/clientes/mod/per/${id}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
