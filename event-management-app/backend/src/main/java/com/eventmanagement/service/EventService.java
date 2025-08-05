package com.eventmanagement.service;

import com.eventmanagement.dto.EventRequest;
import com.eventmanagement.dto.EventResponse;
import com.eventmanagement.exception.EventValidationException;
import com.eventmanagement.model.Event;
import com.eventmanagement.repository.EventRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class EventService {
    
    private final EventRepository eventRepository;
    
    public EventService(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }
    
    public List<EventResponse> getAllEvents() {
        return eventRepository.findAll()
                .stream()
                .map(EventResponse::fromEvent)
                .collect(Collectors.toList());
    }
    
    public Optional<EventResponse> getEventById(Long id) {
        return eventRepository.findById(id)
                .map(EventResponse::fromEvent);
    }
    
    public EventResponse createEvent(EventRequest eventRequest) {
        Event event = convertToEvent(eventRequest);
        validateEventDates(event);
        Event savedEvent = eventRepository.save(event);
        return EventResponse.fromEvent(savedEvent);
    }
    
    public EventResponse updateEvent(Long id, EventRequest eventRequest) {
        Event eventToUpdate = convertToEvent(eventRequest);
        validateEventDates(eventToUpdate);
        
        Event existingEvent = findEventByIdOrThrow(id);
        updateEventFields(existingEvent, eventToUpdate);
        
        Event savedEvent = eventRepository.save(existingEvent);
        return EventResponse.fromEvent(savedEvent);
    }
    
    public void deleteEvent(Long id) {
        if (!eventRepository.existsById(id)) {
            throw new EventValidationException("Event not found with id: " + id);
        }
        eventRepository.deleteById(id);
    }
    
    // Private helper methods for better code organization
    private Event convertToEvent(EventRequest eventRequest) {
        Event event = new Event();
        event.setTitle(eventRequest.getTitle());
        event.setStartDate(eventRequest.getStartDate());
        event.setEndDate(eventRequest.getEndDate());
        event.setPrice(eventRequest.getPrice());
        event.setStatus(Event.EventStatus.valueOf(eventRequest.getStatus()));
        return event;
    }
    
    private Event findEventByIdOrThrow(Long id) {
        return eventRepository.findById(id)
                .orElseThrow(() -> new EventValidationException("Event not found with id: " + id));
    }
    
    private void updateEventFields(Event existingEvent, Event eventToUpdate) {
        existingEvent.setTitle(eventToUpdate.getTitle());
        existingEvent.setStartDate(eventToUpdate.getStartDate());
        existingEvent.setEndDate(eventToUpdate.getEndDate());
        existingEvent.setPrice(eventToUpdate.getPrice());
        existingEvent.setStatus(eventToUpdate.getStatus());
    }
    
    private void validateEventDates(Event event) {
        if (event.getStartDate() != null && event.getEndDate() != null) {
            if (event.getEndDate().isBefore(event.getStartDate())) {
                throw new EventValidationException("End date cannot be before start date");
            }
        }
    }
} 