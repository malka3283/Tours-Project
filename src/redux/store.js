import { combineSlices, configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./slices/user/userSlice";
import { flightsSlice } from "./slices/flight/flightsSlice";
import { classSlice } from "./slices/class/classSlice";

const reducers = combineSlices(userSlice, flightsSlice, classSlice);

export const STORE = configureStore({
    reducer: reducers,
})