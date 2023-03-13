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

export const getCompras = (set) => {
    axios.get(URL_COMPRAS)
     .then(res =>  {if (res.status == 200) set(res.data)})
     .catch((error) => console.log(error))
}

export const BuildCompraPayload =(compra)=>{
    compra.proveedor = compra.proveedor.id
    compra.detalle_compra.forEach(item => {
        delete item.nombre
    })
    return compra
}