import { useEffect, useRef, useState } from "react";

export const AddClassToFlight = (props) => {

    const { addCTFlight, closeCtf,ctf ,cls ,thisFlt} = props
    const [ctflight, setCtflight] = useState({classId: 0, thisflightId: 0, price: 0, hanacha: 0, weightLoad: 0 , numberOfSeats: 0});

    useEffect(() => {
        setCtflight(ctf)

        refDailog.current.showModal();
        debugger
    }, [])

    const refDailog = useRef();


    return <dialog ref={refDailog}>

    <button onClick={() => closeCtf()}>❌</button>

    {ctflight.classId === 0 && <div>הוספת טיסה למחלקה</div>}
    {ctflight.classId !== 0 && <div>עריכת טיסה למחלקה</div>}

    {thisFlt && <div>

    <div>פרטי טיסה</div>
       <input type="text" list='src' value={thisFlt.flight.sourceNavigation.destination +" - "+ thisFlt.flight.destinationNavigation.destination} />

        <div>תאריך טיסה</div>
        <input type="text" value={thisFlt.date +" - " + thisFlt.time} />

         <div>מחלקה</div>
        <input type="text" value={cls} />

         <div>מספר מקומות</div>
        {ctflight.classId === 0 && <input type="number" onChange={(e) => setCtflight(prev => ({ ...prev, numberOfSeats: e.target.value }))} />}
        {ctflight.classId !== 0 && <input type="number" onChange={(e) => setCtflight(prev => ({ ...prev, numberOfSeats: e.target.value }))} defaultValue={ctf.numberOfSeats}/>}
 
        <div>מחיר</div>
        {ctflight.classId === 0 && <input type="number" onChange={(e) => setCtflight(prev => ({ ...prev, price: e.target.value }))} />}
        {ctflight.classId !== 0 && <input type="number" onChange={(e) => setCtflight(prev => ({ ...prev, price: e.target.value }))} defaultValue={ctf.price} />}

        <div>הנחה</div>
        {ctflight.classId === 0 && <input type="number" onChange={(e) => setCtflight(prev => ({ ...prev, hanacha: e.target.value }))} />}
        {ctflight.classId !== 0 && <input type="number" onChange={(e) => setCtflight(prev => ({ ...prev, hanacha: e.target.value }))} defaultValue={ctf.hanacha} />}

        <div>משקל עודף</div>
        {ctflight.classId === 0 && <input type="number" onChange={(e) => setCtflight(prev => ({ ...prev, weightLoad: e.target.value }))} />}
        {ctflight.classId !== 0 && <input type="number" onChange={(e) => setCtflight(prev => ({ ...prev, weightLoad: e.target.value }))} defaultValue={ctf.weightLoad} />}

        {ctflight.classId !== 0 && <button
         onClick={() => {
            addCTFlight(ctflight)
         }}>אישור</button>}
        {ctflight.classId === 0 && <button>אישור</button>}


</div>
}
  
    

</dialog>
}