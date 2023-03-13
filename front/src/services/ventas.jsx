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