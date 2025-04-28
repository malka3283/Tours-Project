import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { loct } from "../../redux/slices/user/userSlice";
import { getAllThisFlightThunk } from "../../redux/slices/flight/getAllThisFlightThunk";
import { getAllClassToFlightThunk } from "../../redux/slices/flight/getAllClassToFlightThunk";


export const ClassToFlight = () => {

    const dispatch = useDispatch()

    const classToFlight = useSelector(state => state.flights.classToFlight)

    useEffect(()=>{
        dispatch(loct("/AllClassToFlight"));
  
        dispatch(getAllClassToFlightThunk());
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
                </tr>
            </thead>

<tbody>
{classToFlight?.map(f => <tr key={f.id}
                   >
                           <td>{f.class.description}</td>
                    <td>{f.thisflight.flight.destinationNavigation.destination}</td>
                    <td>{f.thisflight.flight.sourceNavigation.destination}</td>
                    <td>{f.weightLoad}</td>
                    <td>{f.thisflight.priceToOverLoad}</td>
                    <td>{f.price}</td>
                    
                </tr>)}

</tbody>
        </table>

        </div>
}