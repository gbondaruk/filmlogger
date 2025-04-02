import {
  Inter_300Light,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  useFonts,
} from '@expo-google-fonts/inter';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useRef, useState } from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { colors } from '../../constants/Colors';

type Location = {
  id: number;
  title: string;
  location: {
    longitude: number;
    latitude: number;
  };
  description: string;
};

const initialRegion = {
  latitude: 48.2081,
  longitude: 16.3613,
  latitudeDelta: 0.0422,
  longitudeDelta: 0.0221,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  text: {
    color: colors.text,
    fontFamily: 'Inter_300Light',
  },
  title: {
    fontWeight: 'bold',
    fontFamily: 'Inter_700Bold',
    color: colors.text,
  },
  view: {
    flex: 1,
    paddingBottom: 20,
  },
  map: {
    width: '100%',
    height: '50%',
  },
  item: {
    width: '100%',
    padding: 10,
    marginVertical: 5,
    paddingLeft: 20,
    borderRadius: 8,
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    shadowColor: colors.cardShadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  selectedItem: {
    backgroundColor: `${colors.accent}30`,
    borderColor: colors.accent,
    borderWidth: 1,
  },
  description: {
    color: colors.textSecondary,
    fontFamily: 'Inter_300Light',
    marginTop: 2,
  },
});

const locationsOfInterest: Location[] = [
  {
    id: 1,
    title: 'UNWIND ~ Film Lab',
    location: {
      longitude: 16.374051851580372,
      latitude: 48.19084388972389,
    },
    description: 'Belvederegasse 30/1',
  },
  {
    id: 2,
    title: 'Foto Leutner GmbH',
    location: {
      longitude: 16.340577717954115,
      latitude: 48.2031867676904,
    },
    description: 'Kaiserstraße 58',
  },
  {
    id: 3,
    title: 'Fotospeed',
    location: {
      longitude: 16.347362247034262,
      latitude: 48.20707208622977,
    },
    description: 'Lerchenfelder Str. 66-68',
  },
  {
    id: 4,
    title: 'Fotolabor Dipl. Ing. Krzysztof Wolczak',
    location: {
      longitude: 16.34216635969445,
      latitude: 48.197389050148345,
    },
    description: 'Schweglerstraße 9',
  },
  {
    id: 5,
    title: 'Garage Film Lab',
    location: {
      longitude: 16.34206549643847,
      latitude: 48.21335663223454,
    },
    description: 'Laudongasse 58',
  },
  {
    id: 6,
    title: 'PHOTO CLUSTER',
    location: {
      longitude: 16.34517887491912,
      latitude: 48.20120731089933,
    },
    description: 'Zieglergasse 34',
  },
  {
    id: 7,
    title: 'plusfoto',
    location: {
      longitude: 16.342161486599434,
      latitude: 48.20874073579299,
    },
    description: 'Stolzenthalergasse 6/1b',
  },
  {
    id: 8,
    title: 'ZEBRA Zentrum für Fotografie',
    location: {
      longitude: 16.350297868417126,
      latitude: 48.20456729406575,
    },
    description: 'Burggasse 46',
  },
  {
    id: 9,
    title: 'BILDERmacher',
    location: {
      longitude: 16.371001069291363,
      latitude: 48.211915991201195,
    },
    description: 'Fleischmarkt 16',
  },
  {
    id: 10,
    title: 'Fayer Fotolabor',
    location: {
      longitude: 16.36736533444594,
      latitude: 48.20332355891283,
    },
    description: 'Opernring 6',
  },
];

export default function Index(): React.ReactNode | null {
  const [fontsLoaded] = useFonts({
    Inter_300Light,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  const [selectedId, setSelectedId] = useState<number | null>(null);
  const mapRef = useRef<MapView | null>(null);
  const markerRefs = useRef<Record<number, typeof Marker | null>>({});

  useFocusEffect(
    useCallback(() => {
      setSelectedId(null);

      if (mapRef.current) {
        mapRef.current.animateToRegion(initialRegion, 500);
      }

      return () => {};
    }, []),
  );

  const handleLocationSelect = useCallback((item: Location) => {
    setSelectedId(item.id);

    if (mapRef.current) {
      mapRef.current.animateToRegion(
        {
          latitude: item.location.latitude,
          longitude: item.location.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        },
        500,
      );

      // Show the marker's callout after animation completes
      setTimeout(() => {
        if (markerRefs.current[item.id]) {
          markerRefs.current[item.id]?.showCallout();
        }
      }, 600);
    }
  }, []);

  const renderItem = useCallback(
    ({ item }: { item: Location }) => {
      const isSelected = item.id === selectedId;

      return (
        <TouchableOpacity
          onPress={() => handleLocationSelect(item)}
          style={[styles.item, isSelected && styles.selectedItem]}
        >
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>
        </TouchableOpacity>
      );
    },
    [selectedId, handleLocationSelect],
  );

  const keyExtractor = useCallback((item: Location) => item.id.toString(), []);

  const setMarkerRef = useCallback((ref: typeof Marker | null, id: number) => {
    if (ref) {
      markerRefs.current[id] = ref;
    }
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <MapView ref={mapRef} style={styles.map} initialRegion={initialRegion}>
        {locationsOfInterest.map((item) => (
          <Marker
            key={`item-${item.id}`}
            ref={(ref) => setMarkerRef(ref, item.id)}
            coordinate={item.location}
            title={item.title}
            description={item.description}
            pinColor={colors.accent}
          />
        ))}
      </MapView>

      <View style={styles.view}>
        <FlatList
          data={locationsOfInterest}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          extraData={selectedId}
        />
      </View>
    </SafeAreaView>
  );
}
