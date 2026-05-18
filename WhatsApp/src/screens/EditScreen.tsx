import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  SectionList,
  Switch,
} from 'react-native';
import { ChatData, Message } from '../types';
import { deleteMessage, editMessage, getCurrentTime } from '../data/chatService';
import {
  BackIcon,
  TrashIcon,
  EditIcon,
} from '../assets/icons/IconComponents';

interface EditScreenProps {
  chatData: ChatData | null;
  onSave: (data: ChatData) => Promise<void>;
  onClose: () => void;
}

/**
 * Pantalla completa de edición de mensajes y contacto
 */
export const EditScreen: React.FC<EditScreenProps> = ({
  chatData,
  onSave,
  onClose,
}) => {
  const [contact, setContact] = useState(chatData?.contact || null);
  const [messages, setMessages] = useState<Message[]>(chatData?.messages || []);
  const [editingMessageId, setEditingMessageId] = useState<number | null>(null);
  const [editingText, setEditingText] = useState('');
  const [editingTime, setEditingTime] = useState('');
  const [newMessageText, setNewMessageText] = useState('');
  const [newMessageType, setNewMessageType] = useState<'sent' | 'received'>('sent');
  const [saving, setSaving] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);

  if (!chatData || !contact) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Error: No hay datos disponibles</Text>
      </View>
    );
  }

  const handleEditMessage = (message: Message) => {
    setEditingMessageId(message.id);
    setEditingText(message.text);
    setEditingTime(message.time);
  };

  const handleSaveMessageEdit = () => {
    if (editingMessageId === null) return;
    if (!editingText.trim()) {
      console.warn('El mensaje no puede estar vacío');
      return;
    }

    const updatedMessages = editMessage(
      messages,
      editingMessageId,
      editingText,
      editingTime
    );
    setMessages(updatedMessages);
    setEditingMessageId(null);
    setEditingText('');
    setEditingTime('');
  };

  const handleCancelEdit = () => {
    setEditingMessageId(null);
    setEditingText('');
    setEditingTime('');
  };

  const handleDeleteMessage = (messageId: number) => {
    setDeleteConfirmId(messageId);
  };

  const confirmDelete = () => {
    if (deleteConfirmId !== null) {
      const updatedMessages = deleteMessage(messages, deleteConfirmId);
      setMessages(updatedMessages);
      setDeleteConfirmId(null);
    }
  };

  const cancelDelete = () => {
    setDeleteConfirmId(null);
  };

  const handleAddMessage = () => {
    if (!newMessageText.trim()) {
      console.warn('El mensaje no puede estar vacío');
      return;
    }

    const newMessage: Message = {
      id: messages.length > 0 ? Math.max(...messages.map(m => m.id)) + 1 : 1,
      text: newMessageText,
      type: newMessageType,
      time: getCurrentTime(),
      timestamp: Date.now(),
      status: 'sent',
    };

    setMessages([...messages, newMessage]);
    setNewMessageText('');
  };

  const handleSaveAll = async () => {
    setSaving(true);
    try {
      const updatedData: ChatData = {
        contact,
        messages,
      };
      await onSave(updatedData);
      setTimeout(() => {
        onClose();
      }, 300);
    } catch (error) {
      console.error('Error al guardar:', error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onClose} style={styles.headerIconButton}>
          <BackIcon size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Modo Edición</Text>
        <TouchableOpacity onPress={handleSaveAll} disabled={saving} style={styles.headerIconButton}>
          <Text style={[styles.headerButton, styles.saveButton]}>
            {saving ? '...' : '✓'}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {/* Sección de Contacto */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>✏️ Editar Contacto</Text>

          <View style={styles.field}>
            <Text style={styles.label}>Nombre</Text>
            <TextInput
              style={styles.input}
              value={contact.name}
              onChangeText={(text) => setContact({ ...contact, name: text })}
              placeholder="Nombre del contacto"
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Teléfono</Text>
            <TextInput
              style={styles.input}
              value={contact.phone}
              onChangeText={(text) => setContact({ ...contact, phone: text })}
              placeholder="Número de teléfono"
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Descripción</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={contact.description}
              onChangeText={(text) => setContact({ ...contact, description: text })}
              placeholder="Descripción del contacto"
              multiline
              numberOfLines={3}
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Estado/Mensaje de Estado</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={contact.status}
              onChangeText={(text) => setContact({ ...contact, status: text })}
              placeholder="Estado del contacto"
              multiline
              numberOfLines={2}
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Foto (Emoji)</Text>
            <TextInput
              style={styles.input}
              value={contact.photo}
              onChangeText={(text) => setContact({ ...contact, photo: text })}
              placeholder="👤"
              maxLength={2}
            />
          </View>

          <View style={styles.switchField}>
            <Text style={styles.label}>En línea</Text>
            <Switch
              value={contact.isOnline}
              onValueChange={(value) => setContact({ ...contact, isOnline: value })}
              trackColor={{ false: '#E8E8E8', true: '#81C784' }}
              thumbColor={contact.isOnline ? '#31a24c' : '#888'}
            />
          </View>

          {!contact.isOnline && (
            <View style={styles.field}>
              <Text style={styles.label}>Última vez visto</Text>
              <TextInput
                style={styles.input}
                value={contact.lastSeen}
                onChangeText={(text) => setContact({ ...contact, lastSeen: text })}
                placeholder="hace 5 minutos"
              />
            </View>
          )}
        </View>

        {/* Sección de Agregar Mensaje */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>➕ Agregar Mensaje</Text>

          <View style={styles.field}>
            <Text style={styles.label}>Texto del mensaje</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={newMessageText}
              onChangeText={setNewMessageText}
              placeholder="Escribe el mensaje..."
              multiline
              numberOfLines={3}
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Tipo de mensaje</Text>
            <View style={styles.messageTypeButtons}>
              <TouchableOpacity
                style={[
                  styles.typeButton,
                  newMessageType === 'sent' && styles.typeButtonActive,
                ]}
                onPress={() => setNewMessageType('sent')}
              >
                <Text
                  style={[
                    styles.typeButtonText,
                    newMessageType === 'sent' && styles.typeButtonTextActive,
                  ]}
                >
                  📤 Enviado
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.typeButton,
                  newMessageType === 'received' && styles.typeButtonActive,
                ]}
                onPress={() => setNewMessageType('received')}
              >
                <Text
                  style={[
                    styles.typeButtonText,
                    newMessageType === 'received' && styles.typeButtonTextActive,
                  ]}
                >
                  📥 Recibido
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            style={styles.addButton}
            onPress={handleAddMessage}
          >
            <Text style={styles.addButtonText}>Agregar Mensaje</Text>
          </TouchableOpacity>
        </View>

        {/* Sección de Mensajes */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📝 Editar Mensajes ({messages.length})</Text>

          {messages.length === 0 ? (
            <Text style={styles.emptyText}>No hay mensajes</Text>
          ) : (
            messages.map((message) => (
              <View key={message.id} style={styles.messageCard}>
                {editingMessageId === message.id ? (
                  // Modo edición
                  <View>
                    <TextInput
                      style={[styles.input, styles.textArea]}
                      value={editingText}
                      onChangeText={setEditingText}
                      multiline
                      numberOfLines={3}
                    />
                    <TextInput
                      style={styles.input}
                      value={editingTime}
                      onChangeText={setEditingTime}
                      placeholder="HH:MM"
                    />
                    <View style={styles.messageActions}>
                      <TouchableOpacity
                        style={[styles.actionButton, styles.saveButton]}
                        onPress={handleSaveMessageEdit}
                      >
                        <Text style={styles.actionButtonText}>✓ Guardar</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={[styles.actionButton, styles.cancelButton]}
                        onPress={handleCancelEdit}
                      >
                        <Text style={styles.actionButtonText}>✕ Cancelar</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ) : (
                  // Vista normal
                  <View>
                    <View style={styles.messageHeader}>
                      <Text style={styles.messageType}>
                        {message.type === 'sent' ? '📤' : '📥'} {message.type}
                      </Text>
                      <Text style={styles.messageTime}>{message.time}</Text>
                    </View>
                    <Text style={styles.messageContent}>{message.text}</Text>
                    <View style={styles.messageActions}>
                      <TouchableOpacity
                        style={[styles.actionButton, styles.editButton]}
                        onPress={() => handleEditMessage(message)}
                      >
                        <EditIcon size={18} color="#FFFFFF" />
                        <Text style={styles.actionButtonText}>Editar</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={[styles.actionButton, styles.deleteButton]}
                        onPress={() => handleDeleteMessage(message.id)}
                      >
                        <TrashIcon size={18} color="#FFFFFF" />
                        <Text style={styles.actionButtonText}>Eliminar</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              </View>
            ))
          )}
        </View>

        <View style={styles.bottomSpace} />
      </ScrollView>

      {/* Modal de confirmación de eliminación */}
      {deleteConfirmId !== null && (
        <View style={styles.modalOverlay}>
          <View style={styles.confirmModal}>
            <Text style={styles.confirmTitle}>Eliminar mensaje</Text>
            <Text style={styles.confirmText}>¿Estás seguro de que deseas eliminar este mensaje?</Text>
            <View style={styles.confirmButtons}>
              <TouchableOpacity style={[styles.confirmButton, styles.cancelButtonConfirm]} onPress={cancelDelete}>
                <Text style={styles.confirmButtonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.confirmButton, styles.deleteButtonConfirm]} onPress={confirmDelete}>
                <Text style={[styles.confirmButtonText, styles.deleteButtonConfirmText]}>Eliminar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#31a24c',
    borderBottomWidth: 1,
    borderBottomColor: '#E8E8E8',
  },
  headerButton: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  saveButton: {
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  section: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E8E8E8',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#31a24c',
    marginBottom: 16,
  },
  field: {
    marginBottom: 16,
  },
  switchField: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: '#000000',
    backgroundColor: '#F9F9F9',
  },
  textArea: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  messageTypeButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  typeButton: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    backgroundColor: '#F9F9F9',
    alignItems: 'center',
  },
  typeButtonActive: {
    backgroundColor: '#31a24c',
    borderColor: '#31a24c',
  },
  typeButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666666',
  },
  typeButtonTextActive: {
    color: '#FFFFFF',
  },
  addButton: {
    backgroundColor: '#31a24c',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  messageCard: {
    backgroundColor: '#F9F9F9',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E8E8E8',
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  messageType: {
    fontSize: 13,
    fontWeight: '600',
    color: '#31a24c',
  },
  messageTime: {
    fontSize: 12,
    color: '#999999',
  },
  messageContent: {
    fontSize: 14,
    color: '#000000',
    marginBottom: 8,
    lineHeight: 20,
  },
  messageActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderRadius: 6,
    alignItems: 'center',
  },
  editButton: {
    backgroundColor: '#FFC107',
  },
  deleteButton: {
    backgroundColor: '#DC3545',
  },
  cancelButton: {
    backgroundColor: '#999999',
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  emptyText: {
    fontSize: 14,
    color: '#999999',
    textAlign: 'center',
    paddingVertical: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#DC3545',
    textAlign: 'center',
    marginTop: 20,
  },
  bottomSpace: {
    height: 20,
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  confirmModal: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    width: '80%',
    maxWidth: 300,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  confirmTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 8,
  },
  confirmText: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 20,
    lineHeight: 20,
  },
  confirmButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  confirmButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButtonConfirm: {
    backgroundColor: '#E8E8E8',
  },
  deleteButtonConfirm: {
    backgroundColor: '#DC3545',
  },
  confirmButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000000',
  },
  deleteButtonConfirmText: {
    color: '#FFFFFF',
  },
});
