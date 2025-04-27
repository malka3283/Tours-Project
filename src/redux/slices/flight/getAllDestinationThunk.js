import { createAsyncThunk } from "@reduxjs/toolkit";


export const getAllDestinationThunk = createAsyncThunk('fetchAllDestnationThunk',
    async () => {
        try {
            
            const response = await fetch("http://localhost:5041/api/Destinition/GetAll");
            debugger
            const data = await response.json();
            return data;
        } catch (error) {
            console.log("Faild to find Destinition");
            throw new Error("Faild to find Destinition");
        }
    }
)