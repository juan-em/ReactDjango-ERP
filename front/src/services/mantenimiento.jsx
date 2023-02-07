import axios from "axios"

const URLS_MANTENIMIENTO = "http://localhost:8000/mantenimientos/"

//PROVINCIAS
export const getProvincias = async(set) => {
    const res = await axios.get(`${URLS_MANTENIMIENTO}provincias/`)
    set(res.data)
}