import axios from "axios";

//Buscador de productos
export const searcher = (fields, list) => {
    let resultData = list;
    resultData = fields.nombre
        ? resultData.filter((item) =>
            (item.producto.toString()+item.nombre.toString()).toLowerCase().includes(fields.nombre.toString())
            )
        : resultData;
    resultData = fields.categoria
        ? resultData.filter((item) =>{
            console.log(item.categoria)
            console.log(fields.categoria)
            item.categoria == fields.categoria
        
        })
        : resultData;
    resultData = fields.almacen
        ? resultData.filter((item) => 
            item.almacen.id == fields.almacen
        )
        : resultData;
    return resultData;
};

// Registro de la venta
export const RegistroVenta =(payload) => {
    axios.post("http://localhost:8000/api/ventas/", payload)
         .then(res=>{console.log(res.data)})
         .catch(err=>{console.log(err)})
}

export const BuildVentaPayload =(venta)=>{
    venta.cliente = venta.cliente.id
    venta.detalle_venta.forEach(item => {
        delete item.nombre
    })
    return venta
}

export const AxiosSesionVenta = (payload) => {
    axios.post("http://localhost:8000/api/ventas/sesion/",payload)
        .then(res=>{console.log(res.data)})
        .catch(err=>{console.log(err)})
}

export const RegistroPuntoVenta = (payload) => {
    axios.post("http://localhost:8000/api/ventas/puntoventa/",payload)
        .then(res=>{console.log(res.data)})
        .catch(err=>{console.log(err)})
}

export const BuildPuntoVentaPayload = (punto_venta) => {
    console.log(punto_venta)
    punto_venta.cliente = punto_venta.cliente.id
    punto_venta.detalle_punto_venta.forEach(item => {
        delete item.nombre
    })
    return punto_venta
}

export const BuildSesionVentaPayload = (sesion_venta) => {
    // sesion_venta.responsable = sesion_venta.responsable.id
    sesion_venta.punto_venta.forEach(item => {
        console.log(item)
        item.cliente = item.cliente.id 
    })
    return sesion_venta
}

// -------------- Facturas --------------//

export const searcherFacturas = (fields, list) => {
    let resultData = list;
    resultData = fields.cliente
        ? resultData.filter((item) => 
            item.cliente ? item.cliente.id == fields.cliente.id : false
        )
        : resultData;
    resultData = fields.codigo
        ? resultData.filter((item) =>
            item.id == fields.codigo
            )
        : resultData;
    resultData = fields.numero_factura
        ? resultData.filter((item) =>
            (item.numero_factura.toString()).toLowerCase().includes(fields.numero_factura.toString())
            )
        : resultData;
    resultData = fields.fecha
        ? resultData.filter((item) => 
            item.fecha.slice(0, 10) == fields.fecha.slice(0, 10)
        )
        : resultData;
    return resultData;
};

export const getVenta = async (set, url) => {
    try {
        const response = await axios.get(url);
        set(response.data.content);
        return response.data;
      } catch (error) {
        console.log(error);
        return error;
      }
}

export const delVenta = async (url) => {
    try{
        const response = await axios.delete(url);
        return response.data
    } catch (error) {
        console.log(error);
        return error
    }
}

export const getSesionVenta = async (set, url) => {
    try {
        const response = await axios.get(url);
        set(response.data.content);
        return response.data;
      } catch (error) {
        console.log(error);
        return error;
      }
}