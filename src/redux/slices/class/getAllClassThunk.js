import { createAsyncThunk } from "@reduxjs/toolkit";

export const getAllClassThunk = createAsyncThunk('fetchClasses',
    async () => {
        try {
            const response = await fetch("http://localhost:5041/api/Class/GetAll");
            const data = await response.json();
            return data;
        } catch (error) {
            throw new Error("Faild to find class");
        }
    }
)