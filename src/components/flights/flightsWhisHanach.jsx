import { useEffect, useState } from "react";
import { loct } from "../../redux/slices/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { getAllFlightsWhisHanacahThunk } from "../../redux/slices/flight/getAllFlightsWhisHanacahThunk";
import { useNavigate } from "react-router-dom";
import './flightsWhisHanach.css';

// MUI imports
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Chip,
  Container,
  Grid,
  Typography,
  Rating,
  Skeleton,
  Divider,
  IconButton,
  Tooltip,
  useMediaQuery,
  useTheme,
  Paper,
  LinearProgress
} from '@mui/material';

// MUI icons
import {
  FlightTakeoff,
  FlightLand,
  AccessTime,
  EventSeat,
  LocalOffer,
  Favorite,
  FavoriteBorder,
  Share,
  FilterList,
  Sort,
  Search
} from '@mui/icons-material';

export const FlightsWhisHanach = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.down('md'));
    
    const dispatch = useDispatch();
    const flightsWhisHanachaArr = useSelector(state => state.flights.flightsWhisHanachaArr);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [favorites, setFavorites] = useState([]);
    const [sortOption, setSortOption] = useState('discount'); // discount, price, popularity
    
    useEffect(() => {
        dispatch(loct(`/flightsWhisHanach`));
        dispatch(getAllFlightsWhisHanacahThunk())
            .then(() => setLoading(false))
            .catch(() => setLoading(false));
    }, [dispatch]);
    
    // Toggle favorite
    const toggleFavorite = (id) => {
        if (favorites.includes(id)) {
            setFavorites(favorites.filter(fav => fav !== id));
        } else {
            setFavorites([...favorites, id]);
        }
    };
    
    // Calculate discount percentage
    const calculateDiscountPercentage = (originalPrice, discountedPrice) => {
        return Math.round(((originalPrice - discountedPrice) / originalPrice) * 100);
    };
    
    // Sort flights based on selected option
    const getSortedFlights = () => {
        if (!flightsWhisHanachaArr) return [];
        
        const flights = [...flightsWhisHanachaArr];
        
        switch (sortOption) {
            case 'discount':
                return flights.sort((a, b) => {
                    const discountA = a.price - (a.price - a.hanacha);
                    const discountB = b.price - (b.price - b.hanacha);
                    return discountB - discountA;
                });
            case 'price':
                return flights.sort((a, b) => (a.price - a.hanacha) - (b.price - b.hanacha));
            case 'popularity':
                return flights.sort((a, b) => b.sold - a.sold);
            default:
                return flights;
        }
    };
    
    // Get popularity level based on sold seats
    const getPopularityLevel = (sold, total) => {
        if (sold === total) return 5;
        if (sold === 0) return 0;
        if (sold > 15) return 4;
        if (sold > 10) return 3;
        if (sold > 5) return 2;
        return 1;
    };
    
    // Get class icon
    const getClassIcon = (classType) => {
        switch(classType) {
            case 'תיירים':
                return <EventSeat />;
            case 'עסקים':
                return <EventSeat color="primary" />;
            case 'ראשונה':
                return <EventSeat color="secondary" />;
            default:
                return <EventSeat />;
        }
    };
    
    // Format date
    const formatDate = (dateString) => {
        try {
            const date = new Date(dateString);
            return new Intl.DateTimeFormat('he-IL', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            }).format(date);
        } catch (e) {
            return dateString;
        }
    };
    
    const sortedFlights = getSortedFlights();

    return (
        <Container className="deals-container">
            <Paper elevation={0} className="deals-header">
                <Typography variant="h4" component="h1" className="deals-title">
                    מבצעי טיסות מיוחדים
                </Typography>
                <Typography variant="subtitle1" className="deals-subtitle">
                    הנחות בלעדיות על טיסות לכל העולם
                </Typography>
            </Paper>
            
            <Box className="deals-toolbar">
                <Box className="sort-options">
                    <Typography variant="body2" className="sort-label">
                        מיון לפי:
                    </Typography>
                    <Button 
                        variant={sortOption === 'discount' ? "contained" : "outlined"}
                        size="small"
                        onClick={() => setSortOption('discount')}
                        startIcon={<LocalOffer />}
                        className="sort-button"
                    >
                        הנחה
                    </Button>
                    <Button 
                        variant={sortOption === 'price' ? "contained" : "outlined"}
                        size="small"
                        onClick={() => setSortOption('price')}
                        startIcon={<Sort />}
                        className="sort-button"
                    >
                        מחיר
                    </Button>
                    <Button 
                        variant={sortOption === 'popularity' ? "contained" : "outlined"}
                        size="small"
                        onClick={() => setSortOption('popularity')}
                        startIcon={<Favorite />}
                        className="sort-button"
                    >
                        פופולריות
                    </Button>
                </Box>
                
                <Tooltip title="סינון מתקדם">
                    <IconButton className="filter-button">
                        <FilterList />
                    </IconButton>
                </Tooltip>
            </Box>
            
            {loading ? (
                <Box className="loading-container">
                    <LinearProgress className="loading-progress" />
                    <Grid container spacing={3}>
                        {[1, 2, 3, 4].map((item) => (
                            <Grid item xs={12} sm={6} md={4} lg={3} key={item}>
                                <Card className="deal-card skeleton">
                                    <Skeleton variant="rectangular" height={140} />
                                    <CardContent>
                                        <Skeleton variant="text" height={32} width="70%" />
                                        <Skeleton variant="text" height={24} width="40%" />
                                        <Skeleton variant="text" height={24} width="60%" />
                                        <Box sx={{ mt: 2 }}>
                                            <Skeleton variant="text" height={40} width="50%" />
                                            <Skeleton variant="text" height={24} width="30%" />
                                        </Box>
                                    </CardContent>
                                    <CardActions>
                                        <Skeleton variant="rectangular" height={36} width={100} />
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            ) : (
                <>
                    {sortedFlights.length === 0 ? (
                        <Box className="no-deals">
                            <Typography variant="h6">
                                אין מבצעים זמינים כרגע
                            </Typography>
                            <Typography variant="body2">
                                אנא בדוק שוב מאוחר יותר או נסה לחפש טיסות רגילות
                            </Typography>
                            <Button 
                                variant="contained" 
                                startIcon={<Search />}
                                onClick={() => navigate('/find')}
                                className="search-button"
                            >
                                חיפוש טיסות
                            </Button>
                        </Box>
                    ) : (
                        <Grid container spacing={3} className="deals-grid">
                            {sortedFlights.map((flight) => {
                                const discountedPrice = flight.price - flight.hanacha;
                                const discountPercentage = calculateDiscountPercentage(flight.price, discountedPrice);
                                const popularityLevel = getPopularityLevel(flight.sold, flight.numOfSeats);
                                
                                return (
                                    <Grid item xs={12} sm={6} md={4} lg={3} key={flight.id}>
                                        <Card className="deal-card">
                                            <Box className="deal-badge">
                                                <Chip 
                                                    label={`${discountPercentage}% הנחה`} 
                                                    color="error"
                                                    className="discount-chip"
                                                />
                                            </Box>
                                            
                                            <CardMedia
                                                component="img"
                                                height="140"
                                                image={`/תמונות מדינות/${flight.thisflight.flight.destinationNavigation.path}.png`}
                                                alt={flight.thisflight.flight.destinationNavigation.destination}
                                                onError={(e) => {
                                                    e.target.onerror = null;
                                                    e.target.src = '/תמונות מדינות/default.png';
                                                }}
                                                className="deal-image"
                                            />
                                            
                                            <CardContent className="deal-content">
                                                <Typography variant="h6" component="h2" className="deal-route">
                                                    {flight.thisflight.flight.sourceNavigation.destination} - {flight.thisflight.flight.destinationNavigation.destination}
                                                </Typography>
                                                
                                                <Box className="deal-details">
                                                    <Box className="deal-date">
                                                        <AccessTime fontSize="small" className="detail-icon" />
                                                        <Typography variant="body2">
                                                            {formatDate(flight.thisflight.date)} | {flight.thisflight.time}
                                                        </Typography>
                                                    </Box>
                                                    
                                                    <Box className="deal-class">
                                                        {getClassIcon(flight.class.description)}
                                                        <Typography variant="body2">
                                                            {flight.class.description}
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                                
                                                <Divider className="deal-divider" />
                                                
                                                <Box className="deal-price">
                                                    <Box>
                                                        <Typography variant="h5" component="p" className="discounted-price">
                                                            ₪{discountedPrice}
                                                        </Typography>
                                                        <Typography variant="body2" className="original-price">
                                                            במקום ₪{flight.price}
                                                        </Typography>
                                                    </Box>
                                                    
                                                    <Box className="popularity-container">
                                                        <Typography variant="caption" className="popularity-label">
                                                            פופולריות
                                                        </Typography>
                                                        <Rating 
                                                            value={popularityLevel} 
                                                            readOnly 
                                                            size="small"
                                                            className="popularity-rating"
                                                        />
                                                    </Box>
                                                </Box>
                                            </CardContent>
                                            
                                            <CardActions className="deal-actions">
                                                <Button 
                                                    variant="contained" 
                                                    color="primary"
                                                    onClick={() => navigate(`/flightDetail/${flight.class.description}/${flight.thisflightId}/${1}`)}
                                                    className="view-button"
                                                >
                                                    לצפייה והזמנה
                                                </Button>
                                                
                                                <Box className="action-icons">
                                                    <Tooltip title="שיתוף">
                                                        <IconButton size="small" className="share-button">
                                                            <Share fontSize="small" />
                                                        </IconButton>
                                                    </Tooltip>
                                                    
                                                    <Tooltip title={favorites.includes(flight.id) ? "הסר ממועדפים" : "הוסף למועדפים"}>
                                                        <IconButton 
                                                            size="small" 
                                                            onClick={() => toggleFavorite(flight.id)}
                                                            className="favorite-button"
                                                        >
                                                            {favorites.includes(flight.id) ? 
                                                                <Favorite fontSize="small" color="error" /> : 
                                                                <FavoriteBorder fontSize="small" />
                                                            }
                                                        </IconButton>
                                                    </Tooltip>
                                                </Box>
                                            </CardActions>
                                            
                                            {flight.sold === flight.numOfSeats && (
                                                <Box className="sold-out-badge">
                                                    <Typography variant="caption">
                                                        אזל מהמלאי
                                                    </Typography>
                                                </Box>
                                            )}
                                        </Card>
                                    </Grid>
                                );
                            })}
                        </Grid>
                    )}
                </>
            )}
        </Container>
    );
};