import { createAsyncThunk } from "@reduxjs/toolkit";

export const getClassToFlightbyClassthisFlightIdThunk = createAsyncThunk('fetchClassToFlightbyClassthisFlightIdThunk',
    async ({classs, thisflightId}) => {
        try {
            const response = await fetch(`http://localhost:5041/api/ClassToFlight/GetByClassFlight/${classs}/${thisflightId}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.log("Faild to find getClassToFlightbyClassthisFlightId");
            throw new Error("Faild to find getClassToFlightbyClassthisFlightId");
        }
    }
)