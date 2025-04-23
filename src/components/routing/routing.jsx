import { Navigate, Route, Routes } from "react-router-dom"
import { LogIn } from "../logIn/logIn"
import { LogOn } from "../logIn/logOn"
import { Home } from "../home/home"
import { Flights } from "../flights/flights"
import { HomeAbout } from "../home/homeAbout"
import { Classes } from "../classes/classes"
import { Calendar } from "../calander/calendar"
import { Find } from "../find/find"
import { FullFlight } from "../flights/fullFlight"
import { AddFlightDetail } from "../flights/addFlightDetail"
import { AddFlight } from "../flights/addFlight"
import { FlightDetails } from "../flights/flightDetails"


export const Routing = () => {
    return <>
    <Routes>
        <Route path={'/home'} element={<Home />}></Route>
        <Route path={'/about'} element={<HomeAbout />}></Route>
        <Route path={'/logIn'} element={<LogIn />}></Route>
        <Route path={'/flights'} element={<Flights />}></Route>
        <Route path={'/addFlight'} element={<AddFlight />}></Route>
        <Route path={'/addFlightDetail'} element={<AddFlightDetail />}></Route>
        <Route path={'/logOn'} element={<LogOn />}></Route>
        <Route path={'/chooseClass'} element={<Classes />}></Route>
        <Route path={'/calendar'} element={<Calendar />}></Route>
        <Route path={'/find'} element={<Find/>}></Route>
        <Route path={'/flightDetails/:id'} element={<FullFlight/>}></Route>
        <Route path={'/flightDetail'} element={<FlightDetails/>}></Route>
        <Route path={''} element={<Navigate to="about"></Navigate>}></Route>
    </Routes>
    </>
}