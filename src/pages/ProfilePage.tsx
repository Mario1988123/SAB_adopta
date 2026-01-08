import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Avatar,
  Typography,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Button,
  Chip
} from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';
import EmailIcon from '@mui/icons-material/Email';
import BadgeIcon from '@mui/icons-material/Badge';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EditIcon from '@mui/icons-material/Edit';
import PetsIcon from '@mui/icons-material/Pets';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LogoutIcon from '@mui/icons-material/Logout';
import VerifiedIcon from '@mui/icons-material/Verified';

export const ProfilePage: React.FC = () => {
  const { user, logout } = useAuth();
  const { getAnimalsByOwner } = useData();
  const navigate = useNavigate();

  const myAnimalsCount = user ? getAnimalsByOwner(user.id).length : 0;
  const favoritesCount = user?.favorites.length || 0;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) {
    return null;
  }

  return (
    <Container maxWidth="sm" sx={{ py: 3, pb: 10 }}>
      <Typography variant="h5" component="h1" gutterBottom>
        Mi Perfil
      </Typography>

      <Paper sx={{ p: 3, mb: 2 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
          <Avatar
            src={user.photo}
            sx={{ width: 100, height: 100, mb: 2 }}
          >
            {user.name.charAt(0)}
          </Avatar>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="h5">
              {user.name}
            </Typography>
            {user.verified && (
              <VerifiedIcon color="primary" fontSize="small" />
            )}
          </Box>
          {user.bio && (
            <Typography variant="body2" color="text.secondary" textAlign="center" sx={{ mt: 1 }}>
              {user.bio}
            </Typography>
          )}
        </Box>

        <Divider sx={{ my: 2 }} />

        <List>
          <ListItem>
            <ListItemIcon>
              <EmailIcon />
            </ListItemIcon>
            <ListItemText
              primary="Email"
              secondary={user.email}
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <BadgeIcon />
            </ListItemIcon>
            <ListItemText
              primary="DNI"
              secondary={user.dni}
            />
          </ListItem>
          {user.phone && (
            <ListItem>
              <ListItemIcon>
                <PhoneIcon />
              </ListItemIcon>
              <ListItemText
                primary="Teléfono"
                secondary={user.phone}
              />
            </ListItem>
          )}
          {(user.city || user.province) && (
            <ListItem>
              <ListItemIcon>
                <LocationOnIcon />
              </ListItemIcon>
              <ListItemText
                primary="Ubicación"
                secondary={`${user.city || ''}${user.city && user.province ? ', ' : ''}${user.province || ''}`}
              />
            </ListItem>
          )}
        </List>

        <Button
          fullWidth
          variant="outlined"
          startIcon={<EditIcon />}
          sx={{ mt: 2 }}
          onClick={() => navigate('/edit-profile')}
        >
          Editar Perfil
        </Button>
      </Paper>

      <Paper sx={{ p: 2, mb: 2 }}>
        <List>
          <ListItem
            button
            onClick={() => navigate('/my-animals')}
          >
            <ListItemIcon>
              <PetsIcon />
            </ListItemIcon>
            <ListItemText primary="Mis Publicaciones" />
            <Chip label={myAnimalsCount} size="small" />
          </ListItem>
          <Divider />
          <ListItem
            button
            onClick={() => navigate('/favorites')}
          >
            <ListItemIcon>
              <FavoriteIcon />
            </ListItemIcon>
            <ListItemText primary="Mis Favoritos" />
            <Chip label={favoritesCount} size="small" />
          </ListItem>
        </List>
      </Paper>

      <Button
        variant="outlined"
        color="error"
        fullWidth
        startIcon={<LogoutIcon />}
        onClick={handleLogout}
      >
        Cerrar Sesión
      </Button>
    </Container>
  );
};
