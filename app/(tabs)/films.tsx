import {
  Inter_300Light,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  useFonts,
} from '@expo-google-fonts/inter';
import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet } from 'react-native';
import FilmItem from '../../components/FilmItem';
import { colors } from '../../constants/Colors';
import type { Film } from '../../migrations/00004-createTableFilms';
import type { UserResponseBodyGet } from '../api/user+api';
import type { FilmsResponseBodyGet } from '../films/index+api';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    height: '100%',
  },
  text: {
    color: colors.text,
  },
  list: {
    marginTop: 30,
  },
});

export default function Films() {
  const [films, setFilms] = useState<Film[]>([]);
  const [isStale, setIsStale] = useState(true);
  const [fontsLoaded] = useFonts({
    Inter_300Light,
  });

  const router = useRouter();

  const renderItem = (item: { item: Film }) => (
    <FilmItem film={item.item} setIsStale={setIsStale} />
  );

  useFocusEffect(
    useCallback(() => {
      if (!isStale) return;

      async function getUserAndFilms() {
        const [userResponse, filmsResponse]: [
          UserResponseBodyGet,
          FilmsResponseBodyGet,
        ] = await Promise.all([
          fetch('/api/user').then((response) => response.json()),
          fetch('/api/films').then((response) => response.json()),
        ]);

        setIsStale(false);

        if ('error' in userResponse) {
          router.replace('/(auth)/login?returnTo=/(tabs)/films');
          return;
        }

        if ('error' in filmsResponse) {
          setFilms([]);
          return;
        }

        setFilms(filmsResponse.films);
      }

      getUserAndFilms().catch((error) => {
        console.error(error);
      });
    }, [isStale, router]),
  );

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        style={styles.list}
        data={films}
        renderItem={renderItem}
        keyExtractor={(item: Film) => String(item.id)}
      />
    </SafeAreaView>
  );
}
