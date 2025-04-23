import { createAsyncThunk } from "@reduxjs/toolkit";

export const getThisFlightBySrcdesdateThunk = createAsyncThunk('fetchThisFlightByDesSrcDateThunk',
    async ({src, des, date}) => {
        try {
            const response = await fetch(`http://localhost:5041/api/ThisFlight/GetById/${src}/${des}/${date}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.log("Faild to find getByDesSrcDate");
            throw new Error("Faild to find getByDesSrcDate");
        }
    }
)