import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { loct } from "../../redux/slices/user/userSlice"
import { getClassToFlightbyClassthisFlightIdThunk } from "../../redux/slices/flight/getClassToFlightbyClassthisFlightIdThunk"
import { useParams } from "react-router-dom"

export const FlightDetails = () => {

    const params = useParams();

    const dispatch = useDispatch()

    const [nOS, setNOS] = useState(0)
    const [overWight, setOverWight] = useState(0)
    const [flt, setFlt] = useState({})

    const yourClassToFlight = useSelector(state => state.flights.yourClassToFlight)


    useEffect(() => {
        dispatch(loct("/flightDetail"));
        dispatch(getClassToFlightbyClassthisFlightIdThunk({ classs: params.classs, thisflightId: params.id }))
        setNOS(parseInt(params.numberOfSeats))
    }, [])

    const addToCart = () => {
        setFlt(yourClassToFlight)
        setFlt(prev => ({ ...prev, nOS:  nOS}))
        setFlt(prev => ({ ...prev, overWight:  overWight}))
        dispatch(savaClassToFlight(flt))
    }

    return <div>
        {yourClassToFlight !== null && <div>{yourClassToFlight.sold === 0 && <div>🤍🤍🤍🤍🤍</div>}
            {yourClassToFlight.sold > 0 && <div>❤🤍🤍🤍🤍</div>}
            {yourClassToFlight.sold > 5 && <div>❤❤🤍🤍🤍</div>}
            {yourClassToFlight.sold > 10 && <div>❤❤❤🤍🤍</div>}
            {yourClassToFlight.sold > 15 && <div>❤❤❤❤🤍</div>}
            {yourClassToFlight.sold === yourClassToFlight.numOfSeats && <div>❤❤❤❤❤</div>}
            <label>טיסה מ {yourClassToFlight.thisflight.flight.sourceNavigation.destination} </label>
            <label>טיסה מ {yourClassToFlight.thisflight.flight.destinationNavigation.destination} </label>
            <div>{yourClassToFlight.thisflight.date} תאריך </div>
            <div>{yourClassToFlight.thisflight.time} שעה </div>
            <div>{yourClassToFlight.weightLoad}  משקל מותר  </div>
            <div> {yourClassToFlight.price}  מחיר הטיסה</div>
            <div>{yourClassToFlight.thisflight.priceToOverLoad} מחיר למשקל עודף </div>
            <div>{yourClassToFlight.hanacha}הנחה</div>


            {yourClassToFlight.numberOfSeats - yourClassToFlight.sold !== 0 && <div>
                <button onClick={() => {
                    { nOS < yourClassToFlight.numberOfSeats && setNOS(1 + nOS) }

                }}>+</button>
                <label>{nOS}</label>
                <button onClick={() => {
                    { nOS > 0 && setNOS(nOS - 1) }
                }}>-</button>
            </div>}

            <div>
                <label>מספר הכרטיסים הנותרים: </label>
                <label>{yourClassToFlight.numberOfSeats - yourClassToFlight.sold}</label>

                {yourClassToFlight.numberOfSeats - yourClassToFlight.sold === 0 && <div>
                    <div>הכרטיסים אזלו</div></div>}

                {yourClassToFlight.numberOfSeats - yourClassToFlight.sold > 0 && <div>
                    <div>
                        <button onClick={() => { setOverWight(1 + overWight) }}>+</button>
                        <label> משקל עודף {overWight} ק"ג </label>

                        <button onClick={() => {
                            { overWight > 0 && setOverWight(overWight - 1) }
                        }}>-</button>

                    </div>
                    <div>{(yourClassToFlight.price - yourClassToFlight.hanacha) * nOS + yourClassToFlight.thisflight.priceToOverLoad * overWight} סהכ </div>
                    {nOS >= 1 && <button onClick={() => addToCart()}>הוספה לסל</button>}
                    </div>}
            </div>

        </div>

        }

        
    </div>




}