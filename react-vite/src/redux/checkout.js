export const ALL_CHECKOUTS = 'checkout/ALL_CHECKOUTS'
export const ADD_CHECKOUT = 'checkout/ADD_CHECKOUT'
export const REMOVE_CHECKOUT = 'checkout/REMOVE_CHECKOUT'

//POJO action creators
const allCheckouts = (checkouts) => {
    return {
        type: ALL_CHECKOUTS,
        payload: checkouts
    }
}

const addCheckout = (checkout) => {
    return {
        type: ADD_CHECKOUT,
        payload: checkout
    }
}

const removeCheckout = (checkoutId) => {
    return {
        type: REMOVE_CHECKOUT,
        payload: checkoutId
    }
}

//thunks

//get all checkouts of user
export const getAllCheckouts = (userId) => async(dispatch) => {
    const response = await fetch(`/api/checkout/${userId}`)

    if (response.ok) {
        const data = await response.json()
        console.log("DATA: ", data)
        if (data.errors) {
            return;
        }
        dispatch(allCheckouts(data))
        return data
    }
}

//add pattern to checkout
export const createCheckout = (patternId, checkout) => async (dispatch) => {
    const response = await fetch(`/api/patterns/${patternId}/checkout`, {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(checkout)
    })
    if (response.ok) {
        const data = await response.json()

        if (data.errors) {
            return;
        }
        dispatch(addCheckout(data))
        return data
    }
}

export const removePatternfromCheckout = (checkoutId) => async (dispatch) => {
    const response = await fetch(`/api/checkout/${checkoutId}`, {
        method: "DELETE"
    });
    if (response.ok) {
        const data = await response.json()
        dispatch(removeCheckout(checkoutId))
        return data
    }
    return response
}

const initialState = {
    allCheckouts: []
}

const checkoutReducer = (state = initialState, action) => {
    switch(action.type) {
        case ALL_CHECKOUTS: {
            return {...state, allCheckouts: action.payload.checkouts}
        }
        case ADD_CHECKOUT : {
            return {...state, checkouts: [...state.checkout, action.payload]}
        }
        case REMOVE_CHECKOUT: {
            const newState = {...state};
            newState.checkout = newState.checkout.filter(checkout => checkout.id !== action.payload)
            return newState
        }
        default: {
            return state
        }
    }

}

export default checkoutReducer;
