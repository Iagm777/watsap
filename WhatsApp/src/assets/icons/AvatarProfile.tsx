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
      <svg width={size} height={size} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* círculo exterior */}
        <circle cx="60" cy="60" r="58" fill="#5B1B69"/>

        {/* círculo medio */}
        <circle cx="60" cy="60" r="48" fill="#7A0834"/>

        {/* borde suave */}
        <circle cx="60" cy="60" r="47"
                stroke="#A45A7A"
                strokeOpacity="0.5"
                strokeWidth="1.5"/>

        {/* cabeza */}
        <circle cx="60" cy="46" r="8" fill="#F2A0AB"/>

        {/* cuerpo */}
        <path d="M46 71
                 C46 61 52 56 60 56
                 C68 56 74 61 74 71
                 V74
                 H46
                 Z"
              fill="#F2A0AB"/>
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
