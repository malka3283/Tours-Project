import { useEffect, useRef, useState } from "react";

export const AddClassToFlight = (props) => {

    const { addCTFlight, closeCtf,ctf ,cls ,thisFlt} = props
    const [ctflight, setCtflight] = useState({classId: 0, thisflightId: 0, price: 0, hanacha: 0, weightLoad: 0 , numberOfSeats: 0});

    useEffect(() => {
        setCtflight(ctf)

        refDailog.current.showModal();
    }, [])

    const refDailog = useRef();


    return <dialog ref={refDailog}>

    <button onClick={() => closeCtf()}>❌</button>

    {ctflight.classId === 0 && <div>הוספת טיסה למחלקה</div>}
    {ctflight.classId !== 0 && <div>עריכת טיסה למחלקה</div>}

    <div>פרטי טיסה</div>
       <input type="text" list='src' value={thisFlt.flight.sourceNavigation.destination - thisFlt.flight.destinationNavigation.destination} />

        <div>תאריך טיסה</div>
        <input type="date" value={thisFlt.date - thisFlt.time} />

         <div>מחלקה</div>
        <input type="text" value={cls} />

        {/* <div>תאריך טיסה</div>
        {thisFlt.time === "" && <input type="date" onChange={(e) => setTFlt(prev => ({ ...prev, date: e.target.value }))} />}
        {thisFlt.time !== "" && <input type="date" onChange={(e) => setTFlt(prev => ({ ...prev, date: e.target.value }))} defaultValue={tflt.date} />}

        <div>שעת טיסה</div>
        {thisFlt.time === "" && <input type="time" onChange={(e) => setTFlt(prev => ({ ...prev, time: e.target.value }))} />}
        {thisFlt.time !== "" && <input type="time" onChange={(e) => setTFlt(prev => ({ ...prev, time: e.target.value }))} defaultValue={tflt.time} />}

    */}
    

</dialog>
}