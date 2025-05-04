import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { loct } from "../../redux/slices/user/userSlice";
import { getAllDestinationThunk } from "../../redux/slices/flight/getAllDestinationThunk";
import { useSelector } from "react-redux";
import { AddDestination } from "./addDestination";
import { addDestantionThunk } from "../../redux/slices/flight/addDestantionThunk";
import { updateDestinationThunk } from "../../redux/slices/flight/updateDestinationThunk";

export const Destnation = () => {

    const dispatch = useDispatch()
    const [add, setAdd] = useState(false)
    const [des, setDes] = useState({path: "", destinition: ""})

    const destinitions = useSelector(state => state.flights.destinitions)

    useEffect(()=>{
        dispatch(loct("/destnation"));
        dispatch(getAllDestinationThunk());
      },[])
      
      const addDes = (addDes) => {
        dispatch(addDestantionThunk(addDes))
        close()
      }
      const updateDes = (updateDes) => {
        dispatch(updateDestinationThunk(updateDes))
        close()
      }

      const close = () => {
        setDes({path: "", destinition: ""})
            setAdd(false)
      }

return <div>




<button onClick={() => {setAdd(true)}}>הוספת יעד</button>

<div>יעדים</div>

<table>
<thead>
                <tr>
                    <th>
                        יעד
                    </th>
                    <th>
                        תמונה
                    </th>
                </tr>
            </thead>

<tbody>
{destinitions?.map(d => <tr key={d.id}
                   >
                    <th>{d.destination}</th>
                    <th><img src={`/תמונות מדינות/${d.path}.png`} alt={d.path}></img></th>
                    <th>🚮</th>
                    <button onClick={() => {
                        setDes(d)
                        setAdd(true)
                    }}>עריכה</button>

                </tr>)}

</tbody>
        </table>





{add && <AddDestination addDestination={addDes} updateDestination={updateDes} close={close} des={des}/>}


</div>
}