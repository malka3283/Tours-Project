import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { loct } from "../../redux/slices/user/userSlice"
import { getClassToFlightbyClassthisFlightIdThunk } from "../../redux/slices/flight/getClassToFlightbyClassthisFlightIdThunk"
import { Navigate, useNavigate, useParams } from "react-router-dom"
import { savaClassToFlight } from "../../redux/slices/flight/flightsSlice"

export const FlightDetails = () => {

    const params = useParams();

    const dispatch = useDispatch()

    const [nOS, setNOS] = useState(0)
    const [overWight, setOverWight] = useState(0)
    const [flag1, setFlag1] = useState(0)


    const yourClassToFlight = useSelector(state => state.flights.yourClassToFlight)
    const order = useSelector(state => state.flights.orders)
    const navigate = useNavigate()


    useEffect(() => {
        dispatch(loct(`/flightDetail/${params.classs}/${params.id}/${params.numberOfSeats}`))
        dispatch(getClassToFlightbyClassthisFlightIdThunk({ classs: params.classs, thisflightId: params.id }))
        setNOS(parseInt(params.numberOfSeats))
    }, [])

    const addToCart = () => {
        let flag = true;
        order.array.forEach(element => {
            if(order.id === yourClassToFlight.id)
                flag = false;
        });
        if(flag)
        var flt = {src: yourClassToFlight.thisflight.flight.sourceNavigation.destination, des: yourClassToFlight.thisflight.flight.destinationNavigation.destination, 
            date: yourClassToFlight.thisflight.date, time: yourClassToFlight.thisflight.time, id: yourClassToFlight.id, 
            price: yourClassToFlight.price - yourClassToFlight.hanacha, priceToOverLoad: yourClassToFlight.thisflight.priceToOverLoad, 
            nOS: nOS, overWight: overWight
        }
        else 
        setFlag1(true);
        dispatch(savaClassToFlight(flt))
    }

    return <div>
        {yourClassToFlight !== null &&
            <div>
                {yourClassToFlight.sold === 0 && <div>🤍🤍🤍🤍🤍</div>}
                {yourClassToFlight.sold > 0 && <div>❤🤍🤍🤍🤍</div>}
                {yourClassToFlight.sold > 5 && <div>❤❤🤍🤍🤍</div>}
                {yourClassToFlight.sold > 10 && <div>❤❤❤🤍🤍</div>}
                {yourClassToFlight.sold > 15 && <div>❤❤❤❤🤍</div>}
                {yourClassToFlight.sold === yourClassToFlight.numOfSeats && <div>❤❤❤❤❤</div>}
                <label>טיסה מ {yourClassToFlight.thisflight.flight.sourceNavigation.destination} </label>
                <label>טיסה מ {yourClassToFlight.thisflight.flight.destinationNavigation.destination} </label>
                <div>{yourClassToFlight.thisflight.date} תאריך </div>
                <div>{yourClassToFlight.thisflight.time} שעה </div>
                <div>{params.classs} מחלקה </div>
                <div>{yourClassToFlight.weightLoad}  משקל מותר  </div>
                <div> {yourClassToFlight.price - yourClassToFlight.hanacha}  מחיר הטיסה</div>
                <div>{yourClassToFlight.thisflight.priceToOverLoad} מחיר למשקל עודף </div>
                <div className="product-text">{yourClassToFlight.thisflight.flight.destinationNavigation.path.name}</div>
                <img className="img" src={`/pic/Products/${yourClassToFlight.thisflight.flight.destinationNavigation.path.url}.png`} alt={`${yourClassToFlight.thisflight.flight.destinationNavigation.path.url}`}></img>
               
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
                        {flag1 && <div>טיסה זו כבר קיימת בסל</div>}
                        <button onClick={() => navigate(`/cart`)}>למעבר לסל</button>

                        {/* <div className="product-text">{yourClassToFlight.thisflight.flight.destinationNavigation.path.name}</div> */}


                    </div>}
                </div>

            </div>

        }


    </div>




}