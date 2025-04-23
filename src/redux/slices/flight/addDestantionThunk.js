import { createAsyncThunk } from "@reduxjs/toolkit";

export const addDestantionThunk = createAsyncThunk('fetchAddDestinationThunk',
    async(user) => {
        const response = await fetch("https://localhost:5041/api/Destination/Add",
            {
                method: 'POST',
                body: JSON.stringify(user),
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
              throw new Error('faild to fetch to addDestination');
          }
    }
)