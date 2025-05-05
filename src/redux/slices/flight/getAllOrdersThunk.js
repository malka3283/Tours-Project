import { createAsyncThunk } from "@reduxjs/toolkit";

export const getAllOrdersThunk = createAsyncThunk('fetchAllOrdersThunk',
    async () => {
        try {
            const response = await fetch("http://localhost:5041/api/Orders/GetAll");
            debugger
            const data = await response.json();
            console.log(data);
            return data;
        } catch (error) {
            throw new Error("Faild to find getAllOrders");
        }
    }
)