import { combineReducers } from "redux";
import globalReducer from "./reducers/globalReducer";

const rootReducer = combineReducers({
    globalReducer
})

export default rootReducer;