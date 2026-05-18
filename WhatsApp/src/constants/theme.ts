/**
 * Tema visual y colores de la aplicación
 * Inspirado en el diseño de WhatsApp
 */

export const Colors = {
  // Primario
  primary: '#31a24c',
  primaryLight: '#41c456',
  primaryDark: '#2b8e41',

  // Fondo
  background: '#FFFFFF',
  backgroundSecondary: '#F5F5F5',
  backgroundTertiary: '#EEEEEE',

  // Texto
  textPrimary: '#000000',
  textSecondary: '#888888',
  textTertiary: '#999999',
  textLight: '#CCCCCC',

  // Bordes
  borderColor: '#E8E8E8',
  borderColorLight: '#E0E0E0',

  // Mensajes
  messageSentBg: '#DCF8C6',
  messageReceivedBg: '#FFFFFF',
  messageSentText: '#000000',
  messageReceivedText: '#000000',

  // Estado
  statusOnline: '#31a24c',
  statusOffline: '#BBBBBB',

  // Atención
  error: '#DC3545',
  warning: '#FFC107',
  success: '#31a24c',
  info: '#0066CC',

  // Especiales
  inputBg: '#F5F5F5',
  headerBg: '#FFFFFF',
  headerBorder: '#E8E8E8',
};

export const FontSizes = {
  xs: 12,
  sm: 13,
  base: 14,
  lg: 15,
  xl: 16,
  '2xl': 18,
  '3xl': 20,
  '4xl': 24,
  '5xl': 28,
  '6xl': 32,
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  '3xl': 32,
};

export const BorderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  '2xl': 20,
  full: 9999,
};

export const Typography = {
  heading1: {
    fontSize: FontSizes['5xl'],
    fontWeight: '700' as const,
    lineHeight: 36,
  },
  heading2: {
    fontSize: FontSizes['3xl'],
    fontWeight: '700' as const,
    lineHeight: 28,
  },
  heading3: {
    fontSize: FontSizes['2xl'],
    fontWeight: '600' as const,
    lineHeight: 24,
  },
  title: {
    fontSize: FontSizes.xl,
    fontWeight: '600' as const,
    lineHeight: 22,
  },
  body: {
    fontSize: FontSizes.lg,
    fontWeight: '400' as const,
    lineHeight: 20,
  },
  bodySmall: {
    fontSize: FontSizes.sm,
    fontWeight: '400' as const,
    lineHeight: 18,
  },
  caption: {
    fontSize: FontSizes.xs,
    fontWeight: '500' as const,
    lineHeight: 16,
  },
};

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;
