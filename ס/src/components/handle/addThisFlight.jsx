import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux"

import { getAllFlightThunk } from "../../redux/slices/flight/getAllFlightThunk";


export const AddThisFlight = (props) => {

    const { addFlight, update, close, thisFlt } = props

    const flightsArr = useSelector(state => state.flights.flightsArr)


    const dispatch = useDispatch()
    const [tflt, setTFlt] = useState({ priceToOverLoad: 0, time: '', date: '', flightId: 0 })
    const [tf, setTf] = useState("")


    const refDailog = useRef();

    useEffect(() => {
        debugger
        dispatch(getAllFlightThunk())
        setTFlt(thisFlt)
        refDailog.current.showModal();
    }, [])


    return <dialog ref={refDailog}>

        <button onClick={() => close()}>❌</button>

        {thisFlt.time !== "" && <div>עריכת טיסה ספצפית</div>}
        {thisFlt.time === "" && <div>הוספת טיסה ספציפית</div>}

        <div>פרטי טיסה</div>
        {thisFlt.time === "" && <input type="text" list='src' onChange={(e) => setTf(e.target.value)} />}
        {thisFlt.time !== "" && <input type="text" value={thisFlt.flight.sourceNavigation.destination + " - " + thisFlt.flight.destinationNavigation.destination} />}

        <div>תאריך טיסה</div>
        {thisFlt.time === "" && <input type="date" onChange={(e) => setTFlt(prev => ({ ...prev, date: e.target.value }))} />}
        {thisFlt.time !== "" && <input type="date" onChange={(e) => setTFlt(prev => ({ ...prev, date: e.target.value }))} defaultValue={tflt.date} />}

        <div>שעת טיסה</div>
        {thisFlt.time === "" && <input type="time" onChange={(e) => setTFlt(prev => ({ ...prev, time: e.target.value }))} />}
        {thisFlt.time !== "" && <input type="time" onChange={(e) => setTFlt(prev => ({ ...prev, time: e.target.value }))} defaultValue={tflt.time} />}

        <div>מחיר לקילו משקל עודף</div>
        {thisFlt.time === "" && <input type="text" onChange={(e) => setTFlt(prev => ({ ...prev, priceToOverLoad: e.target.value }))} />}
        {thisFlt.time !== "" && <input type="text" onChange={(e) => setTFlt(prev => ({ ...prev, priceToOverLoad: e.target.value }))} defaultValue={tflt.priceToOverLoad} />}




        <datalist id='src'>
            {flightsArr?.map(f => {
                return <option>{f.sourceNavigation.destination} - {f.destinationNavigation.destination}</option>
            })}        </datalist>


        {thisFlt.time !== "" && <button onClick={() => {
            update(tflt)
        }}
            disabled={tflt.time === "" && thisFlt.date === "" && thisFlt.priceToOverLoad === "" && thisFlt.time === "" && setTf != ""}
        >אישור</button>}

       
        {thisFlt.time === "" && <button onClick={() => {
            let ti = tflt.time + ":00";
            let i = tf.indexOf("-")
            let src = tf.substring(0, i - 1)
            let des = tf.substring(i + 2)
            let ff = tflt
            ff.time = ti;
            debugger
            flightsArr.forEach(element => {
                if (element.sourceNavigation.destination === src && element.destinationNavigation.destination === des)
                    ff.flightId = element.id
            });
            addFlight(ff)
        }}
            disabled={tflt.time === "" && thisFlt.date === "" && thisFlt.priceToOverLoad === "" && thisFlt.time === "" && setTf != ""}
        >אישור</button>}



    </dialog>
}