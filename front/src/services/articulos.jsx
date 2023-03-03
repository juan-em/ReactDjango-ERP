import axios from "axios";

const URL = 'http://localhost:8000/api/articulos/'

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

export function transformObjectToFormData(obj) {
  const formData = new FormData();

  function flattenObj(obj, path = '') {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        const value = obj[key];
        const newPath = path ? `${path}[${key}]` : key;
        if (value === null) {
          formData.append(newPath, '');
        } else if (value instanceof FileList) {
          for (let i = 0; i < value.length; i++) {
            formData.append(newPath, value[i]);
          }
        } else if (value instanceof File) {
          formData.append(newPath, value);
        } else if (typeof value === 'object' && value !== null) {
          if (Array.isArray(value)) {
            for (let i = 0; i < value.length; i++) {
              flattenObj(value[i], `${newPath}[${i}]`);
            }
          } else {
            flattenObj(value, newPath);
          }
        } else {
          const numericValue = parseFloat(value);
          formData.append(newPath, isNaN(numericValue) ? value : numericValue);
        }
      }
    }
  }

  flattenObj(obj);
  return formData;
}

export const getArticulos = (set) => {
    axios
    .get(URL)
    .then((res) => {
      if (res.status == 200) set(res.data.content);
    })
    .catch((error) => console.log(error));
}

export const postArticulo = async (data) =>{
    try{
        const response = await axios.post(URL ,data,{headers: {
            'Content-Type': 'multipart/form-data'
          }});
        return response.data
        
    } catch (error) {
        console.log(error);
        return error
    }
}

export const putArticulo = async (id, data) =>{
    try{
        const response = await axios.patch(`${URL}${id}/`, data,{headers: {
          'Content-Type': 'multipart/form-data'
        }});
        return response.data
    } catch (error) {
        console.log(error);
        return error
    }
}

export const deleteArticulo = async (id) =>{
  try{
      const response = await axios.delete(`${URL}${id}/`);
      return response.data
  } catch (error) {
      console.log(error);
      return error
  }
}
