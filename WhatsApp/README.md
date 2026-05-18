# WhatsApp Simulator

Una aplicación de simulación de chat inspirada visualmente en WhatsApp, sin conexión a internet, backend ni mensajería real. Desarrollada con React Native y Expo.

## 🚀 Características

- **Chat Único**: Simulador de conversación con un solo contacto
- **Datos Locales**: Todo almacenado en JSON local (sin servidor)
- **Diseño WhatsApp**: Interfaz visual similar a WhatsApp
- **Multiplataforma**: Web, Android e iOS
- **Responsive**: Funciona en todos los dispositivos
- **Emojis**: Soporte completo de caracteres especiales

## 📋 Requisitos

- Node.js 16+
- npm o yarn

## 🛠️ Instalación

```bash
# Instalar dependencias
npm install
```

## ▶️ Ejecutar

### En Web
```bash
npm run web
# Abre http://localhost:8081
```

### En Android
```bash
npm run android
# Requiere Android Studio y emulador configurado
```

### En iOS
```bash
npm run ios
# Solo en macOS
```

## 📁 Estructura del Proyecto

```
src/
├── types/                   # Modelos TypeScript
├── data/
│   └── chatService.ts      # Servicios de datos
├── hooks/
│   └── useChat.ts          # Custom hooks
├── screens/
│   ├── ConversationScreen.tsx
│   └── ContactScreen.tsx
└── constants/
    └── theme.ts            # Colores y tema
```

## 🎮 Cómo Usar

1. **Enviar Mensaje**: Escribe en el input y presiona ➤
2. **Ver Contacto**: Toca el header para ver información del contacto
3. **Volver**: Presiona ← para regresar al chat

## 🎨 Tema

- **Color Primario**: `#31a24c` (verde WhatsApp)
- **Mensajes Enviados**: Verde claro
- **Mensajes Recibidos**: Blanco con borde

## 📝 Personalización

Edita `assets/data/chat.json` para cambiar el contacto y los mensajes.

## 📱 Compatibilidad

- ✅ Web
- ✅ Android
- ✅ iOS

---

**Hecho con ❤️ usando React Native y Expo**

