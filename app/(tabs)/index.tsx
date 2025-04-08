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
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: colors.background,
    padding: 20,
  },
  text: {
    color: colors.text,
    fontSize: 18,
    fontFamily: 'Inter_600SemiBold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.textSecondary,
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
    fontSize: 16,
    color: colors.text,
    backgroundColor: colors.cardBackground,
    width: '100%',
  },
  button: {
    backgroundColor: colors.text,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    width: '100%',
  },
  buttonText: {
    color: colors.cardBackground,
    fontSize: 16,
    fontFamily: 'Inter_500Medium',
  },
  currentFilmContainer: {
    marginBottom: 20,
    padding: 15,
    borderRadius: 8,
    backgroundColor: colors.cardBackground,
    width: '100%',
  },
  currentFilmText: {
    color: colors.text,
    fontSize: 16,
    fontFamily: 'Inter_500Medium',
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

  // Request location permissions on component mount
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

      <Text style={styles.text}>Add a New Still</Text>
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
      <TouchableOpacity
        style={styles.button}
        onPress={handleGetCurrentLocation}
      >
        <Text style={styles.buttonText}>Use Current Location</Text>
      </TouchableOpacity>
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
        style={styles.button}
        onPress={handleSetCurrentDateTime}
      >
        <Text style={styles.buttonText}>Set Current Date & Time</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleAddStill}>
        <Text style={styles.buttonText}>Save Still</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
