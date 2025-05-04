import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { loct } from "../../redux/slices/user/userSlice"
import { getClassToFlightbyClassthisFlightIdThunk } from "../../redux/slices/flight/getClassToFlightbyClassthisFlightIdThunk"
import { Navigate, useNavigate, useParams } from "react-router-dom"
import { savaClassToFlight } from "../../redux/slices/flight/flightsSlice"

import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';

export const FlightDetails = () => {

    const params = useParams();

    const dispatch = useDispatch()

    const [nOS, setNOS] = useState(0)
    const [overWight, setOverWight] = useState(0)
    const [flag1, setFlag1] = useState(false)


    const yourClassToFlight = useSelector(state => state.flights.yourClassToFlight)
    const order = useSelector(state => state.flights.orders)
    const navigate = useNavigate()


    useEffect(() => {
        dispatch(loct(`/flightDetail/${params.classs}/${params.id}/${params.numberOfSeats}`))
        dispatch(getClassToFlightbyClassthisFlightIdThunk({ classs: params.classs, thisflightId: params.id }))
        setNOS(parseInt(params.numberOfSeats))
    }, [])

    const addToCart = () => {
        let flag = false;
        debugger
        order.forEach(element => {
            if(element.id === yourClassToFlight.id)
                flag = true;
        });
        if(!flag){
        var flt = {src: yourClassToFlight.thisflight.flight.sourceNavigation.destination, des: yourClassToFlight.thisflight.flight.destinationNavigation.destination, 
            date: yourClassToFlight.thisflight.date, time: yourClassToFlight.thisflight.time, id: yourClassToFlight.id, 
            price: yourClassToFlight.price - yourClassToFlight.hanacha, priceToOverLoad: yourClassToFlight.thisflight.priceToOverLoad, 
            nOS: nOS, overWight: overWight
        }
        dispatch(savaClassToFlight(flt))
    }
        else 
        setFlag1(true);
        
    }

    return <div>
        {yourClassToFlight !== null &&
            <div>
                {yourClassToFlight.sold === yourClassToFlight.numOfSeats && <div><StarIcon /> <StarIcon /> <StarIcon /> <StarIcon /> <StarIcon /></div>}
                {(yourClassToFlight.sold !== yourClassToFlight.numOfSeats && yourClassToFlight.sold === 0) && <div><StarOutlineIcon/><StarOutlineIcon/><StarOutlineIcon/><StarOutlineIcon/><StarOutlineIcon/></div>}
                {(yourClassToFlight.sold !== yourClassToFlight.numOfSeats && yourClassToFlight.sold > 0) && <div><StarIcon /><StarOutlineIcon/><StarOutlineIcon/><StarOutlineIcon/><StarOutlineIcon/></div>}
                {(yourClassToFlight.sold !== yourClassToFlight.numOfSeats && yourClassToFlight.sold > 5) && <div><StarIcon /><StarIcon /><StarOutlineIcon/><StarOutlineIcon/><StarOutlineIcon/></div>}
                {(yourClassToFlight.sold !== yourClassToFlight.numOfSeats && yourClassToFlight.sold > 10) && <div><StarIcon /><StarIcon /><StarIcon /><StarOutlineIcon/><StarOutlineIcon/></div>}
                {(yourClassToFlight.sold !== yourClassToFlight.numOfSeats && yourClassToFlight.sold > 15) && <div><StarIcon /><StarIcon /><StarIcon /><StarIcon /><StarOutlineIcon/></div>}
                
                <label>טיסה מ {yourClassToFlight.thisflight.flight.sourceNavigation.destination} </label>
                <label>טיסה מ {yourClassToFlight.thisflight.flight.destinationNavigation.destination} </label>
                <div><img src={`/תמונות מדינות/${yourClassToFlight.thisflight.flight.destinationNavigation.path}.png`} alt={yourClassToFlight.thisflight.flight.destinationNavigation.path}></img></div>
                <div>{yourClassToFlight.thisflight.date} תאריך </div>
                <div>{yourClassToFlight.thisflight.time} שעה </div>
                <div>מחלקה: {params.classs}  </div>
                <div>{yourClassToFlight.weightLoad}  משקל מותר  </div>
                <div> {yourClassToFlight.price - yourClassToFlight.hanacha}  מחיר הטיסה</div>
                <div>{yourClassToFlight.thisflight.priceToOverLoad} מחיר למשקל עודף </div>
                <div className="product-text">{yourClassToFlight.thisflight.flight.destinationNavigation.path.name}</div>
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
                        {nOS >= 1 && <button onClick={() => addToCart()}><AddShoppingCartIcon/></button>}

                        <button onClick={() => navigate(`/cart`)}>למעבר לסל</button>
                        {flag1 && <div>טיסה זו כבר קיימת בסל</div>}

                        {/* <div className="product-text">{yourClassToFlight.thisflight.flight.destinationNavigation.path.name}</div> */}


                    </div>}
                </div>

            </div>

        }


    </div>




}