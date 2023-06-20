import axios from "../api/axios";

const cajaURL = "api/cajadiaria/"
const lastCajaURL =  cajaURL + "ultimacaja/"

export const postCaja = async (data) => {
    try {
        const response = await axios.post(cajaURL, data)
        return response.data
    } catch (err) {
        console.log(err)
        return err
    }
}

export const getLastCaja = async (set) => {
    try {
        const responseLast = await axios.get(lastCajaURL)
        
        if (responseLast.data.status !== false) {
            set(responseLast.data.content)
        }
        
        return responseLast.data
    } catch (err) {
        console.log(err)
        return err
    }
}

export const patchCaja = async (id, data) => {
    try {
        const responsePatch = await axios.patch(cajaURL + `${id}/`, data)
        return responsePatch.data
    } catch (err) {
        console.log(err)
        return err
    } 
}