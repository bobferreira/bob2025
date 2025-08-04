import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  CircularProgress,
  Paper
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { useNavigate, useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import { useEvent } from '../hooks/useEvent';

const EventForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { loading, error, fetchEvent, createEvent, updateEvent } = useEvent();
  const [formData, setFormData] = useState({
    title: '',
    startDate: dayjs(),
    endDate: dayjs().add(1, 'hour'),
    price: '',
    status: 'STARTED'
  });

  useEffect(() => {
    if (id && id !== 'new') {
      const loadEvent = async () => {
        try {
          const event = await fetchEvent(id);
          setFormData({
            title: event.title,
            startDate: dayjs(event.startDate),
            endDate: dayjs(event.endDate),
            price: event.price.toString(),
            status: event.status
          });
        } catch (err) {
          // Error is already handled by the hook
        }
      };
      loadEvent();
    }
  }, [id, fetchEvent]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const eventData = {
        title: formData.title,
        startDate: formData.startDate.toISOString(),
        endDate: formData.endDate.toISOString(),
        price: parseFloat(formData.price),
        status: formData.status
      };

      if (id && id !== 'new') {
        await updateEvent(id, eventData);
      } else {
        await createEvent(eventData);
      }

      navigate('/');
    } catch (err) {
      // Error is already handled by the hook
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  if (loading && id && id !== 'new') {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {id && id !== 'new' ? 'Edit Event' : 'Create New Event'}
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <TextField
            fullWidth
            label="Event Title"
            value={formData.title}
            onChange={(e) => handleChange('title', e.target.value)}
            required
            margin="normal"
          />

          <DateTimePicker
            label="Start Date & Time"
            value={formData.startDate}
            onChange={(newValue) => handleChange('startDate', newValue)}
            renderInput={(params) => <TextField {...params} fullWidth margin="normal" required />}
          />

          <DateTimePicker
            label="End Date & Time"
            value={formData.endDate}
            onChange={(newValue) => handleChange('endDate', newValue)}
            renderInput={(params) => <TextField {...params} fullWidth margin="normal" required />}
          />

          <TextField
            fullWidth
            label="Price"
            type="number"
            value={formData.price}
            onChange={(e) => handleChange('price', e.target.value)}
            required
            margin="normal"
            inputProps={{ min: 0, step: 0.01 }}
          />

          <FormControl fullWidth margin="normal">
            <InputLabel>Status</InputLabel>
            <Select
              value={formData.status}
              label="Status"
              onChange={(e) => handleChange('status', e.target.value)}
            >
              <MenuItem value="STARTED">Started</MenuItem>
              <MenuItem value="COMPLETED">Completed</MenuItem>
              <MenuItem value="PAUSED">Paused</MenuItem>
            </Select>
          </FormControl>

          <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
            <Button
              type="submit"
              variant="contained"
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : (id && id !== 'new' ? 'Update Event' : 'Create Event')}
            </Button>
            <Button
              variant="outlined"
              onClick={() => navigate('/')}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default EventForm; 