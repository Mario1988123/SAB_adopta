import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Switch,
  IconButton,
  Stack
} from '@mui/material';
import { useData } from '../contexts/DataContext';
import { useAuth } from '../contexts/AuthContext';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export const AddDonationPage: React.FC = () => {
  const navigate = useNavigate();
  const { addDonation } = useData();
  const { user } = useAuth();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<'alimentos' | 'mantas' | 'juguetes' | 'accesorios' | 'otros'>('alimentos');
  const [location, setLocation] = useState('');
  const [deliveryAvailable, setDeliveryAvailable] = useState(false);
  const [pickupRequired, setPickupRequired] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !description.trim() || !location.trim()) {
      alert('Por favor, completa todos los campos obligatorios');
      return;
    }

    addDonation({
      title: title.trim(),
      description: description.trim(),
      category,
      photos: [],
      location: location.trim(),
      deliveryAvailable,
      pickupRequired,
      ownerId: user?.id || '1',
      ownerName: user?.name || 'Usuario'
    });

    navigate('/donations');
  };

  return (
    <Container maxWidth="md" sx={{ py: 3, pb: 10 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <IconButton onClick={() => navigate(-1)} sx={{ mr: 1 }}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h5">
          Nueva Donación
        </Typography>
      </Box>

      <Paper sx={{ p: 3 }}>
        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <TextField
              required
              fullWidth
              label="Título"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ej: Saco de pienso para perros"
            />

            <TextField
              required
              fullWidth
              label="Descripción"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              multiline
              rows={4}
              placeholder="Describe el artículo que donas..."
            />

            <FormControl fullWidth required>
              <InputLabel>Categoría</InputLabel>
              <Select
                value={category}
                label="Categoría"
                onChange={(e) => setCategory(e.target.value as any)}
              >
                <MenuItem value="alimentos">Alimentos</MenuItem>
                <MenuItem value="mantas">Mantas</MenuItem>
                <MenuItem value="juguetes">Juguetes</MenuItem>
                <MenuItem value="accesorios">Accesorios</MenuItem>
                <MenuItem value="otros">Otros</MenuItem>
              </Select>
            </FormControl>

            <TextField
              required
              fullWidth
              label="Lugar de recogida"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Ej: Calle Mayor, 15"
            />

            <Box>
              <Typography variant="subtitle2" gutterBottom>
                Opciones de entrega
              </Typography>
              <FormControlLabel
                control={
                  <Switch
                    checked={deliveryAvailable}
                    onChange={(e) => setDeliveryAvailable(e.target.checked)}
                  />
                }
                label="Puedo llevar el artículo"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={pickupRequired}
                    onChange={(e) => setPickupRequired(e.target.checked)}
                  />
                }
                label="Pueden venir a recogerlo"
              />
            </Box>

            <Box sx={{ display: 'flex', gap: 2, pt: 2 }}>
              <Button
                variant="outlined"
                fullWidth
                onClick={() => navigate(-1)}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                variant="contained"
                fullWidth
              >
                Publicar Donación
              </Button>
            </Box>
          </Stack>
        </form>
      </Paper>
    </Container>
  );
};
