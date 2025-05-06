import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { loct } from "../../redux/slices/user/userSlice";
import { getAllThisFlightThunk } from "../../redux/slices/flight/getAllThisFlightThunk";
import { useSelector } from "react-redux";
import { addThisFlightThunk } from "../../redux/slices/flight/addThisFlightThunk";
import { AddThisFlight } from "./addThisFlight";
import { updateThisFlightThunk } from "../../redux/slices/flight/updateThisFlightThunk";
import { AddClassToFlight } from "./addClassToFlight";
import { addClassToFlight } from "../../redux/slices/flight/addClassToFlight";

export const ThisFlight = () => {

    const dispatch = useDispatch()

    const flightsArr = useSelector(state => state.flights.AllThisFlight)

    const [add, setAdd] = useState(false)
    const [addCTF, setAddCTF] = useState(0)

    const [flit, setFlt] = useState({priceToOverLoad: 0, time: '', date: ''})
    const [ctf, setCtf] = useState({classId: 0, thisflightId: 0, price: 0, hanacha: 0, weightLoad: 0 , numberOfSeats: 0});
    const [thisFlt, setThisFlt] = useState({})




    const addFlight = (addFlt) => {
        dispatch(addThisFlightThunk(addFlt))
        setThisFlt(addFlt)
        setAddCTF(1)
      }

      const addCTFlight = (addctf) => {
        dispatch(addClassToFlight(addctf))
        if(addctf === 1)
        setAddCTF(2)
        if(addctf === 2)
            setAddCTF(3)
        if(addctf === 3)
            setAddCTF(0)
      }

      const update = (update) => {
         dispatch(updateThisFlightThunk(update))
        close()
      }
      

      const close = () => {
        setFlt({priceToOverLoad: 0, time: '', date: '', flightId: 0})
            setAdd(false)
      }

      const closeCtf = () => {
        setAddCTF(0)
      }

    useEffect(()=>{
        dispatch(loct("/AllThisFlight"));
        dispatch(getAllThisFlightThunk());
      },[])

    return <div>

<button onClick={() => setAdd(true)}>הוסף טיסה ספציפית</button>
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
                        תאריך
                    </th>
                    <th>
                        שעה
                    </th>
                    <th>
                        מחיר למשקל עודף
                    </th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>

<tbody>
{flightsArr?.map(f => <tr key={f.id}
                   >
                    <th>{f.flight.sourceNavigation.destination}</th>
                    <th>{f.flight.destinationNavigation.destination}</th>
                    <th>{f.date}</th>
                    <th>{f.time}</th>
                    <th>{f.priceToOverLoad}</th>
                    <th>🚮</th>
                    <th onClick={() => {
                        setFlt(f)
                        setAdd(true)
                    }}>עריכה</th>

                </tr>)}

</tbody>
        </table>





                {add && <AddThisFlight addFlight={addFlight} update={update} close={close} thisFlt={flit}/>}
                {addCTF === 1 && <AddClassToFlight addCTFlight={addCTFlight} closeCtf={closeCtf} ctf={ctf} cls={"תיירים"} thisFlt={thisFlt}/>}
                {addCTF === 2 && <AddClassToFlight addCTFlight={addCTFlight} closeCtf={closeCtf} ctf={ctf} cls={"עסקים"} thisFlt={thisFlt}/>}
                {addCTF === 3 && <AddClassToFlight addCTFlight={addCTFlight} closeCtf={closeCtf} ctf={ctf} cls={"ראשונה"} thisFlt={thisFlt}/>}

        </div>
}