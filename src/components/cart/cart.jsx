import { useEffect } from "react";
import { loct } from "../../redux/slices/user/userSlice";
import { useDispatch, useSelector } from "react-redux";

export const Cart = () => {

    const dispatch = useDispatch()

    const order = useSelector(state => state.flights.orders)

    useEffect(() => {
        dispatch(loct("/cart"));
    }, [])

    return <div>


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
                    <th>
                        תאריך
                    </th>
                    <th>
                        מחיר לכרטיס
                    </th>
                    <th>
                        כמות כרטיסים
                    </th>
                    <th>
                        משקל עודף
                    </th>
                    <th>
                        מחיר לתשלום
                    </th>
                </tr>
            </thead>

            <tbody>
                {order?.map(o => <tr key={o.id}
                >
                    <td>🚮</td>
                    {o.yourClassToFlight && <div>
                    <td>{o.yourClassToFlight}</td>
                       <td>{o.yourClassToFlight.flight.sourceNavigation.destination}</td> 
                    <td>{o.yourClassToFlight.thisflight.date} - {o.thisflight.time}</td>
                    <td>{o.yourClassToFlight.price - o.yourClassToFlight.hanacha}</td>
                    <td>{o.nOS}</td>
                    <td>{o.overWight}</td>
                    <td>{o.nOS * (o.yourClassToFlight.price - o.yourClassToFlight.hanacha) + o.overWight * o.yourClassToFlight.thisflight.priceToOverLoad}</td>
</div> }
                </tr>)}

            </tbody>
        </table>

    </div>
}