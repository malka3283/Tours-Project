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

{destinitions?.map(d => <div key={d.id}
                   >
                    <h1>{d.destination}</h1>
                    <div><img src={`/תמונות מדינות/${d.path}.png`} alt={d.path}></img></div>
                    <button>🚮</button>
                    <button onClick={() => {
                        setDes(d)
                        setAdd(true)
                    }}>📨</button>

                </div>)}



{add && <AddDestination addDestination={addDes} updateDestination={updateDes} close={close} des={des}/>}


</div>
}