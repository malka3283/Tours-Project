import { createAsyncThunk } from "@reduxjs/toolkit";

export const getAllFlightsWhisHanacahThunk = createAsyncThunk('fetchAllFlightsWhisHanacahThunk',
    async () => {
        try {
            const response = await fetch("http://localhost:5041/api/ClassToFlight/GetAllSales");
            const data = await response.json();
            return data;
        } catch (error) {
            throw new Error("Faild to find GetAllSales");
        }
    }
)