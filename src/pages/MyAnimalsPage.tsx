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
  Box,
  IconButton,
  CardActions,
  Button
} from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export const MyAnimalsPage: React.FC = () => {
  const { user } = useAuth();
  const { getAnimalsByOwner, deleteAnimal } = useData();
  const navigate = useNavigate();

  const myAnimals = user ? getAnimalsByOwner(user.id) : [];

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`¿Seguro que quieres eliminar la publicación de ${name}?`)) {
      deleteAnimal(id);
    }
  };

  return (
    <Container sx={{ py: 3, pb: 10 }}>
      <Typography variant="h5" component="h1" gutterBottom>
        Mis Publicaciones
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        {myAnimals.length} {myAnimals.length === 1 ? 'publicación' : 'publicaciones'}
      </Typography>

      {myAnimals.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 5 }}>
          <Typography variant="h6" color="text.secondary">
            No has publicado ningún animal
          </Typography>
          <Button
            variant="contained"
            sx={{ mt: 2 }}
            onClick={() => navigate('/add-animal')}
          >
            Publicar Ahora
          </Button>
        </Box>
      ) : (
        <Grid container spacing={2}>
          {myAnimals.map((animal) => (
            <Grid item xs={12} sm={6} md={4} key={animal.id}>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image={animal.mainPhoto}
                  alt={animal.name}
                />
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 1 }}>
                    <Typography variant="h6">{animal.name}</Typography>
                    {animal.urgent && (
                      <Chip label="URGENTE" color="error" size="small" />
                    )}
                  </Box>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {animal.breed} • {animal.age} {animal.ageUnit}
                  </Typography>
                  <Chip
                    label={animal.status}
                    size="small"
                    color={
                      animal.status === 'disponible' ? 'success' :
                      animal.status === 'reservado' ? 'warning' : 'default'
                    }
                  />
                  <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                    {animal.views} visualizaciones
                  </Typography>
                </CardContent>
                <CardActions>
                  <IconButton
                    size="small"
                    onClick={() => navigate(`/animal/${animal.id}`)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => handleDelete(animal.id, animal.name)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};
