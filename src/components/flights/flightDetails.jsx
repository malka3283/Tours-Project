import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { loct } from "../../redux/slices/user/userSlice"
import { getClassToFlightbyClassthisFlightIdThunk } from "../../redux/slices/flight/getClassToFlightbyClassthisFlightIdThunk"
import { useParams } from "react-router-dom"
import { minusnumbertickets } from "../../redux/slices/flight/flightsSlice"


export const FlightDetails = () => {

    const params = useParams();

const dispatch = useDispatch()

const yourClassToFlight = useSelector(  state => state.flights.yourClassToFlight)
const numSeats = useSelector(  state => state.flights.numSeats)


useEffect(() => {
    dispatch(loct("/flightDetail"));
    debugger
    console.log("1");
    dispatch(getClassToFlightbyClassthisFlightIdThunk({classs: params.classs, thisflightId: params.id}))
}, [])

return <div>
    {yourClassToFlight.sold === 0 && <div>🤍🤍🤍🤍🤍</div>}
    {yourClassToFlight.sold > 0 && <div>❤🤍🤍🤍🤍</div>}
    {yourClassToFlight.sold > 5 && <div>❤❤🤍🤍🤍</div>}
    {yourClassToFlight.sold > 10 && <div>❤❤❤🤍🤍</div>}
    {yourClassToFlight.sold > 15 && <div>❤❤❤❤🤍</div>}
    {yourClassToFlight.sold === yourClassToFlight.numOfSeats && <div>❤❤❤❤❤</div>}
    <label>טיסה מ {yourClassToFlight.thisflight.flight.sourceNavigation.destination} </label>
    <label>טיסה מ {yourClassToFlight.thisflight.flight.destinationNavigation.destination} </label>
    <div>{yourClassToFlight.thisflight.date} תאריך </div>
    <div>{yourClassToFlight.thisflight.time} שעה </div>
    <div> {yourClassToFlight.price}  מחיר הטיסה</div>
    <div>{yourClassToFlight.weightLoad}  משקל מותר  </div>
    <div>{yourClassToFlight.thisflight.priceToOverLoad} מחיר למשקל עודף </div>
    <div>
        <button onClick={() => dispatch(minusnumbertickets())}>+</button>
        <label>{numSeats}</label>
        <button onClick={() => dispatch(minusnumbertickets())}>-</button>
    </div>
    

</div>

}