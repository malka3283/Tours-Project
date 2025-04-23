import { createAsyncThunk } from "@reduxjs/toolkit";


export const updateFlightThunk = createAsyncThunk('editFlight',

    async (flight) => {
        const response = await fetch("https://localhost:5041/api/Flight/Update",
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