import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Box,
  Chip,
  Button,
  IconButton,
  Stack,
  Divider,
  Grid
} from '@mui/material';
import { useData } from '../contexts/DataContext';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ChatIcon from '@mui/icons-material/Chat';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { format } from 'date-fns';

export const AnimalDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { animals } = useData();

  const animal = animals.find(a => a.id === id);

  if (!animal) {
    return (
      <Container>
        <Typography variant="h6">Animal no encontrado</Typography>
        <Button onClick={() => navigate(-1)}>Volver</Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 3, pb: 10 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <IconButton onClick={() => navigate(-1)} sx={{ mr: 1 }}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h5">
          Detalles del Animal
        </Typography>
      </Box>

      <Paper>
        <Box
          component="img"
          src={animal.mainPhoto}
          alt={animal.name}
          sx={{
            width: '100%',
            height: 300,
            objectFit: 'cover'
          }}
        />

        <Box sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2 }}>
            <Typography variant="h4" component="h1">
              {animal.name}
            </Typography>
            {animal.urgent && (
              <Chip label="URGENTE" color="error" />
            )}
          </Box>

          <Stack direction="row" spacing={1} sx={{ mb: 3 }}>
            <Chip
              label={animal.type === 'perro' ? 'Perro' : 'Gato'}
              color="primary"
            />
            <Chip label={animal.breed} variant="outlined" />
            <Chip label={`${animal.age} ${animal.ageUnit}`} variant="outlined" />
          </Stack>

          <Divider sx={{ my: 2 }} />

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="subtitle2" color="text.secondary">
                Motivo
              </Typography>
              <Typography variant="body1">
                {animal.reason === 'encontrado' && 'Encontrado'}
                {animal.reason === 'crias' && 'Crías'}
                {animal.reason === 'no_puedo_mantener' && 'No puedo mantenerlo'}
                {animal.reason === 'otros' && 'Otros'}
              </Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography variant="subtitle2" color="text.secondary">
                Publicado
              </Typography>
              <Typography variant="body1">
                {format(new Date(animal.createdAt), 'dd/MM/yyyy')}
              </Typography>
            </Grid>

            {animal.maxAdoptionDate && (
              <Grid item xs={12}>
                <Typography variant="subtitle2" color="text.secondary">
                  Fecha máxima de adopción
                </Typography>
                <Typography variant="body1">
                  {format(new Date(animal.maxAdoptionDate), 'dd/MM/yyyy')}
                </Typography>
              </Grid>
            )}

            <Grid item xs={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {animal.hasChip ? (
                  <CheckCircleIcon color="success" />
                ) : (
                  <CancelIcon color="error" />
                )}
                <Typography variant="body2">
                  {animal.hasChip ? 'Con chip' : 'Sin chip'}
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {animal.isDewormed ? (
                  <CheckCircleIcon color="success" />
                ) : (
                  <CancelIcon color="error" />
                )}
                <Typography variant="body2">
                  {animal.isDewormed ? 'Desparasitado' : 'No desparasitado'}
                </Typography>
              </Box>
            </Grid>

            {animal.hasDisease && animal.diseaseDescription && (
              <Grid item xs={12}>
                <Typography variant="subtitle2" color="text.secondary">
                  Enfermedad
                </Typography>
                <Typography variant="body1" color="error">
                  {animal.diseaseDescription}
                </Typography>
              </Grid>
            )}

            {animal.hasDisability && animal.disabilityDescription && (
              <Grid item xs={12}>
                <Typography variant="subtitle2" color="text.secondary">
                  Discapacidad
                </Typography>
                <Typography variant="body1" color="warning.main">
                  {animal.disabilityDescription}
                </Typography>
              </Grid>
            )}

            <Grid item xs={12}>
              <Typography variant="subtitle2" color="text.secondary">
                Contacto
              </Typography>
              <Typography variant="body1">
                {animal.ownerName}
              </Typography>
            </Grid>
          </Grid>

          <Button
            variant="contained"
            fullWidth
            startIcon={<ChatIcon />}
            sx={{ mt: 3 }}
            onClick={() => alert('Funcionalidad de chat en desarrollo')}
          >
            Contactar
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};
