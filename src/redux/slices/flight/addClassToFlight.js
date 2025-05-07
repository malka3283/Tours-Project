import { createAsyncThunk } from "@reduxjs/toolkit";

export const addClassToFlight = createAsyncThunk('addClassToFlight',
    async(cTF) => {
        debugger
        const response = await fetch("http://localhost:5041/api/ClassToFlight/Add",
            {
                method: 'POST',
                body: JSON.stringify(cTF),
                headers: {
                  'Content-Type': 'application/json'
                }
            }
        )
        if(response.ok){
            debugger
            return response.ok;
        }
          else{
              throw new Error('faild to fetch to addClassToFlight');
          }
    }
)