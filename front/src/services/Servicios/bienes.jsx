import axios from "../../api/axios";

const BIENES_URL = "api/ordenes/bien/"

export const postBienes = async (data) => {
    try {
        const response = await axios.post(BIENES_URL, data);
        
        return response.data
    } catch (error) {
        console.log(error)

        return error
    }
}