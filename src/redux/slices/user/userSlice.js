import { createSlice } from "@reduxjs/toolkit";
import { logInUserThunk } from "./logInUserThunk";
import { addUserThunk } from "./addUserThunk";

const INITIAL_STATE = {
    userWithoutOutId: { firstName: '', lastName: '', email: '', phone: '', password: '' },
    user: null,
    loading: false,
    error: '',
    status: false,
    statusUser: false,
    loction: ""
}



export const userSlice = createSlice({


    name: 'users',
    initialState: INITIAL_STATE,
    reducers: {
        logIn: (state, action) => {
            state.userWithoutOutId = action.payload;
        },
        loct: (state, action) => {
            state.loction = action.payload;
        },
        signOut: (state, action) => {
            state.user = null;
            state.userWithoutOutId = { firstName: '', lastName: '', email: '', phone: '', password: '' };
        },
    },

    extraReducers: (builder) => {

        //LogIn
        builder.addCase(logInUserThunk.pending, (state) => {
        })

        builder.addCase(logInUserThunk.fulfilled, (state, action) => {
            debugger
            if (action.payload === null)
                state.status = true;
            else{
                state.user = action.payload;
                state.statusUser = true;
            }
        })

        builder.addCase(logInUserThunk.rejected, (state) => {
        })

        //Add
        builder.addCase(addUserThunk.pending, (state) => {
        })

        builder.addCase(addUserThunk.fulfilled, (state, action) => {
            state.user = action.payload;
        })

        builder.addCase(addUserThunk.rejected, () => {
        })
    }

});
export const { logIn, loct, signOut } = userSlice.actions;