import { createAsyncThunk } from "@reduxjs/toolkit";

export const deleteFlight = createAsyncThunk(

    'deleteFlight',

    async ( id ) => {
        debugger
        const response = await fetch(`http://localhost:5041/api/OrdersDetails/${id}`,
        {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });
       debugger
        if (response.ok) {
        const data = await response.json();
         return data;
        }
        else {
            throw new Error('faild to fetch delete flight');
        }
    }
);

