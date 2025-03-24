import { Inter_300Light, useFonts } from '@expo-google-fonts/inter';
import Constants from 'expo-constants';
import { Link, Stack } from 'expo-router';
import { Platform, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import MapView from 'react-native-maps';
import { colors } from '../../constants/Colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  text: {
    color: colors.text,
  },
  view: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight + 20,
    paddingBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    width: '100%',
    height: '50%',
  },
});

export default function Index() {
  const [fontsLoaded] = useFonts({
    Inter_300Light,
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <SafeAreaView style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 48.2081,
          longitude: 16.3713,
          latitudeDelta: 0.0722,
          longitudeDelta: 0.0221,
        }}
      />
      <View style={styles.view}>
        <Text style={styles.text}>Local Film Developers</Text>
      </View>
    </SafeAreaView>
  );
}
