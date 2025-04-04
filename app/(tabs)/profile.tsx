import {
  Inter_300Light,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  useFonts,
} from '@expo-google-fonts/inter';
import Constants from 'expo-constants';
import { Link, Stack } from 'expo-router';
import { Platform, SafeAreaView, StyleSheet, Text, View } from 'react-native';
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
        <Text style={styles.text}>Profile</Text>
        <Link href="/" style={styles.text}>
          Go to Home screen
        </Link>
      </View>
    </SafeAreaView>
  );
}
