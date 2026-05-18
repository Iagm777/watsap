import React, { useRef, useEffect } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Text,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { useChat, useMessageInput } from '../hooks/useChat';
import { Contact } from '../types';
import {
  AttachIcon,
  SendIcon,
  MicrophoneMessageIcon,
  BackIcon,
  MenuVerticalIcon,
  SingleCheckIcon,
  DoubleCheckIcon,
  ClipIcon,
  CameraIconNew,
  MicrophoneInputIcon,
  StickersIcon,
} from '../assets/icons/IconComponents';

interface ConversationScreenProps {
  contact: Contact | null;
  onContactPress?: () => void;
  onMenuPress?: () => void;
}

/**
 * Pantalla principal de conversación
 * Muestra el chat individual con todos los mensajes
 */
export const ConversationScreen: React.FC<ConversationScreenProps> = ({
  contact,
  onContactPress,
  onMenuPress,
}) => {
  const flatListRef = useRef<FlatList>(null);
  const { chatData, messages, loading, sendMessage } = useChat();
  const { input, handleInputChange, handleSend } = useMessageInput(sendMessage);

  const displayContact = contact || chatData?.contact;

  useEffect(() => {
    if (messages.length > 0) {
      flatListRef.current?.scrollToEnd({ animated: true });
    }
  }, [messages]);

  const handleSendMessage = () => {
    handleSend();
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  if (loading || !displayContact) {
    return (
      <View style={styles.loadingContainer}>
        <View style={styles.spinnerContainer}>
          <ActivityIndicator size="large" color="#31a24c" />
          <Text style={styles.loadingText}>Cargando chat...</Text>
        </View>
      </View>
    );
  }

  const hasText = input.trim().length > 0;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.headerContentTouchable}
          onPress={onContactPress}
          activeOpacity={0.7}
        >
          <View style={styles.headerContent}>
            <Text style={styles.avatar}>{displayContact.photo}</Text>
            <View style={styles.headerInfo}>
              <Text style={styles.headerTitle}>{displayContact.name}</Text>
              <Text style={styles.headerSubtitle}>
                {displayContact.isOnline ? '🟢 en línea' : `🔘 ${displayContact.lastSeen}`}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={onMenuPress}
          activeOpacity={0.7}
          style={styles.menuButton}
        >
          <MenuVerticalIcon size={24} color="#333333" />
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        {/* Mensajes */}
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={({ item }) => (
            <View
              style={[
                styles.messageRow,
                item.type === 'sent' ? styles.sentRow : styles.receivedRow,
              ]}
            >
              <View
                style={[
                  styles.messageBubble,
                  item.type === 'sent' ? styles.messageSent : styles.messageReceived,
                ]}
              >
                <Text style={styles.messageText}>{item.text}</Text>
                <View style={styles.messageFooter}>
                  <Text style={styles.messageTime}>{item.time}</Text>
                  {item.type === 'sent' && (
                    <View style={styles.checkContainer}>
                      {item.status === 'read' ? (
                        <DoubleCheckIcon size={18} />
                      ) : (
                        <SingleCheckIcon size={16} color="#888888" />
                      )}
                    </View>
                  )}
                </View>
              </View>
            </View>
          )}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.messagesList}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
        />

        {/* Input de mensaje */}
        <View style={styles.inputContainer}>
          {/* Input wrapper con emoji, clip y cámara dentro */}
          <View style={styles.inputWrapper}>
            {/* Emoji a la izquierda */}
            <TouchableOpacity style={styles.emojiInsideButton} activeOpacity={0.7}>
              <StickersIcon size={24} color="#888888" />
            </TouchableOpacity>

            {/* Input de texto */}
            <TextInput
              style={styles.input}
              placeholder="Escribe un mensaje..."
              placeholderTextColor="#666666"
              value={input}
              onChangeText={handleInputChange}
              multiline
              maxLength={1000}
              selectionColor="#31a24c"
            />

            {/* Clip a la derecha, antes de cámara */}
            <TouchableOpacity style={styles.clipInsideButton} activeOpacity={0.7}>
              <ClipIcon size={24} color="#888888" />
            </TouchableOpacity>

            {/* Cámara a la derecha */}
            <TouchableOpacity style={styles.stickersInsideButton} activeOpacity={0.7}>
              <CameraIconNew size={24} color="#888888" />
            </TouchableOpacity>
          </View>

          {/* Botón Micrófono/Enviar - Redondo grande */}
          <TouchableOpacity
            style={[styles.microphoneButton, !hasText && styles.microphoneButtonInactive]}
            onPress={handleSendMessage}
            disabled={!hasText}
            activeOpacity={0.7}
          >
            {hasText ? (
              <SendIcon size={28} color="#FFFFFF" />
            ) : (
              <MicrophoneInputIcon size={28} color="#FFFFFF" />
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0A',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#2A2A2A',
    minHeight: 56,
    backgroundColor: '#1A1A1A',
  },
  headerContentTouchable: {
    flex: 1,
    paddingRight: 8,
  },
  headerContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    fontSize: 40,
    marginRight: 12,
  },
  headerInfo: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  headerSubtitle: {
    fontSize: 13,
    color: '#888888',
    marginTop: 2,
  },
  menuIcon: {
    fontSize: 20,
    color: '#FFFFFF',
    paddingLeft: 8,
  },
  menuButton: {
    padding: 8,
    paddingRight: 0,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  messagesList: {
    flexGrow: 1,
    paddingTop: 8,
    paddingBottom: 8,
    paddingHorizontal: 8,
  },
  messageRow: {
    paddingVertical: 2,
    marginVertical: 2,
  },
  sentRow: {
    alignItems: 'flex-end',
    paddingRight: 4,
  },
  receivedRow: {
    alignItems: 'flex-start',
    paddingLeft: 4,
  },
  messageBubble: {
    borderRadius: 18,
    paddingHorizontal: 12,
    paddingVertical: 8,
    maxWidth: '85%',
  },
  messageSent: {
    backgroundColor: '#31a24c',
  },
  messageReceived: {
    backgroundColor: '#2A2A2A',
  },
  messageText: {
    fontSize: 15,
    color: '#FFFFFF',
    lineHeight: 20,
    marginBottom: 4,
  },
  messageFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  messageTime: {
    fontSize: 12,
    color: '#AAAAAA',
  },
  checkContainer: {
    marginLeft: 6,
  },
  statusIcon: {
    fontSize: 11,
    color: '#53BDEB',
    marginLeft: 4,
  },
  inputContainer: {
    backgroundColor: '#0A0A0A',
    borderTopWidth: 1,
    borderTopColor: '#2A2A2A',
    paddingHorizontal: 8,
    paddingVertical: 8,
    paddingBottom: Platform.OS === 'ios' ? 24 : 8,
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 8,
  },
  clipButton: {
    display: 'none',
  },
  cameraButton: {
    display: 'none',
  },
  inputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    borderWidth: 1,
    borderColor: '#2A2A2A',
    borderRadius: 24,
    paddingHorizontal: 12,
    minHeight: 40,
    gap: 8,
  },
  emojiInsideButton: {
    padding: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  clipInsideButton: {
    padding: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stickersInsideButton: {
    padding: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sideButton: {
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  attachButton: {
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  attachIcon: {
    fontSize: 20,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: '#FFFFFF',
    paddingVertical: 10,
    maxHeight: 100,
    minHeight: 40,
  },
  microphoneButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#31a24c',
    justifyContent: 'center',
    alignItems: 'center',
  },
  microphoneButtonInactive: {
    backgroundColor: '#31a24c',
    opacity: 0.6,
  },
  sendButton: {
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#31a24c',
    borderRadius: 20,
    width: 36,
    height: 36,
  },
  sendButtonDisabled: {
    opacity: 0.6,
  },
  toolbarContainer: {
    display: 'none',
  },
  toolbarButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
  },
  sendIcon: {
    fontSize: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0A0A0A',
  },
  spinnerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#888888',
    marginTop: 12,
  },
});
