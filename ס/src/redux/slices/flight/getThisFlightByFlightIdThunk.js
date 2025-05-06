
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getThisFlightByFlightIdThunk = createAsyncThunk('fetchGetThisFlightByFlightIdThunk',
    async (id) => {
        try {
            const response = await fetch(`http://localhost:5041/api/ThisFlight/GetById/${id}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.log("Faild to find getByIdThisFlight");
            throw new Error("Faild to find getByIdThisFlight");
        }
    }
)