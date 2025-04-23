import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import { Calendar } from "../calander/calendar";
import './flights.css'
import { getFlightDetailsById } from "../../redux/slices/flight/flightsSlice";

export const FullFlight = () => {
    
    const params = useParams();

    const FullFlight = useSelector(state => state.flights.FullFlight);
    // const src = useSelector(state => state.flights.src);
    // const des = useSelector(state => state.flights.des);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getFlightDetailsById(params.id))
    }, [])

return <div>
    <div>
        {/* <div>{FullFlight}</div>
        <div>{des}</div> */}
        <div className="divOfCalendar">
        <Calendar />
        </div>
    </div>
</div>
}