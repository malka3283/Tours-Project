import { createSlice } from "@reduxjs/toolkit";

import { getAllFlightThunk } from "./getAllFlightThunk";

import { getFlightDetailsByIdThunk } from "./getFlightDetailsByIdThunk";
import { updateFlightThunk } from "./updateFlightThunk";
import { getAllDestinationThunk } from "./getAllDestinationThunk";
import { getAllClassToFlightThunk } from "./getAllClassToFlightThunk";
import { addDestantionThunk } from "./addDestantionThunk";
import { addFlightThunk } from "./addFlightThunk";
import { getThisFlightBySrcdesdateThunk } from "./getThisFlightBySrcdesdateThunk";
import { getClassToFlightbyClassthisFlightIdThunk } from "./getClassToFlightbyClassthisFlightIdThunk";

const INITIAL_STATE = {
    flightsArr: [],
    flightsDetailsArr: [],
    FullFlight: [],
    classToFlight: [],
    destinitions: [],
    thisFlight: [],
    thisYourChousFlight: {},
    thisYourChooseThisFlight: {},
    yourClassToFlight: {},
    loading: false,
    error: '',
    status: false,
    class: 0,
    isAddFlight: 0,
    // des: 0,
    // src: 0,
}

export const flightsSlice = createSlice({

    name: 'flights',
    initialState: INITIAL_STATE,
    reducers: {
     
            chooseClass: (state, action) => {
                state.class = action.payload;
            },
            // saveDesAndSrc: (state, action) => {
            //     state.des = action.payload.des;
            //     state.src = action.payload.src;
            // }
            getFlightDetailsById: (state, action) => {
                console.log(state.flightsArr);
                state.FullFlight = state.flightsArr.filter(x => x.id === action.payload) 
                console.log(state.FullFlight);
                },
            savaYourChooseFlight: (state, action) => {
                state.thisYourChousFlight = action.payload;
            },
            savaYourChooseFlightDetails: (state, action) => {
                state.thisYourChooseThisFlight = action.payload;
                console.log(action.payload);
            },
            plusOrMinusnumbertickets: (state, action) => {
                state.thisYourChousFlight.numSeats += action.payload;
            },
        
    },
        extraReducers: (builder) => {

            //GetAll
            builder.addCase(getAllFlightThunk.pending, (state) => {
            })

            builder.addCase(getAllFlightThunk.fulfilled, (state, action) => {
                state.flightsArr = action.payload;
                console.log(state.flightsArr);
            })

            builder.addCase(getAllFlightThunk.rejected, (state) => {
            })

            
            //GetAllClassToFlight - no use
            builder.addCase(getAllClassToFlightThunk.pending, (state) => {
            })

            builder.addCase(getAllClassToFlightThunk.fulfilled, (state, action) => {
                state.classToFlight = action.payload;
                console.log(state.classToFlight);
            })

            builder.addCase(getAllClassToFlightThunk.rejected, (state) => {
            })


            //UPDATE - no use
            builder.addCase(updateFlightThunk.pending, (state) => {
            })

            builder.addCase(updateFlightThunk.fulfilled, (state, action) => {
                
                let f = state.flightsArr.find(x => x.id === action.payload.id);
                if(f)
                f = action.payload;
                console.log(state.flightsArr);
            })

            builder.addCase(updateFlightThunk.rejected, (state) => {
            })


            //getFlightDetails
            builder.addCase(getFlightDetailsByIdThunk.pending, (state) => {
            })

            builder.addCase(getFlightDetailsByIdThunk.fulfilled, (state, action) => {
                state.flightsDetailsArr = action.payload;
            })

            builder.addCase(getFlightDetailsByIdThunk.rejected, (state) => {
            })

            //getDestinitionDetails
            builder.addCase(getAllDestinationThunk.pending, (state) => {
            })

            builder.addCase(getAllDestinationThunk.fulfilled, (state, action) => {
                state.destinitions = action.payload;
            })

            builder.addCase(getAllDestinationThunk.rejected, (state) => {
            })

            //addDestinition
            builder.addCase(addDestantionThunk.pending, (state) => {
            })

            builder.addCase(addDestantionThunk.fulfilled, (state, action) => {
                
            })

            builder.addCase(addDestantionThunk.rejected, (state) => {
            })

            //addFlight
            builder.addCase(addFlightThunk.pending, (state) => {
            })

            builder.addCase(addFlightThunk.fulfilled, (state, action) => {
                state.isAddFlight = action.payload
            })

            builder.addCase(addFlightThunk.rejected, (state) => {
            })

            //GetBySrcDesDateThisFlight
            builder.addCase(getThisFlightBySrcdesdateThunk.pending, (state) => {
            })

            builder.addCase(getThisFlightBySrcdesdateThunk.fulfilled, (state, action) => {
                state.thisFlight = action.payload
            })

            builder.addCase(getThisFlightBySrcdesdateThunk.rejected, (state) => {
            })

            //getClassToFlightbyClassthisFlightId
            builder.addCase(getClassToFlightbyClassthisFlightIdThunk.pending, (state) => {
            })

            builder.addCase(getClassToFlightbyClassthisFlightIdThunk.fulfilled, (state, action) => {
                state.yourClassToFlight = action.payload
            })

            builder.addCase(getClassToFlightbyClassthisFlightIdThunk.rejected, (state) => {
            })
                        
            
          
        }

    
});
export const { chooseClass, getFlightDetailsById, savaYourChooseFlight, savaYourChooseFlightDetails, plusOrMinusnumbertickets} = flightsSlice.actions;