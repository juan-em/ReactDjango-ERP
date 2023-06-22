import axios from "axios";

//Buscador de productos
export const searcher = (fields, list) => {
  let resultData = list;
  resultData = fields.nombre
    ? resultData.filter((item) =>
        (item.producto.toString() + item.nombre.toString())
          .toLowerCase()
          .includes(fields.nombre.toString())
      )
    : resultData;
  resultData = fields.categoria
    ? resultData.filter((item) => {
        console.log(item.categoria);
        console.log(fields.categoria);
        item.categoria == fields.categoria;
      })
    : resultData;
  resultData = fields.almacen
    ? resultData.filter(item => item.ubicacion_producto.some(ubi => ubi.almacen.id === fields.almacen ))
    : resultData;
  console.log(resultData);
  return resultData;
};

// Registro de la venta
export const RegistroVenta = (payload) => {
  axios
    .post("http://localhost:8000/api/ventas/", payload)
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const BuildVentaPayload = (venta) => {
  venta.cliente = venta.cliente.id;
  venta.detalle_venta.forEach((item) => {
    delete item.nombre;
  });
  return venta;
};


// -------------- Facturas --------------//

export const getVenta = async (set, url) => {
  try {
    const response = await axios.get(url);
    set(response.data.content);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const delVenta = async (url) => {
  try {
    const response = await axios.delete(url);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

// -------------- Productos --------------//

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

// -------------- Mantenimiento --------------//

export const getMan = (set, url) => {
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