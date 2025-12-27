# Cómo Compilar el APK de SAB Adopta

Esta guía te ayudará a generar un archivo APK para instalar la aplicación en dispositivos Android.

## Requisitos Previos

1. **Node.js** (ya instalado)
2. **Android Studio** - Descarga e instala desde: https://developer.android.com/studio
3. **Java JDK** (viene con Android Studio)

## Pasos para Generar el APK

### 1. Instalar Dependencias

Si aún no lo has hecho:

```bash
npm install
```

### 2. Compilar la Aplicación Web

```bash
npm run build
```

### 3. Sincronizar con Android

```bash
npx cap sync android
```

### 4. Abrir en Android Studio

```bash
npx cap open android
```

Esto abrirá el proyecto en Android Studio.

### 5. Generar el APK en Android Studio

Una vez abierto Android Studio:

1. **Espera** a que Gradle termine de sincronizar (puede tardar varios minutos la primera vez)
2. Ve al menú: **Build → Build Bundle(s) / APK(s) → Build APK(s)**
3. Espera a que termine la compilación
4. Cuando termine, aparecerá una notificación con un link "locate"
5. Haz click en "locate" para abrir la carpeta con el APK

El APK estará en: `android/app/build/outputs/apk/debug/app-debug.apk`

### 6. Instalar el APK en tu Dispositivo Android

#### Opción A: Transferir el archivo APK

1. Copia el archivo `app-debug.apk` a tu teléfono Android
2. Abre el archivo en tu teléfono
3. Android te pedirá permiso para instalar aplicaciones de fuentes desconocidas
4. Acepta y la app se instalará

#### Opción B: Instalar directamente desde Android Studio

1. Conecta tu dispositivo Android por USB
2. Activa "Depuración USB" en las opciones de desarrollador de tu teléfono
3. En Android Studio, selecciona tu dispositivo en la parte superior
4. Click en el botón de "Run" (▶️)
5. La app se instalará automáticamente en tu teléfono

## Generar APK Firmado para Producción

Para distribuir la app en Google Play Store o de forma oficial:

### 1. Crear un Keystore

```bash
keytool -genkey -v -keystore sab-adopta-key.keystore -alias sab-adopta -keyalg RSA -keysize 2048 -validity 10000
```

Guarda bien la contraseña que elijas.

### 2. Configurar el Keystore en Android Studio

1. Abre Android Studio
2. Ve a: **Build → Generate Signed Bundle / APK**
3. Selecciona **APK**
4. Click en **Next**
5. Click en **Choose existing...** y selecciona tu keystore
6. Rellena los campos con la información de tu keystore
7. Selecciona **release**
8. Click en **Finish**

El APK firmado estará en: `android/app/release/app-release.apk`

## Actualizar la App después de Cambios

Cada vez que hagas cambios en el código:

```bash
# 1. Reconstruir la web
npm run build

# 2. Sincronizar con Android
npx cap sync android

# 3. Abrir en Android Studio y compilar de nuevo
npx cap open android
```

## Solución de Problemas

### Error: "SDK not found"

1. Abre Android Studio
2. Ve a: **Tools → SDK Manager**
3. Instala Android SDK (recomendado: API 33 o superior)

### Error: "Gradle sync failed"

1. En Android Studio: **File → Invalidate Caches / Restart**
2. Espera a que reinicie y vuelve a sincronizar

### La app no funciona en el móvil

1. Verifica que compilaste con `npm run build` antes de sincronizar
2. Asegúrate de que el APK sea la versión más reciente
3. Desinstala la app anterior del teléfono antes de instalar la nueva

## Configuración Adicional

### Cambiar el Icono de la App

Los iconos de Android se encuentran en:
```
android/app/src/main/res/
  ├── mipmap-hdpi/
  ├── mipmap-mdpi/
  ├── mipmap-xhdpi/
  ├── mipmap-xxhdpi/
  └── mipmap-xxxhdpi/
```

Reemplaza los archivos `ic_launcher.png` y `ic_launcher_round.png` en cada carpeta con tus propios iconos.

### Cambiar el Nombre de la App

Edita el archivo: `android/app/src/main/res/values/strings.xml`

```xml
<string name="app_name">SAB Adopta</string>
```

### Cambiar el ID de la App

Edita: `android/app/build.gradle`

Busca:
```gradle
applicationId "es.sanantoniodebenageber.adopta"
```

## Información Técnica

- **App ID**: es.sanantoniodebenageber.adopta
- **Nombre**: SAB Adopta
- **Versión mínima de Android**: 5.0 (API 21)
- **Framework**: Capacitor 6
- **Tecnología Web**: React + TypeScript + Vite

## Referencias

- [Documentación de Capacitor](https://capacitorjs.com/docs)
- [Guía de Android Studio](https://developer.android.com/studio/run)
- [Firmar APKs](https://developer.android.com/studio/publish/app-signing)
