import {
  Inter_300Light,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  useFonts,
} from '@expo-google-fonts/inter';
import Location from 'expo-location';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { colors } from '../../constants/Colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 20,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  text: {
    color: colors.text,
    fontSize: 20,
    fontFamily: 'Inter_700Bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
    color: colors.text,
    backgroundColor: colors.inputBackground,
    width: '85%', // Reduced width for better spacing
    alignSelf: 'center',
  },
  button: {
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    width: '85%', // Reduced width for better spacing
    alignSelf: 'center',
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  saveButton: {
    backgroundColor: colors.success,
  },
  locationButton: {
    backgroundColor: colors.accent,
  },
  dateButton: {
    backgroundColor: colors.warning,
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
  },
  buttonContainer: {
    flexDirection: 'column', // Stack buttons vertically
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginTop: 20,
  },
  currentFilmContainer: {
    marginBottom: 30,
    padding: 20,
    borderRadius: 12,
    backgroundColor: colors.cardBackground,
    width: '100%',
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  currentFilmText: {
    color: colors.text,
    fontSize: 16,
    fontFamily: 'Inter_500Medium',
    marginBottom: 5,
  },
  sectionHeader: {
    fontSize: 18,
    fontFamily: 'Inter_600SemiBold',
    color: colors.text,
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
});

export default function Index() {
  const [fontsLoaded] = useFonts({
    Inter_300Light,
  });

  const currentFilm = {
    id: 1,
    brand: 'Kodak',
    iso: 400,
    images: 36,
    development: 'C-41',
    currentStatus: 'In Progress',
    style: 'Color',
  };

  const [newStill, setNewStill] = useState({
    id: null,
    title: '',
    description: '',
    location: '',
    dateTaken: new Date().toISOString().split('T')[0],
    timeTaken: new Date().toLocaleTimeString(),
    cameraSettings: {
      aperture: '',
      shutterSpeed: '',
      iso: currentFilm.iso,
    },
    filmId: currentFilm.id,
  });

  const [locationPermission, setLocationPermission] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permission Denied',
          'Location permission is required to use this feature.',
        );
        return;
      }
      setLocationPermission(true);
    })();
  }, []);

  const handleGetCurrentLocation = async () => {
    if (!locationPermission) {
      Alert.alert(
        'Permission Denied',
        'Location permission is required to use this feature.',
      );
      return;
    }

    try {
      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      setNewStill((prev) => ({
        ...prev,
        location: `Lat: ${latitude.toFixed(6)}, Lon: ${longitude.toFixed(6)}`,
      }));
    } catch (error) {
      Alert.alert('Error', 'Unable to fetch location. Please try again.');
    }
  };

  const handleSetCurrentDateTime = () => {
    const now = new Date();
    setNewStill((prev) => ({
      ...prev,
      dateTaken: now.toISOString().split('T')[0],
      timeTaken: now.toLocaleTimeString(),
    }));
  };

  const handleAddStill = () => {
    const {
      title,
      description,
      location,
      dateTaken,
      timeTaken,
      cameraSettings,
    } = newStill;

    if (
      !title ||
      !description ||
      !location ||
      !cameraSettings.aperture ||
      !cameraSettings.shutterSpeed
    ) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    const newStillEntry = {
      ...newStill,
      id: Math.floor(Math.random() * 10000),
    };

    console.log('New Still:', newStillEntry);

    setNewStill({
      id: null,
      title: '',
      description: '',
      location: '',
      dateTaken: new Date().toISOString().split('T')[0],
      timeTaken: new Date().toLocaleTimeString(),
      cameraSettings: {
        aperture: '',
        shutterSpeed: '',
        iso: currentFilm.iso,
      },
      filmId: currentFilm.id,
    });

    Alert.alert('Success', 'Still added successfully!');
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.currentFilmContainer}>
          <Text style={styles.currentFilmText}>
            Current Film: {currentFilm.brand} ({currentFilm.iso} ISO)
          </Text>
          <Text style={styles.currentFilmText}>
            Style: {currentFilm.style} | Development: {currentFilm.development}
          </Text>
          <Text style={styles.currentFilmText}>
            Status: {currentFilm.currentStatus}
          </Text>
        </View>

        <Text style={styles.sectionHeader}>Add a New Still</Text>
        <TextInput
          style={styles.input}
          placeholder="Title"
          placeholderTextColor={colors.textSecondary}
          value={newStill.title}
          onChangeText={(text) =>
            setNewStill((prev) => ({ ...prev, title: text }))
          }
        />
        <TextInput
          style={styles.input}
          placeholder="Description"
          placeholderTextColor={colors.textSecondary}
          value={newStill.description}
          onChangeText={(text) =>
            setNewStill((prev) => ({ ...prev, description: text }))
          }
        />
        <TextInput
          style={styles.input}
          placeholder="Location"
          placeholderTextColor={colors.textSecondary}
          value={newStill.location}
          onChangeText={(text) =>
            setNewStill((prev) => ({ ...prev, location: text }))
          }
        />
        <TextInput
          style={styles.input}
          placeholder="Date Taken (YYYY-MM-DD)"
          placeholderTextColor={colors.textPlaceholder}
          value={newStill.dateTaken}
          onChangeText={(text) =>
            setNewStill((prev) => ({ ...prev, dateTaken: text }))
          }
        />
        <TextInput
          style={styles.input}
          placeholder="Time Taken (HH:MM:SS)"
          placeholderTextColor={colors.textPlaceholder}
          value={newStill.timeTaken}
          onChangeText={(text) =>
            setNewStill((prev) => ({ ...prev, timeTaken: text }))
          }
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.locationButton]}
            onPress={handleGetCurrentLocation}
          >
            <Text style={styles.buttonText}>Use Current Location</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.dateButton]}
            onPress={handleSetCurrentDateTime}
          >
            <Text style={styles.buttonText}>Set Date & Time</Text>
          </TouchableOpacity>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Aperture (e.g., f/2.8)"
          placeholderTextColor={colors.textSecondary}
          value={newStill.cameraSettings.aperture}
          onChangeText={(text) =>
            setNewStill((prev) => ({
              ...prev,
              cameraSettings: { ...prev.cameraSettings, aperture: text },
            }))
          }
        />
        <TextInput
          style={styles.input}
          placeholder="Shutter Speed (e.g., 1/125)"
          placeholderTextColor={colors.textSecondary}
          value={newStill.cameraSettings.shutterSpeed}
          onChangeText={(text) =>
            setNewStill((prev) => ({
              ...prev,
              cameraSettings: { ...prev.cameraSettings, shutterSpeed: text },
            }))
          }
        />
        <TouchableOpacity
          style={[styles.button, styles.saveButton]}
          onPress={handleAddStill}
        >
          <Text style={styles.buttonText}>Save Still</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
