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

## Generar APK para Android

Esta aplicación puede compilarse como APK nativa para Android.

### Guía Rápida

```bash
# Construir y abrir Android Studio
npm run android:build
```

Luego en Android Studio: **Build → Build APK(s)**

### Documentación Completa

- [Guía Rápida](QUICK_START_ANDROID.md) - Pasos básicos
- [Guía Completa](BUILD_APK.md) - Instrucciones detalladas, firma de APK, solución de problemas

### Scripts Disponibles

```bash
npm run android:sync    # Construir y sincronizar con Android
npm run android:open    # Abrir Android Studio
npm run android:build   # Construir, sincronizar y abrir (todo en uno)
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
