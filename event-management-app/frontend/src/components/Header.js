import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import EventIcon from '@mui/icons-material/Event';

const Header = () => {
  const navigate = useNavigate();

  return (
    <AppBar position="static">
      <Toolbar>
        <EventIcon sx={{ mr: 2 }} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Event Management System
        </Typography>
        <Box>
          <Button 
            color="inherit" 
            onClick={() => navigate('/')}
          >
            Events
          </Button>
          <Button 
            color="inherit" 
            onClick={() => navigate('/events/new')}
          >
            New Event
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header; 