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
import { getThisFlightByFlightIdThunk } from "./getThisFlightByFlightIdThunk";
import { getAllThisFlightThunk } from "./getAllThisFlightThunk";
import { getAllFlightsWhisHanacahThunk } from "./getAllFlightsWhisHanacahThunk";
import { updateDestinationThunk } from "./updateDestinationThunk";
import { addThisFlightThunk } from "./addThisFlightThunk";
import { addOrderThunk } from "./addOrderThunk";

const INITIAL_STATE = {
    flightsArr: [],
    flightsWhisHanachaArr: [],
    orders: [],
    flightsDetailsArr: [],
    FullFlight: [],
    AllThisFlight: [],
    classToFlight: [],
    destinitions: [],
    thisFlight: [],
    ordersInPass: [],
    find: false,
    yourClassToFlight: null,
    price: 0,
    loading: false,
    error: '',
    status: false,
    classes: "",
    isAddFlight: 0,

}

export const flightsSlice = createSlice({

    name: 'flights',
    initialState: INITIAL_STATE,
    reducers: {
     
            chooseClass: (state, action) => {
                state.classes = action.payload;
            },

            getFlightDetailsById: (state, action) => {
                state.FullFlight = state.flightsArr.filter(x => x.id === action.payload) 
                },
            savaYourChooseFlight: (state, action) => {
                state.thisYourChousFlight = action.payload;
            },
            savaClassToFlight: (state, action) => {
               state.orders.push(action.payload)
            },
            savaYourChooseFlightDetails: (state, action) => {
                state.thisYourChooseThisFlight = action.payload;
                console.log(action.payload);
            },
            deleteOrder: (state, action) => {
                let i = state.orders.indexOf(action.payload)
                state.orders.splice(i, 1)
            },
            changeNOS: (state, action) => {
                let o = state.orders.find(x => x.id === action.payload.id)
                o.overWight = action.payload.overWight
            },
            changeWight: (state, action) => {
                state.orders.splice(action.payload)
            },
            savePriceToPay: (state, action) => {
                state.price = action.payload
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

            
            //GetAllClassToFlight
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
                console.log(state.destinitions);
            })

            builder.addCase(getAllDestinationThunk.rejected, (state) => {
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
                state.find = false;
            })

            builder.addCase(getThisFlightBySrcdesdateThunk.fulfilled, (state, action) => {
                state.thisFlight = action.payload

            })

            builder.addCase(getThisFlightBySrcdesdateThunk.rejected, (state) => {
                state.find = true;
            })

            //getClassToFlightbyClassthisFlightId
            builder.addCase(getClassToFlightbyClassthisFlightIdThunk.pending, (state) => {
            })

            builder.addCase(getClassToFlightbyClassthisFlightIdThunk.fulfilled, (state, action) => {
                state.yourClassToFlight = action.payload
                console.log(state.yourClassToFlight)
            })

            builder.addCase(getClassToFlightbyClassthisFlightIdThunk.rejected, (state) => {
            })

            
            //getThisFlightByFlightIdThunk
            builder.addCase(getThisFlightByFlightIdThunk.pending, (state) => {
            })

            builder.addCase(getThisFlightByFlightIdThunk.fulfilled, (state, action) => {
                state.flightsDetailsArr = action.payload;
            })

            builder.addCase(getThisFlightByFlightIdThunk.rejected, (state) => {
            })

            //getAllThisFlightThunk
            builder.addCase(getAllThisFlightThunk.pending, (state) => {
            })

            builder.addCase(getAllThisFlightThunk.fulfilled, (state, action) => {
                state.AllThisFlight = action.payload;
            })

            builder.addCase(getAllThisFlightThunk.rejected, (state) => {
            })

            //getAllFlightsWhisHanacahThunk
            builder.addCase(getAllFlightsWhisHanacahThunk.pending, (state) => {
            })

            builder.addCase(getAllFlightsWhisHanacahThunk.fulfilled, (state, action) => {
                state.flightsWhisHanachaArr = action.payload;
            })

            builder.addCase(getAllFlightsWhisHanacahThunk.rejected, (state) => {
            })

            //updateDestination
            builder.addCase(updateDestinationThunk.pending, (state) => {
            })

            builder.addCase(updateDestinationThunk.fulfilled, (state, action) => {
                state.destinitions = action.payload;
            })

            builder.addCase(updateDestinationThunk.rejected, (state) => {
            })

            //addDestination
            builder.addCase(addDestantionThunk.pending, (state) => {
            })

            builder.addCase(addDestantionThunk.fulfilled, (state, action) => {
                state.destinitions = action.payload;
            })

            builder.addCase(addDestantionThunk.rejected, (state) => {
            })

            //addThisFlight
            builder.addCase(addThisFlightThunk.pending, (state) => {
            })

            builder.addCase(addThisFlightThunk.fulfilled, (state, action) => {
                state.thisFlight = action.payload;
            })

            builder.addCase(addThisFlightThunk.rejected, (state) => {
            })

            //addOrder
            builder.addCase(addOrderThunk.pending, (state) => {
            })

            builder.addCase(addOrderThunk.fulfilled, (state, action) => {
                state.price = 0
                state.orders = []
            })

            builder.addCase(addOrderThunk.rejected, (state) => {
            })
                           
                        
            
          
        }

    
});
export const { chooseClass, getFlightDetailsById, savaYourChooseFlight, savaYourChooseFlightDetails, savaClassToFlight, deleteOrder, savePriceToPay} = flightsSlice.actions;