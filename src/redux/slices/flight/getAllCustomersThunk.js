import { createAsyncThunk } from "@reduxjs/toolkit";


export const getAllCustomersThunk = createAsyncThunk('fetchAllCustomersThunk',
    async () => {
        try {
            debugger
            const response = await fetch("http://localhost:5041/api/Customers/GetAll");
            const data = await response.json();
            return data;
        } catch (error) {
            console.log("Faild to find Customers");
            throw new Error("Faild to find Customers");
        }
    }
)