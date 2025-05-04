import { createAsyncThunk } from "@reduxjs/toolkit";

export const addOrderThunk = createAsyncThunk('fetchOrderThunk',
    async(order) => {
        debugger
        const response = await fetch("http://localhost:5041/api/Orders/Add",
            {
                method: 'POST',
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