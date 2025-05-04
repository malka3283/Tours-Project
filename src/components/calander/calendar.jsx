import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  IconButton, 
  Chip, 
  Badge, 
  Tooltip, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  List, 
  ListItem, 
  ListItemText, 
  useMediaQuery,
  Paper,
  Zoom,
  Fade
} from '@mui/material';
import { 
  ChevronRight, 
  ChevronLeft, 
  Today, 
  FlightTakeoff as FlightTakeoffIcon,
  FilterList,
  Event as EventIcon,
  AccessTime as AccessTimeIcon,
  LocationOn as LocationIcon,
  AttachMoney as MoneyIcon
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './calendar.css';

export const Calendar = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  
  // בדיקה אם המסך קטן
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  
  // מידע על טיסות מהסטור
  const flightsDetailsArr = useSelector(state => state.flights.flightsDetailsArr);
  const classes = useSelector(state => state.flights.classes);
  
  // סטייטים לניהול הלוח
  const [date, setDate] = useState(new Date());
  const [monthOver, setMonthOver] = useState(new Date());
  const [isMonth, setIsMonth] = useState(true);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedFlights, setSelectedFlights] = useState([]);
  const [flightDetailsOpen, setFlightDetailsOpen] = useState(false);
  const [filterType, setFilterType] = useState(null);
  
  // שמות ימי השבוע בעברית
  const dates = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת'];
  
  // שמות חודשים בעברית
  const hebrewMonths = [
    'ינואר', 'פברואר', 'מרץ', 'אפריל', 'מאי', 'יוני',
    'יולי', 'אוגוסט', 'ספטמבר', 'אוקטובר', 'נובמבר', 'דצמבר'
  ];
  
  // פונקציה לקבלת הטיסות לתאריך מסוים
  const getFlightsForDate = (dateString) => {
    if (!flightsDetailsArr || flightsDetailsArr.length === 0) return [];
    
    // המרת התאריך לפורמט שמתאים להשוואה
    const [day, month, year] = dateString.split('/');
    const dateToCheck = new Date(`${month}/${day}/${year}`);
    dateToCheck.setHours(0, 0, 0, 0);
    
    // סינון הטיסות לפי התאריך
    return flightsDetailsArr.filter(flight => {
      const flightDate = new Date(flight.date);
      flightDate.setHours(0, 0, 0, 0);
      
      // סינון לפי סוג (בוקר/צהריים/ערב/לילה) אם נבחר
      if (filterType && getFlightTimePeriod(flight.time) !== filterType) {
        return false;
      }
      
      return flightDate.getTime() === dateToCheck.getTime();
    });
  };

  // קביעת תקופת היום לפי שעת הטיסה
  const getFlightTimePeriod = (timeString) => {
    if (!timeString) return 'unknown';
    
    const hour = parseInt(timeString.split(':')[0]);
    
    if (hour >= 5 && hour < 12) return 'morning';
    if (hour >= 12 && hour < 17) return 'afternoon';
    if (hour >= 17 && hour < 21) return 'evening';
    return 'night';
  };

  // פורמט תצוגת התאריך (רק היום בחודש)
  const formatDateDisplay = (dateString) => {
    if (!dateString) return '';
    const [day] = dateString.split('/');
    return day;
  };

  // חישוב הימים לתצוגה בלוח השנה
  const calculateDays = () => {
    const year = monthOver.getFullYear();
    const month = monthOver.getMonth();
    
    // היום הראשון בחודש
    const firstDayOfMonth = new Date(year, month, 1);
    const dayOfWeek = firstDayOfMonth.getDay();
    
    // היום האחרון בחודש
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const daysInMonth = lastDayOfMonth.getDate();
    
    // מערך הימים שיוצגו בלוח
    const days = [];
    
    // ימים מהחודש הקודם
    const prevMonth = new Date(year, month, 0);
    const daysInPrevMonth = prevMonth.getDate();
    
    for (let i = dayOfWeek - 1; i >= 0; i--) {
      const day = daysInPrevMonth - i;
      const prevMonthDate = new Date(year, month - 1, day);
      days.push(prevMonthDate.toLocaleDateString());
    }
    
    // ימים מהחודש הנוכחי
    for (let i = 1; i <= daysInMonth; i++) {
      const currentMonthDate = new Date(year, month, i);
      days.push(currentMonthDate.toLocaleDateString());
    }
    
    // ימים מהחודש הבא (להשלמת הלוח)
    const remainingDays = 42 - days.length; // 6 שורות של 7 ימים
    for (let i = 1; i <= remainingDays; i++) {
      const nextMonthDate = new Date(year, month + 1, i);
      days.push(nextMonthDate.toLocaleDateString());
    }
    
    // חלוקה לשבועות
    const weeks = [];
    for (let i = 0; i < days.length; i += 7) {
      weeks.push(days.slice(i, i + 7));
    }
    
    return weeks;
  };

  // טיפול בלחיצה על תא בלוח
  const handleCellClick = (dateString, event) => {
    setSelectedDate(dateString);
    const flightsForDate = getFlightsForDate(dateString);
    
    if (flightsForDate && flightsForDate.length > 0) {
      setSelectedFlights(flightsForDate);
      setFlightDetailsOpen(true);
    } else {
      setSelectedFlights([]);
    }
  };

  // מעבר לחודש הבא
  const nextMonth = () => {
    setMonthOver(new Date(monthOver.getFullYear(), monthOver.getMonth() + 1, 1));
  };

  // מעבר לחודש הקודם
  const prevMonth = () => {
    setMonthOver(new Date(monthOver.getFullYear(), monthOver.getMonth() - 1, 1));
  };

  // מעבר לחודש הנוכחי
  const goToToday = () => {
    setMonthOver(new Date());
    setDate(new Date());
  };

  // החלפת סינון לפי זמן יום
  const toggleFilter = (type) => {
    setFilterType(filterType === type ? null : type);
  };

  // שם החודש בעברית
  const getHebrewMonthName = (date) => {
    return `${hebrewMonths[date.getMonth()]} ${date.getFullYear()}`;
  };

  // קבלת שם תקופת היום בעברית
  const getHebrewTimePeriod = (timePeriod) => {
    switch(timePeriod) {
      case 'morning': return 'בוקר';
      case 'afternoon': return 'צהריים';
      case 'evening': return 'ערב';
      case 'night': return 'לילה';
      default: return '';
    }
  };

  // חישוב הימים בעת טעינת הקומפוננטה או שינוי חודש
  const weeks = calculateDays();

  // פורמט תאריך מלא בעברית
  const formatFullHebrewDate = (dateString) => {
    if (!dateString) return '';
    
    const [day, month, year] = dateString.split('/');
    return `${day} ב${hebrewMonths[parseInt(month) - 1]} ${year}`;
  };

  return (
    <Box className="calendar-container">
      <Paper className="calendar-paper" elevation={5}>
        {/* כותרת הלוח */}
        <Box className="calendar-header">
          <Fade in={true} timeout={800}>
            <Typography variant="h5" className="month-name">
              {getHebrewMonthName(monthOver)}
            </Typography>
          </Fade>
          
          <Box className="calendar-controls">
            {/* כפתור חזרה להיום */}
            <Zoom in={true} timeout={500}>
              <Button 
                variant="contained" 
                startIcon={<Today />}
                className="today-button"
                onClick={goToToday}
              >
                היום
              </Button>
            </Zoom>
            
            {/* כפתורי ניווט בין חודשים */}
            <IconButton 
              className="nav-button"
              onClick={prevMonth}
              aria-label="חודש קודם"
            >
              <ChevronRight />
            </IconButton>
            
            <IconButton 
              className="nav-button"
              onClick={nextMonth}
              aria-label="חודש הבא"
            >
              <ChevronLeft />
            </IconButton>
            
            {/* כפתור סינון לפי זמן יום */}
            <Tooltip title={filterType ? `מסנן: ${getHebrewTimePeriod(filterType)}` : 'סינון לפי זמן יום'}>
              <IconButton 
                className="filter-button"
                onClick={() => {
                  const types = ['morning', 'afternoon', 'evening', 'night'];
                  const nextType = types[(types.indexOf(filterType) + 1) % types.length] || types[0];
                  toggleFilter(nextType);
                }}
                aria-label="סינון"
                style={{
                  backgroundColor: filterType ? 
                    (filterType === 'morning' ? '#fffbeb' : 
                     filterType === 'afternoon' ? '#eff6ff' : 
                     filterType === 'evening' ? '#f5f3ff' : '#f3f4f6') : '#e0e7ff'
                }}
              >
                <FilterList />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
        
        {/* לוח השנה */}
        <Box className="calendar-grid">
          {/* כותרות ימי השבוע */}
          <Box className="weekdays-header">
            {dates.map((dayName, index) => (
              <div key={index} className={`weekday-cell day-${index}`}>
                <Typography variant="body1" className="weekday-text">
                  {dayName}
                </Typography>
              </div>
            ))}
          </Box>
          
          {/* תאי הימים */}
          <Box className="days-grid">
            {weeks.flat().map((dateString, index) => {
              const isToday = dateString === date.toLocaleDateString();
              const isOtherMonth = isMonth && 
                parseInt(dateString.substring(3, 5)) !== monthOver.getMonth() + 1;
              const flightsForDate = getFlightsForDate(dateString);
              const hasFlights = flightsForDate?.length > 0;
              const isWeekend = index % 7 === 5 || index % 7 === 6;
              
              return (
                <Fade in={true} timeout={300 + index * 10} key={index}>
                  <div 
                    className={`day-cell 
                      ${isToday ? 'today' : ''} 
                      ${isOtherMonth ? 'other-month' : ''} 
                      ${isWeekend ? 'weekend' : ''}
                      ${hasFlights ? 'has-flights' : ''}
                      ${selectedDate === dateString ? 'selected-date' : ''}
                    `}
                    onClick={(e) => handleCellClick(dateString, e)}
                  >
                    <div className="day-cell-content">
                      <Box className="date-header">
                        <Typography variant="body1" className="date-number">
                          {formatDateDisplay(dateString)}
                        </Typography>
                        
                        {hasFlights && (
                          <Badge 
                            badgeContent={flightsForDate.length} 
                            color="primary"
                            sx={{ 
                              '& .MuiBadge-badge': {
                                backgroundColor: '#2563eb',
                                color: 'white',
                                fontWeight: 'bold'
                              }
                            }}
                          />
                        )}
                      </Box>
                      
                      <Box className="flights-container">
                        {flightsDetailsArr?.length > 0 && flightsForDate?.map((flight, flightIndex) => {
                          if (flightIndex < (isMobile ? 2 : (isTablet ? 3 : 4))) {
                            const timePeriod = getFlightTimePeriod(flight.time);
                            
                            return (
                              <Tooltip 
                                key={flightIndex} 
                                title={
                                  <React.Fragment>
                                    <Typography variant="subtitle2">טיסה ל{flight.to || 'יעד'}</Typography>
                                    <Typography variant="body2">שעה: {flight.time}</Typography>
                                    <Typography variant="body2">מחיר: ₪{flight.price}</Typography>
                                    {flight.discount > 0 && (
                                      <Typography variant="body2">הנחה: {flight.discount}%</Typography>
                                    )}
                                  </React.Fragment>
                                }
                                arrow
                                placement="top"
                              >
                                <Chip
                                  icon={<FlightTakeoffIcon fontSize="small" />}
                                  label={
                                    <Box component="span" display="flex" alignItems="center">
                                      <Typography variant="caption" className="flight-time">
                                        {flight.time}
                                      </Typography>
                                      <Typography variant="caption" noWrap>
                                        {flight.to || 'יעד'}
                                      </Typography>
                                    </Box>
                                  }
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    navigate(`/flightDetail/${classes}/${flight.id}/${1}`);
                                  }}
                                  className={`flight-chip flight-chip-${timePeriod}`}
                                  size="small"
                                />
                              </Tooltip>
                            );
                          }
                          return null;
                        })}
                        
                        {flightsForDate?.length > (isMobile ? 2 : (isTablet ? 3 : 4)) && (
                          <Chip
                            label={`+${flightsForDate.length - (isMobile ? 2 : (isTablet ? 3 : 4))} נוספות`}
                            size="small"
                            className="more-flights-chip"
                            variant="outlined"
                            color="secondary"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedDate(dateString);
                              setSelectedFlights(flightsForDate);
                              setFlightDetailsOpen(true);
                            }}
                          />
                        )}
                      </Box>
                    </div>
                  </div>
                </Fade>
              );
            })}
          </Box>
        </Box>
      </Paper>
      
      {/* דיאלוג פרטי טיסות */}
      <Dialog 
        open={flightDetailsOpen} 
        onClose={() => setFlightDetailsOpen(false)}
        maxWidth="sm"
        fullWidth
        TransitionComponent={Zoom}
      >
        <DialogTitle className="flight-dialog-title">
          <Box display="flex" alignItems="center">
            <EventIcon sx={{ mr: 1 }} />
            <Typography variant="h6">
              טיסות ליום {formatFullHebrewDate(selectedDate)}
            </Typography>
          </Box>
        </DialogTitle>
        <DialogContent className="flight-dialog-content">
          <List>
            {selectedFlights.map((flight, index) => {
              const timePeriod = getFlightTimePeriod(flight.time);
              
              return (
                <Fade in={true} timeout={300 + index * 100} key={index}>
                  <ListItem 
                    button
                    onClick={() => {
                      navigate(`/flightDetail/${classes}/${flight.id}/${1}`);
                      setFlightDetailsOpen(false);
                    }}
                    className={`flight-list-item flight-${timePeriod}`}
                    sx={{
                      borderLeft: `6px solid ${
                        timePeriod === 'morning' ? '#fbbf24' :
                        timePeriod === 'afternoon' ? '#3b82f6' :
                        timePeriod === 'evening' ? '#8b5cf6' : '#9ca3af'
                      }`,
                      mb: 2,
                      borderRadius: '8px',
                      backgroundColor: 
                      timePeriod === 'morning' ? '#fffbeb' :
                      timePeriod === 'afternoon' ? '#eff6ff' :
                      timePeriod === 'evening' ? '#f5f3ff' : '#f3f4f6',
                    '&:hover': {
                      backgroundColor: 
                        timePeriod === 'morning' ? '#fef3c7' :
                        timePeriod === 'afternoon' ? '#dbeafe' :
                        timePeriod === 'evening' ? '#ede9fe' : '#e5e7eb',
                    },
                    boxShadow: '0 2px 5px rgba(0,0,0,0.08)',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <ListItemText
                    primary={
                      <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Box display="flex" alignItems="center">
                          <AccessTimeIcon fontSize="small" sx={{ mr: 1 }} />
                          <Typography variant="subtitle1" fontWeight="bold">
                            {flight.time} - טיסה ל{flight.to || 'יעד'}
                          </Typography>
                        </Box>
                        <Chip 
                          size="small" 
                          label={getHebrewTimePeriod(timePeriod)}
                          sx={{
                            backgroundColor: 
                              timePeriod === 'morning' ? '#fef3c7' :
                              timePeriod === 'afternoon' ? '#dbeafe' :
                              timePeriod === 'evening' ? '#ede9fe' : '#e5e7eb',
                            color: 
                              timePeriod === 'morning' ? '#d97706' :
                              timePeriod === 'afternoon' ? '#1d4ed8' :
                              timePeriod === 'evening' ? '#6d28d9' : '#4b5563',
                            borderRadius: '12px',
                            fontWeight: 'bold'
                          }}
                        />
                      </Box>
                    }
                    secondary={
                      <Box mt={1} display="flex" flexDirection="column" gap={0.5}>
                        <Box display="flex" alignItems="center">
                          <LocationIcon fontSize="small" sx={{ mr: 1, color: '#6b7280', fontSize: '1rem' }} />
                          <Typography variant="body2" color="textSecondary">
                            מוצא: {flight.from || 'לא צוין'} | יעד: {flight.to || 'לא צוין'}
                          </Typography>
                        </Box>
                        
                        <Box display="flex" alignItems="center">
                          <MoneyIcon fontSize="small" sx={{ mr: 1, color: '#6b7280', fontSize: '1rem' }} />
                          <Typography variant="body2" color="textSecondary">
                            מחיר: ₪{flight.price || '---'}
                            {flight.discount > 0 && (
                              <span style={{ color: '#10b981', marginRight: '8px', fontWeight: 'bold' }}>
                                (הנחה: {flight.discount}%)
                              </span>
                            )}
                          </Typography>
                        </Box>
                        
                        {flight.className && (
                          <Typography variant="body2" color="textSecondary" sx={{ mt: 0.5 }}>
                            מחלקה: {flight.className}
                          </Typography>
                        )}
                      </Box>
                    }
                  />
                </ListItem>
              </Fade>
            );
          })}
          
          {selectedFlights.length === 0 && (
            <Box textAlign="center" py={3}>
              <Typography variant="body1" color="textSecondary">
                אין טיסות זמינות לתאריך זה
              </Typography>
            </Box>
          )}
        </List>
      </DialogContent>
    </Dialog>
    
    {/* דיאלוג מידע על סינון */}
    <Dialog 
      open={Boolean(filterType)} 
      onClose={() => setFilterType(null)}
      maxWidth="xs"
      TransitionComponent={Zoom}
      sx={{ display: 'none' }} // מוסתר כרגע, אפשר להפעיל בהמשך
    >
      <DialogTitle>
        סינון לפי: {getHebrewTimePeriod(filterType)}
      </DialogTitle>
      <DialogContent>
        <Typography variant="body1">
          מציג רק טיסות בשעות ה{getHebrewTimePeriod(filterType).toLowerCase()}
        </Typography>
        <Box mt={2}>
          <Button 
            variant="outlined" 
            onClick={() => setFilterType(null)}
            fullWidth
          >
            הסר סינון
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  </Box>
);
};



