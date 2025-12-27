# SAB Adopta - Aplicación de Adopción de Animales

Aplicación PWA para la adopción de animales en San Antonio de Benagéber (Valencia).

## Características

- 🐕 Gestión de animales en adopción (perros y gatos)
- 💬 Sistema de chat para contactar con los dueños
- 🎁 Sistema de donaciones de artículos para mascotas
- 🔔 Notificaciones de novedades
- 📱 PWA - Funciona en Android e iOS
- 🎨 Interfaz moderna con Material-UI

## Credenciales de Demo

- **Usuario:** Admin
- **Contraseña:** 1234

## Instalación

```bash
# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# Construir para producción
npm run build

# Previsualizar build de producción
npm run preview
```

## Tecnologías

- React 18
- TypeScript
- Vite
- Material-UI
- React Router
- PWA Support

## Estructura del Proyecto

```
src/
├── components/     # Componentes reutilizables
├── contexts/       # Contextos de React (Auth, Data)
├── pages/          # Páginas de la aplicación
├── types/          # Definiciones de TypeScript
├── App.tsx         # Componente principal
└── main.tsx        # Punto de entrada
```

## Funcionalidades

### Adopción de Animales
- Añadir animales con información detallada
- Filtrar por tipo, raza, edad
- Marcar como urgente
- Información de salud (chip, desparasitación, enfermedades, discapacidades)

### Donaciones
- Publicar artículos gratuitos para mascotas
- Opciones de entrega o recogida
- Categorías: alimentos, mantas, juguetes, accesorios

### Chat
- Conversaciones con dueños de animales
- Historial de mensajes

### Perfil
- Información del usuario
- Gestión de la cuenta
