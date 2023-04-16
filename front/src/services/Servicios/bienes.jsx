import axios from "../../api/axios";

const BIENES_URL = "api/ordenes/bien/"

export function transformToFormData (values) {
    const formData = new FormData();
    formData.append('bien_nombre', values.bien_nombre);
    formData.append('bien_estado', values.bien_estado);

    values.orden_bien_tecnico.forEach((file, index) => {
    formData.append(`orden_bien_tecnico[${index}][propuesta_tecnica_archivo]`, file.propuesta_tecnica_archivo);
    });

    values.orden_bien_economico.forEach((file, index) => {
    formData.append(`orden_bien_economico[${index}][propuesta_bien_archivo]`, file.propuesta_bien_archivo);
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