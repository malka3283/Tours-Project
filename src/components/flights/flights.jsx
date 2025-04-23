import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllClassToFlightThunk } from "../../redux/slices/flight/getAllClassToFlightThunk";
import '../style.css'
import { Handle } from "../handle/handle";
import { useNavigate } from "react-router-dom";
import { getFlightDetailsByIdThunk } from "../../redux/slices/flight/getFlightDetailsByIdThunk";
import { getFlightDetailsById, saveDesAndSrc } from "../../redux/slices/flight/flightsSlice";
import { getAllFlightThunk } from "../../redux/slices/flight/getAllFlightThunk";
import { loct } from "../../redux/slices/user/userSlice";


export const Flights = () => {

    const dispatch = useDispatch();

    const [handle, sethandle] = useState(false)
    const [flight, setFlight] = useState({})

  const navigate = useNavigate();

    const flightsArr = useSelector(state => state.flights.flightsArr);
    const ClassToFlightThunk = useSelector(state => state.flights.ClassToFlightThunk);


   const openDialogHandele = (f) => {
    setFlight(f)
    sethandle(true)
   }

   const addFlight = () => {

   }

   const closeEdit=()=>{
    sethandle(false)

   }

    useEffect(()=>{
      dispatch(loct("/flights"));
      dispatch(getAllFlightThunk());
    },[])

    return <div>
        <div className="allFlight">
       {flightsArr?.length > 0 && flightsArr?.map(f =>{
        return <div className="flight" onClick={() =>  {
          // dispatch(saveDesAndSrc({src: f.nameS, des: f.nameD}))
          dispatch(getFlightDetailsById(f.id))
          navigate(`/flightDetails/${f.id}`) 
        }}>
       <button onClick={() => addFlight}>הוספת טיסה</button>
      <label>{f.nameS} </label>
      <label>{f.nameD} </label>
      </div>})}
      </div>

      {handle && <Handle flight={flight}></Handle>}
    </div>
}