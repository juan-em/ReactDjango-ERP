import axios from "axios";

//Buscador de articulos
export const searcher = (fields, list) => {
    let resultData = list;
    resultData = fields.nombre
        ? resultData.filter((item) =>
            (item.articulo.toString()+item.nombre.toString()).toLowerCase().includes(fields.nombre.toString())
            )
        : resultData;
    resultData = fields.categoria
        ? resultData.filter((item) => 
            item.categoria == fields.categoria
        )
        : resultData;
    resultData = fields.almacen
        ? resultData.filter((item) => 
            item.almacen.id == fields.almacen
        )
        : resultData;
    return resultData;
};

const URL_COMPRAS = "http://localhost:8000/api/compras/"

// Registro de la compra
export const RegistroComnpra =(payload) => {
    axios.post(URL_COMPRAS, payload)
         .then(res=>{console.log(res.data)})
         .catch(err=>{console.log(err)})
}

export const BuildCompraPayload =(compra)=>{
    compra.proveedor = compra.proveedor.id
    compra.detalle_compra.forEach(item => {
        delete item.nombre
    })
    return compra
}

//Facturas
const URL_REMISIONES = `${URL_COMPRAS}remisiones/`

export const getCompras = (set) => {
    axios.get(URL_COMPRAS)
     .then(res =>  {if (res.data.status == true) set(res.data.content)})
     .catch((error) => console.log(error))
}

export const postRemision = async (payload) => {
    try{
        const response = await axios.post(URL_REMISIONES, payload);
        return response.data
    } catch (error) {
        console.log(error);
        return error
    }
}

export const deleteCompra = async (id) => {
    try{
        const response = await axios.delete(`${URL_COMPRAS}${id}/`);
        return response.data
    } catch (error) {
        console.log(error);
        return error
    }
}

export const formateoFecha = (date) => {
    const fecha = new Date(date)
    const options = {
        year: 'numeric', month: '2-digit', day: '2-digit',
        hour: '2-digit', minute: '2-digit', second: '2-digit',
        hour12: false, timeZone: 'UTC'
      };
    const fechaFormateada = fecha.toLocaleString('es-ES', options);
    return fechaFormateada
}

export const BuildRemissionPayload = (idCompra, idsArray) => {
    var payload = new Object()
    payload.compra = idCompra
    payload.remision_compra_detalle = idsArray.map(id => {
        var detalle_compra = new Object()
        detalle_compra.compra_detalle = id
        return detalle_compra
    })
    return payload
}