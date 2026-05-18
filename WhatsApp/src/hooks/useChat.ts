import { useState, useEffect, useCallback } from 'react';
import { ChatData, Message } from '../types';
import { loadChatData, addMessageToChat, getCurrentTime, loadChatDataFromStorage } from '../data/chatService';

/**
 * Hook principal para gestionar el estado del chat
 * Carga datos, maneja mensajes y actualiza la UI
 */
export const useChat = () => {
  const [chatData, setChatData] = useState<ChatData | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Cargar datos del chat al montar el componente
  useEffect(() => {
    const initializeChatData = async () => {
      try {
        setLoading(true);
        // Primero intentar cargar desde storage (datos guardados)
        const storedData = await loadChatDataFromStorage();
        
        if (storedData) {
          setChatData(storedData);
          setMessages(storedData.messages);
        } else {
          // Si no hay datos guardados, cargar del JSON
          const data = await loadChatData();
          setChatData(data);
          setMessages(data.messages);
        }
        setError(null);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Error al cargar el chat';
        setError(errorMessage);
        console.error(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    initializeChatData();
  }, []);

  // Agregar un nuevo mensaje
  const sendMessage = useCallback((text: string) => {
    if (!text.trim() || !chatData) return;

    const newMessage: Omit<Message, 'id' | 'timestamp'> = {
      text: text.trim(),
      type: 'sent',
      time: getCurrentTime(),
      status: 'sent',
    };

    const updatedMessages = addMessageToChat(newMessage, messages);
    setMessages(updatedMessages);
  }, [messages, chatData]);

  // Marcar un mensaje como leído (simulación)
  const markAsRead = useCallback((messageId: number) => {
    setMessages(prevMessages =>
      prevMessages.map(msg =>
        msg.id === messageId ? { ...msg, status: 'read' } : msg
      )
    );
  }, []);

  return {
    chatData,
    messages,
    loading,
    error,
    sendMessage,
    markAsRead,
  };
};

/**
 * Hook para gestionar el estado de escritura en el input
 */
export const useMessageInput = (onSend: (text: string) => void) => {
  const [input, setInput] = useState<string>('');
  const [isComposing, setIsComposing] = useState<boolean>(false);

  const handleSend = useCallback(() => {
    if (input.trim()) {
      onSend(input);
      setInput('');
    }
  }, [input, onSend]);

  const handleInputChange = useCallback((text: string) => {
    setInput(text);
  }, []);

  return {
    input,
    isComposing,
    setIsComposing,
    handleInputChange,
    handleSend,
  };
};

/**
 * Hook para gestionar la posición de scroll automático
 */
export const useAutoScroll = () => {
  const [shouldAutoScroll, setShouldAutoScroll] = useState<boolean>(true);
  const [scrollOffset, setScrollOffset] = useState<number>(0);

  const handleScroll = useCallback(
    (event: any) => {
      const contentSize = event.nativeEvent.contentSize.height;
      const layoutSize = event.nativeEvent.layoutMeasurement.height;
      const offset = event.nativeEvent.contentOffset.y;

      // Si el usuario está cerca del final, habilitar auto-scroll
      const isNearBottom = offset > contentSize - layoutSize - 50;
      setShouldAutoScroll(isNearBottom);
      setScrollOffset(offset);
    },
    []
  );

  return {
    shouldAutoScroll,
    scrollOffset,
    handleScroll,
  };
};
