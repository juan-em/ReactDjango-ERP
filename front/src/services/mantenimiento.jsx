import axios from "axios";

//URLS
const URL = "http://localhost:8000/api/mantenimientos/";
const URL_IMPUESTOS = `${URL}impuestos/`;

export const get = (set, url) => {
  axios
    .get(url)
    .then((res) => {
      if (res.status == 200) set(res.data);
    })
    .catch((error) => console.log(error));
};
export const getInd = (id, set, url) => {
  axios
    .get(`${url}${id}`)
    .then((res) => {
      if (res.status == 200) set(res.data);
    })
    .catch((error) => console.log(error));
};

export const post_put = async (e, item, url) => {
  e.preventDefault();
  console.log(item);
  const payload = {
    [item.name]: item.value,
  };
  console.log(payload)
  try {
    if (!e.target.cod) {
      try {
        const res = await axios.post(url, payload);
        return res.data;
      } catch (error) {
        return error;
      }
    } else {
      let id = e.target.cod.value;
      try {
        const res = await axios.put(`${url}${id}/`, payload);
        return res.data;
      } catch (error) {
        return error;
      }
    }
  } catch (error) {
    return error;
  }
};

export const del = async (id, url) => {
  let res = await axios
    .delete(`${url}${id}/`)
    .catch((error) => console.log({ error }));
  console.log(res.data);
  return res.data;
};

export const searcher = (fields, list) => {
  let resultData = list;
  resultData = fields.nombre
    ? resultData.filter((item) =>
        item.nombre.toString().includes(fields.nombre.toString())
      )
    : resultData;
  return resultData;
};

export const searcherprov = (fields, list) => {
  let resultData = list;
  resultData = fields.nombre
    ? resultData.filter((item) =>
        item.nombreprovincia.toString().includes(fields.nombre.toString())
      )
    : resultData;
  return resultData;
};

export const searcherform = (fields, list) => {
  let resultData = list;
  resultData = fields.nombre
    ? resultData.filter((item) =>
        item.nombrefp.toString().includes(fields.nombre.toString())
      )
    : resultData;
  return resultData;
};

export const searcherent = (fields, list) => {
  let resultData = list;
  resultData = fields.nombre
    ? resultData.filter((item) =>
        item.nombreentidad.toString().includes(fields.nombre.toString())
      )
    : resultData;
  return resultData;
};

export const postIm = async (data, url) => {
    try {
      const response = await axios.post(url, data);
      return response.data;
    } catch (error) {
      console.log(error);
      return error;
    }
  };
  
  export const putIm = async (data, url) => {
    console.log(data);
    try {
      const response = await axios.put(url, data);
      return response.data;
    } catch (error) {
      console.log(error);
      return error;
    }
  };
