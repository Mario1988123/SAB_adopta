import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Fab
} from '@mui/material';
import { useData } from '../contexts/DataContext';
import AddIcon from '@mui/icons-material/Add';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import StoreIcon from '@mui/icons-material/Store';

export const DonationsPage: React.FC = () => {
  const { donations } = useData();
  const navigate = useNavigate();

  return (
    <Container sx={{ py: 3, pb: 10 }}>
      <Typography variant="h5" component="h1" gutterBottom>
        Donaciones
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Artículos gratuitos para animales en adopción
      </Typography>

      {donations.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 5 }}>
          <Typography variant="h6" color="text.secondary">
            No hay donaciones disponibles
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={2}>
          {donations.map((donation) => (
            <Grid item xs={12} sm={6} md={4} key={donation.id}>
              <Card sx={{ cursor: 'pointer', height: '100%' }}>
                <CardContent>
                  <Typography variant="h6" component="div" gutterBottom>
                    {donation.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {donation.description}
                  </Typography>

                  <Box sx={{ mb: 2 }}>
                    <Chip
                      label={donation.category}
                      size="small"
                      color="primary"
                      variant="outlined"
                    />
                  </Box>

                  <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                    {donation.deliveryAvailable && (
                      <Chip
                        icon={<LocalShippingIcon />}
                        label="Envío disponible"
                        size="small"
                        color="success"
                      />
                    )}
                    {donation.pickupRequired && (
                      <Chip
                        icon={<StoreIcon />}
                        label="Recogida en tienda"
                        size="small"
                      />
                    )}
                  </Box>

                  <Typography variant="caption" color="text.secondary">
                    📍 {donation.location}
                  </Typography>
                  <br />
                  <Typography variant="caption" color="text.secondary">
                    Por: {donation.ownerName}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <Fab
        color="primary"
        sx={{ position: 'fixed', bottom: 80, right: 16 }}
        onClick={() => navigate('/add-donation')}
      >
        <AddIcon />
      </Fab>
    </Container>
  );
};
