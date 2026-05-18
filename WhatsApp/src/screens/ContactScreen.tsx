import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Text,
  TouchableOpacity,
  Switch,
  Modal,
  TextInput,
} from 'react-native';
import { Contact } from '../types';
import {
  BackIcon,
  MenuVerticalIcon,
  TrashIcon,
  EditIcon,
  VideoCallIcon,
  PhoneIcon,
  SearchIcon,
  AvatarIcon,
} from '../assets/icons/IconComponents';

interface ContactScreenProps {
  contact: Contact | null;
  onClose?: () => void;
}

interface MediaFile {
  id: string;
  type: 'audio' | 'image' | 'video' | 'document';
  name: string;
  duration?: string;
  preview?: string;
}

interface Group {
  id: string;
  name: string;
  membersCount: number;
  icon: string;
}

/**
 * Pantalla de información del contacto
 * Muestra detalles del contacto con opciones de configuración
 */
export const ContactScreen: React.FC<ContactScreenProps> = ({
  contact,
  onClose,
}) => {
  const [restrictChat, setRestrictChat] = React.useState(false);
  const [translateMessages, setTranslateMessages] = React.useState(false);
  const [showMenuModal, setShowMenuModal] = React.useState(false);
  const [editingFiles, setEditingFiles] = React.useState(false);
  const [editingGroups, setEditingGroups] = React.useState(false);
  const [newFileName, setNewFileName] = React.useState('');
  const [newGroupName, setNewGroupName] = React.useState('');
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const [mediaFiles, setMediaFiles] = React.useState<MediaFile[]>([
    { id: '1', type: 'audio', name: 'Audio_1', duration: '0:52' },
    { id: '2', type: 'audio', name: 'Audio_2', duration: '1:00' },
  ]);

  const [groups, setGroups] = React.useState<Group[]>([
    { id: '1', name: 'Viaje', membersCount: 4, icon: '✈️' },
    { id: '2', name: 'Trabajo', membersCount: 8, icon: '💼' },
    { id: '3', name: 'Familia', membersCount: 6, icon: '👨‍👩‍👧‍👦' },
  ]);

  const handleAddFile = () => {
    if (newFileName.trim()) {
      const newFile: MediaFile = {
        id: String(Date.now()),
        type: 'audio',
        name: newFileName,
        duration: '0:00',
      };
      setMediaFiles([...mediaFiles, newFile]);
      setNewFileName('');
    }
  };

  const handleFileSelect = (event: any) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      const fileType = file.type.startsWith('image')
        ? 'image'
        : file.type.startsWith('video')
        ? 'video'
        : 'document';

      reader.onload = (e) => {
        const newFile: MediaFile = {
          id: String(Date.now()),
          type: fileType,
          name: file.name,
          preview: e.target?.result as string,
          duration: fileType === 'video' ? '0:00' : undefined,
        };
        setMediaFiles([...mediaFiles, newFile]);
      };
      reader.readAsDataURL(file);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleDeleteFile = (id: string) => {
    setMediaFiles(mediaFiles.filter((f) => f.id !== id));
  };

  const handleAddGroup = () => {
    if (newGroupName.trim()) {
      const newGroup: Group = {
        id: String(Date.now()),
        name: newGroupName,
        membersCount: 1,
        icon: '👥',
      };
      setGroups([...groups, newGroup]);
      setNewGroupName('');
    }
  };

  const handleDeleteGroup = (id: string) => {
    setGroups(groups.filter((g) => g.id !== id));
  };

  if (!contact) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Contacto no disponible</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (editingFiles) {
    return (
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => setEditingFiles(false)}
            style={styles.backButton}
          >
            <BackIcon size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Editar Archivos</Text>
          <View style={styles.menuButton} />
        </View>

        <ScrollView style={styles.content}>
          {/* Agregar archivo */}
          <View style={styles.editSection}>
            <Text style={styles.editSectionTitle}>➕ Agregar archivo</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.textInput}
                placeholder="Nombre del archivo..."
                placeholderTextColor="#666"
                value={newFileName}
                onChangeText={setNewFileName}
              />
              <TouchableOpacity
                style={styles.addButton}
                onPress={handleAddFile}
              >
                <Text style={styles.addButtonText}>Agregar</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={[styles.addButton, styles.uploadButton]}
              onPress={() => fileInputRef.current?.click()}
            >
              <Text style={styles.addButtonText}>📤 Subir desde dispositivo</Text>
            </TouchableOpacity>
            <input
              ref={fileInputRef as any}
              type="file"
              accept="image/*,video/*"
              onChange={handleFileSelect}
              style={{ display: 'none' }}
            />
          </View>

          {/* Lista de archivos */}
          <View style={styles.editSection}>
            <Text style={styles.editSectionTitle}>📁 Archivos ({mediaFiles.length})</Text>
            {mediaFiles.map((file) => (
              <View key={file.id}>
                {file.preview ? (
                  <View style={styles.filePreviewContainer}>
                    {file.type === 'image' && (
                      <img
                        src={file.preview}
                        style={styles.filePreview}
                        alt={file.name}
                      />
                    )}
                    {file.type === 'video' && (
                      <video
                        src={file.preview}
                        style={styles.filePreview}
                      />
                    )}
                    <TouchableOpacity
                      style={styles.deletePreviewButton}
                      onPress={() => handleDeleteFile(file.id)}
                    >
                      <TrashIcon size={20} />
                    </TouchableOpacity>
                    <Text style={styles.previewFileName}>{file.name}</Text>
                  </View>
                ) : (
                  <View style={styles.fileItem}>
                    <View style={styles.fileInfo}>
                      <Text style={styles.fileIcon}>
                        {file.type === 'audio'
                          ? '🎵'
                          : file.type === 'image'
                          ? '🖼️'
                          : file.type === 'video'
                          ? '🎬'
                          : '📄'}
                      </Text>
                      <View>
                        <Text style={styles.fileName}>{file.name}</Text>
                        {file.duration && (
                          <Text style={styles.fileDuration}>{file.duration}</Text>
                        )}
                      </View>
                    </View>
                    <TouchableOpacity
                      style={styles.deleteIconButton}
                      onPress={() => handleDeleteFile(file.id)}
                    >
                      <TrashIcon size={20} />
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            ))}
          </View>

          <View style={styles.bottomSpace} />
        </ScrollView>
      </SafeAreaView>
    );
  }

  if (editingGroups) {
    return (
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => setEditingGroups(false)}
            style={styles.backButton}
          >
            <BackIcon size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Editar Grupos</Text>
          <View style={styles.menuButton} />
        </View>

        <ScrollView style={styles.content}>
          {/* Agregar grupo */}
          <View style={styles.editSection}>
            <Text style={styles.editSectionTitle}>➕ Agregar grupo</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.textInput}
                placeholder="Nombre del grupo..."
                placeholderTextColor="#666"
                value={newGroupName}
                onChangeText={setNewGroupName}
              />
              <TouchableOpacity
                style={styles.addButton}
                onPress={handleAddGroup}
              >
                <Text style={styles.addButtonText}>Agregar</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Lista de grupos */}
          <View style={styles.editSection}>
            <Text style={styles.editSectionTitle}>👥 Grupos ({groups.length})</Text>
            {groups.map((group) => (
              <View key={group.id} style={styles.groupItemEdit}>
                <View style={styles.groupInfo}>
                  <Text style={styles.groupIconEdit}>{group.icon}</Text>
                  <View>
                    <Text style={styles.groupNameEdit}>{group.name}</Text>
                    <Text style={styles.groupMembersEdit}>
                      {group.membersCount} miembro{group.membersCount !== 1 ? 's' : ''}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  style={styles.deleteIconButton}
                  onPress={() => handleDeleteGroup(group.id)}
                >
                  <TrashIcon size={20} />
                </TouchableOpacity>
              </View>
            ))}
          </View>

          <View style={styles.bottomSpace} />
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onClose} style={styles.backButton}>
          <BackIcon size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Información del contacto</Text>
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => setShowMenuModal(true)}
        >
          <MenuVerticalIcon size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Sección de Perfil */}
        <View style={styles.profileSection}>
          {/* Avatar Grande */}
          <View style={styles.largeAvatarContainer}>
            <AvatarIcon size={140} color="#F79AA3" />
          </View>

          {/* Nombre y Teléfono */}
          <Text style={styles.contactName}>{contact.name}</Text>
          <Text style={styles.contactPhone}>{contact.phone}</Text>

          {/* Botones de Acciones */}
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.actionButton}>
              <PhoneIcon size={24} />
              <Text style={styles.actionButtonLabel}>Llamar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <VideoCallIcon size={24} />
              <Text style={styles.actionButtonLabel}>Video</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <SearchIcon size={24} />
              <Text style={styles.actionButtonLabel}>Buscar</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Sección de Archivos */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>📁 Archivos, enlaces y docs.</Text>
            <Text style={styles.sectionCount}>559</Text>
          </View>
          <View style={styles.mediaPreviews}>
            <View style={styles.mediaPreview}>
              <Text style={styles.mediaIcon}>🎵</Text>
              <Text style={styles.mediaDuration}>0:52</Text>
            </View>
            <View style={styles.mediaPreview}>
              <Text style={styles.mediaIcon}>🎵</Text>
              <Text style={styles.mediaDuration}>1:00</Text>
            </View>
            <View style={[styles.mediaPreview, styles.moreMedia]}>
              <Text style={styles.moreMediaText}>+557</Text>
            </View>
          </View>
        </View>

        {/* Sección de Información del Contacto */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>ℹ️ Información del contacto</Text>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Último visto</Text>
            <Text style={styles.infoValue}>
              {contact.isOnline ? '🟢 En línea' : `🔘 ${contact.lastSeen}`}
            </Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Estado</Text>
            <Text style={styles.infoValue}>{contact.status}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Descripción</Text>
            <Text style={styles.infoValue}>{contact.description}</Text>
          </View>
        </View>

        {/* Sección de Configuración de Chat */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>⚙️ Configuración del chat</Text>

          <TouchableOpacity style={styles.settingRow}>
            <View style={styles.settingContent}>
              <Text style={styles.settingLabel}>🕐 Mensajes temporales</Text>
              <Text style={styles.settingDescription}>Desactivados</Text>
            </View>
          </TouchableOpacity>

          <View style={styles.divider} />

          <View style={styles.settingRow}>
            <View style={styles.settingContent}>
              <Text style={styles.settingLabel}>🚫 Restringir chat</Text>
              <Text style={styles.settingDescription}>
                Restringe y oculta este chat en este dispositivo.
              </Text>
            </View>
            <Switch
              value={restrictChat}
              onValueChange={setRestrictChat}
              trackColor={{ false: '#404040', true: '#81C784' }}
              thumbColor={restrictChat ? '#31a24c' : '#888'}
            />
          </View>

          <View style={styles.divider} />

          <TouchableOpacity style={styles.settingRow}>
            <View style={styles.settingContent}>
              <Text style={styles.settingLabel}>🔒 Privacidad avanzada del chat</Text>
              <Text style={styles.settingDescription}>Desactivada</Text>
            </View>
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity style={styles.settingRow}>
            <View style={styles.settingContent}>
              <Text style={styles.settingLabel}>📝 Transcripciones</Text>
              <Text style={styles.settingDescription}>Español</Text>
            </View>
          </TouchableOpacity>

          <View style={styles.divider} />

          <View style={styles.settingRow}>
            <View style={styles.settingContent}>
              <Text style={styles.settingLabel}>🌐 Traducir mensajes</Text>
            </View>
            <Switch
              value={translateMessages}
              onValueChange={setTranslateMessages}
              trackColor={{ false: '#404040', true: '#81C784' }}
              thumbColor={translateMessages ? '#31a24c' : '#888'}
            />
          </View>
        </View>

        {/* Sección de Grupos en Común */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>👥 7 grupos en común</Text>

          <TouchableOpacity style={styles.groupOption}>
            <View style={[styles.groupIconCircle, { backgroundColor: '#31a24c' }]}>
              <Text style={styles.groupIcon}>👥</Text>
            </View>
            <View style={styles.groupContent}>
              <Text style={styles.groupLabel}>Crear grupo con {contact.name}</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.groupOption}>
            <View style={[styles.groupIconCircle, { backgroundColor: '#31a24c' }]}>
              <Text style={styles.groupIcon}>➕</Text>
            </View>
            <View style={styles.groupContent}>
              <Text style={styles.groupLabel}>Añadir a grupos</Text>
              <Text style={styles.groupDescription}>
                Añade este contacto a los grupos a los que perteneces.
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.groupOption}>
            <View style={[styles.groupIconCircle, { backgroundColor: '#CD7F32' }]}>
              <Text style={styles.groupIcon}>✈️</Text>
            </View>
            <View style={styles.groupContent}>
              <Text style={styles.groupLabel}>Viaje</Text>
              <Text style={styles.groupDescription}>3 miembros más</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.groupOption}>
            <View style={[styles.groupIconCircle, { backgroundColor: '#8B4513' }]}>
              <Text style={styles.groupIcon}>🏠</Text>
            </View>
            <View style={styles.groupContent}>
              <Text style={styles.groupLabel}>left</Text>
              <Text style={styles.groupDescription}>3 miembros más</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Sección de Acciones Destructivas */}
        <View style={styles.section}>
          <TouchableOpacity style={styles.dangerButton}>
            <Text style={styles.dangerButtonText}>🚫 Bloquear contacto</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.dangerButton, styles.deleteButton]}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
              <TrashIcon size={18} color="#FF6B6B" />
              <Text style={{ ...styles.dangerButtonText, marginLeft: 8 }}>Eliminar contacto</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.bottomSpace} />
      </ScrollView>

      {/* Modal del Menú */}
      <Modal
        transparent
        visible={showMenuModal}
        onRequestClose={() => setShowMenuModal(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowMenuModal(false)}
        >
          <View style={styles.menuModalContent}>
            <TouchableOpacity
              style={styles.menuOption}
              onPress={() => {
                setShowMenuModal(false);
                setEditingFiles(true);
              }}
            >
              <Text style={styles.menuOptionIcon}>📁</Text>
              <Text style={styles.menuOptionText}>Editar archivos</Text>
            </TouchableOpacity>

            <View style={styles.menuDivider} />

            <TouchableOpacity
              style={styles.menuOption}
              onPress={() => {
                setShowMenuModal(false);
                setEditingGroups(true);
              }}
            >
              <Text style={styles.menuOptionIcon}>👥</Text>
              <Text style={styles.menuOptionText}>Editar grupos</Text>
            </TouchableOpacity>

            <View style={styles.menuDivider} />

            <TouchableOpacity
              style={styles.menuOption}
              onPress={() => setShowMenuModal(false)}
            >
              <Text style={styles.menuOptionIcon}>📋</Text>
              <Text style={styles.menuOptionText}>Ver historial</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
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
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#1A1A1A',
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  menuButton: {
    padding: 8,
  },
  menuText: {
    fontSize: 20,
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: 24,
    backgroundColor: '#1A1A1A',
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
  },
  largeAvatarContainer: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: '#5A1D52',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  largeAvatar: {
    fontSize: 80,
  },
  contactName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  contactPhone: {
    fontSize: 16,
    color: '#888888',
    marginBottom: 20,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 16,
    width: '100%',
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#2A2A2A',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#404040',
  },
  actionButtonIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  actionButtonLabel: {
    fontSize: 12,
    color: '#CCCCCC',
    fontWeight: '500',
  },
  section: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  sectionCount: {
    fontSize: 14,
    color: '#31a24c',
    fontWeight: '600',
  },
  mediaPreviews: {
    flexDirection: 'row',
    gap: 8,
  },
  mediaPreview: {
    width: 90,
    height: 90,
    borderRadius: 8,
    backgroundColor: '#2A2A2A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mediaIcon: {
    fontSize: 40,
    marginBottom: 4,
  },
  mediaDuration: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  moreMedia: {
    backgroundColor: '#333333',
  },
  moreMediaText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  infoRow: {
    marginBottom: 16,
  },
  infoLabel: {
    fontSize: 12,
    color: '#888888',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  settingContent: {
    flex: 1,
  },
  settingLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  settingDescription: {
    fontSize: 12,
    color: '#888888',
  },
  divider: {
    height: 1,
    backgroundColor: '#333333',
    marginVertical: 8,
  },
  groupOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  groupIconCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#2A2A2A',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  groupIcon: {
    fontSize: 24,
  },
  groupContent: {
    flex: 1,
  },
  groupLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  groupDescription: {
    fontSize: 12,
    color: '#888888',
  },
  dangerButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#2A2A2A',
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#404040',
  },
  deleteButton: {
    backgroundColor: '#3D2A2A',
    borderColor: '#5C3333',
  },
  dangerButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FF6B6B',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: '#888888',
  },
  bottomSpace: {
    height: 20,
  },
  // Estilos para Modal del Menú
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  menuModalContent: {
    backgroundColor: '#1A1A1A',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#333333',
  },
  menuOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
  menuOptionIcon: {
    fontSize: 24,
    marginRight: 16,
  },
  menuOptionText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  menuDivider: {
    height: 1,
    backgroundColor: '#333333',
    marginVertical: 4,
  },
  // Estilos para Edición de Archivos y Grupos
  editSection: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
  },
  editSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  inputContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  textInput: {
    flex: 1,
    backgroundColor: '#2A2A2A',
    borderWidth: 1,
    borderColor: '#404040',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: '#FFFFFF',
    fontSize: 14,
  },
  addButton: {
    backgroundColor: '#31a24c',
    borderRadius: 8,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
  },
  fileItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
  },
  fileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  fileIcon: {
    fontSize: 28,
    marginRight: 12,
  },
  fileName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  fileDuration: {
    fontSize: 12,
    color: '#888888',
    marginTop: 2,
  },
  deleteIconButton: {
    padding: 8,
  },
  deleteIcon: {
    fontSize: 20,
  },
  groupItemEdit: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
  },
  groupInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  groupIconEdit: {
    fontSize: 28,
    marginRight: 12,
  },
  groupNameEdit: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  groupMembersEdit: {
    fontSize: 12,
    color: '#888888',
    marginTop: 2,
  },
  uploadButton: {
    marginTop: 12,
    width: '100%',
  },
  filePreviewContainer: {
    position: 'relative',
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#2A2A2A',
  },
  filePreview: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    objectFit: 'cover',
  },
  deletePreviewButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#FF6B6B',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  previewFileName: {
    fontSize: 12,
    color: '#AAAAAA',
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#1A1A1A',
  },
});
