import { useEffect } from "react";
import { getAllOrdersThunk } from "../../redux/slices/flight/getAllOrdersThunk";
import { useDispatch, useSelector } from "react-redux";

export const Orders = () => {

    const dispatch = useDispatch()

    const ordersFromServer = useSelector(state => state.flights.ordersFromServer)


    useEffect(()=>{
  
        dispatch(getAllOrdersThunk());
      },[])

    return <div>
<table>
<thead>
                <tr>
                    <th>
                        שם
                    </th>
                    <th>
                        יעד
                    </th>
                    <th>
                        משך זמן טיסה
                    </th>
                </tr>
            </thead>

<tbody>
{ordersFromServer?.map(o => <tr key={o.id}
                   >
                    <th>{o.idCustomerNavigation.firstName} {o.idCustomerNavigation.lastName}</th> 
                    {/* <th> {f.sourceNavigation.destination}</th>
                    <th>משך זמן טיסה: {f.timeOfFlight}</th> */}
                    
                </tr>)}

</tbody>
        </table>
    </div>
   }