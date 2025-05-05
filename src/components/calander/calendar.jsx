import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loct } from "../../redux/slices/user/userSlice";
import { 
  Box, 
  Typography, 
  Button, 
  Paper, 
  Grid, 
  Container,
  Chip,
  IconButton
} from "@mui/material";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import FlightIcon from '@mui/icons-material/Flight';
import './calendar.css';

export const Calendar = () => {
  const [months, setMonths] = useState(0);
  const [week, setWeek] = useState([]);
  const [monthOver, setMonthOver] = useState();
  const [day, setDay] = useState(0);
  const [isMonth, setIsMonth] = useState(false);
  
  const flightsDetailsArr = useSelector(state => state.flights.flightsDetailsArr);
  const classes = useSelector(state => state.flights.classes);
  const date = new Date();
  const dates = ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"];
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const dateTimeMonth = (m) => {
    //d = ראשון בחודש
    //d2 = ראשון בשבוע של d
    let localWeek = [];
    let s = date.toLocaleDateString();
    let d = new Date(s);
    let n = date.getDate();
    d.setDate(((date.getDate() - n) + 1));
    d.setMonth(d.getMonth() + m + months);
    setMonthOver(d);
    let ss = d.toLocaleDateString();
    let d2 = new Date(ss);
    let dayOfWeek = d.getDay();
    d2.setDate(d.getDate() - dayOfWeek);
    while (d2.getDate() !== 1 || d2.getMonth() === d.getMonth()) {
      localWeek.push(d2.toLocaleDateString());
      setWeek(localWeek);
      d2.setDate(d2.getDate() + 1);
    }
    d2.setDate(d2.getDate() - 1);
    if (d2.getDay() !== 6) {
      while (d2.getDay() !== 6) {
        d2.setDate(d2.getDate() + 1);
        localWeek.push(d2.toLocaleDateString());
        setWeek(localWeek);
      }
    }
    setMonths(months + m);
  };

  useEffect(() => {
    setIsMonth(true);
    dateTimeMonth(0);
    dispatch(loct("/calendar"));
  }, []);

  const getMonthName = (date) => {
    const monthNames = [
      "ינואר", "פברואר", "מרץ", "אפריל", "מאי", "יוני",
      "יולי", "אוגוסט", "ספטמבר", "אוקטובר", "נובמבר", "דצמבר"
    ];
    return monthNames[date.getMonth()];
  };

  const getFlightsForDay = (day) => {
    if (!flightsDetailsArr?.length) return [];
    return flightsDetailsArr.filter(flight => 
      new Date(flight.date).toLocaleDateString() === day
    );
  };

  return (
    <Container className="calendar-container">
      <Paper elevation={3} className="calendar-paper">
        <Box className="calendar-header">
          <Typography variant="h4" className="calendar-title">
            {monthOver && `${getMonthName(monthOver)} ${monthOver.getFullYear()}`}
            <CalendarTodayIcon className="calendar-icon" />
          </Typography>
          
          <Box className="calendar-controls">
            <Button 
              variant="contained" 
              color="primary"
              onClick={() => dateTimeMonth(0 - months)}
              className="current-month-btn"
            >
              חזרה לחודש נוכחי
            </Button>
            <Box className="navigation-buttons">
              <IconButton 
                color="primary" 
                onClick={() => dateTimeMonth(1)}
                className="nav-button"
              >
                <ArrowForwardIosIcon />
              </IconButton>
              <IconButton 
                color="primary" 
                onClick={() => dateTimeMonth(-1)}
                className="nav-button"
              >
                < ArrowBackIosNewIcon/>
              </IconButton>
            </Box>
          </Box>
        </Box>

        <Box className="calendar-body">
          <Grid container className="days-header">
            {dates.map((dayName, index) => (
              <Grid item key={index} className="day-name">
                <Typography variant="subtitle1">{dayName}</Typography>
              </Grid>
            ))}
          </Grid>

          <Grid container className="days-grid">
            {week.map((day, index) => {
              const isToday = day === date.toLocaleDateString();
              const isDifferentMonth = isMonth && parseInt(day.substring(0, 2)) !== monthOver.getMonth() + 1;
              const dayFlights = getFlightsForDay(day);
              
              return (
                <Grid 
                  item 
                  key={index} 
                  className={`calendar-day ${isToday ? 'today' : ''} ${isDifferentMonth ? 'different-month' : ''}`}
                >
                  <Box className="day-content">
                    <Typography className="day-number">{day}</Typography>
                    
                    {dayFlights.length > 0 && (
                      <Box className="flights-container">
                        {dayFlights.map((flight, flightIndex) => (
                          <Chip
                            key={flightIndex}
                            icon={<FlightIcon />}
                            label={flight.time}
                            color="primary"
                            variant="outlined"
                            clickable
                            onClick={() => navigate(`/flightDetail/${classes}/${flight.id}/${1}`)}
                            className="flight-chip"
                          />
                        ))}
                      </Box>
                    )}
                  </Box>
                </Grid>
              );
            })}
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};