import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loct } from "../../redux/slices/user/userSlice";
import { getAllCustomersThunk } from "../../redux/slices/flight/getAllCustomersThunk";

export const Customer = () => {

    useEffect(()=>{
        dispatch(loct("/customer"));
        
        dispatch(getAllCustomersThunk());
      },[])

const customers = useSelector(state => state.flights.customers);

const dispatch = useDispatch()

    return <div>
        <table>
<thead>
                <tr>
                    <th>
                        שם פרטי
                    </th>
                    <th>
                        שם משפחה
                    </th>
                    <th>
                        טלפון
                    </th>
                    <th>
                        מייל
                    </th>
                    <th>
                       סיסמא
                    </th>
                    <th>
                       
                    </th>
                    <th>
                       
                    </th>
                    <th>
                       
                    </th>
                </tr>
            </thead>

<tbody>
{customers?.map(c => <tr key={c.id}
                   >
                    <th>{c.firstName}</th>
                    <th>{c.lastName}</th>
                    <th>{c.phone}</th>
                    <th>{c.email}</th>
                    <th>{c.password}</th>
                    <th>{c.isManager}</th>
                    <th>🚮</th>
                    <button onClick={() => {
                    }}>פרטי הזמנות</button>

                </tr>)}

</tbody>
        </table>
    </div>
}