import { ADD_TO_CART, REMOVE_FROM_CART } from './actionTypes';
import axios from 'axios';

export const removeFromCart = (item) => {
    return {
        type: REMOVE_FROM_CART,
        payload: item
    };
};


export const addToCart = (item) => {
    return {
        type: ADD_TO_CART,
        payload: item
    };
};
