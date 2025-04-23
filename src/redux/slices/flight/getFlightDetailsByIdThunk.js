import { createAsyncThunk } from "@reduxjs/toolkit";

export const getFlightDetailsByIdThunk = createAsyncThunk('fetchFlightDetailsByIdThunk',
    async (id) => {
        try {
            const response = await fetch(`https://localhost:5041/api/ThisFlight/GetById/${id}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.log("Faild to find FlightDetails");
            throw new Error("Faild to find FlightDetails");
        }
    }
)