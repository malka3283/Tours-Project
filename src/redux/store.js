import { combineSlices, configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./slices/user/userSlice";
import { flightsSlice } from "./slices/flight/flightsSlice";

const reducers = combineSlices(userSlice, flightsSlice);

export const STORE = configureStore({
    reducer: reducers,
})