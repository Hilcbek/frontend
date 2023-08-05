import { createSlice } from "@reduxjs/toolkit";

export let UserSlice = createSlice({
    name : "user",
    initialState : {
        username : JSON.parse(localStorage.getItem("username")) || null,
        profile :  JSON.parse(localStorage.getItem("profile")) || null,
        isAdmin : JSON.parse(localStorage.getItem("isAdmin")) || null,
        signIn : false
    },
    reducers : {
        LOGIN : (state,action) => {
            state.username = action.payload.username
            state.profile = action.payload.profile
            state.isAdmin = action.payload.isAdmin
            localStorage.setItem("username",JSON.stringify(action.payload.username))
            localStorage.setItem("profile",JSON.stringify(action.payload.profile))
            localStorage.setItem("isAdmin",JSON.stringify(action.payload.isAdmin))
        },
        LOGOUT : (state,action) => {
            localStorage.clear()
            state.username = ''
            state.profile = ''
            state.isAdmin =''
        },
        SIGNIN : (state,action) => {
            state.signIn = action.payload.type
        },
        IMAGECHANGER : (state,action) => {
            localStorage.setItem("profile",JSON.stringify(action.payload.profile))
            state.profile = JSON.parse(localStorage.getItem("profile")) || null
        }
    }
})
export let { LOGIN, LOGOUT, SIGNIN, IMAGECHANGER } = UserSlice.actions;
export default UserSlice.reducer;