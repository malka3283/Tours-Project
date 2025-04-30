import { useEffect } from "react";
import { loct } from "../../redux/slices/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { getAllFlightsWhisHanacahThunk } from "../../redux/slices/flight/getAllFlightsWhisHanacahThunk";
import { useNavigate } from "react-router-dom";

export const FlightsWhisHanach = () => {

    const dispatch = useDispatch();

    const flightsWhisHanachaArr = useSelector(state => state.flights.flightsWhisHanachaArr)

    const navigate = useNavigate()

    useEffect(() => {
        dispatch(loct(`/flightsWhisHanach`));
        dispatch(getAllFlightsWhisHanacahThunk())
    }, [])

    return <div>

        {flightsWhisHanachaArr?.map(f => <div key={f.id}>
            <div> 
                <label>מקור:</label>
                <label>{f.thisflight.flight.sourceNavigation.destination} </label>
            </div>
            <div> 
                <label>יעד:</label>
                <label>{f.thisflight.flight.destinationNavigation.destination}</label>
            </div>
            <div>
                <label>תמונה</label></div>
                <div>
                    <label>תאריך:</label>
                    <label>{f.thisflight.date}</label>
                </div>
                <div>
                    <label>שעה:</label>
                    <label>{f.thisflight.time}</label>
                </div>
                <div>
                <label>מחלקה:</label>
                    <label>{f.class.description}</label>
                </div>
                <div>
                    <label>מחיר אחרי ההנחה:</label>
                    <label>{f.price - f.hanacha}</label></div>
                <div>
                    <label>מחיר לפני ההנחה:</label>
                    <label>{f.price}</label>
                </div>
                <button onClick={() => navigate(`/flightDetail/${f.class.description}/${f.thisflightId}/${1}`)}>לצפיה</button>
            </div>)}



        </div>
}