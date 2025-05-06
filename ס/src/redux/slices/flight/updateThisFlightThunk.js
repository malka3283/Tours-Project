import { createAsyncThunk } from "@reduxjs/toolkit";


export const updateThisFlightThunk = createAsyncThunk('updateThisFlight',

    async (flight) => {
        const response = await fetch("http://localhost:5041/api/ThisFlight/Update",
            {
              method: 'PUT',
              body: JSON.stringify(flight),
              headers: {
                'Content-Type': 'application/json'
              }
            }
        )
          if(response.ok) {
            const data = await response.json();
            return data;
          }
        else{
            throw new Error('faild to fetch');
        }
    }
);