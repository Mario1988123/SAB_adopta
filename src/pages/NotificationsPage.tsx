import React from 'react';
import {
  Container,
  List,
  ListItem,
  ListItemText,
  Typography,
  Box,
  IconButton,
  Divider,
  Chip
} from '@mui/material';
import { useData } from '../contexts/DataContext';
import NotificationsIcon from '@mui/icons-material/Notifications';
import CheckIcon from '@mui/icons-material/Check';
import { format } from 'date-fns';

export const NotificationsPage: React.FC = () => {
  const { notifications, markNotificationAsRead } = useData();

  return (
    <Container sx={{ py: 3, pb: 10 }}>
      <Typography variant="h5" component="h1" gutterBottom>
        Notificaciones
      </Typography>

      {notifications.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 5 }}>
          <NotificationsIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h6" color="text.secondary">
            No tienes notificaciones
          </Typography>
        </Box>
      ) : (
        <List>
          {notifications.map((notification, index) => (
            <React.Fragment key={notification.id}>
              <ListItem
                sx={{
                  bgcolor: notification.read ? 'transparent' : 'action.hover',
                  borderRadius: 1,
                  mb: 1
                }}
                secondaryAction={
                  !notification.read && (
                    <IconButton
                      edge="end"
                      onClick={() => markNotificationAsRead(notification.id)}
                    >
                      <CheckIcon />
                    </IconButton>
                  )
                }
              >
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="subtitle1">
                        {notification.title}
                      </Typography>
                      {!notification.read && (
                        <Chip label="NUEVO" size="small" color="primary" />
                      )}
                    </Box>
                  }
                  secondary={
                    <>
                      <Typography variant="body2" color="text.primary">
                        {notification.message}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {format(new Date(notification.timestamp), "dd/MM/yyyy HH:mm")}
                      </Typography>
                    </>
                  }
                />
              </ListItem>
              {index < notifications.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
      )}
    </Container>
  );
};
