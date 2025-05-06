import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { loct } from "../../redux/slices/user/userSlice";
import { getAllThisFlightThunk } from "../../redux/slices/flight/getAllThisFlightThunk";
import { getAllClassToFlightThunk } from "../../redux/slices/flight/getAllClassToFlightThunk";
import { AddClassToFlight } from "./addClassToFlight";
import { updateClassToFlight } from "../../redux/slices/flight/updateClassToFlight";
import { getOrderDetailByClassToFlightIdThunk } from "../../redux/slices/flight/getOrderDetailByClassToFlightIdThunk";
import {
  Box,
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  IconButton,
  Chip,
  Card,
  CardContent,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  useTheme,
  useMediaQuery,
  Tooltip,
  Collapse,
  Grid
} from '@mui/material';

// Icons
import EditIcon from '@mui/icons-material/Edit';
import PeopleIcon from '@mui/icons-material/People';
import CloseIcon from '@mui/icons-material/Close';
import FlightIcon from '@mui/icons-material/Flight';
import AirplaneTicketIcon from '@mui/icons-material/AirplaneTicket';
import EventIcon from '@mui/icons-material/Event';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import LuggageIcon from '@mui/icons-material/Luggage';
import DiscountIcon from '@mui/icons-material/Discount';
import RefreshIcon from '@mui/icons-material/Refresh';

import './classToFlight.css';

export const ClassToFlight = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.down('md'));
    
    const dispatch = useDispatch();
    const classToFlight = useSelector(state => state.flights.classToFlight);
    const orderDetailByClassToFlight = useSelector(state => state.flights.orderDetailByClassToFlight);
    
    const [ctf, setCtf] = useState({ classId: "", thisflightId: "", price: "", hanacha: "", weightLoad: "", numberOfSeats: "" });
    const [classToFlightOpen, setClassToFlightOpen] = useState(false);
    const [detail, setDetail] = useState(false);
    const [thisFlt, setThisFlt] = useState({});
    
    useEffect(() => {
        dispatch(loct("/AllClassToFlight"));
        dispatch(getAllClassToFlightThunk());
    }, []);
    
    const addCTFlight = (addctf) => {
        dispatch(updateClassToFlight(addctf));
        closeCtf();
    }
    
    const closeCtf = () => {
        setClassToFlightOpen(false);
    }
    
    const handleRefresh = () => {
        dispatch(getAllClassToFlightThunk());
    }

    return (
        <Container maxWidth="xl" className="class-to-flight-container">
            <Box className="page-header">
                <Box className="title-section">
                    <Typography variant="h4" component="h1" className="page-title">
                        <AirplaneTicketIcon className="title-icon" />
                        ניהול מחלקות לטיסות
                    </Typography>
                    <Typography variant="body2" className="page-subtitle">
                        ניהול מחלקות, מחירים ומושבים לטיסות
                    </Typography>
                </Box>
                
                <Box className="header-actions">
                    <Tooltip title="רענן נתונים">
                        <IconButton color="primary" onClick={handleRefresh}>
                            <RefreshIcon />
                        </IconButton>
                    </Tooltip>
                </Box>
            </Box>

            <Card className="main-card">
                <CardContent className="card-content">
                    <TableContainer component={Paper} className="table-container">
                        <Table stickyHeader aria-label="טבלת מחלקות לטיסות">
                            <TableHead>
                                <TableRow>
                                    <TableCell className="table-header">מקור</TableCell>
                                    <TableCell className="table-header">יעד</TableCell>
                                    <TableCell className="table-header">מחלקה</TableCell>
                                    {!isMobile && <TableCell className="table-header">תאריך</TableCell>}
                                    <TableCell className="table-header">מחיר</TableCell>
                                    {!isMobile && <TableCell className="table-header">מושבים</TableCell>}
                                    {!isTablet && <TableCell className="table-header">נמכרו</TableCell>}
                                    {!isTablet && <TableCell className="table-header">משקל</TableCell>}
                                    {!isTablet && <TableCell className="table-header">הנחה</TableCell>}
                                    <TableCell className="table-header" align="center">פעולות</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {classToFlight?.length > 0 ? (
                                    classToFlight.map(f => (
                                        <TableRow key={f.id} className="table-row">
                                            <TableCell>{f.thisflight.flight.destinationNavigation.destination}</TableCell>
                                            <TableCell>{f.thisflight.flight.sourceNavigation.destination}</TableCell>
                                            <TableCell>
                                                <Chip 
                                                    label={f.class.description} 
                                                    color={
                                                        f.class.description === 'ראשונה' ? 'success' : 
                                                        f.class.description === 'עסקים' ? 'primary' : 'default'
                                                    }
                                                    size="small"
                                                    variant="outlined"
                                                />
                                            </TableCell>
                                            {!isMobile && (
                                                <TableCell>
                                                    <Box className="date-time-cell">
                                                        <Typography variant="body2">{f.thisflight.date}</Typography>
                                                        <Typography variant="caption" color="textSecondary">{f.thisflight.time}</Typography>
                                                    </Box>
                                                </TableCell>
                                            )}
                                            <TableCell>
                                                <Typography variant="body2" className="price-text">
                                                    ₪{f.price}
                                                </Typography>
                                            </TableCell>
                                            {!isMobile && (
                                                <TableCell>
                                                    <Typography variant="body2">
                                                        {f.numberOfSeats}
                                                    </Typography>
                                                </TableCell>
                                            )}
                                            {!isTablet && (
                                                <TableCell>
                                                    <Chip 
                                                        label={f.sold} 
                                                        size="small"
                                                        color={f.sold > 0 ? "primary" : "default"}
                                                    />
                                                </TableCell>
                                            )}
                                            {!isTablet && (
                                                <TableCell>
                                                    <Typography variant="body2">
                                                        {f.weightLoad} ק"ג
                                                    </Typography>
                                                </TableCell>
                                            )}
                                            {!isTablet && (
                                                <TableCell>
                                                    <Typography variant="body2" className="discount-text">
                                                        {f.hanacha}
                                                    </Typography>
                                                </TableCell>
                                            )}
                                            <TableCell align="center">
                                                <Box className="action-buttons">
                                                    <Tooltip title="ערוך מחלקה">
                                                        <IconButton 
                                                            color="primary" 
                                                            size="small"
                                                            onClick={() => {
                                                                setCtf(f);
                                                                setThisFlt(f.thisflight);
                                                                setClassToFlightOpen(true);
                                                            }}
                                                        >
                                                            <EditIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                    <Tooltip title="לקוחות שהזמינו">
                                                        <IconButton 
                                                            color="secondary" 
                                                            size="small"
                                                            onClick={() => {
                                                                dispatch(getOrderDetailByClassToFlightIdThunk(f.id));
                                                                setDetail(true);
                                                            }}
                                                        >
                                                            <PeopleIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                </Box>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={isMobile ? 5 : isTablet ? 7 : 10} align="center">
                                            <Typography variant="body1" className="no-data-message">
                                                אין מחלקות לטיסות להצגה
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </CardContent>
            </Card>

            {/* טבלת לקוחות שהזמינו */}
            <Dialog 
                open={detail} 
                onClose={() => setDetail(false)}
                maxWidth="md"
                fullWidth
                className="customers-dialog"
                dir="rtl"
            >
                <DialogTitle className="dialog-title">
                    <Box className="dialog-title-content">
                        <Typography variant="h6">
                            <PeopleIcon className="dialog-title-icon" />
                            לקוחות שהזמינו טיסה
                        </Typography>
                        <IconButton 
                            edge="start" 
                            color="inherit" 
                            onClick={() => setDetail(false)} 
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                    </Box>
                </DialogTitle>
                <DialogContent dividers className="dialog-content">
                    <TableContainer component={Paper} className="customers-table-container">
                        <Table stickyHeader aria-label="טבלת לקוחות">
                            <TableHead>
                                <TableRow>
                                    <TableCell className="table-header" align="right">שם</TableCell>
                                    <TableCell className="table-header" align="right">טלפון</TableCell>
                                    {!isMobile && <TableCell className="table-header" align="right">מייל</TableCell>}
                                    <TableCell className="table-header" align="right">כרטיסים</TableCell>
                                    {!isMobile && <TableCell className="table-header" align="right">משקל עודף</TableCell>}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {orderDetailByClassToFlight?.length > 0 ? (
                                    orderDetailByClassToFlight.map(o => 
                                        o.ordersDetails?.map(od => (
                                            <TableRow key={od.id} className="table-row">
                                                <TableCell align="right">
                                                    {o.idCustomerNavigation.firstName} {o.idCustomerNavigation.lastName}
                                                </TableCell>
                                                <TableCell align="right">{o.idCustomerNavigation.phone}</TableCell>
                                                {!isMobile && <TableCell align="right">{o.idCustomerNavigation.email}</TableCell>}
                                                <TableCell align="right">
                                                    <Chip 
                                                        label={od.countTickets} 
                                                        color="primary"
                                                        size="small"
                                                    />
                                                </TableCell>
                                                {!isMobile && (
                                                    <TableCell align="right">
                                                        {od.countOverLoad > 0 ? (
                                                            <Chip 
                                                                label={`${od.countOverLoad} ק"ג`}
                                                                color="secondary"
                                                                size="small"
                                                            />
                                                        ) : (
                                                            <Typography variant="body2" color="textSecondary">
                                                                אין
                                                            </Typography>
                                                        )}
                                                    </TableCell>
                                                )}
                                            </TableRow>
                                        ))
                                    )
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={isMobile ? 3 : 5} align="center">
                                            <Typography variant="body1" className="no-data-message">
                                                אין לקוחות שהזמינו טיסה זו
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </DialogContent>
            </Dialog>

            {/* חלון עריכת מחלקה לטיסה */}
            {classToFlightOpen && (
                <AddClassToFlight 
                    addCTFlight={addCTFlight} 
                    closeCtf={closeCtf} 
                    ctf={ctf} 
                    cls={ctf.class.description} 
                    thisFlt={thisFlt} 
                />
            )}
        </Container>
    );
};

