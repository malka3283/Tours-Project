import { createAsyncThunk } from "@reduxjs/toolkit";


export const updateDestinationThunk = createAsyncThunk('updateDestinationThunk',

    async (des) => {
        const response = await fetch("http://localhost:5041/api/Destinition/update",
            {
              method: 'PUT',
              body: JSON.stringify(des),
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
            throw new Error('faild to fetch update destnation');
        }
    }
);