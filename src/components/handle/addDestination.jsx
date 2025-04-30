import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { loct } from "../../redux/slices/user/userSlice";

export const AddDestination = (props) => {
    const { addDestination, updateDestination, des, close } = props

    const dispatch = useDispatch()
    const [dest, setDest] = useState({ path: "", destination: "" })

    const refDailog = useRef();

    useEffect(() => {
        setDest(des)

        refDailog.current.showModal();
    }, [])


    return <dialog ref={refDailog}>

        <button onClick={() => close()}>❌</button>

        {des.path === "" && <div>הוספת יעד</div>}
        {des.path !== "" && <div>עריכת יעד</div>}

        <div>יעד</div>
        {des.path === "" && <input type="text" onChange={(e) => setDest(prev => ({ ...prev, destination: e.target.value }))} />}
        {des.path !== "" && <input type="text" value={dest.destination} />}

        <div>תמונה</div>
        {des.path === "" && <input type="text" onChange={(e) => setDest(prev => ({ ...prev, path: e.target.value }))} />}
        {des.path !== "" && <input type="text" defaultValue={dest.path} onChange={(e) => setDest(prev => ({ ...prev, path: e.target.value }))} />}


        {des.destination !== "" && <button onClick={() => {
            updateDestination(dest)
        }}
            disabled={dest.path === "" && dest.destination === ""}
        >אישור</button>}
        
        {des.destination === "" && <button onClick={() => {
            addDestination(dest)
        }}
            disabled={dest.path === "" && dest.destination === ""}
        >אישור</button>}
        

    </dialog>
}