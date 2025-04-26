# 🪖 WG40K Guide App

¡Bienvenido, comandante! ⚔️ Esta guía táctica ha sido diseñada para acompañarte en cada batalla, con un estilo militar verde y totalmente optimizada para dispositivos móviles.  
Todo lo que necesitas, al alcance de tu mano.

---

## 📋 Contenido de la aplicación

- **Gestor de Turnos y Fases:**  
  Sigue fácilmente la secuencia del juego, gestiona tus puntos de comando y recuerda qué acciones están disponibles en cada fase.

- **Calculadora de Combate:**  
  Calcula probabilidades de éxito en ataques y simula tiradas de dados para resolver combates de forma rápida y eficaz.

- **Biblioteca de Estratagemas:**  
  Accede a una colección completa de estratagemas, filtrables por facción, categoría y fase del juego. *(Énfasis especial en esta funcionalidad)*

- **Gestor de Unidades:**  
  Registra tus unidades en juego, lleva el control de heridas y estados durante la partida.

> Todo diseñado con un estilo verde militar **muy táctico** y **completamente adaptado a móviles**. 🪖📱

---

## 🚀 Instrucciones para usar la aplicación

### 🔧 Requisitos previos

Antes de empezar, asegúrate de tener instalado:
- **Node.js** (v18 o superior recomendado)
- **npm** (el gestor de paquetes de Node)

Verifícalo ejecutando en tu terminal:
```bash
node -v
npm -v
```

Si no los tienes, puedes descargarlos desde [nodejs.org](https://nodejs.org).

### 📂 Instalación y ejecución en local

1. Descomprime el archivo `WG40K.zip`.
2. Abre una terminal en la carpeta donde descomprimiste el proyecto:
```bash
cd ruta/del/proyecto
```

3. Instala las dependencias necesarias:
```bash
npm install
```

4. Arranca el servidor de desarrollo:
```bash
npm run dev
```

5. Abre tu navegador y accede a:
```
http://localhost:3000
```

¡Y ya tendrás la aplicación funcionando en modo desarrollo! 🚀

### 🌍 Despliegue en servidor web

Para desplegar la app en un servidor web de forma permanente:

1. Genera los archivos de producción:
```bash
npm run build
```

2. Accede a la carpeta `out/` generada automáticamente.
3. Sube el contenido de `out/` a tu servidor web (puedes usar FTP, SSH o tu método habitual).
4. Configura tu servidor para servir archivos estáticos correctamente.

Con eso, la guía quedará accesible públicamente. 🎯

## ✨ Características adicionales

- 📴 **Modo offline**: Funciona sin conexión una vez cargada (modo offline activado gracias a PWA).
- 📱 **Acceso directo**: Puedes guardar la app en la pantalla de inicio de tu móvil para una experiencia tipo app nativa.
- 📚 **Reglas y estratagemas integradas**: Toda la información está disponible dentro de la app, sin necesidad de conexión.
- 🔄 **Actualizaciones automáticas**: La app se actualiza automáticamente cuando hay cambios disponibles.
- 🔒 **Sin registro necesario**: No es necesaria ninguna cuenta para utilizar todas las funcionalidades.
