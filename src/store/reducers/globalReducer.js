import { SIGN_IN, SIGN_OUT } from "../actions/globalActions";
import { isLogin, isEmployer, candidate, isAdmin, isCandidate } from "../initialValues/globalItems";

const initialState = {
    isLogin: isLogin,
    isEmployer : isEmployer,
    isAdmin: isAdmin,
    isCandidate: isCandidate,
    candidate: candidate

}

export default function globalReducer(state = initialState, { type, result }) { //actions da type ve payload gönderdiğimiz için buraya type ve payload yazdık
    switch (type) {
        case SIGN_IN:              
            // let product = state.cartItems.find(c => c.product.id === payload.id) 
            // if (product) {
            //     product.quantity++;
            //     return {   //state güncellenir
            //         ...state 
            //     }
            // }
            // else {
            //     return { 
            //         ...state,        //hem cartItems hem de state yazmamızın sebebi initialState de birden fazla eleman olursa değiştirmek istemediğin default değerleri korumak için (ders 2:02.00)
            //         cartItems: [...state.cartItems, { quantity: 1, product: payload }] //...state.cartItems yazarak cartItems'daki diğer elemanları değiştirmeden ekliyoruz + virgülden sonraki yeni cartItem objesini ekliyoruz
            //     }
            // }

        case SIGN_OUT:
            // return {
            //     ...state,
            //     cartItems: state.ca.cartItems.filter(c => c.product.id !== payload.id)
            // }

        default:
            return state
    }
}