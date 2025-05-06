import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getAllDestinationThunk } from "../../redux/slices/flight/getAllDestinationThunk";
import { addDestantionThunk } from "../../redux/slices/flight/addDestantionThunk";
import { addFlightThunk } from "../../redux/slices/flight/addFlightThunk";
import { useNavigate } from "react-router-dom";


export const AddFlight = (props) => {

    const {addFlight, update, close, flit} = props

    const destinitions = useSelector(state => state.flights.destinitions)


    const dispatch = useDispatch()
    const[flt, setFlt] = useState({source: "", destination: "", timeOfFlight: 0, sold: 0, destinationNavigation:{}, sourceNavigation: {}})


    const refDailog = useRef();

    useEffect(() => {
        debugger
        setFlt(flit)
        refDailog.current.showModal();
    }, [])


    return <dialog  ref={refDailog}>

        <button onClick={() => close()}>❌</button>

       {flit.source !== "" && <div>עריכת טיסה</div>}
       {flit.source === "" && <div>הוספת טיסה</div>}

       <div>מקור</div>
       {flit.source === "" && <input type="text"  list='src' onChange={(e) => setFlt(prev => ({ ...prev, source: e.target.value }))}/>}
       {flit.source !== "" && <input type="text"  value={flt.sourceNavigation.destination}/>}

        
        <datalist id='src'>
             {destinitions?.map(d => {
                return <option>{d.destination}</option>
             })}        </datalist>

        <div>יעד</div>
       {flit.source === "" && <input type="text"  list='dest' onChange={(e) =>setFlt(prev => ({ ...prev, destination: e.target.value }))}/>}
       {flit.source !== "" && <input type="text"  value={flt.destinationNavigation.destination}/>}

        <datalist id='dest'>
             {destinitions?.map(d => {
               return <option>{d.destination}</option>
             })}
             
        </datalist>
        
        <div>זמן טיסה בדקות</div>
        {flit.source === "" && <input type="number"  onChange={(e) => setFlt(prev => ({ ...prev, timeOfFlight: e.target.value }))}/>}
        {flit.source !== "" && <input type="number"  defaultValue={parseInt(flt.timeOfFlight)} onChange={(e) => setFlt(prev => ({ ...prev, timeOfFlight: e.target.value }))}/>}


        
        
        {flit.source !== "" && <button onClick={() => {
            update(flt)
        }}
         disabled={flt.source === "" && flt.destination === "" && flt.timeOfFlight === 0}
        >אישור</button>
}

        {flit.source === "" && <button onClick={() => {
            let f = flt;
            destinitions.forEach(d => {
                if(d.destination === f.destination)
                    f.destination = d.id
            });
            destinitions.forEach(d => {
                if(d.destination === f.source)
                    f.source = d.id
            });
            addFlight(flt)
        }}
         disabled={flt.source === "" && flt.destination === "" && flt.timeOfFlight === 0}
        >אישור</button>
}

    </dialog>
}