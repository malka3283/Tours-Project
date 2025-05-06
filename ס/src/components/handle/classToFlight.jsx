import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { loct } from "../../redux/slices/user/userSlice";
import { getAllThisFlightThunk } from "../../redux/slices/flight/getAllThisFlightThunk";
import { getAllClassToFlightThunk } from "../../redux/slices/flight/getAllClassToFlightThunk";


export const ClassToFlight = () => {

    const dispatch = useDispatch()

    const classToFlight = useSelector(state => state.flights.classToFlight)

    const ctf = useState({classId: "", thisflightId: "", price: "", hanacha: "", weightLoad: "" , numberOfSeats: ""});

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
                    <th>
                        מחלקה
                    </th>

                    <th>
                        תאריך
                    </th>
                    <th>
                        מחיר
                    </th>
                    <th>
                       מספר מושבים
                    </th>
                    <th>
                        מספר כרטיסים שנמכרו
                    </th>
                    <th>
                    משקל מותר
                    </th>
                    <th>הנחה</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>

<tbody>
{classToFlight?.map(f => <tr key={f.id}
                   >

                    <td>{f.thisflight.flight.destinationNavigation.destination}</td>
                    <td>{f.thisflight.flight.sourceNavigation.destination}</td>
                    <td>{f.class.description}</td>
                     <td>{f.thisflight.date} - {f.thisflight.time}</td>
                     <td>{f.price}</td>
                    <td>{f.numberOfSeats}</td>
                    <td>{f.sold}</td>
                    <td>{f.weightLoad}</td>
                    <td>{f.hanacha}</td>
                    <td onClick={() => {}}>עריכה</td>
                    <td>🚮</td>
                </tr>)}

</tbody>
        </table>

        </div>
}