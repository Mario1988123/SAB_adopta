import React, { useState } from 'react';
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Chip,
  Box,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Stack
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useData } from '../contexts/DataContext';
import { AnimalType, AgeUnit, SearchFilters } from '../types';
import FilterListIcon from '@mui/icons-material/FilterList';
import CloseIcon from '@mui/icons-material/Close';

export const AdoptPage: React.FC = () => {
  const { animals } = useData();
  const navigate = useNavigate();
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({});

  const filteredAnimals = animals.filter(animal => {
    if (filters.type && animal.type !== filters.type) return false;
    if (filters.breed && animal.breed !== filters.breed) return false;
    if (filters.urgent !== undefined && animal.urgent !== filters.urgent) return false;
    return true;
  });

  return (
    <Container sx={{ py: 3, pb: 10 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" component="h1">
          Animales en Adopción
        </Typography>
        <IconButton onClick={() => setFilterOpen(true)}>
          <FilterListIcon />
        </IconButton>
      </Box>

      {filteredAnimals.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 5 }}>
          <Typography variant="h6" color="text.secondary">
            No hay animales disponibles
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={2}>
          {filteredAnimals.map((animal) => (
            <Grid item xs={12} sm={6} md={4} key={animal.id}>
              <Card
                sx={{ cursor: 'pointer', height: '100%' }}
                onClick={() => navigate(`/animal/${animal.id}`)}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={animal.mainPhoto}
                  alt={animal.name}
                />
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 1 }}>
                    <Typography variant="h6" component="div">
                      {animal.name}
                    </Typography>
                    {animal.urgent && (
                      <Chip label="URGENTE" color="error" size="small" />
                    )}
                  </Box>
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

      <Dialog open={filterOpen} onClose={() => setFilterOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          Filtrar búsqueda
          <IconButton
            onClick={() => setFilterOpen(false)}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <FormControl fullWidth>
              <InputLabel>Tipo de animal</InputLabel>
              <Select
                value={filters.type || ''}
                label="Tipo de animal"
                onChange={(e) => setFilters({ ...filters, type: e.target.value as AnimalType })}
              >
                <MenuItem value="">Todos</MenuItem>
                <MenuItem value="perro">Perro</MenuItem>
                <MenuItem value="gato">Gato</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel>Solo urgentes</InputLabel>
              <Select
                value={filters.urgent === undefined ? '' : filters.urgent ? 'si' : 'no'}
                label="Solo urgentes"
                onChange={(e) => {
                  const val = e.target.value;
                  setFilters({
                    ...filters,
                    urgent: val === '' ? undefined : val === 'si'
                  });
                }}
              >
                <MenuItem value="">Todos</MenuItem>
                <MenuItem value="si">Solo urgentes</MenuItem>
                <MenuItem value="no">No urgentes</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            setFilters({});
            setFilterOpen(false);
          }}>
            Limpiar filtros
          </Button>
          <Button onClick={() => setFilterOpen(false)} variant="contained">
            Aplicar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};
