# Guía Rápida: Generar APK

## Opción 1: Comandos Rápidos (Recomendado)

```bash
# 1. Instalar dependencias (solo la primera vez)
npm install

# 2. Construir y abrir Android Studio
npm run android:build
```

Esto hará:
1. Compilar la aplicación web
2. Sincronizar con Android
3. Abrir Android Studio automáticamente

## Opción 2: Paso a Paso

```bash
# 1. Construir la web
npm run build

# 2. Sincronizar con Android
npx cap sync android

# 3. Abrir Android Studio
npx cap open android
```

## Generar el APK en Android Studio

1. Espera a que Gradle termine de sincronizar (barra de progreso abajo)
2. **Build → Build Bundle(s) / APK(s) → Build APK(s)**
3. Espera a la notificación de "APK(s) generated successfully"
4. Click en **locate** en la notificación
5. El APK está en: `android/app/build/outputs/apk/debug/app-debug.apk`

## Instalar en tu Móvil

### Método 1: Archivo APK
- Copia `app-debug.apk` a tu teléfono
- Abre el archivo y acepta instalar de fuentes desconocidas

### Método 2: Desde Android Studio
- Conecta tu móvil por USB
- Activa "Depuración USB" en Opciones de Desarrollador
- En Android Studio, click en el botón **Run** (▶️)

## Actualizar la App

Después de hacer cambios:

```bash
npm run android:build
```

Y vuelve a generar el APK en Android Studio.

## Requisitos

- **Android Studio**: https://developer.android.com/studio
- **Node.js**: Ya instalado ✓
- **Espacio en disco**: ~3-4 GB para Android SDK

## Solución de Problemas

**"SDK not found"**
- Abre Android Studio → Tools → SDK Manager
- Instala Android SDK API 33 o superior

**"Gradle sync failed"**
- File → Invalidate Caches / Restart

**APK muy grande**
- Normal para versión debug (~50-80 MB)
- Versión release será más pequeña

## ¿Necesitas más ayuda?

Ver la guía completa en: [BUILD_APK.md](BUILD_APK.md)
