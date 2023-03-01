import axios from "axios";

export const searcher = (fields, list) => {
    let resultData = list;
    resultData = fields.codigo
        ? resultData.filter((item) =>
            item.codigo.toString().toLowerCase().includes(fields.codigo.toString())
            )
        : resultData;
    resultData = fields.nombre
        ? resultData.filter((item) =>
            item.nombre.toString().toLowerCase().includes(fields.nombre.toString())
            )
        : resultData;
    resultData = fields.proveedor
        ? resultData.filter((item) => 
            item.proveedor == fields.proveedor
        )
        : resultData;
    resultData = fields.marca
        ? resultData.filter((item) =>
            item.marca.toString().toLowerCase().includes(fields.marca.toString())
            )
        : resultData;
    resultData = fields.categoria
        ? resultData.filter((item) => 
            item.categoria == fields.categoria
        )
        : resultData;
    resultData = fields.almacen
        ? resultData.filter((item) => 
            item.almacen == fields.almacen
        )
        : resultData;
    
    return resultData;
};

export const getArticulos = (set, url) => {
    axios
    .get(url)
    .then((res) => {
      if (res.status == 200) set(res.data.content);
    })
    .catch((error) => console.log(error));
}

export const postArticulo = async (url, data) =>{
    try{
        const response = await axios.post(url, data);
        return response.data
    } catch (error) {
        console.log(error);
        return error
    }
}

export const putArticulo = async (url, data) =>{
    try{
        const response = await axios.put(url, data);
        return response.data
    } catch (error) {
        console.log(error);
        return error
    }
}
