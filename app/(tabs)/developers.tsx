// import MapView, { Marker } from 'react-native-maps';
// import Region from 'react-native-maps';
// import { markers } from '../../assets/markers';
// import { colors } from '../../constants/Colors';
// let developersInVienna = [
//   {
//     title: 'UNWIND ~ Film Lab',
//     location: {
//       latitude: 16.374051851580372,
//       longitude: 48.19084388972389,
//     },
//     description: 'Belvederegasse 30/1',
//   },
//   {
//     title: 'Foto Leutner GmbH',
//     location: {
//       latitude: 16.340577717954115,
//       longitude: 48.2031867676904,
//     },
//     description: 'Kaiserstraße 58',
//   },
//   {
//     title: 'Fotospeed',
//     location: {
//       latitude: 16.347362247034262,
//       longitude: 48.20707208622977,
//     },
//     description: 'Lerchenfelder Str. 66-68',
//   },
//   {
//     title: 'Fotolabor Dipl. Ing. Krzysztof Wolczak',
//     location: {
//       latitude: 16.34216635969445,
//       longitude: 48.197389050148345,
//     },
//     description: 'Schweglerstraße 9',
//   },
//   {
//     title: 'Garage Film Lab',
//     location: {
//       latitude: 16.34206549643847,
//       longitude: 48.21335663223454,
//     },
//     description: 'Laudongasse 58',
//   },
//   {
//     title: 'PHOTO CLUSTER',
//     location: {
//       latitude: 16.34517887491912,
//       longitude: 48.20120731089933,
//     },
//     description: 'Praterstraße 70/1',
//   },
//   {
//     title: 'plusfoto',
//     location: {
//       latitude: 16.342161486599434,
//       longitude: 48.20874073579299,
//     },
//     description: ' Stolzenthalergasse 6/1b',
//   },
//   {
//     title: 'ZEBRA Zentrum für Fotografie',
//     location: {
//       latitude: 16.350297868417126,
//       longitude: 48.20456729406575,
//     },
//     description: 'Burggasse 46',
//   },
//   {
//     title: 'BILDERmacher',
//     location: {
//       latitude: 16.371001069291363,
//       longitude: 48.211915991201195,
//     },
//     description: 'Fleischmarkt 16',
//   },
//   {
//     title: 'Fayer Fotolabor',
//     location: {
//       latitude: 16.36736533444594,
//       longitude: 48.20332355891283,
//     },
//     description: 'Opernring 6',
//   },
// ];
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: colors.background,
//   },
//   text: {
//     color: colors.text,
//   },
//   view: {
//     flex: 1,
//     paddingLeft: 10,
//     paddingRight: 10,
//     paddingTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight + 20,
//     paddingBottom: 20,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   map: {
//     width: '100%',
//     height: '50%',
//   },
// });
// const intialRegion = {
// latitude: 48.2081,
// longitude: 16.3713,
// latitudeDelta: 0.0722,
// longitudeDelta: 0.0221,
// };
// export default function Index() {
//   const [fontsLoaded] = useFonts({
//     Inter_300Light,
//   });
//   if (!fontsLoaded) {
//     return null;
//   }
//   return (
//     <SafeAreaView style={styles.container}>
//       <MapView style={styles.map} initialRegion={intialRegion}></MapView>
//       <View style={styles.view}>
//         <Text style={styles.text}>Local Film Developers</Text>
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
import { Link, Stack } from 'expo-router';
import {
  FlatList,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { colors } from '../../constants/Colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
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
    // width: '100%',
    flex: 1,
    // paddingLeft: 30,
    // paddingRight: 10,
    // paddingTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight + 20,
    paddingBottom: 20,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  map: {
    width: '100%',
    height: '50%',
  },
  item: {
    width: '100%',
    padding: 2,
    marginVertical: 10,
    paddingLeft: 20,
    // alignSelf: 'flex-start',
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
    description: 'Praterstraße 70/1',
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
  });

  if (!fontsLoaded) {
    return null;
  }

  const showLocationsOfInterest = () => {
    return locationsOfInterest.map((item) => {
      return (
        <Marker
          key={`item-${item.id}`}
          coordinate={item.location}
          title={item.title}
          description={item.description}
        />
      );
    });
  };

  const renderItem = ({ item }) => {
    return (
      <View style={styles.item}>
        <Text style={styles.title}>{item.title} </Text>
        <Text style={styles.text}>{item.description}</Text>
      </View>
    );
  };
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
      >
        {showLocationsOfInterest()}
      </MapView>

      <View style={styles.view}>
        <FlatList data={locationsOfInterest} renderItem={renderItem} />
      </View>
    </SafeAreaView>
  );
}
