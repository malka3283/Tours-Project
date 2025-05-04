import { useEffect } from "react";
import { loct } from "../../redux/slices/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { getAllFlightsWhisHanacahThunk } from "../../redux/slices/flight/getAllFlightsWhisHanacahThunk";
import { useNavigate } from "react-router-dom";

import StarOutlineIcon from '@mui/icons-material/StarOutline';
import StarIcon from '@mui/icons-material/Star';

export const FlightsWhisHanach = () => {

    const dispatch = useDispatch();

    const flightsWhisHanachaArr = useSelector(state => state.flights.flightsWhisHanachaArr)

    const navigate = useNavigate()

    useEffect(() => {
        dispatch(loct(`/flightsWhisHanach`));
        dispatch(getAllFlightsWhisHanacahThunk())
    }, [])

    return <div>

        {flightsWhisHanachaArr?.map(f => <div key={f.id}>
            <div>

                <label>{f.thisflight.flight.sourceNavigation.destination} - {f.thisflight.flight.destinationNavigation.destination}</label>
                <div>
                    <th><img src={`/תמונות מדינות/${f.thisflight.flight.destinationNavigation.path}.png`} alt={f.thisflight.flight.destinationNavigation.path}></img></th>
                </div>
            </div>


                <div>

                    <label>{f.thisflight.date} {f.thisflight.time}</label>
                </div>
                <div>
                    <label>מחלקה:</label>
                    <label>{f.class.description}</label>
                </div>
                <div>
                    <label>מחיר</label>
                    <label>{f.price - f.hanacha}</label></div>
                <div>
                    <label>במקום</label>
                    <label>{f.price}</label>
                </div>
                <div>
                {f.sold === f.numOfSeats && <div><StarIcon /> <StarIcon /> <StarIcon /> <StarIcon /> <StarIcon /></div>}
                {(f.sold !== f.numOfSeats && f.sold === 0) && <div><StarOutlineIcon/><StarOutlineIcon/><StarOutlineIcon/><StarOutlineIcon/><StarOutlineIcon/></div>}
                {(f.sold !== f.numOfSeats && f.sold > 0) && <div><StarIcon /><StarOutlineIcon/><StarOutlineIcon/><StarOutlineIcon/><StarOutlineIcon/></div>}
                {(f.sold !== f.numOfSeats && f.sold > 5) && <div><StarIcon /><StarIcon /><StarOutlineIcon/><StarOutlineIcon/><StarOutlineIcon/></div>}
                {(f.sold !== f.numOfSeats && f.sold > 10) && <div><StarIcon /><StarIcon /><StarIcon /><StarOutlineIcon/><StarOutlineIcon/></div>}
                {(f.sold !== f.numOfSeats && f.sold > 15) && <div><StarIcon /><StarIcon /><StarIcon /><StarIcon /><StarOutlineIcon/></div>}
                </div>
                <button onClick={() => navigate(`/flightDetail/${f.class.description}/${f.thisflightId}/${1}`)}>לצפיה</button>
            </div>)}



        </div>
}