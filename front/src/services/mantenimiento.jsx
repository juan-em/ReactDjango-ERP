import axios from "axios"

const URLS_MANTENIMIENTO = "http://localhost:8000/api/mantenimientos/"

//PROVINCIAS
export const getProvincias = async(set) => {
    const res = await axios.get(`${URLS_MANTENIMIENTO}provincias/`)
    set(res.data)
}

// FORMA PAGO   
export const getFormaPago = async(set) => {
    try {
        const res = await axios.get(`${URLS_MANTENIMIENTO}formapago/`)
        set(res.data)
        return res.data
    }catch(error){
        console.log(error)
    }
}