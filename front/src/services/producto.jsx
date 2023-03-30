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

export const postProd = async (data) => {
  try {
    const response = await axios.post(URL, data, {
      headers: {
        'content-type': 'multipart/form-data'
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const putProd = async (data, id) => {
  try {
    const response = await axios.patch(`${URL}${id}/`, data);
    console.log(response)
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

export const get = async (set, url) => {
  try {
    const response = await axios.get(url);
    set(response.data.content);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export const postVar = async (data) => {
  try {
    console.log(data)
    const response = await axios.post("http://localhost:8000/api/productos/variantes/",data);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
}
export const putVar = async (url, data) => {
  try {
    const response = await axios.patch(url, data);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export const artget = async (set, url) => {
  const res = await axios
    .get(url)
    .catch((error) => console.log({ error }));
  set(res.data.content);
  return res.data.content;
};

