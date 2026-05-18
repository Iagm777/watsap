import { useState, useCallback } from 'react';
import { ChatData, Contact } from '../types';
import { saveChatDataToStorage } from '../data/chatService';

interface UseEditModeReturn {
  editModeActive: boolean;
  editData: ChatData | null;
  setEditModeActive: (active: boolean) => void;
  setEditData: (data: ChatData) => void;
  saveEditedData: (data: ChatData) => Promise<void>;
  resetEditData: () => void;
}

/**
 * Hook para manejar el modo de edición de mensajes y contacto
 */
export const useEditMode = (initialData: ChatData | null): UseEditModeReturn => {
  const [editModeActive, setEditModeActive] = useState(false);
  const [editData, setEditData] = useState<ChatData | null>(initialData);

  const saveEditedData = useCallback(async (data: ChatData) => {
    try {
      await saveChatDataToStorage(data);
      setEditData(data);
    } catch (error) {
      console.error('Error al guardar datos editados:', error);
    }
  }, []);

  const resetEditData = useCallback(() => {
    setEditData(initialData);
    setEditModeActive(false);
  }, [initialData]);

  return {
    editModeActive,
    editData,
    setEditModeActive,
    setEditData,
    saveEditedData,
    resetEditData,
  };
};
