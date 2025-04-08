import { MaterialCommunityIcons } from '@expo/vector-icons'; // Import the icon library
import React, { useState } from 'react';
import {
  Alert,
  FlatList,
  Modal,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { colors } from '../../constants/Colors';

export default function Films() {
  const [films, setFilms] = useState([
    {
      id: 1,
      brand: 'Kodak',
      iso: 400,
      images: 36,
      development: 'C-41',
      currentStatus: 'Exposed',
      style: 'Color',
      stills: Array.from({ length: 36 }, (_, i) => ({
        id: i + 1,
        title: `Still ${i + 1}`,
        description: `A vibrant scene captured for Still ${i + 1}`,
        location: `Location ${i + 1}`,
        dateTaken: `2025-04-08`, // Example date
        cameraSettings: {
          aperture: 'f/2.8',
          shutterSpeed: '1/125',
          iso: 400,
        },
        filmId: 1, // Reference to the film ID
      })),
    },
    {
      id: 2,
      brand: 'Ilford',
      iso: 100,
      images: 24,
      development: 'B&W',
      currentStatus: 'Developed',
      style: 'Black & White',
      stills: Array.from({ length: 24 }, (_, i) => ({
        id: i + 1,
        title: `Still ${i + 1}`,
        description: `A monochrome masterpiece for Still ${i + 1}`,
        location: `Location ${i + 1}`,
        dateTaken: `2025-04-07`, // Example date
        cameraSettings: {
          aperture: 'f/4.0',
          shutterSpeed: '1/60',
          iso: 100,
        },
        filmId: 2, // Reference to the film ID
      })),
    },
    {
      id: 3,
      brand: 'Fujifilm',
      iso: 200,
      images: 36,
      development: 'C-41',
      currentStatus: 'In Progress',
      style: 'Color',
      stills: Array.from({ length: 36 }, (_, i) => ({
        id: i + 1,
        title: `Still ${i + 1}`,
        description: `A colorful moment captured for Still ${i + 1}`,
        location: `Location ${i + 1}`,
        dateTaken: `2025-04-06`, // Example date
        cameraSettings: {
          aperture: 'f/3.5',
          shutterSpeed: '1/100',
          iso: 200,
        },
        filmId: 3, // Reference to the film ID
      })),
    },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [newFilm, setNewFilm] = useState({
    brand: '',
    iso: null,
    images: null,
    development: '',
    currentStatus: '',
    style: '',
  });

  const [selectedFilm, setSelectedFilm] = useState(null);
  const [stillsModalVisible, setStillsModalVisible] = useState(false);

  const handleAddFilm = () => {
    const { brand, iso, images, development, currentStatus, style } = newFilm;

    if (!brand || !iso || !images || !development || !currentStatus || !style) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    const newFilmEntry = {
      id: films.length + 1,
      brand,
      iso,
      images,
      development,
      currentStatus,
      style,
      stills: Array.from({ length: images }, (_, i) => ({
        id: i + 1,
        title: `Still ${i + 1}`,
        description: `Description for Still ${i + 1}`,
        location: `Location ${i + 1}`,
      })),
    };

    setFilms((prevFilms) => [...prevFilms, newFilmEntry]);
    setModalVisible(false);
    setNewFilm({
      brand: '',
      iso: null,
      images: null,
      development: '',
      currentStatus: '',
      style: '',
    });
    Alert.alert('Success', 'Film added successfully');
  };

  const handleFilmPress = (film) => {
    setSelectedFilm(film);
    setStillsModalVisible(true);
  };

  const closeStillsModal = () => {
    setSelectedFilm(null);
    setStillsModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>My Films</Text>
      <FlatList
        style={styles.list}
        data={films}
        renderItem={({ item }) => (
          <Pressable onPress={() => handleFilmPress(item)}>
            <View style={styles.listItem}>
              <MaterialCommunityIcons
                name="film" // Film icon
                size={24}
                color={colors.text}
                style={styles.icon}
              />
              <View>
                <Text style={styles.listItemText}>Brand: {item.brand}</Text>
                <Text style={styles.listItemText}>ISO: {item.iso}</Text>
                <Text style={styles.listItemText}>Images: {item.images}</Text>
                <Text style={styles.listItemText}>
                  Development: {item.development}
                </Text>
                <Text style={styles.listItemText}>
                  Status: {item.currentStatus}
                </Text>
                <Text style={styles.listItemText}>Style: {item.style}</Text>
              </View>
            </View>
          </Pressable>
        )}
        keyExtractor={(item) => String(item.id)}
      />
      <Pressable
        style={({ pressed }) => [
          styles.addButton,
          { opacity: pressed ? 0.5 : 1 },
        ]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.addButtonText}>Add New Film</Text>
      </Pressable>

      {/* Modal for Adding a New Film */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeader}>Add New Film</Text>
            <TextInput
              style={styles.input}
              placeholder="Film Brand (e.g., Kodak)"
              placeholderTextColor={colors.textSecondary}
              value={newFilm.brand}
              onChangeText={(text) =>
                setNewFilm((prev) => ({ ...prev, brand: text }))
              }
            />
            <TextInput
              style={styles.input}
              placeholder="ISO (e.g., 400)"
              placeholderTextColor={colors.textSecondary}
              keyboardType="numeric"
              value={newFilm.iso ? String(newFilm.iso) : ''}
              onChangeText={(text) =>
                setNewFilm((prev) => ({ ...prev, iso: parseInt(text, 10) }))
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Number of Images (e.g., 36)"
              placeholderTextColor={colors.textSecondary}
              keyboardType="numeric"
              value={newFilm.images ? String(newFilm.images) : ''}
              onChangeText={(text) =>
                setNewFilm((prev) => ({ ...prev, images: parseInt(text, 10) }))
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Development (e.g., C-41)"
              placeholderTextColor={colors.textSecondary}
              value={newFilm.development}
              onChangeText={(text) =>
                setNewFilm((prev) => ({ ...prev, development: text }))
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Current Status (e.g., Exposed)"
              placeholderTextColor={colors.textSecondary}
              value={newFilm.currentStatus}
              onChangeText={(text) =>
                setNewFilm((prev) => ({ ...prev, currentStatus: text }))
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Style (e.g., Black & White)"
              placeholderTextColor={colors.textSecondary}
              value={newFilm.style}
              onChangeText={(text) =>
                setNewFilm((prev) => ({ ...prev, style: text }))
              }
            />
            <Pressable style={styles.modalButton} onPress={handleAddFilm}>
              <Text style={styles.modalButtonText}>Submit</Text>
            </Pressable>
            <Pressable
              style={styles.modalButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {/* Modal for Stills */}
      <Modal
        visible={stillsModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={closeStillsModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeader}>
              Stills for {selectedFilm?.brand} ({selectedFilm?.iso} ISO)
            </Text>
            <FlatList
              data={selectedFilm?.stills || []}
              renderItem={({ item }) => (
                <View style={styles.stillItem}>
                  <MaterialCommunityIcons
                    name="filmstrip" // Filmstrip icon
                    size={20}
                    color={colors.text}
                    style={styles.stillIcon}
                  />
                  <View>
                    <Text style={styles.stillTitle}>{item.title}</Text>
                    <Text style={styles.stillDescription}>
                      Description: {item.description}
                    </Text>
                    <Text style={styles.stillLocation}>
                      Location: {item.location}
                    </Text>
                  </View>
                </View>
              )}
              keyExtractor={(item) => String(item.id)}
            />
            <Pressable style={styles.modalButton} onPress={closeStillsModal}>
              <Text style={styles.modalButtonText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  text: {
    color: colors.text,
    fontSize: 24,
    fontFamily: 'Inter_600SemiBold',
    marginBottom: 16,
    textAlign: 'center',
  },
  list: {
    marginTop: 10,
    marginBottom: 20,
  },
  listItem: {
    flexDirection: 'row', // Align icon and text horizontally
    alignItems: 'center',
    backgroundColor: colors.cardBackground,
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  icon: {
    marginRight: 12, // Space between the icon and text
  },
  listItemText: {
    color: colors.text,
    fontSize: 16,
    fontFamily: 'Inter_500Medium',
  },
  addButton: {
    marginTop: 20,
    marginBottom: 30, // Added bottom padding
    backgroundColor: colors.text,
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    width: '60%',
    alignSelf: 'center',
  },
  addButtonText: {
    color: colors.cardBackground,
    fontSize: 18,
    fontFamily: 'Inter_500Medium',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '85%',
    backgroundColor: colors.cardBackground,
    padding: 20,
    borderRadius: 12,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  modalHeader: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: colors.text,
  },
  stillItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
    borderRadius: 8,
    backgroundColor: colors.background,
  },
  stillIcon: {
    marginRight: 10,
  },
  stillTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
  },
  stillDescription: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  stillLocation: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  modalButton: {
    backgroundColor: colors.text,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  modalButtonText: {
    color: colors.cardBackground,
    fontSize: 16,
    fontFamily: 'Inter_500Medium',
  },
});
