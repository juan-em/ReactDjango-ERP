import axios from "../../api/axios";

const BIENES_URL = "api/ordenes/bien/"

export const cotizacionInitialState = {orden_bien:[{}]}

export function transformToFormData (values) {
    const formData = new FormData();
    formData.append('bien_nombre', values.bien_nombre);
    formData.append('bien_estado', values.bien_estado);
    
    values.orden_bien.forEach((value, index) => {
        formData.append(`orden_bien[${index}][proveedor_id]`, value.proveedor_id);
        formData.append(`orden_bien[${index}][propuesta_documentos_bien][bien_cotizacion_documento]`, value.propuesta_documentos_bien.bien_cotizacion_documento);
        formData.append(`orden_bien[${index}][propuesta_documentos_bien][propuesta_tecnica_documento]`, value.propuesta_documentos_bien.propuesta_tecnica_documento);
        formData.append(`orden_bien[${index}][propuesta_documentos_bien][propuesta_economica_documento]`, value.propuesta_documentos_bien.propuesta_economica_documento);
    });
    
    return formData
}

export const postBienes = async (data) => {
    try {
        const response = await axios.post(BIENES_URL, data);
        
        return response.data
    } catch (error) {
        console.log(error)

        return error
    }
}

export const getBienes = async (set) => {
    axios.get(BIENES_URL)
     .then(res => {if (res.status == 200) set(res.data.content)})
     .catch(err => console.log(err))
}

export const deleteBien = async (id) =>{
    try{
        const response = await axios.delete(`${BIENES_URL}${id}/`);
        return response.data
    } catch (error) {
        console.log(error);
        return error
    }
  }