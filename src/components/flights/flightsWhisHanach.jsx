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
        <table>
            <thead>
                <tr>
                    <th>
                        מקור
                    </th>
                    <th>
                        יעד
                    </th>
                    <th>
                        תאריך
                    </th>
                    <th>
                        שעה
                    </th>
                    <th>
                        מחיר
                    </th>
                    <th>
                        במקום 
                    </th>
                </tr>
            </thead>

<tbody>
{flightsWhisHanachaArr?.map(f => <tr key={f.id}>
                           <td>{f.thisflight.flight.sourceNavigation.destination}</td>
                    <td>{f.thisflight.flight.destinationNavigation.destination}</td>
                    <td>{f.thisflight.date}</td>
                    <td>{f.thisflight.time}</td>
                    <td>{f.price - f.hanacha}</td>
                    <td>{f.price}</td>
                    <button onClick={() => navigate(`/flightDetail/${f.class.description}/${f.thisflightId}/${1}`)}>לצפיה</button>
                </tr>)}

</tbody>
        </table>

    </div>
}