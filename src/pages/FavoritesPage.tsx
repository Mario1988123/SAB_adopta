import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Chip,
  Box
} from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';
import FavoriteIcon from '@mui/icons-material/Favorite';

export const FavoritesPage: React.FC = () => {
  const { isFavorite } = useAuth();
  const { animals } = useData();
  const navigate = useNavigate();

  const favoriteAnimals = animals.filter(animal => isFavorite(animal.id));

  return (
    <Container sx={{ py: 3, pb: 10 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
        <FavoriteIcon color="error" />
        <Typography variant="h5" component="h1">
          Mis Favoritos
        </Typography>
      </Box>

      {favoriteAnimals.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 5 }}>
          <Typography variant="h6" color="text.secondary">
            No tienes animales favoritos
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Explora los animales disponibles y marca tus favoritos
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={2}>
          {favoriteAnimals.map((animal) => (
            <Grid item xs={12} sm={6} md={4} key={animal.id}>
              <Card
                sx={{ cursor: 'pointer' }}
                onClick={() => navigate(`/animal/${animal.id}`)}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={animal.mainPhoto}
                  alt={animal.name}
                />
                <CardContent>
                  <Typography variant="h6">{animal.name}</Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {animal.breed}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                    <Chip
                      label={animal.type === 'perro' ? 'Perro' : 'Gato'}
                      size="small"
                      color="primary"
                      variant="outlined"
                    />
                    <Chip
                      label={`${animal.age} ${animal.ageUnit}`}
                      size="small"
                      variant="outlined"
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};
