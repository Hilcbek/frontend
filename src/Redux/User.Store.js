import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./User.Reducer";
export default configureStore({
    reducer : {
        user : UserReducer,
    }
})