import axios from "axios";

const URL = "http://localhost:8000/api/productos/";
const URLPRODVA = "http://localhost:8000/api/prodvar/";
const URLPRODDE = "http://localhost:8000/api/proddet/";

export const getProd = async (set) => {
  const res = await axios
    .get("http://localhost:8000/api/productos/")
    .catch((error) => console.log({ error }));
  set(res.data.content);
  return res.data.content;
};

export const postProd = async (data, url) => {
  try {
    const response = await axios.post(url, data);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const patchProd = async (data, url) => {
  try {
    const response = await axios.patch(url, data);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const delProd = async (url) => {
  try {
    const response = await axios.delete(url);
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
  resultData = fields.nombre
    ? resultData.filter((item) => {
        return item.nombre.toString().includes(fields.nombre.toString());
      })
    : resultData;
  resultData = fields.cantidad
    ? resultData.filter((item) => {
        return item.cantidad.toString() === fields.cantidad.toString();
      })
    : resultData;
  resultData = fields.categoria
    ? resultData.filter((item) => {
        return item.categoria.toString() === fields.categoria.toString();
      })
    : resultData;
  return resultData;
};
