import React, { useState } from 'react';
import { View } from 'react-native';
import { ConversationScreen } from './src/screens/ConversationScreen';
import { ContactScreen } from './src/screens/ContactScreen';
import { EditScreen } from './src/screens/EditScreen';
import { useChat } from './src/hooks/useChat';
import { useEditMode } from './src/hooks/useEditMode';

/**
 * Componente principal de la aplicación
 * Simula un chat único tipo WhatsApp
 */
export default function App() {
  const [showContactInfo, setShowContactInfo] = useState(false);
  const [showEditMode, setShowEditMode] = useState(false);
  const { chatData, messages, sendMessage } = useChat();
  const { editModeActive, editData, saveEditedData, setEditData } = useEditMode(chatData);

  // Función para guardar datos editados
  const handleSaveEditedData = async (data) => {
    await saveEditedData(data);
    setShowEditMode(false);
    // Recargar la pantalla principal
    window.location.reload();
  };

  return (
    <View style={{ flex: 1 }}>
      {showEditMode ? (
        <EditScreen
          chatData={chatData}
          onSave={handleSaveEditedData}
          onClose={() => setShowEditMode(false)}
        />
      ) : !showContactInfo ? (
        <ConversationScreen
          contact={chatData?.contact || null}
          onContactPress={() => setShowContactInfo(true)}
          onMenuPress={() => setShowEditMode(true)}
        />
      ) : (
        <ContactScreen
          contact={chatData?.contact || null}
          onClose={() => setShowContactInfo(false)}
        />
      )}
    </View>
  );
}
