import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"

import './calendar.css'
import { loct } from "../../redux/slices/user/userSlice";
import { useNavigate } from "react-router-dom";

export const Calendar = () => {


    const [months, setMonths] = useState(0);
    const [week, setWeek] = useState([]);
    const[monthOver, setMonthOver] = useState();
    const [day, setDay] = useState(0);
    const [isMonth, setIsMonth] = useState(false);
    
    const flightsDetailsArr = useSelector(state => state.flights.flightsDetailsArr);
    const classes = useSelector(state => state.flights.classes);

    const date = new Date()
    const dates = ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"]

    const dispatch = useDispatch();



    const dateTimeMonth = (m) => {
        //d = ראשון בחודש
        //d2 = ראשון בשבוע של d
        let localWeek = [];
        let s = date.toLocaleDateString()
        let d = new Date(s)
        let n = date.getDate();
        d.setDate(((date.getDate() - n) + 1))
        d.setMonth(d.getMonth() + m + months);
        setMonthOver(d);
        let ss = d.toLocaleDateString();
        let d2 = new Date(ss);
        let dayOfWeek = d.getDay()
        d2.setDate(d.getDate() - dayOfWeek)
        while (d2.getDate() !== 1 || d2.getMonth() === d.getMonth()) {

            localWeek.push(d2.toLocaleDateString());
            setWeek(localWeek);
            d2.setDate(d2.getDate() + 1);
        }
        d2.setDate(d2.getDate() - 1);

        if (d2.getDay() !== 6) {
            while (d2.getDay() !== 6) {
                d2.setDate(d2.getDate() + 1);
                localWeek.push(d2.toLocaleDateString());
                setWeek(localWeek);
            }
        }
        setMonths(months + m)
    }


    useEffect(() => {
        setIsMonth(true);
        dateTimeMonth(0);
        dispatch(loct("/calendar"));
    }, [])

    const navigate = useNavigate();




    return <div className="main">   
        <div className="nextMonth">
        <div onClick={() => dateTimeMonth(0 - months)} className="btn">מעבר לחודש</div>
        <div onClick={() => dateTimeMonth(1)} className="btn">◀</div>
        <div onClick={() => dateTimeMonth(-1)} className="btn">▶</div>
        </div>
        <div className="calen">

            <div className="dadOfDay">
                {dates.map(d => <div className="daysName">
                    {d}
                </div>)}
            </div>
            <div className="dadDays">
                {week.map(d => <div
                    className={`${d === date.toLocaleDateString() ? "today" : "day"}  ${isMonth && parseInt(d.substring(0, 2)) !== monthOver.getMonth() + 1 ? "monthDay" : ""} `}>
                  <div className="fSize" >{d}</div>
                    {flightsDetailsArr?.length > 0 && flightsDetailsArr.map(dFlights =>{return <div
                                        className={`${new Date(dFlights.date).toLocaleDateString() === d ? "todayFlight" : ""} `}>
                                            
                    {new Date(dFlights.date).toLocaleDateString() === d && <button onClick={() =>  { 
                        debugger
                        navigate(`/flightDetail/${classes}/${dFlights.id}/${1}`)}}>{dFlights.time}</button>}
                    </div>})}
                        
                  
                </div>)}

            </div>

        </div>
    </div>
}
