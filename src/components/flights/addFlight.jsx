import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getAllDestinationThunk } from "../../redux/slices/flight/getAllDestinationThunk";
import { addDestantionThunk } from "../../redux/slices/flight/addDestantionThunk";
import { addFlightThunk } from "../../redux/slices/flight/addFlightThunk";
import { useNavigate } from "react-router-dom";


export const AddFlight = () => {

    const[flt, setFlt] = useState({Source: "", Destination: "", TimeOfFlight: 0})
    const[des, setDes] = useState("")
    const[src, setsrc] = useState("")
    const[con, setCon] = useState(false)

    
    const dispatch = useDispatch();

    const refDailog = useRef();

    const destinitions = useSelector(state => state.flights.destinitions);
    const navigate = useNavigate();


    useEffect(() => {
        refDailog.current.showModal();
        dispatch(getAllDestinationThunk());
    },[])

    const confirm = () => {
        let d = destinitions.find(x => x.Destination === flt.Destination)
        if(!d)
            setDes(flt.Destination)
        let s = destinitions.find(x => x.Source === flt.Source)
        if(!s)
            setsrc(flt.Destination)
        if(s && d)
             AddNewFlight();
    }

    const addDes = () => {
        var desArr = []
        if(des)
            desArr.add(des)
        if(src)
            desArr.add(src)
        dispatch(addDestantionThunk(desArr))
        AddNewFlight();
        
    }

    const AddNewFlight = () => {
        let num = dispatch(addFlightThunk({flt}))
        if(num === 0)
            navigate('/flights')
        else
          setCon(true)
    }

    return <dialog  ref={refDailog} >
        <button onClick={() =>  navigate('/flights')}>❌</button>
        <label>הכנס טיסת מקור</label>
        <input type="text" onChange={(e) => { setFlt(prev => ({ ...prev, Source: e.target.value })) }}/>
        <label>הכנס טיסת יעד</label>
        <input type="text" onChange={(e) => { setFlt(prev => ({ ...prev, Destination: e.target.value })) }}/>
        <label>הכנס זמן טיסה</label>
        <input type="text" onChange={(e) => { setFlt(prev => ({ ...prev, TimeOfFlight: e.target.value })) }}/>
        <button onClick={() => confirm}>אישור</button>
        {(src || des) && <div>
            <label>"היעד/ים"</label>
            {src && <label>{src}</label>}
            {des && <label>{des}</label>}
            <label>"לא קיימים ברשימת היעדים האם אתה מעונין להוסיף אותם"</label>
            <button onClick={() => addDes}>לאישור</button>
        </div>}
        {con && <div>
            <label>האם אתה מעונין לעדכן פרטי טיסה ליעד שהוספת</label>
            <button onClick={() =>  navigate('/addFlightDetail')}>לאישור</button>
            </div>}
    </dialog>

}