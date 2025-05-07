import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { loct } from "../../redux/slices/user/userSlice";
import { getAllThisFlightThunk } from "../../redux/slices/flight/getAllThisFlightThunk";
import { useSelector } from "react-redux";
import { addThisFlightThunk } from "../../redux/slices/flight/addThisFlightThunk";
import { AddThisFlight } from "./addThisFlight";
import { updateThisFlightThunk } from "../../redux/slices/flight/updateThisFlightThunk";
import { AddClassToFlight } from "./addClassToFlight";
import { addClassToFlight } from "../../redux/slices/flight/addClassToFlight";
import { changeResponse } from "../../redux/slices/flight/flightsSlice";
import { deleteFlight } from "../../redux/slices/flight/deleteFlight";
import { 
  Box, 
  Container, 
  Typography, 
  Button, 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  CircularProgress,
  Fab,
  Tooltip,
  useTheme,
  useMediaQuery,
  Card,
  CardContent,
  Grid,
  Divider,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';

// Icons
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import DateRangeIcon from '@mui/icons-material/DateRange';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LuggageIcon from '@mui/icons-material/Luggage';
import RefreshIcon from '@mui/icons-material/Refresh';

// Styles
import './thisFlight.css';

export const ThisFlight = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.down('md'));
    
    const dispatch = useDispatch();
    const flightsArr = useSelector(state => state.flights.AllThisFlight);
    const oneThisFlight = useSelector(state => state.flights.oneThisFlight);
    const response = useSelector(state => state.flights.response);
    const [add, setAdd] = useState(false);
    const [addCTF, setAddCTF] = useState(0);
    const [flit, setFlt] = useState({ priceToOverLoad: 0, time: '', date: '' });
    const [ctf, setCtf] = useState({ classId: 0, thisflightId: 0, price: 0, hanacha: 0, weightLoad: 0, numberOfSeats: 0 });
    const [thisFlt, setThisFlt] = useState({});
    const [loading, setLoading] = useState(true);
    const [confirmDelete, setConfirmDelete] = useState(null);

    const addFlight = async (addFlt) => {
        try {
            debugger
            await dispatch(addThisFlightThunk(addFlt))
            close()
            setAddCTF(1)
        } catch (error) {
        }
    }

    const addCTFlight = (addctf) => {
        dispatch(addClassToFlight(addctf))
    }

    const update = (update) => {
        dispatch(updateThisFlightThunk(update))
        close()
    }

    const close = () => {
        setFlt({ priceToOverLoad: 0, time: '', date: '', flightId: 0 })
        setAdd(false)
    }

    const closeCtf = () => {
        setAddCTF(0)
    }

    const handleRefresh = () => {
        setLoading(true);
        dispatch(getAllThisFlightThunk())
            .then(() => setLoading(false));
    };

    const handleDelete = (id) => {
        setConfirmDelete(id);
    };

    const confirmDeleteFlight = () => {
        if (confirmDelete) {
            dispatch(deleteFlight(confirmDelete));
            setConfirmDelete(null);
        }
    };

    useEffect(() => {
        dispatch(loct("/AllThisFlight"));
        dispatch(getAllThisFlightThunk())
            .then(() => setLoading(false));
    }, []);

    useEffect(() => {
        if (response === true) {
            if (addCTF === 1) {
                setAddCTF(2)
            }
            if (addCTF === 2) {
                setAddCTF(3)
            }
            if (addCTF === 3) {
                setAddCTF(0)
            }
            dispatch(changeResponse(false));
        }
    }, [addCTF, dispatch, response]);

    return (
        <Box className="this-flight-container">
            <Container maxWidth="xl">
                <Box className="page-header">
                    <Typography variant="h4" component="h1" className="page-title">
                        <FlightTakeoffIcon className="header-icon" />
                        ניהול טיסות ספציפיות
                    </Typography>
                    <Typography variant="body1" className="page-description">
                        צפייה, הוספה ועריכה של טיסות ספציפיות במערכת
                    </Typography>
                </Box>

                <Box className="action-buttons">
                    <Button 
                        variant="contained" 
                        color="primary" 
                        startIcon={<AddIcon />}
                        onClick={() => setAdd(true)}
                        className="add-button"
                    >
                        הוסף טיסה ספציפית
                    </Button>
                    <Button 
                        variant="outlined" 
                        color="primary" 
                        startIcon={<RefreshIcon />}
                        onClick={handleRefresh}
                        className="refresh-button"
                    >
                        רענן נתונים
                    </Button>
                </Box>

                {loading ? (
                    <Box className="loading-container">
                        <CircularProgress />
                        <Typography variant="body1" className="loading-text">
                            טוען נתונים...
                        </Typography>
                    </Box>
                ) : (
                    <>
                        {isMobile ? (
                            // Mobile view - cards
                            <Box className="flights-cards-container">
                                {flightsArr?.length > 0 ? (
                                    <Grid container spacing={2}>
                                        {flightsArr.map(f => (
                                            <Grid item xs={12} key={f.id}>
                                                <Card className="flight-card">
                                                    <CardContent>
                                                        <Box className="flight-card-header">
                                                            <Box className="flight-route">
                                                                <Typography variant="h6" className="flight-source">
                                                                    {f.flight.sourceNavigation.destination}
                                                                </Typography>
                                                                <Box className="flight-arrow">→</Box>
                                                                <Typography variant="h6" className="flight-destination">
                                                                    {f.flight.destinationNavigation.destination}
                                                                </Typography>
                                                            </Box>
                                                            <Box className="flight-actions">
                                                                <IconButton 
                                                                    color="primary" 
                                                                    onClick={() => {
                                                                        setFlt(f);
                                                                        setAdd(true);
                                                                    }}
                                                                >
                                                                    <EditIcon />
                                                                </IconButton>
                                                                <IconButton 
                                                                    color="error"
                                                                    onClick={() => handleDelete(f.id)}
                                                                >
                                                                    <DeleteIcon />
                                                                </IconButton>
                                                            </Box>
                                                        </Box>
                                                        
                                                        <Divider className="flight-divider" />
                                                        
                                                        <Box className="flight-details">
                                                            <Box className="flight-detail-item">
                                                                <DateRangeIcon className="detail-icon" />
                                                                <Typography variant="body1">
                                                                    {f.date}
                                                                </Typography>
                                                            </Box>
                                                            <Box className="flight-detail-item">
                                                                <AccessTimeIcon className="detail-icon" />
                                                                <Typography variant="body1">
                                                                    {f.time}
                                                                </Typography>
                                                            </Box>
                                                            <Box className="flight-detail-item">
                                                                <LuggageIcon className="detail-icon" />
                                                                <Typography variant="body1">
                                                                    מחיר למשקל עודף: {f.priceToOverLoad} ₪
                                                                </Typography>
                                                            </Box>
                                                        </Box>
                                                    </CardContent>
                                                </Card>
                                            </Grid>
                                        ))}
                                    </Grid>
                                ) : (
                                    <Box className="no-flights-message">
                                        <Typography variant="h6">
                                            לא נמצאו טיסות ספציפיות במערכת
                                        </Typography>
                                        <Button 
                                            variant="contained" 
                                            color="primary"
                                            onClick={() => setAdd(true)}
                                            className="add-first-button"
                                        >
                                            הוסף טיסה ראשונה
                                        </Button>
                                    </Box>
                                )}
                            </Box>
                        ) : (
                            // Desktop view - table
                            <TableContainer component={Paper} className="flights-table-container">
                                <Table aria-label="טבלת טיסות ספציפיות">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="right">מקור</TableCell>
                                            <TableCell align="right">יעד</TableCell>
                                            <TableCell align="right">תאריך</TableCell>
                                            <TableCell align="right">שעה</TableCell>
                                            <TableCell align="right">מחיר למשקל עודף</TableCell>
                                            <TableCell align="center">פעולות</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {flightsArr?.length > 0 ? (
                                            flightsArr.map(f => (
                                                <TableRow key={f.id} className="flight-table-row">
                                                    <TableCell align="right" className="flight-source-cell">
                                                        <Box className="cell-with-icon">
                                                            <FlightTakeoffIcon className="cell-icon" />
                                                            {f.flight.sourceNavigation.destination}
                                                        </Box>
                                                    </TableCell>
                                                    <TableCell align="right" className="flight-destination-cell">
                                                        <Box className="cell-with-icon">
                                                            <FlightLandIcon className="cell-icon" />
                                                            {f.flight.destinationNavigation.destination}
                                                        </Box>
                                                    </TableCell>
                                                    <TableCell align="right" className="flight-date-cell">
                                                        <Box className="cell-with-icon">
                                                            <DateRangeIcon className="cell-icon" />
                                                            {f.date}
                                                        </Box>
                                                    </TableCell>
                                                    <TableCell align="right" className="flight-time-cell">
                                                        <Box className="cell-with-icon">
                                                            <AccessTimeIcon className="cell-icon" />
                                                            {f.time}
                                                        </Box>
                                                    </TableCell>
                                                    <TableCell align="right" className="flight-price-cell">
                                                        <Box className="cell-with-icon">
                                                            <LuggageIcon className="cell-icon" />
                                                            {f.priceToOverLoad} ₪
                                                        </Box>
                                                    </TableCell>
                                                    <TableCell align="center" className="flight-actions-cell">
                                                        <Box className="table-actions">
                                                            <Tooltip title="ערוך טיסה">
                                                                <IconButton 
                                                                    color="primary"
                                                                    onClick={() => {
                                                                        setFlt(f);
                                                                        setAdd(true);
                                                                    }}
                                                                >
                                                                    <EditIcon />
                                                                </IconButton>
                                                            </Tooltip>
                                                            <Tooltip title="מחק טיסה">
                                                                <IconButton 
                                                                    color="error"
                                                                    onClick={() => handleDelete(f.id)}
                                                                >
                                                                    <DeleteIcon />
                                                                </IconButton>
                                                            </Tooltip>
                                                        </Box>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        ) : (
                                            <TableRow>
                                                <TableCell colSpan={6} align="center" className="no-data-cell">
                                                    <Typography variant="h6">
                                                        לא נמצאו טיסות ספציפיות במערכת
                                                    </Typography>
                                                    <Button 
                                                        variant="contained" 
                                                        color="primary"
                                                        onClick={() => setAdd(true)}
                                                        className="add-first-button"
                                                    >
                                                        הוסף טיסה ראשונה
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        )}
                    </>
                )}

                {/* Mobile Add Button */}
                {isMobile && (
                    <Fab 
                        color="primary" 
                        className="mobile-add-button"
                        onClick={() => setAdd(true)}
                    >
                        <AddIcon />
                    </Fab>
                )}
                {/* Confirmation Dialog */}
                <Dialog
                    open={confirmDelete !== null}
                    onClose={() => setConfirmDelete(null)}
                    className="delete-dialog"
                >
                    <DialogTitle className="dialog-title">
                        אישור מחיקת טיסה
                    </DialogTitle>
                    <DialogContent>
                        <Typography variant="body1">
                            האם אתה בטוח שברצונך למחוק את הטיסה הזו? פעולה זו אינה ניתנת לביטול.
                        </Typography>
                    </DialogContent>
                    <DialogActions className="dialog-actions">
                        <Button 
                            onClick={() => setConfirmDelete(null)} 
                            color="primary"
                        >
                            ביטול
                        </Button>
                        <Button 
                            onClick={confirmDeleteFlight} 
                            color="error" 
                            variant="contained"
                            autoFocus
                        >
                            מחק
                        </Button>
                    </DialogActions>
                </Dialog>

                {/* Add/Edit Flight Form */}
                {add && <AddThisFlight addFlight={addFlight} update={update} close={close} thisFlt={flit} />}
                
                {/* Add Class to Flight Forms */}
                {(addCTF === 1 && oneThisFlight !== null) && 
                    <AddClassToFlight 
                        addCTFlight={addCTFlight} 
                        closeCtf={closeCtf} 
                        ctf={ctf} 
                        cls={"תיירים"} 
                        thisFlt={oneThisFlight} 
                    />
                }
                {addCTF === 2 && 
                    <AddClassToFlight 
                        addCTFlight={addCTFlight} 
                        closeCtf={closeCtf} 
                        ctf={ctf} 
                        cls={"עסקים"} 
                        thisFlt={oneThisFlight} 
                    />
                }
                {addCTF === 3 && 
                    <AddClassToFlight 
                        addCTFlight={addCTFlight} 
                        closeCtf={closeCtf} 
                        ctf={ctf} 
                        cls={"ראשונה"} 
                        thisFlt={oneThisFlight} 
                    />
                }
            </Container>
        </Box>
    );
};