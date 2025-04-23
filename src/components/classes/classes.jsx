import { chooseClass } from '../../redux/slices/flight/flightsSlice';
import { useDispatch, useSelector } from "react-redux"
import './classStyle.css'
import { useEffect } from 'react';
import { loct } from '../../redux/slices/user/userSlice';
import { useNavigate } from 'react-router-dom';

export const Classes = () => {

    const flightsArr = useSelector(state => state.flights.class);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    useEffect(() => {
       dispatch(loct("/chooseClass"));
    }, [])

    return <div>

        <div className='label'> בחר מחלקה</div>
        <br />

        <div className="choosClass">
            <div className='misgeret'>
                <div className='smulllabel2'>מחלקה ראשונה</div>
                <div onClick={() => { 
                    dispatch(chooseClass(1))
                    navigate('/flights')
                   } }><img src="מחלקה ראשונה סופי.png" className='picC1'/></div>
            </div>

           

            <div className='misgeret'>
                <div className='smulllabel'>מחלקת תיירים</div>
                <div onClick={() => {dispatch(chooseClass(3))
                                        navigate('/flights')
                }}><img src="רגילה.png"  className='picC3'/></div>
            </div>
            
            <div className='misgeret'>
                <div className='smulllabel2'>מחלקת עסקים</div>
                <div onClick={() => {dispatch(chooseClass(2))
                                        navigate('/flights')
                }}><img src="עסקים.png"  className='picC1'/></div>
            </div>
        </div>

    </div>


}
