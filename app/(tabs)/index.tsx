import { Inter_300Light, useFonts } from '@expo-google-fonts/inter';
import Constants from 'expo-constants';
import { Link, Stack } from 'expo-router';
import {
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
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
      <View style={styles.view}>
        <Text style={styles.text}>Filmlogger</Text>
        <Link href="/about" style={styles.text}>
          Go to About screen
        </Link>
      </View>
    </SafeAreaView>
  );
}
