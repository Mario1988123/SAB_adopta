import React from 'react';
import {
  Container,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Typography,
  Box,
  Divider
} from '@mui/material';
import { useData } from '../contexts/DataContext';
import ChatIcon from '@mui/icons-material/Chat';

export const ChatPage: React.FC = () => {
  const { chats } = useData();

  return (
    <Container sx={{ py: 3, pb: 10 }}>
      <Typography variant="h5" component="h1" gutterBottom>
        Conversaciones
      </Typography>

      {chats.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 5 }}>
          <ChatIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h6" color="text.secondary">
            No tienes conversaciones
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Contacta con los dueños de los animales para iniciar una conversación
          </Typography>
        </Box>
      ) : (
        <List>
          {chats.map((chat, index) => (
            <React.Fragment key={chat.id}>
              <ListItem alignItems="flex-start" button>
                <ListItemAvatar>
                  <Avatar>
                    {chat.participants[0]?.name.charAt(0) || 'U'}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={chat.animalName || chat.donationTitle || 'Conversación'}
                  secondary={
                    <>
                      <Typography
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        {chat.participants[0]?.name || 'Usuario'}
                      </Typography>
                      {chat.lastMessage && ` — ${chat.lastMessage.text}`}
                    </>
                  }
                />
              </ListItem>
              {index < chats.length - 1 && <Divider variant="inset" component="li" />}
            </React.Fragment>
          ))}
        </List>
      )}
    </Container>
  );
};
