import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { loct } from "../../redux/slices/user/userSlice"
import { getClassToFlightbyClassthisFlightIdThunk } from "../../redux/slices/flight/getClassToFlightbyClassthisFlightIdThunk"
import { plusOrMinusnumbertickets } from "../../redux/slices/flight/flightsSlice"


export const FlightDetails = () => {

const dispatch = useDispatch()

const yourClassToFlight = useSelector(  state => state.flights.yourClassToFlight)
const thisYourChousFlight = useSelector(  state => state.flights.thisYourChousFlight)
const thisYourChooseThisFlight = useSelector(  state => state.flights.thisYourChooseThisFlight)


useEffect(()=>{
    dispatch(loct("/flightDetail"));
    dispatch(getClassToFlightbyClassthisFlightIdThunk({classs: thisYourChousFlight.classs, thisflightId: thisYourChooseThisFlight.id}))
},[])

return <div>
    {yourClassToFlight.sold === 0 && <div>🤍🤍🤍🤍🤍</div>}
    {yourClassToFlight.sold > 0 && <div>❤🤍🤍🤍🤍</div>}
    {yourClassToFlight.sold > 5 && <div>❤❤🤍🤍🤍</div>}
    {yourClassToFlight.sold > 10 && <div>❤❤❤🤍🤍</div>}
    {yourClassToFlight.sold > 15 && <div>❤❤❤❤🤍</div>}
    {yourClassToFlight.sold === yourClassToFlight.numOfSeats && <div>❤❤❤❤❤</div>}
    <label>טיסה מ {thisYourChousFlight.src} </label>
    <label> ל {thisYourChousFlight.des} </label>
    <div>{thisYourChooseThisFlight.date} תאריך </div>
    <div>{thisYourChooseThisFlight.time} שעה </div>
    <div>{thisYourChousFlight.classs} שעה </div>
    <div> {yourClassToFlight.price}  מחיר הטיסה</div>
    <div>{yourClassToFlight.weightLoad}  משקל מותר  </div>
    <div>{thisYourChooseThisFlight.priceToOverLoad} מחיר למשקל עודף </div>
    <div>
        <button onClick={() => dispatch(plusOrMinusnumbertickets(-1))}>+</button>
        <label>{thisYourChousFlight.numSeats}</label>
        <button>-</button>
    </div>
    

</div>

}