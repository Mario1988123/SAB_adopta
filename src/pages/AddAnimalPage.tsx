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
  Autocomplete,
  ToggleButton,
  ToggleButtonGroup,
  IconButton,
  Stack
} from '@mui/material';
import { useData } from '../contexts/DataContext';
import { useAuth } from '../contexts/AuthContext';
import { AnimalType, AdoptionReason, AgeUnit, DOG_BREEDS, CAT_BREEDS } from '../types';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';

export const AddAnimalPage: React.FC = () => {
  const navigate = useNavigate();
  const { addAnimal } = useData();
  const { user } = useAuth();

  const [name, setName] = useState('');
  const [type, setType] = useState<AnimalType>('perro');
  const [breed, setBreed] = useState('');
  const [customBreed, setCustomBreed] = useState('');
  const [age, setAge] = useState<number>(1);
  const [ageUnit, setAgeUnit] = useState<AgeUnit>('años');
  const [reason, setReason] = useState<AdoptionReason>('encontrado');
  const [maxAdoptionDate, setMaxAdoptionDate] = useState('');
  const [urgent, setUrgent] = useState(false);
  const [hasChip, setHasChip] = useState(false);
  const [isDewormed, setIsDewormed] = useState(false);
  const [hasDisease, setHasDisease] = useState(false);
  const [diseaseDescription, setDiseaseDescription] = useState('');
  const [hasDisability, setHasDisability] = useState(false);
  const [disabilityDescription, setDisabilityDescription] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');

  const breeds = type === 'perro' ? DOG_BREEDS : CAT_BREEDS;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !breed) {
      alert('Por favor, completa todos los campos obligatorios');
      return;
    }

    const finalBreed = breed === 'Otros' ? customBreed : breed;

    addAnimal({
      name: name.trim(),
      type,
      breed: finalBreed,
      age,
      ageUnit,
      reason,
      maxAdoptionDate: maxAdoptionDate || undefined,
      urgent,
      hasChip,
      isDewormed,
      hasDisease,
      diseaseDescription: hasDisease ? diseaseDescription : undefined,
      hasDisability,
      disabilityDescription: hasDisability ? disabilityDescription : undefined,
      photos: photoUrl ? [photoUrl] : [],
      videos: [],
      mainPhoto: photoUrl || 'https://via.placeholder.com/400x300?text=Sin+foto',
      ownerId: user?.id || '1',
      ownerName: user?.name || 'Usuario'
    });

    navigate('/');
  };

  return (
    <Container maxWidth="md" sx={{ py: 3, pb: 10 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <IconButton onClick={() => navigate(-1)} sx={{ mr: 1 }}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h5">
          Añadir Animal en Adopción
        </Typography>
      </Box>

      <Paper sx={{ p: 3 }}>
        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <TextField
              required
              fullWidth
              label="Nombre del animal"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <FormControl fullWidth required>
              <InputLabel>Motivo de la adopción</InputLabel>
              <Select
                value={reason}
                label="Motivo de la adopción"
                onChange={(e) => setReason(e.target.value as AdoptionReason)}
              >
                <MenuItem value="encontrado">Encontrado</MenuItem>
                <MenuItem value="crias">Crías</MenuItem>
                <MenuItem value="no_puedo_mantener">No lo puedo mantener</MenuItem>
                <MenuItem value="otros">Otros</MenuItem>
              </Select>
            </FormControl>

            <Box>
              <Typography variant="subtitle2" gutterBottom>
                Tipo de animal *
              </Typography>
              <ToggleButtonGroup
                value={type}
                exclusive
                onChange={(_, value) => value && setType(value)}
                fullWidth
              >
                <ToggleButton value="perro">Perro</ToggleButton>
                <ToggleButton value="gato">Gato</ToggleButton>
              </ToggleButtonGroup>
            </Box>

            <Autocomplete
              options={breeds}
              value={breed}
              onChange={(_, newValue) => setBreed(newValue || '')}
              renderInput={(params) => (
                <TextField {...params} label="Raza" required />
              )}
            />

            {breed === 'Otros' && (
              <TextField
                fullWidth
                label="Especifica la raza"
                value={customBreed}
                onChange={(e) => setCustomBreed(e.target.value)}
                required
              />
            )}

            <Box>
              <Typography variant="subtitle2" gutterBottom>
                Edad aproximada
              </Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <TextField
                  type="number"
                  value={age}
                  onChange={(e) => setAge(parseInt(e.target.value) || 1)}
                  inputProps={{ min: 1 }}
                  sx={{ width: '50%' }}
                />
                <ToggleButtonGroup
                  value={ageUnit}
                  exclusive
                  onChange={(_, value) => value && setAgeUnit(value)}
                  sx={{ width: '50%' }}
                >
                  <ToggleButton value="meses">Meses</ToggleButton>
                  <ToggleButton value="años">Años</ToggleButton>
                </ToggleButtonGroup>
              </Box>
            </Box>

            <TextField
              fullWidth
              type="date"
              label="Fecha máxima de adopción"
              value={maxAdoptionDate}
              onChange={(e) => setMaxAdoptionDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />

            <FormControlLabel
              control={
                <Switch
                  checked={urgent}
                  onChange={(e) => setUrgent(e.target.checked)}
                />
              }
              label="Marcar como URGENTE"
            />

            <Box>
              <Typography variant="subtitle2" gutterBottom>
                Foto principal (URL)
              </Typography>
              <TextField
                fullWidth
                placeholder="https://ejemplo.com/foto.jpg"
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
                InputProps={{
                  startAdornment: <PhotoCameraIcon sx={{ mr: 1, color: 'text.secondary' }} />
                }}
              />
              {photoUrl && (
                <Box sx={{ mt: 2 }}>
                  <img
                    src={photoUrl}
                    alt="Preview"
                    style={{ width: '100%', maxHeight: 200, objectFit: 'cover', borderRadius: 8 }}
                  />
                </Box>
              )}
            </Box>

            <FormControlLabel
              control={
                <Switch
                  checked={hasChip}
                  onChange={(e) => setHasChip(e.target.checked)}
                />
              }
              label="¿Lleva chip?"
            />

            <FormControlLabel
              control={
                <Switch
                  checked={isDewormed}
                  onChange={(e) => setIsDewormed(e.target.checked)}
                />
              }
              label="¿Está desparasitado?"
            />

            <Box>
              <FormControlLabel
                control={
                  <Switch
                    checked={hasDisease}
                    onChange={(e) => setHasDisease(e.target.checked)}
                  />
                }
                label="¿Tiene alguna enfermedad?"
              />
              {hasDisease && (
                <TextField
                  fullWidth
                  label="Describe la enfermedad"
                  value={diseaseDescription}
                  onChange={(e) => setDiseaseDescription(e.target.value)}
                  multiline
                  rows={2}
                  sx={{ mt: 1 }}
                />
              )}
            </Box>

            <Box>
              <FormControlLabel
                control={
                  <Switch
                    checked={hasDisability}
                    onChange={(e) => setHasDisability(e.target.checked)}
                  />
                }
                label="¿Tiene alguna discapacidad?"
              />
              {hasDisability && (
                <TextField
                  fullWidth
                  label="Describe la discapacidad"
                  value={disabilityDescription}
                  onChange={(e) => setDisabilityDescription(e.target.value)}
                  multiline
                  rows={2}
                  sx={{ mt: 1 }}
                />
              )}
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
                Publicar Adopción
              </Button>
            </Box>
          </Stack>
        </form>
      </Paper>
    </Container>
  );
};
