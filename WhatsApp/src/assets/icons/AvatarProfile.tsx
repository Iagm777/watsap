import React from 'react';
import { View, StyleSheet } from 'react-native';

interface AvatarProfileProps {
  size?: number;
  initials?: string;
}

/**
 * Componente de Avatar Personalizado
 * Muestra un círculo con degradado púrpura/magenta y un icono de usuario
 */
export const AvatarProfile: React.FC<AvatarProfileProps> = ({ size = 48 }) => {
  return (
    <View style={[styles.avatarContainer, { width: size, height: size }]}>
      <svg width={size} height={size} viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Fondo con degradado */}
        <defs>
          <linearGradient id="avatarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8B3A62" />
            <stop offset="100%" stopColor="#C41E6E" />
          </linearGradient>
          <radialGradient id="avatarRadial">
            <stop offset="0%" stopColor="#A0476B" />
            <stop offset="100%" stopColor="#6B1E5C" />
          </radialGradient>
        </defs>

        {/* Círculo exterior */}
        <circle cx="64" cy="64" r="62" fill="url(#avatarRadial)" stroke="#9B4E77" strokeWidth="2" />

        {/* Círculo interior más oscuro */}
        <circle cx="64" cy="64" r="58" fill="url(#avatarGradient)" />

        {/* Icono de usuario dentro */}
        <g>
          {/* Cabeza */}
          <circle cx="64" cy="40" r="12" fill="#D4A5C2" />
          
          {/* Cuerpo/hombros */}
          <path
            d="M 40 65 Q 40 55 64 55 Q 88 55 88 65 L 88 95 Q 88 105 64 105 Q 40 105 40 95 Z"
            fill="#D4A5C2"
          />
        </g>
      </svg>
    </View>
  );
};

const styles = StyleSheet.create({
  avatarContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
});
