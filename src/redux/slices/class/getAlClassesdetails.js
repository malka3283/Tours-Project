import { createAsyncThunk } from "@reduxjs/toolkit";

export const getAlClassesdetails = createAsyncThunk('fetchClasses',
    async () => {
        try {
            const response = await fetch("https://localhost:5041/GetAll");
            const data = await response.json();
            return data;
        } catch (error) {
            throw new Error("Faild to find classToFlightThunk");
        }
    }
)