/**
 * Tipos y modelos principales de la aplicación
 */

export type MessageType = 'sent' | 'received';
export type MediaType = 'image' | 'audio' | 'video' | 'document';

/**
 * Interfaz para mensajes individuales
 */
export interface Message {
  id: number;
  text: string;
  type: MessageType;
  time: string;
  timestamp: number;
  mediaUrl?: string;
  mediaType?: MediaType;
  status?: 'sending' | 'sent' | 'delivered' | 'read';
}

/**
 * Interfaz para información de contacto
 */
export interface Contact {
  id: string;
  name: string;
  phone: string;
  photo: string;
  status: string;
  description: string;
  isOnline: boolean;
  lastSeen?: string;
}

/**
 * Interfaz para un chat completo
 */
export interface Chat {
  id: string;
  contact: Contact;
  messages: Message[];
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
}

/**
 * Interfaz para la estructura del JSON
 */
export interface ChatData {
  contact: Contact;
  messages: Message[];
}
