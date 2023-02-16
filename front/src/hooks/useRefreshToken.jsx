import axios from "../api/axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
    const { auth, setAuth } = useAuth()

    const refresh = async () => {
        
        const response = await axios.post('api/token/refresh/', JSON.stringify({refresh: auth?.refresh}), {
            headers: { 'Content-Type':'application/json' },
            withCredentials: true
        })    

        //"..." operator is for unstructuring our array
        setAuth(prev => {
            console.log(JSON.stringify(prev))
            console.log(response.data.access)
            return { ...prev, access: response.data.access, refresh: response.data.refresh}
        })

        return response.data.access
        
    }

    return refresh

}

export default useRefreshToken