import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import { Calendar } from "../calander/calendar";
import './flights.css'
import { getThisFlightByFlightIdThunk } from "../../redux/slices/flight/getThisFlightByFlightIdThunk";
import { loct } from "../../redux/slices/user/userSlice";

export const FullFlight = () => {
    
    const params = useParams();


    const dispatch = useDispatch();

    const flightsDetailsArr = useSelector(state => state.flights.flightsDetailsArr);

    useEffect(() => {
        dispatch(loct(`/fullFlight/${params.id}`));

        dispatch(getThisFlightByFlightIdThunk(params.id))
    }, [])

return <div>
    <div>
        <label>{flightsDetailsArr[0]?.flight?.sourceNavigation.destination}</label>
        <label>{flightsDetailsArr[0]?.flight?.destinationNavigation.destination}</label>
        <div className="divOfCalendar">
        <Calendar />
        </div>
    </div>
</div>
}