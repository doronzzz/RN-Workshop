import { ADD_TO_CART, REMOVE_FROM_CART } from '../actions/actionTypes';

const initialState = {
    cart: [],
};

export default mainReducer = (state = initialState, action) => {
    switch (action.type) { 
        case ADD_TO_CART:
            return {
                 ...state,
                 cart: [...state.cart, action.payload],
                };
        case REMOVE_FROM_CART:
            return { 
                ...state, 
                cart: state.cart.filter(item => item !== action.payload),
            };
            
        default:
            return state;
    }
};