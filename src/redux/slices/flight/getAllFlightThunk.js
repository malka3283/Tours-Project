import { createAsyncThunk } from "@reduxjs/toolkit";

export const getAllFlightThunk = createAsyncThunk('fetchFlightThunk',
    async () => {
        try {
            const response = await fetch("http://localhost:5041/api/Flight/GetAll");
            const data = await response.json();
            return data;
        } catch (error) {
            console.log("Faild to find Flight");
            throw new Error("Faild to find Flight");
        }
    }
)