import { createAsyncThunk } from "@reduxjs/toolkit";


export const updateClassToFlight = createAsyncThunk('updateClassToFlight',

    async (classToFlight) => {
        const response = await fetch("http://localhost:5041/api/ClassToFlight/Update",
            {
              method: 'PUT',
              body: JSON.stringify(classToFlight),
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