import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia,
  Button,
  useMediaQuery,
  useTheme
} from '@mui/material';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import SecurityIcon from '@mui/icons-material/Security';
import './HomeAbout.css';

export const HomeAbout = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const features = [
    {
      icon: <FlightTakeoffIcon fontSize="large" />,
      title: "Global Destinations",
      description: "Access to over 500 airlines and 10,000+ destinations worldwide. Find the perfect flight for your next adventure."
    },
    {
      icon: <LocalOfferIcon fontSize="large" />,
      title: "Best Price Guarantee",
      description: "We promise the best rates available. Found a better price elsewhere? We'll match it and give you an additional discount."
    },
    {
      icon: <SupportAgentIcon fontSize="large" />,
      title: "24/7 Customer Support",
      description: "Our dedicated support team is available around the clock to assist with any questions or concerns about your booking."
    },
    {
      icon: <SecurityIcon fontSize="large" />,
      title: "Secure Booking",
      description: "Your personal and payment information is protected with state-of-the-art encryption technology."
    }
  ];

  return (
    <Box sx={{ overflow: 'hidden' }}>
      {/* Hero Section */}
      <Box className="hero-section">
        <Container>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography 
                variant={isMobile ? "h4" : "h2"} 
                component="h1" 
                fontWeight="bold" 
                color="#00838f"
                gutterBottom
              >
                Your Journey Begins With Us
              </Typography>
              <Typography 
                variant="h6" 
                color="#006064" 
                sx={{ mb: 4, maxWidth: '90%' }}
              >
                Discover the world with our seamless flight booking experience. 
                Affordable prices, flexible options, and exceptional service.
              </Typography>
              <Button 
                size="large" 
                variant="contained" 
                className="styled-button"
                sx={{ padding: theme.spacing(1, 4) }}
              >
                Book Your Flight Now
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box 
                component="img"
                src="https://source.unsplash.com/random/600x400/?airplane,travel"
                alt="Travel"
                sx={{
                  width: '100%',
                  borderRadius: 4,
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Container sx={{ mb: 8 }}>
        <Typography 
          variant="h3" 
          component="h2" 
          textAlign="center" 
          color="#00838f"
          fontWeight="bold"
          sx={{ mb: 2 }}
        >
          Why Choose Us
        </Typography>
        <Typography 
          variant="h6" 
          textAlign="center" 
          color="#00838f" 
          sx={{ mb: 6, maxWidth: 800, mx: 'auto' }}
        >
          We're dedicated to making your travel experience exceptional from start to finish
        </Typography>

        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card className="feature-card">
                <CardContent sx={{ flexGrow: 1, textAlign: 'center', p: 3 }}>
                  <Box className="feature-icon" sx={{ padding: theme.spacing(2) }}>
                    {feature.icon}
                  </Box>
                  <Typography variant="h5" component="h3" fontWeight="bold" color="#00838f" gutterBottom>
                    {feature.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Popular Destinations */}
      <Container sx={{ mb: 8 }}>
        <Typography 
          variant="h3" 
          component="h2" 
          textAlign="center" 
          color="#00838f"
          fontWeight="bold"
          sx={{ mb: 2 }}
        >
          Popular Destinations
        </Typography>
        <Typography 
          variant="h6" 
          textAlign="center" 
          color="#00838f" 
          sx={{ mb: 6, maxWidth: 800, mx: 'auto' }}
        >
          Explore our most sought-after flight destinations
        </Typography>

        <Grid container spacing={3}>
          {['Paris', 'Tokyo', 'New York', 'Sydney'].map((city, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card className="destination-card">
                <CardMedia
                  component="img"
                  height="200"
                  image={`https://source.unsplash.com/featured/?${city},landmark`}
                  alt={city}
                />
                <CardContent sx={{ bgcolor: '#e0f7fa' }}>
                  <Typography variant="h6" component="h3" fontWeight="bold" color="#00838f">
                    {city}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Explore the wonders of {city}
                  </Typography>
                  <Button 
                    size="small" 
                    sx={{ 
                      color: '#00838f',
                      '&:hover': {
                        backgroundColor: 'rgba(0, 131, 143, 0.1)',
                      }
                    }}
                  >
                    View Flights
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* CTA Section */}
      <Container>
        <Box className="cta-section">
          <Container>
            <Grid container spacing={4} alignItems="center" justifyContent="center">
              <Grid item xs={12} md={8} textAlign="center">
                <Typography 
                  variant="h3" 
                  component="h2" 
                  fontWeight="bold" 
                  color="white"
                  gutterBottom
                >
                  Ready for Your Next Adventure?
                </Typography>
                <Typography 
                  variant="h6" 
                  color="white" 
                  sx={{ mb: 4, opacity: 0.9 }}
                >
                  Join thousands of satisfied travelers who have found their perfect flights with us.
                </Typography>
                <Button 
                  size="large" 
                  variant="contained" 
                  className="styled-button"
                  sx={{ padding: theme.spacing(1, 4) }}
                >
                  Search Flights Now
                </Button>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Container>

      {/* Testimonials */}
      <Container sx={{ mb: 8 }}>
        <Typography 
          variant="h3" 
          component="h2" 
          textAlign="center" 
          color="#00838f"
          fontWeight="bold"
          sx={{ mb: 2 }}
        >
          What Our Customers Say
        </Typography>
        <Typography 
          variant="h6" 
          textAlign="center" 
          color="#00838f" 
          sx={{ mb: 6, maxWidth: 800, mx: 'auto' }}
        >
          Don't just take our word for it
        </Typography>

        <Grid container spacing={4}>
          {[
            {
              name: "Sarah Johnson",
              location: "London, UK",
              text: "The booking process was incredibly smooth. I found a great deal on my flight to Barcelona and the customer service was exceptional when I needed to modify my booking."
            },
            {
              name: "Michael Chen",
              location: "Toronto, Canada",
              text: "I've been using this service for all my business trips for the past year. The interface is intuitive, prices are competitive, and I love the email alerts for price drops."
            },
            {
              name: "Aisha Patel",
              location: "Dubai, UAE",
              text: "Finding flights for my family vacation was a breeze. The filters helped me find the perfect flight times and the price comparison feature saved us a lot of money!"
            }
          ].map((testimonial, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card className="testimonial-card">
                <CardContent sx={{ flexGrow: 1, p: 4 }}>
                  <Typography variant="body1" color="text.secondary" paragraph className="testimonial-text">
                    "{testimonial.text}"
                  </Typography>
                  <Box sx={{ mt: 'auto' }}>
                    <Typography variant="subtitle1" fontWeight="bold" color="#00838f">
                      {testimonial.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {testimonial.location}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default HomeAbout;