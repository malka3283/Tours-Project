import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loct } from "../../redux/slices/user/userSlice";
import { getAllDestinationThunk } from "../../redux/slices/flight/getAllDestinationThunk";
import { useSelector } from "react-redux";

export const Destnation = () => {

    const dispatch = useDispatch()

    const destinitions = useSelector(state => state.flights.destinitions)

    useEffect(()=>{
        dispatch(loct("/destnation"));
        dispatch(getAllDestinationThunk());
      },[])

return <div>

<table>
            <thead>
                <tr>
                <th>
                    <button>🚮</button>
                        
                    </th>
                    <th>
                        שם
                    </th>
                    <th>
                        תמונה
                    </th>
                </tr>
            </thead>

<tbody>
{destinitions?.map(d => <tr key={d.id}
                   >
                    <td>{d.destination}</td>
                    <td>{d.destination}</td>
                    
                </tr>)}

</tbody>
        </table>




</div>
}