import { useState, useCallback } from 'react';
import { eventService } from '../services/api';

export const useEvent = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleError = useCallback((err) => {
    let errorMessage = 'An error occurred';
    
    if (err.response?.data) {
      if (typeof err.response.data === 'string') {
        errorMessage = err.response.data;
      } else if (err.response.data.message) {
        errorMessage = err.response.data.message;
      } else if (err.response.data.errors) {
        const validationErrors = err.response.data.errors;
        if (Array.isArray(validationErrors)) {
          errorMessage = validationErrors.map(error => error.defaultMessage || error.message).join(', ');
        } else {
          errorMessage = Object.values(validationErrors).join(', ');
        }
      }
    }
    
    setError(errorMessage);
    console.error('API Error:', err);
  }, []);

  const fetchEvent = useCallback(async (id) => {
    try {
      setLoading(true);
      setError(null);
      const event = await eventService.getEventById(id);
      return event;
    } catch (err) {
      handleError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [handleError]);

  const createEvent = useCallback(async (eventData) => {
    try {
      setLoading(true);
      setError(null);
      const createdEvent = await eventService.createEvent(eventData);
      return createdEvent;
    } catch (err) {
      handleError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [handleError]);

  const updateEvent = useCallback(async (id, eventData) => {
    try {
      setLoading(true);
      setError(null);
      const updatedEvent = await eventService.updateEvent(id, eventData);
      return updatedEvent;
    } catch (err) {
      handleError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [handleError]);

  const deleteEvent = useCallback(async (id) => {
    try {
      setLoading(true);
      setError(null);
      await eventService.deleteEvent(id);
    } catch (err) {
      handleError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [handleError]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    loading,
    error,
    fetchEvent,
    createEvent,
    updateEvent,
    deleteEvent,
    clearError
  };
}; 