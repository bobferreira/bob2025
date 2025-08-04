import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Box,
  Chip,
  CircularProgress,
  Alert,
  Grid
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { Edit, ArrowBack } from '@mui/icons-material';
import dayjs from 'dayjs';
import { eventService } from '../services/api';

const EventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchEvent = async () => {
    try {
      setLoading(true);
      const data = await eventService.getEventById(id);
      setEvent(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch event details');
      console.error('Error fetching event:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvent();
  }, [id]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'STARTED':
        return 'primary';
      case 'COMPLETED':
        return 'success';
      case 'PAUSED':
        return 'warning';
      default:
        return 'default';
    }
  };

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Alert severity="error">
          {error}
        </Alert>
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate('/')}
          sx={{ mt: 2 }}
        >
          Back to Events
        </Button>
      </Container>
    );
  }

  if (!event) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Typography variant="h6" color="text.secondary">
          Event not found
        </Typography>
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate('/')}
          sx={{ mt: 2 }}
        >
          Back to Events
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate('/')}
        >
          Back to Events
        </Button>
        <Button
          variant="contained"
          startIcon={<Edit />}
          onClick={() => navigate(`/events/${id}/edit`)}
        >
          Edit Event
        </Button>
      </Box>

      <Card>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
            <Typography variant="h4" component="h1">
              {event.title}
            </Typography>
            <Chip
              label={event.status}
              color={getStatusColor(event.status)}
              size="large"
            />
          </Box>

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Event Details
              </Typography>
              
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle1" color="text.secondary">
                  Start Date & Time
                </Typography>
                <Typography variant="body1">
                  {dayjs(event.startDate).format('MMMM DD, YYYY [at] HH:mm')}
                </Typography>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle1" color="text.secondary">
                  End Date & Time
                </Typography>
                <Typography variant="body1">
                  {dayjs(event.endDate).format('MMMM DD, YYYY [at] HH:mm')}
                </Typography>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle1" color="text.secondary">
                  Duration
                </Typography>
                <Typography variant="body1">
                  {dayjs(event.endDate).diff(dayjs(event.startDate), 'hour')} hours
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Pricing
              </Typography>
              
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle1" color="text.secondary">
                  Price
                </Typography>
                <Typography variant="h5" color="primary">
                  ${event.price}
                </Typography>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle1" color="text.secondary">
                  Event ID
                </Typography>
                <Typography variant="body1" fontFamily="monospace">
                  #{event.id}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
};

export default EventDetail; 