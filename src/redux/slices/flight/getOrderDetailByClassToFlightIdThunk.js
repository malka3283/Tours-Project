import { createAsyncThunk } from "@reduxjs/toolkit";

export const getOrderDetailByClassToFlightIdThunk = createAsyncThunk('getOrderDetailByClassToFlightId',
    async (id) => {
        try {
            const response = await fetch(`http://localhost:5041/api/Orders/GetByClassToFlightId/${id}`);
            const data = await response.json();
            return data;
        } catch (error) {
            throw new Error("Faild to find OrderDetailByClassToFlightId");
        }
    }
)