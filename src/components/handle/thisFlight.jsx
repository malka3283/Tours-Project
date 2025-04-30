import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { loct } from "../../redux/slices/user/userSlice";
import { getAllThisFlightThunk } from "../../redux/slices/flight/getAllThisFlightThunk";
import { useSelector } from "react-redux";
import { addThisFlightThunk } from "../../redux/slices/flight/addThisFlightThunk";
import { AddThisFlight } from "./addThisFlight";

export const ThisFlight = () => {

    const dispatch = useDispatch()

    const flightsArr = useSelector(state => state.flights.AllThisFlight)

    const [add, setAdd] = useState(false)
    const [flit, setFlt] = useState({priceToOverLoad: 0, time: '', data: '', flightId: 0, flight: {source: "", destination: "", timeOfFlight: 0, sold: 0, destinationNavigation:{}, sourceNavigation: {}}})

    const addFlight = (addFlt) => {
        dispatch(addThisFlightThunk(addFlt))
        close()
      }

      const update = (update) => {
        // dispatch(updateFlightThunk(update))
        close()
      }
      

      const close = () => {
        setFlt({priceToOverLoad: 0, time: '', data: '', flightId: 0})
            setAdd(false)
      }

    useEffect(()=>{
        dispatch(loct("/AllThisFlight"));
        dispatch(getAllThisFlightThunk());
      },[])

    return <div>

<button onClick={() => setAdd(true)}>הוסף טיסה ספציפית</button>

{flightsArr?.map(f => <div key={f.id}
                   >
                    <h1>{f.flight.sourceNavigation.destination} - {f.flight.destinationNavigation.destination}</h1>
                    <div><img src={`/תמונות מדינות/${f.flight.sourceNavigation.path}.png`} alt={f.flight.sourceNavigation.path}></img></div>
                    <div>תאריך: {f.date}</div>
                    <div>שעה: {f.time}</div>
                    <div>מחיר למשקל עודף: {f.priceToOverLoad}</div>
                    <button>🚮</button>

                </div>)}

                {add && <AddThisFlight addFlight={addFlight} update={update} close={close} thisFlt={flit}/>}
        </div>
}