import { SIGN_IN, SIGN_OUT } from "../actions/globalActions";
import { isLogin, isEmployer, isAdmin, isCandidate, candidate, employer, admin } from "../initialValues/globalItems";

const initialState = {
    isLogin: isLogin,
    isEmployer: isEmployer,
    isAdmin: isAdmin,
    isCandidate: isCandidate,
    candidate: candidate,
    employer: employer,
    admin: admin

}

export default function globalReducer(state = initialState, { type, payload }) { //actions da type ve payload gönderdiğimiz için buraya type ve payload yazdık
    switch (type) {

        case SIGN_IN:                
            if (payload.data.data.userType === 'Candidate') { 
                return {
                    ...state,
                    isLogin: true,
                    isCandidate: true,
                    candidate: payload.data.data //...state.cartItems yazarak cartItems'daki diğer elemanları değiştirmeden ekliyoruz + virgülden sonraki yeni cartItem objesini ekliyoruz
                }
            } else if (payload.data.data.userType === 'Employer') {
                return {
                    ...state,
                    isLogin: true,
                    isEmployer: true,
                    employer: payload.data.data
                }
            } else if (payload.data.data.userType === 'Admin') {
                return {
                    ...state,
                    isLogin: true,
                    isAdmin: true,
                    admin: payload.data.data
                }
            }

        case SIGN_OUT:
            return {
                ...initialState,
            }

        default:
            return state
    }
}