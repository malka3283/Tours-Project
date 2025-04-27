import { useDispatch } from "react-redux";
import { loct } from "../../redux/slices/user/userSlice";
import { useEffect, useLayoutEffect } from "react";
import { getAllFlightThunk } from "../../redux/slices/flight/getAllFlightThunk";
import { useSelector } from "react-redux";

export const Flight = () => {

    const dispatch = useDispatch();

    const flightsArr = useSelector(state => state.flights.flightsArr)

    useEffect(()=>{
        dispatch(loct("/flights"));
        dispatch(getAllFlightThunk());
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
{flightsArr?.map(f => <tr key={f.id}
                   >
                           <td>{f.sourceNavigation.destination}</td>
                    <td>{f.destinationNavigation.destination}</td>
                    
                </tr>)}

</tbody>
        </table>

</div>
}