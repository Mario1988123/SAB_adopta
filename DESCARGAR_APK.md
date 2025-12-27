# Cómo Descargar el APK

## Método Automático (Recomendado) ✅

GitHub Actions compila el APK automáticamente cada vez que haces push.

### Pasos para Descargar:

1. **Ve a tu repositorio en GitHub**
   - https://github.com/Mario1988123/SAB_adopta

2. **Haz click en la pestaña "Actions"** (arriba del repositorio)

3. **Selecciona el workflow más reciente** (el primero de la lista)
   - Busca uno con ✅ (check verde = compilación exitosa)

4. **Scroll hacia abajo hasta "Artifacts"**

5. **Descarga `app-debug`**
   - Se descargará un archivo ZIP
   - Dentro está `app-debug.apk`

6. **Instala en tu Android**
   - Copia el `app-debug.apk` a tu móvil
   - Abre el archivo y acepta instalar de fuentes desconocidas
   - ¡Listo!

## El APK se Compila Automáticamente Cuando:

- ✅ Haces `git push` a cualquier rama `claude/*`
- ✅ Haces `git push` a `main` o `master`
- ✅ Creas un Pull Request
- ✅ Lo ejecutas manualmente desde la pestaña Actions

## Descargar Manualmente desde Actions

Si quieres forzar una compilación:

1. Ve a **Actions**
2. Click en **Build Android APK** (en el menú izquierdo)
3. Click en **Run workflow** (botón derecho)
4. Selecciona la rama
5. Click **Run workflow**
6. Espera 5-10 minutos
7. Descarga el artefacto cuando termine

## Tipos de APK Disponibles

- **app-debug.apk** - Para pruebas (más grande, ~50-80 MB)
- **app-release-unsigned.apk** - Versión optimizada pero sin firmar

## Instalación en Android

### Desde el Móvil:
1. Descarga el APK en tu móvil
2. Abre "Archivos" o "Descargas"
3. Toca el archivo APK
4. Android te pedirá permiso para "Instalar aplicaciones desconocidas"
5. Acepta el permiso
6. Instalar

### Desde PC:
1. Descarga el APK en tu PC
2. Conecta tu móvil por USB
3. Copia el APK a tu móvil
4. En el móvil, abre el archivo y sigue los pasos anteriores

## Solución de Problemas

### "No se ha compilado el APK"
- Revisa que el workflow tenga ✅ verde
- Si tiene ❌ roja, click en el workflow y mira los logs de error
- Es posible que falte alguna dependencia

### "El archivo es muy grande"
- El APK debug suele pesar 50-80 MB
- Es normal, contiene símbolos de debug
- La versión release será más pequeña

### "No puedo instalar aplicaciones desconocidas"
- En Android: Ajustes → Seguridad → Instalar aplicaciones desconocidas
- Permite que tu navegador o gestor de archivos instale apps

## ¿Necesitas Ayuda?

Si el workflow falla o tienes problemas, crea un issue en GitHub con los logs del error.
