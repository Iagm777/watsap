import { ChatData } from '../types';

/**
 * Servicio para cargar datos del chat desde JSON local
 */

// En Expo/React Native, los archivos en assets no están directamente accesibles
// Usamos un enfoque con require o import directo
const chatDataJSON = require('../../assets/data/chat.json');

/**
 * Carga los datos del chat desde el archivo JSON local
 * @returns Datos del chat con contacto y mensajes
 */
export const loadChatData = async (): Promise<ChatData> => {
  try {
    // En ambiente de desarrollo y web, el require funciona directamente
    const data: ChatData = chatDataJSON;
    
    // Validar que los datos tengan la estructura correcta
    if (!data.contact || !Array.isArray(data.messages)) {
      throw new Error('Formato de datos inválido');
    }

    return data;
  } catch (error) {
    console.error('Error al cargar datos del chat:', error);
    // Retornar datos por defecto en caso de error
    return getDefaultChatData();
  }
};

/**
 * Datos por defecto en caso de error al cargar JSON
 */
const getDefaultChatData = (): ChatData => {
  return {
    contact: {
      id: 'default',
      name: 'Contacto',
      phone: '+34 000 000 000',
      photo: '👤',
      status: 'offline',
      description: 'Usuario',
      isOnline: false,
    },
    messages: [
      {
        id: 1,
        text: 'Error al cargar los datos del chat',
        type: 'received',
        time: '00:00',
        timestamp: Date.now(),
      },
    ],
  };
};

/**
 * Agrega un nuevo mensaje al chat
 * @param newMessage Mensaje a agregar
 * @param currentMessages Mensajes actuales
 * @returns Array de mensajes actualizado
 */
export const addMessageToChat = (
  newMessage: Omit<ChatData['messages'][0], 'id' | 'timestamp'>,
  currentMessages: ChatData['messages']
): ChatData['messages'] => {
  const message: ChatData['messages'][0] = {
    ...newMessage,
    id: currentMessages.length > 0 ? Math.max(...currentMessages.map(m => m.id)) + 1 : 1,
    timestamp: Date.now(),
    status: 'sent',
  };

  return [...currentMessages, message];
};

/**
 * Formatea la hora actual en formato HH:MM p.m./a.m.
 */
export const getCurrentTime = (): string => {
  const now = new Date();
  const hours = now.getHours();
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const period = hours >= 12 ? 'p.m.' : 'a.m.';
  const displayHours = String(hours % 12 || 12).padStart(2, '0');
  return `${displayHours}:${minutes} ${period}`;
};

/**
 * Formatea una timestamp a formato de hora (HH:MM p.m./a.m.)
 */
export const formatTime = (timestamp: number): string => {
  const date = new Date(timestamp);
  const hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const period = hours >= 12 ? 'p.m.' : 'a.m.';
  const displayHours = String(hours % 12 || 12).padStart(2, '0');
  return `${displayHours}:${minutes} ${period}`;
};

/**
 * Obtiene la hora relativa (ej: "hace 5 minutos")
 */
export const getRelativeTime = (timestamp: number): string => {
  const now = Date.now();
  const diff = now - timestamp;
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) return 'ahora';
  if (minutes < 60) return `hace ${minutes} ${minutes === 1 ? 'minuto' : 'minutos'}`;
  if (hours < 24) return `hace ${hours} ${hours === 1 ? 'hora' : 'horas'}`;
  if (days < 7) return `hace ${days} ${days === 1 ? 'día' : 'días'}`;
  
  const date = new Date(timestamp);
  return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
};

/**
 * Guarda los datos del chat en localStorage (para persistencia en web)
 */
export const saveChatDataToStorage = async (data: ChatData): Promise<void> => {
  try {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('chatData', JSON.stringify(data));
    }
  } catch (error) {
    console.error('Error al guardar datos:', error);
  }
};

/**
 * Carga los datos del chat desde localStorage si existen
 */
export const loadChatDataFromStorage = async (): Promise<ChatData | null> => {
  try {
    if (typeof localStorage !== 'undefined') {
      const data = localStorage.getItem('chatData');
      if (data) {
        return JSON.parse(data);
      }
    }
  } catch (error) {
    console.error('Error al cargar datos del storage:', error);
  }
  return null;
};

/**
 * Elimina un mensaje por ID
 */
export const deleteMessage = (
  messages: ChatData['messages'],
  messageId: number
): ChatData['messages'] => {
  return messages.filter(msg => msg.id !== messageId);
};

/**
 * Edita un mensaje existente
 */
export const editMessage = (
  messages: ChatData['messages'],
  messageId: number,
  newText: string,
  newTime: string
): ChatData['messages'] => {
  return messages.map(msg => 
    msg.id === messageId 
      ? { ...msg, text: newText, time: newTime }
      : msg
  );
};
