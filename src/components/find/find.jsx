import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux"
import { loct } from '../../redux/slices/user/userSlice';
import { getThisFlightBySrcdesdateThunk } from '../../redux/slices/flight/getThisFlightBySrcdesdateThunk';
import { getAllDestinationThunk } from '../../redux/slices/flight/getAllDestinationThunk';
import {BrowserRouter, Routes, Route, useNavigate} from "react-router-dom";


export const Find = () => {
    
    const[flt, setFlt] = useState({});
    const dispatch = useDispatch();

     let navigate = useNavigate();

    const thisFlightsArr = useSelector(state => state.flights.thisFlight)
    const find = useSelector(state => state.flights.find)
    const destinitions = useSelector(state => state.flights.destinitions)

    useEffect(() => {
        dispatch(loct("/find"));
        if(destinitions.length === 0)
        dispatch(getAllDestinationThunk())
     }, [])

     const nowFind = () => {
        dispatch(getThisFlightBySrcdesdateThunk({src: flt.src, des: flt.des, date: flt.date}))

     }
     const chooseCorrectTime = (f) => {
        navigate(`/flightDetail/${flt.classs}/${f.id}/${flt.numSeats}`)

     }

    return <div className='divv'>
        <div className='finddiv' ><div className='label'>חיפוש טיסה</div>
            <div className='divOfinp'><input type="text" list='dest' className="findbutten" onChange={(e) => setFlt(prev => ({ ...prev, src: e.target.value }))} /><div>מקור</div></div>
            <div className='divOfinp'> <input type="text" list='dest' className="findbutten" onChange={(e) => setFlt(prev => ({ ...prev, des: e.target.value }))}/><div>יעד</div></div>
            <div className='divOfinp'> <input type="date" className="findbutten" onChange={(e) => setFlt(prev => ({ ...prev, date: e.target.value }))}/><div>תאריך</div></div>
            <div className='divOfinp'> <input type="text"   list='class' className="findbutten" onChange={(e) => setFlt(prev => ({ ...prev, classs: e.target.value }))}/><div>מחלקה</div></div>
            <div className='divOfinp'><input type="text" className="findbutten" placeholder='💺' onChange={(e) => setFlt(prev => ({ ...prev, numSeats: e.target.value }))}/><div>מספר מקומות</div></div>
            <button className='divOfinp' onClick={() => nowFind()}>אישור</button>
        </div>

{(thisFlightsArr.length === 0 && find) && <div>אין תוצאות מתאימות</div>}
        <datalist id='dest'>
             {destinitions?.map(d => {
                return <option>{d.destination}</option>
             })}
             
        </datalist>

        <datalist id='class'>
        <option>תיירים</option>
        <option>עסקים</option>
                <option>ראשונה</option>
                </datalist>

                
        {thisFlightsArr?.length > 0 && thisFlightsArr?.map(f =>{
        return <div >
         
       <button onClick={() => chooseCorrectTime(f)}>{f.time}</button>
      
      </div>})}


    </div>
}