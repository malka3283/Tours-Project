import { useDispatch } from "react-redux";
import { loct } from "../../redux/slices/user/userSlice";
import { useEffect, useLayoutEffect, useState } from "react";
import { getAllFlightThunk } from "../../redux/slices/flight/getAllFlightThunk";
import { useSelector } from "react-redux";

export const Flight = () => {

    const dispatch = useDispatch();

    const [add, setAdd] = useState(false)

    const flightsArr = useSelector(state => state.flights.flightsArr)

    useEffect(()=>{
        dispatch(loct("/flights"));
        dispatch(getAllFlightThunk());
      },[])

return <div>

<div onClick={() => setAdd(true)}>הוסף יעד</div>
<table>
            <thead>
                <tr>
                <th>
                        
                    </th>
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
                    <td><button>🚮</button></td>
                           <td>{f.sourceNavigation.destination}</td>
                    <td>{f.destinationNavigation.destination}</td>
                    
                </tr>)}

</tbody>
        </table>

        {add && <Flight />}

</div>
}