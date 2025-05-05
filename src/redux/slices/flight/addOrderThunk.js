import { createAsyncThunk } from "@reduxjs/toolkit";

export const addOrderThunk = createAsyncThunk('fetchOrderThunk',
    async(order) => {
        debugger
        const response = await fetch("https://localhost:5041/api/Orders/Add",
            {
                method: 'PUT',
                body: JSON.stringify(order),
                headers: {
                  'Content-Type': 'application/json'
                }
            }
        )
        if(response.ok){
            let data =  await response.json();
            console.log(data);
            return data;
        }
          else{
              throw new Error('faild to fetch to addOrder');
          }
    }
)