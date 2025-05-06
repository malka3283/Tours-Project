import React, { useState, useEffect } from 'react';
import { 
  Box, Container, Typography, Grid, Card, CardContent, CardMedia, Button, Paper, 
  useTheme, useMediaQuery, Divider, Stack, TextField, InputAdornment, Autocomplete, 
  Tabs, Tab, IconButton, Chip, Fade, Slide, Zoom, Rating, Avatar, Backdrop, 
  CircularProgress, Snackbar, Alert
} from '@mui/material';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SearchIcon from '@mui/icons-material/Search';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PersonIcon from '@mui/icons-material/Person';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FavoriteIcon from '@mui/icons-material/Favorite';
import StarIcon from '@mui/icons-material/Star';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import LuggageIcon from '@mui/icons-material/Luggage';
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';
import HotelIcon from '@mui/icons-material/Hotel';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import PublicIcon from '@mui/icons-material/Public';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';

// Import CSS
import './HomeAbout.css';

// Data
const destinations = [
  {
    name: 'פריז',
    country: 'צרפת',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2073&q=80',
    price: 399,
    rating: 4.8,
    featured: true,
    discount: '15%'
  },
  {
    name: 'רומא',
    country: 'איטליה',
    image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1996&q=80',
    price: 349,
    rating: 4.7,
    featured: true
  },
  {
    name: 'ברצלונה',
    country: 'ספרד',
    image: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    price: 329,
    rating: 4.6,
    featured: true,
    discount: '10%'
  },
  {
    name: 'אמסטרדם',
    country: 'הולנד',
    image: 'https://images.unsplash.com/photo-1576924542622-772281b13aa8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    price: 299,
    rating: 4.5
  },
  {
    name: 'לונדון',
    country: 'אנגליה',
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    price: 379,
    rating: 4.7,
    discount: '20%'
  },
  {
    name: 'ניו יורק',
    country: 'ארה"ב',
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    price: 599,
    rating: 4.9,
    featured: true
  }
];

const testimonials = [
  {
    name: 'יעל כהן',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    destination: 'פריז',
    rating: 5,
    comment: 'חוויה מדהימה! השירות היה מעולה והמחיר היה משתלם ביותר. בהחלט אזמין שוב בעתיד.'
  },
  {
    name: 'דוד לוי',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    destination: 'ברצלונה',
    rating: 4.5,
    comment: 'נהנינו מאוד מהטיול. הכל היה מאורגן היטב והמלון היה מצוין. ממליץ בחום!'
  },
  {
    name: 'מיכל אברהם',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    destination: 'ניו יורק',
    rating: 5,
    comment: 'הטיסות היו בדיוק בזמן והמחיר היה הטוב ביותר שמצאתי. תודה רבה על השירות המעולה!'
  }
];

const airports = [
  { label: 'נתב"ג (TLV)', id: 'TLV' },
  { label: 'שארל דה גול, פריז (CDG)', id: 'CDG' },
  { label: 'הית\'רו, לונדון (LHR)', id: 'LHR' },
  { label: 'JFK, ניו יורק (JFK)', id: 'JFK' },
  { label: 'פיומיצ\'ינו, רומא (FCO)', id: 'FCO' },
  { label: 'שיפול, אמסטרדם (AMS)', id: 'AMS' },
  { label: 'אל פראט, ברצלונה (BCN)', id: 'BCN' },
];

const features = [
  { 
    icon: <FlightTakeoffIcon sx={{ fontSize: 40 }} />, 
    title: 'מבחר טיסות עצום', 
    description: 'אנו מציעים מגוון רחב של טיסות לכל יעד בעולם במחירים הטובים ביותר' 
  },
  { 
    icon: <SupportAgentIcon sx={{ fontSize: 40 }} />, 
    title: 'שירות לקוחות 24/7', 
    description: 'צוות השירות שלנו זמין עבורכם בכל שעה, בכל יום, לכל שאלה או בעיה' 
  },
  { 
    icon: <VerifiedUserIcon sx={{ fontSize: 40 }} />, 
    title: 'הבטחת מחיר', 
    description: 'אנו מבטיחים את המחירים הטובים ביותר ומציעים החזר כספי אם תמצאו מחיר נמוך יותר' 
  },
  { 
    icon: <LocalAtmIcon sx={{ fontSize: 40 }} />, 
    title: 'ללא עמלות נסתרות', 
    description: 'המחיר שאתם רואים הוא המחיר שתשלמו - ללא הפתעות או עמלות נסתרות' 
  },
  { 
    icon: <PublicIcon sx={{ fontSize: 40 }} />, 
    title: 'יעדים בכל העולם', 
    description: 'אנו מציעים טיסות ליותר מ-1000 יעדים ברחבי העולם' 
  },
  { 
    icon: <BeachAccessIcon sx={{ fontSize: 40 }} />, 
    title: 'חבילות נופש מושלמות', 
    description: 'חבילות הכוללות טיסות, מלונות, העברות ואטרקציות במחיר אטרקטיבי' 
  }
];

export const HomeAbout = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  
  const [searchTab, setSearchTab] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [fromAirport, setFromAirport] = useState(null);
  const [toAirport, setToAirport] = useState(null);

  // Auto-rotate featured destinations
  useEffect(() => {
    const featuredDestinations = destinations.filter(d => d.featured);
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredDestinations.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleSearchSubmit = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setShowNotification(true);
    }, 1500);
  };

  const handleSearchTabChange = (event, newValue) => {
    setSearchTab(newValue);
  };

  const featuredDestinations = destinations.filter(d => d.featured);

  return (
    <Box sx={{ width: '100%', bgcolor: 'background.paper', overflow: 'hidden' }}>
      {/* Hero Section with Video Background */}
      <Box className="hero-section">
        {/* Video Background with Overlay */}
        <Box className="video-background">
          {/* <Box
            component="img"
            src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80"
            alt="Travel video background"
            className="background-image"
          /> */}
          <IconButton 
            className="video-control-button"
            onClick={() => setIsVideoPlaying(!isVideoPlaying)}
          >
            {isVideoPlaying ? <PauseIcon /> : <PlayArrowIcon />}
          </IconButton>
        </Box>

        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Fade in={true} timeout={1000}>
                <Box className="hero-content">
                  <Typography variant={isMobile ? "h3" : "h1"} component="h1" className="hero-heading">
                    גלו עולם של אפשרויות
                  </Typography>
                  <Typography variant="h5" className="hero-subheading">
                    הטיסות הטובות ביותר, המחירים המשתלמים ביותר והחוויות הבלתי נשכחות ביותר - הכל במקום אחד
                  </Typography>
                  <Stack 
                    direction={{ xs: 'column', sm: 'row' }} 
                    spacing={2}
                    sx={{ justifyContent: { xs: 'center', md: 'flex-start' } }}
                  >
                    <Button 
                      className="gradient-button"
                      size="large" 
                      startIcon={<SearchIcon />}
                      onClick={() => document.getElementById('search-section').scrollIntoView({ behavior: 'smooth' })}
                    >
                      חפש טיסות
                    </Button>
                    <Button 
                      variant="outlined" 
                      size="large" 
                      className="outline-button"
                    >
                      מבצעים מיוחדים
                    </Button>
                  </Stack>
                </Box>
              </Fade>
            </Grid>
            
            <Grid item xs={12} md={6} sx={{ display: { xs: 'none', md: 'block' } }}>
              <Zoom in={true} timeout={1500}>
                <Box className="featured-destination-card">
                  <Box
                    component="img"
                    src={featuredDestinations[currentSlide].image}
                    alt={featuredDestinations[currentSlide].name}
                    className="featured-destination-image"
                  />
                  <Box className="featured-destination-info">
                    <Typography variant="h4" className="featured-destination-name">
                      {featuredDestinations[currentSlide].name}
                    </Typography>
                    <Typography variant="h6" className="featured-destination-country">
                      {featuredDestinations[currentSlide].country}
                    </Typography>
                    <Box className="featured-destination-price-container">
                      <Typography variant="h5" className="featured-destination-price">
                        החל מ-{featuredDestinations[currentSlide].price}$
                      </Typography>
                      <Button 
                        variant="contained" 
                        className="featured-destination-button"
                        endIcon={<ArrowBackIcon />}
                      >
                        הזמן עכשיו
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </Zoom>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Search Section */}
      <Box id="search-section" className="search-section">
        <Container maxWidth="lg">
          <Paper className="search-paper">
            <Box className="search-container">
              <Tabs
                value={searchTab}
                onChange={handleSearchTabChange}
                variant="fullWidth"
                className="search-tabs"
              >
                <Tab 
                  icon={<AirplanemodeActiveIcon />} 
                  label="טיסות" 
                  className="search-tab"
                />
                <Tab 
                  icon={<HotelIcon />} 
                  label="בתי מלון" 
                  className="search-tab"
                />
                <Tab 
                  icon={<DirectionsCarIcon />} 
                  label="השכרת רכב" 
                  className="search-tab"
                />
                <Tab 
                  icon={<BeachAccessIcon />} 
                  label="חבילות נופש" 
                  className="search-tab"
                />
              </Tabs>
              
              {searchTab === 0 && (
                <Box className="search-content">
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={5}>
                      <Autocomplete
                        value={fromAirport}
                        onChange={(event, newValue) => setFromAirport(newValue)}
                        options={airports}
                        renderInput={(params) => (
                          <TextField 
                            {...params} 
                            label="מוצא" 
                            fullWidth
                            InputProps={{
                              ...params.InputProps,
                              startAdornment: (
                                <>
                                  <InputAdornment position="start">
                                    <FlightTakeoffIcon color="primary" />
                                  </InputAdornment>
                                  {params.InputProps.startAdornment}
                                </>
                              )
                            }}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} md={5}>
                      <Autocomplete
                        value={toAirport}
                        onChange={(event, newValue) => setToAirport(newValue)}
                        options={airports}
                        renderInput={(params) => (
                          <TextField 
                            {...params} 
                            label="יעד" 
                            fullWidth
                            InputProps={{
                              ...params.InputProps,
                              startAdornment: (
                                <>
                                  <InputAdornment position="start">
                                    <FlightLandIcon color="primary" />
                                  </InputAdornment>
                                  {params.InputProps.startAdornment}
                                </>
                              )
                            }}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} md={2}>
                      <Button 
                        className="gradient-button"
                        fullWidth 
                        size="large" 
                        sx={{ height: '100%', minHeight: '56px' }}
                        onClick={handleSearchSubmit}
                        startIcon={<SearchIcon />}
                      >
                        חפש
                      </Button>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <TextField
                        fullWidth
                        label="תאריך יציאה"
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <CalendarMonthIcon color="primary" />
                            </InputAdornment>
                          )
                        }}
                        defaultValue={new Date().toISOString().split('T')[0]}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <TextField
                        fullWidth
                        label="תאריך חזרה"
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <CalendarMonthIcon color="primary" />
                            </InputAdornment>
                          )
                        }}
                        defaultValue={new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <TextField
                        fullWidth
                        label="נוסעים"
                        type="number"
                        defaultValue={1}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <PersonIcon color="primary" />
                            </InputAdornment>
                          ),
                          inputProps: { min: 1, max: 10 }
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <TextField
                        select
                        fullWidth
                        label="מחלקה"
                        defaultValue="economy"
                        SelectProps={{
                          native: true,
                        }}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <LuggageIcon color="primary" />
                            </InputAdornment>
                          )
                        }}
                      >
                        <option value="economy">תיירים</option>
                        <option value="premium">תיירים פרימיום</option>
                        <option value="business">עסקים</option>
                        <option value="first">ראשונה</option>
                      </TextField>
                    </Grid>
                  </Grid>
                  
                  <Box className="search-filters">
                    <Chip 
                      label="טיסות ישירות בלבד" 
                      color="primary" 
                      variant="outlined" 
                      onClick={() => {}} 
                    />
                    <Chip 
                      label="כולל מזוודה" 
                      color="primary" 
                      variant="outlined" 
                      onClick={() => {}} 
                    />
                    <Chip 
                      label="מחירים הכי זולים" 
                      color="primary" 
                      variant="outlined" 
                      onClick={() => {}} 
                    />
                    <Chip 
                      label="חברות תעופה מועדפות" 
                      color="primary" 
                      variant="outlined" 
                      onClick={() => {}} 
                    />
                  </Box>
                </Box>
              )}
              
              {searchTab === 1 && (
                <Box className="search-placeholder">
                  <Typography variant="h6">חיפוש בתי מלון יהיה זמין בקרוב</Typography>
                </Box>
              )}
              
              {searchTab === 2 && (
                <Box className="search-placeholder">
                  <Typography variant="h6">חיפוש השכרת רכב יהיה זמין בקרוב</Typography>
                </Box>
              )}
              
              {searchTab === 3 && (
                <Box className="search-placeholder">
                  <Typography variant="h6">חיפוש חבילות נופש יהיה זמין בקרוב</Typography>
                </Box>
              )}
            </Box>
          </Paper>
        </Container>
      </Box>

      {/* Popular Destinations */}
      <Box className="destinations-section">
        <Container maxWidth="lg">
          <Box className="section-header">
            <Typography variant="h2" component="h2" className="section-heading">יעדים פופולריים</Typography>
            <Divider className="section-divider" />
            <Typography variant="h6" className="section-subheading">
              גלו את היעדים המובילים שלנו עם מבצעים מיוחדים ומחירים בלעדיים
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {destinations.map((destination, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Zoom in={true} style={{ transitionDelay: `${index * 100}ms` }}>
                  <Card className="animated-card">
                    <Box className="destination-image-container">
                      <CardMedia
                        component="img"
                        height="240"
                        image={destination.image}
                        alt={destination.name}
                      />
                      {destination.discount && (
                        <Chip 
                          label={`הנחה ${destination.discount}`} 
                          color="error" 
                          size="medium"
                          className="discount-chip"
                        />
                      )}
                      <IconButton className="favorite-button">
                        <FavoriteIcon color="error" />
                      </IconButton>
                    </Box>
                    <CardContent className="destination-content">
                      <Box className="destination-header">
                        <Typography gutterBottom variant="h5" component="h3" className="destination-name">
                          {destination.name}
                        </Typography>
                        <Rating 
                          value={destination.rating} 
                          readOnly 
                          precision={0.5}
                          size="small"
                          className="destination-rating"
                        />
                      </Box>
                      <Box className="destination-location">
                        <LocationOnIcon color="primary" sx={{ mr: 0.5, fontSize: '1rem' }} />
                        <Typography variant="body2" color="text.secondary">
                          {destination.country}
                        </Typography>
                      </Box>
                      <Divider sx={{ my: 2 }} />
                      <Box className="destination-footer">
                        <Typography className="destination-price">
                          החל מ-{destination.price}$
                        </Typography>
                        <Button 
                          variant="contained" 
                          color="primary" 
                          endIcon={<ArrowBackIcon />}
                          className="destination-book-button"
                        >
                          הזמן עכשיו
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Zoom>
              </Grid>
            ))}
          </Grid>
          
          <Box className="section-footer">
            <Button 
              className="gradient-button"
              size="large" 
              endIcon={<PublicIcon />}
            >
              גלה עוד יעדים
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Special Offers */}
      <Box className="special-offers-section">
        {/* Decorative elements */}
        <Box className="decorative-circle-1" />
        <Box className="decorative-circle-2" />
        
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Fade in={true} timeout={1000}>
                <Box>
                  <Typography variant="overline" className="offers-overline">
                    מבצעים מיוחדים
                  </Typography>
                  <Typography variant="h2" className="offers-heading">
                    חסכו עד 30% בהזמנות הבאות שלכם
                  </Typography>
                  <Typography variant="h6" className="offers-subheading">
                    הצטרפו למועדון הלקוחות שלנו וקבלו גישה למבצעים בלעדיים, הנחות מיוחדות והטבות נוספות בכל הזמנה.
                  </Typography>
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                    <Button className="white-button">
                      הצטרף עכשיו
                    </Button>
                    <Button className="outline-white-button">
                      למידע נוסף
                    </Button>
                  </Stack>
                </Box>
              </Fade>
            </Grid>
            <Grid item xs={12} md={6}>
              <Zoom in={true} timeout={1500}>
                <Paper className="offer-paper">
                  <Box className="offer-image-container">
                    <Box
                      component="img"
                      src="https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80"
                      alt="Special offer"
                      className="offer-image"
                    />
                    <Box className="offer-overlay">
                      <Typography variant="h4" className="offer-title">
                        חבילת חופשה משפחתית
                      </Typography>
                      <Typography variant="body1" className="offer-description">
                        כולל טיסות, מלון, העברות ואטרקציות
                      </Typography>
                      <Box className="offer-footer">
                        <Chip 
                          label="הנחה 30%" 
                          color="error" 
                          className="offer-discount-chip"
                        />
                        <Typography variant="h5" className="offer-price">
                          החל מ-899$ לאדם
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Paper>
              </Zoom>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Why Choose Us */}
      <Box className="why-choose-us-section">
        <Container maxWidth="lg">
          <Box className="section-header">
            <Typography variant="h2" component="h2" className="section-heading">למה לבחור בנו?</Typography>
            <Divider className="section-divider" />  <Typography variant="h6" className="section-subheading">
              אנו מציעים את השירות הטוב ביותר כדי להבטיח לכם חוויית נסיעה מושלמת
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Zoom in={true} style={{ transitionDelay: `${index * 100}ms` }}>
                  <Paper className="why-choose-us-item">
                    <Box className="feature-icon-wrapper icon-wrapper">
                      {feature.icon}
                    </Box>
                    <Typography variant="h5" component="h3" className="feature-title">
                      {feature.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" className="feature-description">
                      {feature.description}
                    </Typography>
                  </Paper>
                </Zoom>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Testimonials */}
      <Box className="testimonials-section">
        <Container maxWidth="lg">
          <Box className="section-header">
            <Typography variant="h2" component="h2" className="section-heading">לקוחות מספרים</Typography>
            <Divider className="section-divider" />
            <Typography variant="h6" className="section-subheading">
              מה הלקוחות שלנו אומרים על החוויה שלהם איתנו
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {testimonials.map((testimonial, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Zoom in={true} style={{ transitionDelay: `${index * 150}ms` }}>
                  <Paper className="testimonial-card">
                    <Box className="testimonial-header">
                      <Avatar 
                        src={testimonial.avatar} 
                        alt={testimonial.name}
                        className="testimonial-avatar"
                      />
                      <Box>
                        <Typography variant="h6" className="testimonial-name">
                          {testimonial.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" className="testimonial-destination">
                          טיול ל{testimonial.destination}
                        </Typography>
                      </Box>
                    </Box>
                    <Rating 
                      value={testimonial.rating} 
                      readOnly 
                      precision={0.5}
                      className="testimonial-rating"
                    />
                    <Typography variant="body1" className="testimonial-comment">
                      "{testimonial.comment}"
                    </Typography>
                    <Box className="testimonial-footer">
                      <Typography variant="caption" color="text.secondary">
                        לפני שבועיים
                      </Typography>
                    </Box>
                  </Paper>
                </Zoom>
              </Grid>
            ))}
          </Grid>

          <Box className="section-footer">
            <Button 
              className="gradient-button"
              size="large" 
              endIcon={<StarIcon />}
            >
              קרא עוד חוות דעת
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Newsletter */}
      <Box className="newsletter-section">
        {/* Decorative elements */}
        <Box className="newsletter-circle-1" />
        <Box className="newsletter-circle-2" />
        
        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
          <Box className="newsletter-content">
            <Typography variant="h3" className="newsletter-heading">
              הישארו מעודכנים
            </Typography>
            <Typography variant="h6" className="newsletter-subheading">
              הירשמו לניוזלטר שלנו וקבלו עדכונים על מבצעים חדשים ויעדים מומלצים
            </Typography>
            <Box 
              component="form" 
              className="newsletter-form"
            >
              <TextField
                fullWidth
                placeholder="הזינו את כתובת האימייל שלכם"
                variant="outlined"
                className="newsletter-textfield"
              />
              <Button 
                variant="contained" 
                className="newsletter-button"
              >
                הרשמה
              </Button>
            </Box>
            <Typography variant="caption" className="newsletter-disclaimer">
              לא נשלח ספאם. ניתן לבטל את המנוי בכל עת.
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Mobile App Promotion */}
      <Box className="mobile-app-section">
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Fade in={true} timeout={1000}>
                <Box>
                  <Typography variant="overline" className="app-overline">
                    אפליקציה חדשה
                  </Typography>
                  <Typography variant="h2" className="app-heading">
                    הורידו את האפליקציה שלנו
                  </Typography>
                  <Typography variant="h6" className="app-subheading">
                    הזמינו טיסות, בתי מלון וחבילות נופש בקלות מהסמארטפון שלכם. קבלו התראות על מבצעים מיוחדים ועקבו אחר ההזמנות שלכם בכל מקום.
                  </Typography>
                  <Stack direction="row" spacing={2} className="app-buttons">
                    <Button 
                      variant="contained" 
                      color="primary" 
                      className="app-download-button"
                      startIcon={
                        <Box component="img" src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Google_Play_Store_badge_EN.svg/2560px-Google_Play_Store_badge_EN.svg.png" width={24} />
                      }
                    >
                      Google Play
                    </Button>
                    <Button 
                      variant="contained" 
                      color="primary" 
                      className="app-download-button"
                      startIcon={
                        <Box component="img" src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/App_Store_%28iOS%29.svg/2560px-App_Store_%28iOS%29.svg.png" width={24} />
                      }
                    >
                      App Store
                    </Button>
                  </Stack>
                  <Box className="app-rating">
                    <Rating value={4.8} readOnly precision={0.1} sx={{ color: '#FFD700', mr: 1 }} />
                    <Typography variant="body2" color="text.secondary">
                      4.8/5 (2,500+ דירוגים)
                    </Typography>
                  </Box>
                </Box>
              </Fade>
            </Grid>
            <Grid item xs={12} md={6}>
              <Zoom in={true} timeout={1500}>
                <Box className="mobile-app-image">
                  <Box
                    component="img"
                    src="https://cdn.dribbble.com/users/1998175/screenshots/15459384/media/48bfd946df36d7c331ac9a458b2e0f9a.png?compress=1&resize=1000x750&vertical=top"
                    alt="Mobile app"
                  />
                </Box>
              </Zoom>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Loading Backdrop */}
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      {/* Notification */}
      <Snackbar 
        open={showNotification} 
        autoHideDuration={6000} 
        onClose={() => setShowNotification(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={() => setShowNotification(false)} 
          severity="success" 
          variant="filled"
          sx={{ width: '100%' }}
        >
          החיפוש בוצע בהצלחה! מצאנו עבורך את הטיסות הטובות ביותר.
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default HomeAbout;