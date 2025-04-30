import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux"

import { getAllFlightThunk } from "../../redux/slices/flight/getAllFlightThunk";


export const AddThisFlight = (props) => {

    const {addFlight, update, close, thisFlt} = props

    const flightsArr = useSelector(state => state.flights.flightsArr)


    const dispatch = useDispatch()
    const[tflt, setTFlt] = useState({priceToOverLoad: 0, time: '', data: '', flightId: 0})
    const[tf, setTf] = useState("")
    const[val, setVal] = useState("")


    const refDailog = useRef();

    useEffect(() => {
        debugger
        dispatch(getAllFlightThunk())
        setTFlt(thisFlt)
        refDailog.current.showModal();
        setVal(thisFlt.sourceNavigation.destination + thisFlt.destinationNavigation.destination);
    }, [])


    return <dialog  ref={refDailog}>

        <button onClick={() => close()}>❌</button>

       {thisFlt.time !== "" && <div>עריכת טיסה ספצפית</div>}
       {thisFlt.time === "" && <div>הוספת טיסה טיסה ספציפית</div>}

       <div>פרטי טיסה</div>
       {thisFlt.time === "" && <input type="text"  list='src' onChange={(e) => setTf(e.target.value)}/>}
       {thisFlt.time !== "" && <input type="text"  value={val}/>}

       <div>תאריך טיסה</div>
       {thisFlt.time === "" && <input type="date" onChange={(e) => setTFlt(prev => ({ ...prev, date: e.target.value }))}/>}
       {thisFlt.time !== "" && <input type="date"  value={tflt.date}/>}

       <div>שעת טיסה</div>
       {thisFlt.time === "" && <input type="time" onChange={(e) =>  setTFlt(prev => ({ ...prev, time: e.target.value }))}/>}
       {thisFlt.time !== "" && <input type="time"  value={tflt.time}/>}

       <div>מחיר לקילו משקל עודף</div>
       {thisFlt.time === "" && <input type="text"  onChange={(e) =>  setTFlt(prev => ({ ...prev, priceToOverLoad: e.target.value }))}/>}
       {thisFlt.time !== "" && <input type="text"  value={tflt.priceToOverLoad}/>}



        
        <datalist id='src'>
             {flightsArr?.map(f => {
                return <option>{f.sourceNavigation.destination} - {f.destinationNavigation.destination}</option>
             })}        </datalist>


        {thisFlt.time !== "" && <button onClick={() => {
                    update(tflt)
                }}
                    disabled={tflt.time === "" && thisFlt.date === ""  && thisFlt.priceToOverLoad === ""  && thisFlt.time === "" && setTf != ""}
                >אישור</button>}
                
                {thisFlt.time === " " && <button onClick={() => {
                    let i = tf.indexOf("-")
                    let src = tf.substring(0, i-1)
                    let des = tf.substring(i-1)
                    let ff = tflt
                    flightsArr.forEach(element => {
                        if(element.sourceNavigation.destination == src && element.destinationNavigation.destination == des)
                            ff.flightId = element.id
                    });
                    addFlight(ff)
                }}
                disabled={tflt.time === "" && thisFlt.date === ""  && thisFlt.priceToOverLoad === ""  && thisFlt.time === "" && setTf != ""}
                >אישור</button>}

      

    </dialog>
}