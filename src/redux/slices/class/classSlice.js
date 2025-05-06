
import { createSlice } from "@reduxjs/toolkit";
import { logInUserThunk } from "./logInUserThunk";
import { addUserThunk } from "./addUserThunk";

const INITIAL_STATE = {
    classes: []
}



export const classSlice = createSlice({


    name: 'users',
    initialState: INITIAL_STATE,
    reducers: {
       
    },

    extraReducers: (builder) => {

        //GetAllClasses
        builder.addCase(logInUserThunk.pending, (state) => {
        })

        builder.addCase(logInUserThunk.fulfilled, (state, action) => {
           state.classes = action.pending
        })

        builder.addCase(logInUserThunk.rejected, (state) => {
        })

    }

});
export const {} = classSlice.actions;