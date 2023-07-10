// import axios from "axios";
import axios from "../api/axiosNode";

const URL = 'api/produccion/'
const URL_DET = 'api/produccion/det/'

export const searcher = (fields, list) => {
  let resultData = list;
  resultData = fields.nombre
    ? resultData.filter((item) =>
        item.nombreprovincia.toString().includes(fields.nombre.toString())
      )
    : resultData;
  return resultData;
};

export const getProduccion = async (set) => {
  const res = await axios
    .get(URL)
    .catch((error) => console.log({ error }));
  set(res.data);
//   console.log(res.data)
  return res;
};

export const postProduccion = async (data) => {
  try {
    const response = await axios.post(URL, data);
    console.log(response)
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const patchProduccion = async (data, id) => {
  try {
    const response = await axios.patch(`${URL}${id}/`, data);
    console.log(response)
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
export const getProduccionDet = async (set, id) => {
  const res = await axios
    .get(`${URL}${id}/`)
    .catch((error) => console.log({ error }));
  set(res.data);
//   console.log(res.data)
  return res;
};
export const getProduccionDetalle = async (set) => {
  const res = await axios
    .get(`${URL_DET}${id}/`)
    .catch((error) => console.log({ error }));
  set(res.data);
//   console.log(res.data)
  return res;
};

export const del = async (id) => {
  let res = await axios
    .delete(`${URL}${id}/`)
    .catch((error) => console.log({ error }));
  return res.data;
};

export const patchProduccionDetalle = async (data, id) => {
  try {
    const response = await axios.patch(`${URL_DET}${id}/`, data)
    return response.data;
  } catch (error) {
    return (error);
  }
}

export const delProduccionDetalle = async (id) => {
  let res = await axios
    .delete(`${URL_DET}${id}/`)
    .catch((error) => console.log({error}))
    return res.data
}

export const postProduccionDetalle = async (data) => {
  try {
    const response = await axios.post(URL_DET, data);
    console.log(response)
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};