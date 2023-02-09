import axios from "axios"
import Swal from "sweetalert2"

//URLS
const URL = "http://localhost:8000/api/mantenimientos/"
const URL_PROVINCIAS = `${URL}provincias/`
const URL_ENTIDADES = `${URL}entidades/`
const URL_IMPUESTOS = `${URL}impuestos/`
const URL_EMBALAJES = `${URL}embalajes/`
const URL_FORMAPAGO = `${URL}formapago/`
const URL_CATART = `${URL}categoriaarticulos/`

//PROVINCIAS
export const getProvincias = (set) => {
    axios.get(URL_PROVINCIAS)
     .then(res=>{
        if(res.status==200)set(res.data)
        })
     .catch((error)=>console.log(error))
}
export const getProvincia = (id,set) => {
    axios.get(`${URL_PROVINCIAS}${id}`)
     .then(res=>{
        if(res.status==200)set(res.data)
        })
     .catch((error)=>console.log(error))
}
export const postProvincia = async (payload) => {
    try{
        const res = await axios.post(URL_PROVINCIAS,payload)
        return res.data
    }catch(error){
        return error
    }
}
export const putProvincia = async (id,payload) => {
    try{
        const res = await axios.put(`${URL_PROVINCIAS}${id}/`,payload)
        return res.data
    }catch(error){
        return error
    }
}

export const post_putProvincia = async (e) => {
    e.preventDefault()
    const {nombreprovincia,} = e.target
    const payload = {
        [nombreprovincia.name]:nombreprovincia.value
    }
    try{
        if (!e.target.cod) {
            return await postProvincia(payload)
        } else {
            let id = e.target.cod.value
            return await putProvincia(id,payload)
        }
    }
    catch(error){return error}
}

export const deleteProvincia = async(id) => {
    let res = await axios.delete(`${URL_PROVINCIAS}${id}/`).catch((error)=>console.log({error}))
    console.log(res.data)
    return res.data
}

export const searcherProvincias = (fields, list) =>{
    let resultData = list
    resultData = fields.nombreprovincia ? 
                 resultData.filter(item=>item.nombreprovincia.toString().includes(fields.nombreprovincia.toString())) 
                 :resultData
    return resultData
}




//ENTIDADES
export const getEntidades = async(set) => {
    const res = await axios.get(URL_ENTIDADES).catch((error)=>console.log({error})) 
    set(res.data)
    return res.data
}
export const postEntidad = async(e) => {
    e.preventDefault()
    let res = await axios.post(URL_ENTIDADES,
        {
            nombreentidad:e.target.nombreentidad.value,
        }
    ).catch((error)=>console.error(error))
    console.log(res.data)
    return res.data
}
export const putEntidad = () => {return
}
export const deleteEntidad = async (id)=>{
    let res = await axios.delete(`${URL_ENTIDADES}${id}`).catch((error)=>console.log({error}))
    console.log(res.data)
    return res.data
}


//IMPUESTOS
export const getImpuestos = async(set) => {
    const res = await axios.get(URL_IMPUESTOS).catch((error)=>console.log({error})) 
    set(res.data)
    return res.data
}
export const postImpuesto = async(e) => {
    e.preventDefault()
    let res = await axios.post(URL_IMPUESTOS,
        {
            nombre:e.target.nombre.value,
            valor: e.target.valor.value
        }
    ).catch((error)=>console.error(error))
    console.log(res.data)
    return res.data
}
export const putImpuesto = () => {return
}
export const deleteImpuesto = async (id)=>{
    let res = await axios.delete(`${URL_IMPUESTOS}${id}`).catch((error)=>console.log({error}))
    console.log(res.data)
    return res.data
}



//EMBALAGES
export const getEmbalajes = async(set) => {
    const res = await axios.get(URL_EMBALAJES).catch((error)=>console.log({error})) 
    set(res.data)
    return res.data
}
export const postEmbalaje = async(e) => {
    e.preventDefault()
    let res = await axios.post(URL_EMBALAJES,
        {
            nombre:e.target.nombre.value,
        }
    ).catch((error)=>console.error(error))
    console.log(res.data)
    return res.data
}
export const putEmbalaje = () => {return
}
export const deleteEmbalaje = async (id)=>{
    let res = await axios.delete(`${URL_EMBALAJES}${id}`).catch((error)=>console.log({error}))
    console.log(res.data)
    return res.data
}



//FORMAS DE PAGO
export const getFormasPago = async(set) => {
    const res = await axios.get(URL_FORMAPAGO).catch((error)=>console.log({error})) 
    set(res.data)
    return res.data
}
export const postFormaPago = async(e) => {
    e.preventDefault()
    let res = await axios.post(URL_FORMAPAGO,
        {
            nombrefp:e.target.nombrefp.value,
        }
    ).catch((error)=>console.error(error))
    console.log(res.data)
    return res.data
}
export const putFormaPago = () => {return
}
export const deleteFormaPago = async (id)=>{
    let res = await axios.delete(`${URL_FORMAPAGO}${id}`).catch((error)=>console.log({error}))
    console.log(res.data)
    return res.data
}


//CATEGORIAS ARTÍCULOS
export const getCatArticulos = async(set) => {
    const res = await axios.get(URL_CATART).catch((error)=>console.log({error})) 
    set(res.data)
}
export const postCatArticulos = async(e) => {
    e.preventDefault()
    let res = await axios.post(URL_CATART,
        {
            nombre:e.target.nombre.value,
        }
    ).catch((error)=>console.error(error))
    console.log(res.data)
    return res.data
}
export const putCatArticulos = () => {return
}
export const deleteCatArticulos = async (id)=>{
    let res = await axios.delete(`${URL_CATART}${id}`).catch((error)=>console.log({error}))
    console.log(res.data)
    return res.data
}




// FORMA PAGO   
export const getFormaPago = async(set) => {
    try {
        const res = await axios.get(URL_FORMAPAGO)
        set(res.data)
        return res.data
    }catch(error){
        console.log(error)
    }
}
