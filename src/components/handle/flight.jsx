import { useDispatch } from "react-redux";
import { loct } from "../../redux/slices/user/userSlice";
import { useEffect, useLayoutEffect, useState } from "react";
import { getAllFlightThunk } from "../../redux/slices/flight/getAllFlightThunk";
import { useSelector } from "react-redux";
import { addFlightThunk } from "../../redux/slices/flight/addFlightThunk";
import { updateFlightThunk } from "../../redux/slices/flight/updateFlightThunk";
import { AddFlight } from "./addFlight";

export const Flight = () => {

    const dispatch = useDispatch();

    const [add, setAdd] = useState(false)
    const [flit, setFlt] = useState({source: "", destination: "", timeOfFlight: "", sold: 0})

    const flightsArr = useSelector(state => state.flights.flightsArr)

    useEffect(()=>{
        dispatch(loct("/flights"));
        dispatch(getAllFlightThunk());
      },[])

      const addFlight = (addFlt) => {
        dispatch(addFlightThunk(addFlt))
        close()
      }

      const update = (update) => {
        dispatch(updateFlightThunk(update))
        close()
      }
      

      const close = () => {
        setFlt({source: "", destination: "", timeOfFlight: "", sold: 0})
            setAdd(false)
      }

return <div>

<button onClick={() => setAdd(true)}>הוסף טיסה</button>

{flightsArr?.map(f => <div key={f.id}
                   >
                    <button>🚮</button>
                    {/* <td><button onClick={() => {
                        setFlt(f)
                        setAdd(true)
                    }}>💨</button></td> */}
                    <h1>{f.sourceNavigation.destination} - {f.sourceNavigation.destination}</h1>
                    <div><img src={`/תמונות מדינות/${f.sourceNavigation.destination}.png`} alt={f.sourceNavigation.destination}></img></div>
                    <div>משך זמן טיסה: {f.timeOfFlight}</div>
                    
                </div>)}



        {add && <AddFlight  addFlight={addFlight} update={update} close={close} flit={flit}/>}

</div>
}