const setInitialDate = () => {
    let actualdate = new Date()
    var event = new Date(actualdate);
    return JSON.stringify(event).slice(1,-1)
}
const initialDate = setInitialDate()

export const ACTION_TYPES = {
    SET_FECHA: "SET_FECHA",
    SET_PROVEEDOR: "SET_PROVEEDOR",
    ADD_DETALLE: "ADD_DETALLE",
    REMOVE_DETALLE: "REMOVE_DETALLE",
}

export const INITIAL_STATE = {
    compra: {
        fecha:initialDate,
        proveedor:0,
        detalle_compra: [],
    }
}

export const comprasReducer = (state, action) => {
    switch(action.type) {
        case ACTION_TYPES.SET_FECHA:
            return {
                ...state,
                compra:{
                    ...state.compra,
                    fecha:action.payload
                }
            }
        case ACTION_TYPES.SET_PROVEEDOR:
            return {
                ...state,
                compra:{
                    ...state.compra,
                    proveedor:action.payload
                }
            }
        case ACTION_TYPES.ADD_DETALLE:
            var isInCompraDetalle = state.compra.detalle_compra.some((item)=> action.payload.articulo == item.articulo)
            if (!isInCompraDetalle) 
                return {
                    ...state,
                    compra:{
                        ...state.compra,
                        detalle_compra:[...state.compra.detalle_compra,action.payload]
                    }
                }
            // var detalle_compra = [...state.compra.detalle_compra]
            // var item = state.compra.detalle_compra.find((item) => action.payload.articulo == item.articulo);
            // var index = state.compra.detalle_compra.indexOf(item)
            // let itemToUpdate = detalle_compra[index]
            // ---------->alternative
            var item = state.compra.detalle_compra.find((item) => action.payload.articulo == item.articulo);
            item.cantidad += .5   
            return  {
                ...state,

            }
        case ACTION_TYPES.REMOVE_DETALLE:
            var isInCompraDetalle = state.compra.detalle_compra.some((item)=> action.payload.articulo == item.articulo)
            if (isInCompraDetalle) {
                var item = state.compra.detalle_compra.find((item) => action.payload.articulo == item.articulo);
                if (item.cantidad > 1){
                    item.cantidad -= .5
                    return  {
                        ...state,
                    }
                }
            }

        default:
            return state
    }
}


