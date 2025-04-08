import { Image } from 'expo-image';
import { useFocusEffect, useRouter } from 'expo-router';
import React, { useCallback, useState } from 'react';
import {
  Alert,
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import type { LogoutResponseBodyGet } from '../(auth)/api/logout+api';
import { colors } from '../../constants/Colors';
import type { UserResponseBodyGet } from '../api/user+api';

export default function Profile() {
  const [cameras, setCameras] = useState([
    { id: '1', brand: 'Canon', model: 'EOS R5' },
    { id: '2', brand: 'Sony', model: 'A7 III' },
  ]);
  const [lenses, setLenses] = useState([
    { id: '1', brand: 'Canon', model: 'RF 50mm f/1.2L' },
    { id: '2', brand: 'Sony', model: 'FE 24-70mm f/2.8 GM' },
  ]);

  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      async function getUser() {
        const response = await fetch('/api/user');

        const body: UserResponseBodyGet = await response.json();

        if ('error' in body) {
          router.replace('/(auth)/login?returnTo=/(tabs)/profile');
          return;
        }
      }
      getUser().catch((error) => {
        console.error(error);
      });
    }, [router]),
  );

  const [cameraModalVisible, setCameraModalVisible] = useState(false);
  const [lensModalVisible, setLensModalVisible] = useState(false);
  const [cameraBrand, setCameraBrand] = useState('');
  const [cameraModel, setCameraModel] = useState('');
  const [lensBrand, setLensBrand] = useState('');
  const [lensModel, setLensModel] = useState('');

  const handleAddCamera = () => {
    if (cameraBrand && cameraModel) {
      setCameras((prevCameras) => [
        ...prevCameras,
        { id: Date.now().toString(), brand: cameraBrand, model: cameraModel },
      ]);
      setCameraBrand('');
      setCameraModel('');
      setCameraModalVisible(false);
      Alert.alert('Success', 'Camera added successfully');
    } else {
      Alert.alert('Error', 'Please fill in all fields');
    }
  };

  const handleAddLens = () => {
    if (lensBrand && lensModel) {
      setLenses((prevLenses) => [
        ...prevLenses,
        { id: Date.now().toString(), brand: lensBrand, model: lensModel },
      ]);
      setLensBrand('');
      setLensModel('');
      setLensModalVisible(false);
      Alert.alert('Success', 'Lens added successfully');
    } else {
      Alert.alert('Error', 'Please fill in all fields');
    }
  };

  return (
    <View style={styles.container}>
      <Image
        style={{ width: 100, height: 100, marginBottom: 20 }}
        source={require('../../assets/images/splash-icon-light.png')}
        contentFit="contain"
      />
      <Pressable
        style={({ pressed }) => [styles.button, { opacity: pressed ? 0.5 : 1 }]}
        onPress={async () => {
          const response = await fetch('/api/logout');

          if (!response.ok) {
            let errorMessage = 'Error logging out';
            const responseBody: LogoutResponseBodyGet = await response.json();
            if ('error' in responseBody) {
              errorMessage = responseBody.error;
            }

            Alert.alert('Error', errorMessage, [{ text: 'OK' }]);
            return;
          }

          router.push('/(auth)/login');
        }}
      >
        <Text style={styles.text}>Logout</Text>
      </Pressable>

      <View style={styles.divider} />

      <Text style={styles.header}>My Equipment</Text>

      {/* Cameras Section */}
      <View style={styles.section}>
        <Text style={styles.subHeader}>Cameras</Text>
        <FlatList
          data={cameras}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <Text style={styles.itemText}>
                {item.brand} {item.model}
              </Text>
              <Pressable
                style={({ pressed }) => [
                  styles.removeButton,
                  { opacity: pressed ? 0.5 : 1 },
                ]}
                onPress={() =>
                  setCameras((prev) => prev.filter((c) => c.id !== item.id))
                }
              >
                <Text style={styles.removeButtonText}>Remove</Text>
              </Pressable>
            </View>
          )}
        />
        <Pressable
          style={({ pressed }) => [
            styles.addButton,
            { opacity: pressed ? 0.5 : 1 },
          ]}
          onPress={() => setCameraModalVisible(true)}
        >
          <Text style={styles.addButtonText}>Add Camera</Text>
        </Pressable>
      </View>

      {/* Lenses Section */}
      <View style={styles.section}>
        <Text style={styles.subHeader}>Lenses</Text>
        <FlatList
          data={lenses}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <Text style={styles.itemText}>
                {item.brand} {item.model}
              </Text>
              <Pressable
                style={({ pressed }) => [
                  styles.removeButton,
                  { opacity: pressed ? 0.5 : 1 },
                ]}
                onPress={() =>
                  setLenses((prev) => prev.filter((l) => l.id !== item.id))
                }
              >
                <Text style={styles.removeButtonText}>Remove</Text>
              </Pressable>
            </View>
          )}
        />
        <Pressable
          style={({ pressed }) => [
            styles.addButton,
            { opacity: pressed ? 0.5 : 1 },
          ]}
          onPress={() => setLensModalVisible(true)}
        >
          <Text style={styles.addButtonText}>Add Lens</Text>
        </Pressable>
      </View>

      {/* Camera Modal */}
      <Modal
        visible={cameraModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setCameraModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeader}>Add Camera</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter camera brand" // Placeholder for camera brand
              placeholderTextColor={colors.textSecondary} // Optional: Placeholder text color
              value={cameraBrand}
              onChangeText={setCameraBrand}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter camera model" // Placeholder for camera model
              placeholderTextColor={colors.textSecondary} // Optional: Placeholder text color
              value={cameraModel}
              onChangeText={setCameraModel}
            />
            <Pressable style={styles.modalButton} onPress={handleAddCamera}>
              <Text style={styles.modalButtonText}>Submit</Text>
            </Pressable>
            <Pressable
              style={styles.modalButton}
              onPress={() => setCameraModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {/* Lens Modal */}
      <Modal
        visible={lensModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setLensModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeader}>Add Lens</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter lens brand" // Placeholder for lens brand
              placeholderTextColor={colors.textSecondary} // Optional: Placeholder text color
              value={lensBrand}
              onChangeText={setLensBrand}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter lens model" // Placeholder for lens model
              placeholderTextColor={colors.textSecondary} // Optional: Placeholder text color
              value={lensModel}
              onChangeText={setLensModel}
            />
            <Pressable style={styles.modalButton} onPress={handleAddLens}>
              <Text style={styles.modalButtonText}>Submit</Text>
            </Pressable>
            <Pressable
              style={styles.modalButton}
              onPress={() => setLensModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  button: {
    marginTop: 30,
    backgroundColor: colors.text,
    padding: 12,
    borderRadius: 12,
    width: '50%',
  },
  text: {
    color: colors.cardBackground,
    textAlign: 'center',
    fontSize: 18,
  },
  divider: {
    marginVertical: 20,
    height: 1,
    width: '80%',
    backgroundColor: colors.textSecondary,
  },
  header: {
    fontSize: 22,
    color: colors.text,
    marginBottom: 16,
  },
  section: {
    width: '80%',
    marginBottom: 16,
    padding: 12,
    backgroundColor: colors.cardBackground,
    borderRadius: 8,
  },
  subHeader: {
    fontSize: 18,
    color: colors.text,
    marginBottom: 8,
  },
  addButton: {
    marginTop: 10,
    backgroundColor: colors.text,
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: colors.cardBackground,
    fontSize: 16,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  itemText: {
    fontSize: 16,
    color: colors.text,
  },
  removeButton: {
    backgroundColor: colors.textSecondary,
    padding: 6,
    borderRadius: 8,
  },
  removeButtonText: {
    color: colors.cardBackground,
    fontSize: 14,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: colors.cardBackground,
    padding: 20,
    borderRadius: 8,
  },
  modalHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.textSecondary,
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
    fontSize: 16,
  },
  modalButton: {
    backgroundColor: colors.text,
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  modalButtonText: {
    color: colors.cardBackground,
    fontSize: 16,
  },
});
