import { SIGN_IN, SIGN_OUT } from "../actions/globalActions";
import { isLogin, isEmployer, candidate, isAdmin, isCandidate, employer } from "../initialValues/globalItems";

const initialState = {
    isLogin: isLogin,
    isEmployer: isEmployer,
    isAdmin: isAdmin,
    isCandidate: isCandidate,
    candidate: candidate,
    employer: employer

}

export default function globalReducer(state = initialState, { type, payload }) { //actions da type ve payload gönderdiğimiz için buraya type ve payload yazdık
    switch (type) {

        case SIGN_IN:
            return {
                ...state,
                isLogin: true,
                isCandidate: true,   //hem cartItems hem de state yazmamızın sebebi initialState de birden fazla eleman olursa değiştirmek istemediğin default değerleri korumak için (ders 2:02.00)
              
                candidate: payload.data.data //...state.cartItems yazarak cartItems'daki diğer elemanları değiştirmeden ekliyoruz + virgülden sonraki yeni cartItem objesini ekliyoruz
            }
        case SIGN_OUT: debugger;
            return {
                ...initialState,
            }

        default:
            return state
    }
}