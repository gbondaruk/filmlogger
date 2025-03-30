// import {
//   Inter_300Light,
//   Inter_500Medium,
//   Inter_600SemiBold,
//   Inter_700Bold,
//   useFonts,
// } from '@expo-google-fonts/inter';
// import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
// import MapView, { Marker } from 'react-native-maps';
// import { colors } from '../../constants/Colors';

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     // justifyContent: 'center',
//     // alignItems: 'center',
//     backgroundColor: colors.background,
//   },
//   text: {
//     color: colors.text,
//     fontFamily: 'Inter_300Light',
//   },
//   title: {
//     fontWeight: 'bold',
//     fontFamily: 'Inter_700Bold',
//   },
//   view: {
//     // width: '100%',
//     flex: 1,
//     // paddingLeft: 30,
//     // paddingRight: 10,
//     // paddingTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight + 20,
//     paddingBottom: 20,
//     // justifyContent: 'center',
//     // alignItems: 'center',
//   },
//   map: {
//     width: '100%',
//     height: '50%',
//   },
//   item: {
//     width: '100%',
//     padding: 2,
//     marginVertical: 10,
//     paddingLeft: 20,
//     // alignSelf: 'flex-start',
//   },
// });

// const locationsOfInterest = [
//   {
//     id: 1,
//     title: 'UNWIND ~ Film Lab',
//     location: {
//       longitude: 16.374051851580372,
//       latitude: 48.19084388972389,
//     },
//     description: 'Belvederegasse 30/1',
//   },
//   {
//     id: 2,
//     title: 'Foto Leutner GmbH',
//     location: {
//       longitude: 16.340577717954115,
//       latitude: 48.2031867676904,
//     },
//     description: 'Kaiserstraße 58',
//   },
//   {
//     id: 3,
//     title: 'Fotospeed',
//     location: {
//       longitude: 16.347362247034262,
//       latitude: 48.20707208622977,
//     },
//     description: 'Lerchenfelder Str. 66-68',
//   },
//   {
//     id: 4,
//     title: 'Fotolabor Dipl. Ing. Krzysztof Wolczak',
//     location: {
//       longitude: 16.34216635969445,
//       latitude: 48.197389050148345,
//     },
//     description: 'Schweglerstraße 9',
//   },
//   {
//     id: 5,
//     title: 'Garage Film Lab',
//     location: {
//       longitude: 16.34206549643847,
//       latitude: 48.21335663223454,
//     },
//     description: 'Laudongasse 58',
//   },
//   {
//     id: 6,
//     title: 'PHOTO CLUSTER',
//     location: {
//       longitude: 16.34517887491912,
//       latitude: 48.20120731089933,
//     },
//     description: 'Zieglergasse 34',
//   },
//   {
//     id: 7,
//     title: 'plusfoto',
//     location: {
//       longitude: 16.342161486599434,
//       latitude: 48.20874073579299,
//     },
//     description: 'Stolzenthalergasse 6/1b',
//   },
//   {
//     id: 8,
//     title: 'ZEBRA Zentrum für Fotografie',
//     location: {
//       longitude: 16.350297868417126,
//       latitude: 48.20456729406575,
//     },
//     description: 'Burggasse 46',
//   },
//   {
//     id: 9,
//     title: 'BILDERmacher',
//     location: {
//       longitude: 16.371001069291363,
//       latitude: 48.211915991201195,
//     },
//     description: 'Fleischmarkt 16',
//   },
//   {
//     id: 10,
//     title: 'Fayer Fotolabor',
//     location: {
//       longitude: 16.36736533444594,
//       latitude: 48.20332355891283,
//     },
//     description: 'Opernring 6',
//   },
// ];

// export default function Index() {
//   const [fontsLoaded] = useFonts({
//     Inter_300Light,
//     Inter_500Medium,
//     Inter_600SemiBold,
//     Inter_700Bold,
//   });

//   if (!fontsLoaded) {
//     return null;
//   }

//   const showLocationsOfInterest = () => {
//     return locationsOfInterest.map((item) => {
//       return (
//         <Marker
//           key={`item-${item.id}`}
//           coordinate={item.location}
//           title={item.title}
//           description={item.description}
//         />
//       );
//     });
//   };

//   const renderItem = ({ item }: any) => {
//     return (
//       <View style={styles.item}>
//         <Text style={styles.title}>{item.title} </Text>
//         <Text style={styles.text}>{item.description}</Text>
//       </View>
//     );
//   };
//   return (
//     <SafeAreaView style={styles.container}>
//       <MapView
//         style={styles.map}
//         initialRegion={{
//           latitude: 48.2081,
//           longitude: 16.3613,
//           latitudeDelta: 0.0422,
//           longitudeDelta: 0.0221,
//         }}
//       >
//         {showLocationsOfInterest()}
//       </MapView>

//       <View style={styles.view}>
//         <FlatList data={locationsOfInterest} renderItem={renderItem} />
//       </View>
//     </SafeAreaView>
//   );
// }

import {
  Inter_300Light,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  useFonts,
} from '@expo-google-fonts/inter';
import { useRef, useState } from 'react';
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
  },
  selectedItem: {
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
  },
});

const locationsOfInterest = [
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

export default function Index() {
  const [fontsLoaded] = useFonts({
    Inter_300Light,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  const [selectedId, setSelectedId] = useState(null);
  const mapRef = useRef(null);
  const markerRefs = useRef({});

  if (!fontsLoaded) {
    return null;
  }

  const handleLocationSelect = (item: any) => {
    setSelectedId(item.id);

    // Animate to the selected location
    mapRef.current?.animateToRegion(
      {
        latitude: item.location.latitude,
        longitude: item.location.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      },
      500,
    );

    // Show the marker's callout
    setTimeout(() => {
      if (markerRefs.current[item.id]) {
        markerRefs.current[item.id].showCallout();
      }
    }, 600);
  };

  const renderItem = ({ item }) => {
    const isSelected = item.id === selectedId;

    return (
      <TouchableOpacity
        onPress={() => handleLocationSelect(item)}
        style={[styles.item, isSelected && styles.selectedItem]}
      >
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.text}>{item.description}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          latitude: 48.2081,
          longitude: 16.3613,
          latitudeDelta: 0.0422,
          longitudeDelta: 0.0221,
        }}
      >
        {locationsOfInterest.map((item) => (
          <Marker
            key={`item-${item.id}`}
            ref={(ref) => (markerRefs.current[item.id] = ref)}
            coordinate={item.location}
            title={item.title}
            description={item.description}
          />
        ))}
      </MapView>

      <View style={styles.view}>
        <FlatList
          data={locationsOfInterest}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          extraData={selectedId}
        />
      </View>
    </SafeAreaView>
  );
}
