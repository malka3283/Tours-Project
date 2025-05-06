import { createAsyncThunk } from "@reduxjs/toolkit";

export const addThisFlightThunk = createAsyncThunk('fetchAddThisFlightThunk',
    async(thisFlight) => {
        debugger
        const response = await fetch("http://localhost:5041/api/ThisFlight/Add",
            {
                method: 'POST',
                body: JSON.stringify(thisFlight),
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
              throw new Error('faild to fetch to addThisFlight');
          }
    }
)