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
    const response = await axios.post(`${URL}per/`, prov);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const postProveedoresEmp = async (prov) => {
  try {
    const response = await axios.post(`${URL}emp/`, prov);
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

export const delProveedoresPer = async (prov, id) => {
  try {
    const response = await axios.del(`${URL}per/${id}`, prov);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const delProveedoresEmp = async (prov, id) => {
  try {
    const response = await axios.del(`${URL}emp/${id}`, prov);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

// export const post_putProveedor = async (e) => {
//   e.preventDefault()
//   const {item,} = e.target
//   const payload = {
//       [item.name]:item.value
//   }
//   try{
//       if (!e.target.cod) {
//           return await postProvincia(payload)
//       } else {
//           let id = e.target.cod.value
//           return await putProvincia(id,payload)
//       }
//   }
//   catch(error){return error}
// }

export const searcher = (fields, list) => {
  let resultData = list;

  resultData = fields.id
    ? resultData.filter((item) => item.id.toString() === fields.id.toString())
    : resultData;
  resultData = fields.ruc
    ? resultData.filter((item) => {
        if (item.persona)
          return item.persona.dni.toString().includes(fields.ruc.toString());
        else return item.empresa.ruc.toString().includes(fields.ruc.toString());
      })
    : resultData;
  resultData = fields.nombre
    ? resultData.filter((item) => {
        if (item.persona)
          return item.persona.nombre
            .toLowerCase()
            .includes(fields.nombre.toLocaleLowerCase());
        else
          return item.empresa.nombre
            .toString()
            .includes(fields.nombre.toString());
      })
    : resultData;
  resultData = fields.telefono
    ? resultData.filter((item) => {
        if (item.persona)
          return item.persona.telefono
            .toString()
            .includes(fields.telefono.toString());
        else
          return item.empresa.telefono
            .toString()
            .includes(fields.telefono.toString());
      })
    : resultData;
  resultData = fields.provincia
    ? resultData.filter((item) => {
        if (item.persona) return item.persona.codprovincia == fields.provincia;
        else return item.empresa.codprovincia == fields.provincia;
      })
    : resultData;
  resultData =
    fields.per_emp != ""
      ? resultData.filter((item) => {
          if (fields.per_emp == "persona") return item.persona;
          else if (fields.per_emp == "empresa") return item.empresa;
        })
      : resultData;
  console.log(resultData);
  return resultData;
};
