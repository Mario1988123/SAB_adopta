import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  Avatar,
  BottomNavigation,
  BottomNavigationAction,
  Paper,
  Fab
} from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ChatIcon from '@mui/icons-material/Chat';
import PetsIcon from '@mui/icons-material/Pets';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import AddIcon from '@mui/icons-material/Add';

export const Layout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const { unreadCount } = useData();

  const getBottomNavValue = () => {
    if (location.pathname === '/' || location.pathname.startsWith('/animal/')) return 0;
    if (location.pathname === '/chat') return 1;
    if (location.pathname === '/donations') return 2;
    return 0;
  };

  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <PetsIcon sx={{ mr: 1 }} />
          <div style={{ flexGrow: 1 }}>SAB Adopta</div>
          <IconButton color="inherit" onClick={() => navigate('/notifications')}>
            <Badge badgeContent={unreadCount} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton color="inherit" onClick={() => navigate('/profile')}>
            <Avatar
              src={user?.photo}
              sx={{ width: 32, height: 32 }}
            >
              {user?.name.charAt(0)}
            </Avatar>
          </IconButton>
        </Toolbar>
      </AppBar>

      <div style={{ marginTop: 64, marginBottom: 56, minHeight: 'calc(100vh - 120px)' }}>
        <Outlet />
      </div>

      {location.pathname === '/' && (
        <Fab
          color="primary"
          sx={{ position: 'fixed', bottom: 70, right: 16 }}
          onClick={() => navigate('/add-animal')}
        >
          <AddIcon />
        </Fab>
      )}

      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation
          value={getBottomNavValue()}
          onChange={(_, newValue) => {
            if (newValue === 0) navigate('/');
            if (newValue === 1) navigate('/chat');
            if (newValue === 2) navigate('/donations');
          }}
        >
          <BottomNavigationAction label="Adopta" icon={<PetsIcon />} />
          <BottomNavigationAction label="Chat" icon={<ChatIcon />} />
          <BottomNavigationAction label="Donaciones" icon={<VolunteerActivismIcon />} />
        </BottomNavigation>
      </Paper>
    </>
  );
};
