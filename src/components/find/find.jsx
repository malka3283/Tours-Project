import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { loct } from '../../redux/slices/user/userSlice';
import { getThisFlightBySrcdesdateThunk } from '../../redux/slices/flight/getThisFlightBySrcdesdateThunk';
import { getAllDestinationThunk } from '../../redux/slices/flight/getAllDestinationThunk';
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import './find.css';
import AirlineSeatReclineExtraIcon from '@mui/icons-material/AirlineSeatReclineExtra';

// MUI imports
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
  List,
  ListItem,
  InputAdornment,
  Divider,
  useTheme,
  useMediaQuery,
  Chip
} from '@mui/material';

// MUI icons
import {
  FlightTakeoff,
  FlightLand,
  CalendarMonth,
  AirplaneTicket,
  Person,
  Search,
  AccessTime
} from '@mui/icons-material';

export const Find = () => {
    const[flt, setFlt] = useState({});
    const dispatch = useDispatch(); 
    let navigate = useNavigate();
    const thisFlightsArr = useSelector(state => state.flights.thisFlight);
    const find = useSelector(state => state.flights.find);
    const destinitions = useSelector(state => state.flights.destinitions);
    
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    
    useEffect(() => {
        dispatch(loct("/find"));
        if(destinitions.length === 0)
        dispatch(getAllDestinationThunk())
    }, []);
    
    const nowFind = () => {
        dispatch(getThisFlightBySrcdesdateThunk({src: flt.src, des: flt.des, date: flt.date}))
    };
    
    const chooseCorrectTime = (f) => {
        navigate(`/flightDetail/${flt.classs}/${f.id}/${flt.numSeats}`)
    };
    
    return (
        <Container className="find-container">
            <Paper elevation={3} className="search-paper">
                <Box className="search-header">
                    <Typography variant="h4" component="h1" className="search-title">
                        חיפוש טיסה
                    </Typography>
                    <Typography variant="subtitle1" className="search-subtitle">
                        מצא את הטיסה המושלמת ליעד הבא שלך
                    </Typography>
                </Box>
                
                <Box className="search-form">
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="מקור"
                                variant="outlined"
                                inputProps={{ list: 'dest' }}
                                onChange={(e) => setFlt(prev => ({ ...prev, src: e.target.value }))}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <FlightTakeoff />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>
                        
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="יעד"
                                variant="outlined"
                                inputProps={{ list: 'dest' }}
                                onChange={(e) => setFlt(prev => ({ ...prev, des: e.target.value }))}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <FlightLand />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>
                        
                        <Grid item xs={12} md={4}>
                            <TextField
                                fullWidth
                                label="תאריך"
                                type="date"
                                variant="outlined"
                                InputLabelProps={{ shrink: true }}
                                onChange={(e) => setFlt(prev => ({ ...prev, date: e.target.value }))}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <CalendarMonth />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>
                        
                        <Grid item xs={12} md={4}>
                            <TextField
                                fullWidth
                                label="מחלקה"
                                variant="outlined"
                                inputProps={{ list: 'class' }}
                                onChange={(e) => setFlt(prev => ({ ...prev, classs: e.target.value }))}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <AirplaneTicket />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>
                        
                        <Grid item xs={12} md={4}>
                            <TextField
                                fullWidth
                                label="מספר מקומות"
                                variant="outlined"
                                onChange={(e) => setFlt(prev => ({ ...prev, numSeats: e.target.value }))}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <AirlineSeatReclineExtraIcon />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>
                        
                        <Grid item xs={12}>
                            <Button
                                variant="contained"
                                color="primary"
                                size="large"
                                fullWidth
                                onClick={() => nowFind()}
                                startIcon={<Search />}
                                className="search-button"
                            >
                                חפש טיסות
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
            
            {(thisFlightsArr.length === 0 && find) && (
                <Paper elevation={2} className="no-results">
                    <Typography variant="h6" color="error">
                        אין תוצאות מתאימות
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        נסה לשנות את פרמטרי החיפוש שלך
                    </Typography>
                </Paper>
            )}
            
            {thisFlightsArr?.length > 0 && (
                <Box className="results-container">
                    <Typography variant="h5" className="results-title">
                        תוצאות חיפוש
                    </Typography>
                    <Divider className="results-divider" />
                    
                    <Grid container spacing={2} className="flight-results">
                        {thisFlightsArr.map((f, index) => (
                            <Grid item xs={12} sm={6} md={4} key={f.id || index}>
                                <Card className="flight-card">
                                    <CardContent>
                                        <Box className="flight-time">
                                            <AccessTime color="primary" />
                                            <Typography variant="h6" component="span">
                                                {f.time}
                                            </Typography>
                                        </Box>
                                        
                                        <Box className="flight-details">
                                            <Chip 
                                                label={flt.src || "מקור"} 
                                                icon={<FlightTakeoff />} 
                                                variant="outlined" 
                                                className="flight-chip"
                                            />
                                            <Divider orientation="vertical" flexItem className="flight-divider" />
                                            <Chip 
                                                label={flt.des || "יעד"} 
                                                icon={<FlightLand />} 
                                                variant="outlined" 
                                                className="flight-chip"
                                            />
                                        </Box>
                                        
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            fullWidth
                                            onClick={() => chooseCorrectTime(f)}
                                            className="select-button"
                                        >
                                            בחר טיסה זו
                                        </Button>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            )}
            
            {/* Original datalists preserved */}
            <datalist id='dest'>
                {destinitions?.map((d, index) => (
                    <option key={index || d.id}>{d.destination}</option>
                ))}
            </datalist>
            
            <datalist id='class'>
                <option>תיירים</option>
                <option>עסקים</option>
                <option>ראשונה</option>
            </datalist>
        </Container>
    );
};