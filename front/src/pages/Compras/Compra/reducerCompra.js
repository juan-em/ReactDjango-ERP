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
            };
        case ACTION_TYPES.SET_PROVEEDOR:
            return {
                ...state,
                compra:{
                    ...state.compra,
                    proveedor:action.payload
                }
            };




        default:
            return state
    }
}


