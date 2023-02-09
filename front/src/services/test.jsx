import { postProvincia,deleteProvincia, putProvincia } from "./mantenimiento"
import { useState } from "react"

const Test = () => {
    const [payload, setPayload] = useState({})
    return (
        <>  
        <button onClick={()=>deleteProvincia(30)}>delete</button> 
            <form >
                <input placeholder="nombre" name="nombreprovincia" id="nombreprovincia" type="text" onChange={handler(e)} />
                <button onClick={()=>deleteProvincia()}>submit</button> 
            </form>
        </>
    )
}

export default Test