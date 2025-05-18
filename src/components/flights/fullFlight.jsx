import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import { Calendar } from "../calander/calendar";
import './fullFlight.css'
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

    return (
        <div className="full-flight-container">
            <div className="flight-header">
                <div className="flight-route">
                    <span className="flight-city destination">
                        {flightsDetailsArr[0]?.flight?.sourceNavigation.destination}
                    </span>
                    <span className="flight-arrow">←</span>
                    <span className="flight-city source">
                        {flightsDetailsArr[0]?.flight?.destinationNavigation.destination}
                    </span>
                </div>
            </div>
            <div className="divOfCalendar">
                <Calendar />
            </div>
        </div>
    )
}