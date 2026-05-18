import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';

interface IconProps {
  size?: number;
  color?: string;
  style?: ViewStyle;
}

/**
 * Componentes de iconos basados en WhatsApp design
 */

// Icono de Micrófono (Mute)
export const MicrophoneIcon: React.FC<IconProps> = ({ size = 24, color = '#FFFFFF' }) => (
  <View style={[styles.iconContainer, { width: size, height: size }]}>
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" y1="19" x2="12" y2="23" />
      <line x1="8" y1="23" x2="16" y2="23" />
    </svg>
  </View>
);

// Icono de Micrófono Muted
export const MicrophoneMutedIcon: React.FC<IconProps> = ({ size = 24, color = '#FF6B6B' }) => (
  <View style={[styles.iconContainer, { width: size, height: size }]}>
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
      <line x1="1" y1="1" x2="23" y2="23" />
      <path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6" />
      <path d="M17 16.95A7 7 0 0 1 5 12m14 0v2a7 7 0 0 1-11.95 4.95" />
      <line x1="12" y1="19" x2="12" y2="23" />
      <line x1="8" y1="23" x2="16" y2="23" />
    </svg>
  </View>
);

// Icono de Speaker (Altavoz)
export const SpeakerIcon: React.FC<IconProps> = ({ size = 24, color = '#FFFFFF' }) => (
  <View style={[styles.iconContainer, { width: size, height: size }]}>
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <path d="M15.54 5.47a7 7 0 0 1 0 9.93" />
      <path d="M19.07 4.93a10.7 10.7 0 0 1 0 14.14" />
    </svg>
  </View>
);

// Icono de Teléfono
export const PhoneIcon: React.FC<IconProps> = ({ size = 24, color = '#31a24c' }) => (
  <View style={[styles.iconContainer, { width: size, height: size }]}>
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  </View>
);

// Icono de Teléfono Rechazado
export const PhoneHangUpIcon: React.FC<IconProps> = ({ size = 24, color = '#FF6B6B' }) => (
  <View style={[styles.iconContainer, { width: size, height: size }]}>
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      <line x1="1" y1="1" x2="23" y2="23" stroke={color} strokeWidth="2" />
    </svg>
  </View>
);

// Icono de Video Call
export const VideoCallIcon: React.FC<IconProps> = ({ size = 24, color = '#31a24c' }) => (
  <View style={[styles.iconContainer, { width: size, height: size }]}>
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
      <polygon points="23 7 16 12 23 17 23 7" />
      <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
    </svg>
  </View>
);

// Icono de Menú Vertical
export const MenuVerticalIcon: React.FC<IconProps> = ({ size = 24, color = '#FFFFFF' }) => (
  <View style={[styles.iconContainer, { width: size, height: size }]}>
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <circle cx="12" cy="5" r="2" />
      <circle cx="12" cy="12" r="2" />
      <circle cx="12" cy="19" r="2" />
    </svg>
  </View>
);

// Icono de Adjuntar/Clip
export const AttachIcon: React.FC<IconProps> = ({ size = 24, color = '#31a24c' }) => (
  <View style={[styles.iconContainer, { width: size, height: size }]}>
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
      <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 2.2" />
    </svg>
  </View>
);

// Icono de Enviar/Play
export const SendIcon: React.FC<IconProps> = ({ size = 24, color = '#31a24c' }) => (
  <View style={[styles.iconContainer, { width: size, height: size }]}>
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <polygon points="16 3 20.5 8.5 12 13 3 21 3 3" />
    </svg>
  </View>
);

// Icono de Micrófono para Mensaje
export const MicrophoneMessageIcon: React.FC<IconProps> = ({ size = 24, color = '#31a24c' }) => (
  <View style={[styles.iconContainer, { width: size, height: size }]}>
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" y1="19" x2="12" y2="23" />
      <line x1="8" y1="23" x2="16" y2="23" />
    </svg>
  </View>
);

// Icono de Búsqueda
export const SearchIcon: React.FC<IconProps> = ({ size = 24, color = '#888888' }) => (
  <View style={[styles.iconContainer, { width: size, height: size }]}>
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  </View>
);

// Icono de Atrás
export const BackIcon: React.FC<IconProps> = ({ size = 24, color = '#FFFFFF' }) => (
  <View style={[styles.iconContainer, { width: size, height: size }]}>
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12 19 5 12 12 5" />
    </svg>
  </View>
);

// Icono de Eliminar/Papelera
export const TrashIcon: React.FC<IconProps> = ({ size = 24, color = '#FF6B6B' }) => (
  <View style={[styles.iconContainer, { width: size, height: size }]}>
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <line x1="10" y1="11" x2="10" y2="17" />
      <line x1="14" y1="11" x2="14" y2="17" />
    </svg>
  </View>
);

// Icono de Check/Verificado
export const CheckIcon: React.FC<IconProps> = ({ size = 16, color = '#31a24c' }) => (
  <View style={[styles.iconContainer, { width: size, height: size }]}>
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="3">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  </View>
);

// Icono de Editar
export const EditIcon: React.FC<IconProps> = ({ size = 20, color = '#31a24c' }) => (
  <View style={[styles.iconContainer, { width: size, height: size }]}>
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  </View>
);

// Icono de Reloj/Tiempo
export const ClockIcon: React.FC<IconProps> = ({ size = 24, color = '#31a24c' }) => (
  <View style={[styles.iconContainer, { width: size, height: size }]}>
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  </View>
);

// Icono de Cámara
export const CameraIcon: React.FC<IconProps> = ({ size = 24, color = '#31a24c' }) => (
  <View style={[styles.iconContainer, { width: size, height: size }]}>
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  </View>
);

// Icono de Check Recibido (mensaje enviado)
export const SingleCheckIcon: React.FC<IconProps> = ({ size = 16, color = '#A8A8A8' }) => (
  <View style={[styles.iconContainer, { width: size, height: size }]}>
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M3 12L9 18L21 6"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  </View>
);

// Icono de Double Check Leído (mensaje leído) - VISTO en AZUL
export const DoubleCheckIcon: React.FC<IconProps> = ({ size = 18 }) => (
  <View style={[styles.iconContainer, { width: size, height: size }]}>
    <svg width={size} height={size * 0.833} viewBox="0 0 18 15" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Check izquierdo */}
      <path
        d="M1 7.5L4.2 11L9 1.5"
        stroke="#53BDEB"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Check derecho */}
      <path
        d="M7 7.5L10.2 11L15 1.5"
        stroke="#53BDEB"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </View>
);

// Icono de Avatar de Usuario
export const AvatarIcon: React.FC<IconProps> = ({ size = 129, color = '#F79AA3' }) => (
  <View style={[styles.iconContainer, { width: size, height: size }]}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 129 129"
      fill="none"
    >
      {/* Círculo principal */}
      <circle cx="64.5" cy="64.5" r="54" fill="#65112C" stroke="#8A3A55" strokeWidth="1" />

      {/* Cabeza */}
      <circle cx="64.5" cy="53.5" r="8" fill={color} />

      {/* Cuerpo */}
      <path
        d="M48 77 C48 67 55 62 64.5 62 C74 62 81 67 81 77 C81 78.5 79.8 80 78.2 80 H50.8 C49.2 80 48 78.5 48 77 Z"
        fill={color}
      />
    </svg>
  </View>
);

// Icono de Clip/Adjuntar (mejorado)
export const ClipIcon: React.FC<IconProps> = ({ size = 24, color = '#888888' }) => (
  <View style={[styles.iconContainer, { width: size, height: size }]}>
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21.44 11.05l-8.49 8.49a5.5 5.5 0 0 1-7.78-7.78l9.19-9.19a3.5 3.5 0 0 1 4.95 4.95l-9.2 9.19a1.5 1.5 0 0 1-2.12-2.12l8.49-8.48"/>
    </svg>
  </View>
);

// Icono de Cámara (mejorado)
export const CameraIconNew: React.FC<IconProps> = ({ size = 24, color = '#888888' }) => (
  <View style={[styles.iconContainer, { width: size, height: size }]}>
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h4l2-2h6l2 2h4a2 2 0 0 1 2 2z"/>
      <circle cx="12" cy="13" r="4"/>
    </svg>
  </View>
);

// Icono de Micrófono (mejorado para input)
export const MicrophoneInputIcon: React.FC<IconProps> = ({ size = 24, color = '#888888' }) => (
  <View style={[styles.iconContainer, { width: size, height: size }]}>
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
      <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
      <line x1="12" y1="19" x2="12" y2="23"/>
      <line x1="8" y1="23" x2="16" y2="23"/>
    </svg>
  </View>
);

// Icono de Stickers/Emoji
export const StickersIcon: React.FC<IconProps> = ({ size = 24, color = '#888888' }) => (
  <View style={[styles.iconContainer, { width: size, height: size }]}>
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <path d="M8 15s1.5 2 4 2 4-2 4-2"/>
      <line x1="9" y1="9" x2="9.01" y2="9"/>
      <line x1="15" y1="9" x2="15.01" y2="9"/>
    </svg>
  </View>
);

const styles = StyleSheet.create({
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
