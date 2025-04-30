import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { loct } from "../../redux/slices/user/userSlice";
import { getAllThisFlightThunk } from "../../redux/slices/flight/getAllThisFlightThunk";
import { useSelector } from "react-redux";
import { addThisFlightThunk } from "../../redux/slices/flight/addThisFlightThunk";

export const ThisFlight = () => {

    const dispatch = useDispatch()

    const flightsArr = useSelector(state => state.flights.AllThisFlight)

    const [add, setAdd] = useState(false)
    const [flit, setFlt] = useState({source: "", destination: "", timeOfFlight: "", sold: 0})

    const addFlight = (addFlt) => {
        dispatch(addThisFlightThunk(addFlt))
        close()
      }

      const update = (update) => {
        setFlt()
        // dispatch(updateFlightThunk(update))
        close()
      }
      

      const close = () => {
        setFlt({source: "", destination: "", timeOfFlight: "", sold: 0})
            setAdd(false)
      }

    useEffect(()=>{
        dispatch(loct("/AllThisFlight"));
        dispatch(getAllThisFlightThunk());
      },[])

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
                        מחיר למשקל עודף
                    </th>
                </tr>
            </thead>

<tbody>
{flightsArr?.map(f => <tr key={f.id}
                   >
                           <td>{f.flight.sourceNavigation.destination}</td>
                    <td>{f.flight.destinationNavigation.destination}</td>
                    <td>{f.date}</td>
                    <td>{f.time}</td>
                    <td>{f.priceToOverLoad}</td>
                </tr>)}

</tbody>
        </table>

        </div>
}