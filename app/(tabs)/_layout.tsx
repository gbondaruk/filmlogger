import { Tabs } from 'expo-router';
import { TabBarIcon } from '../../components/TabBarIcons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#ffd33d',
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) =>
            TabBarIcon({
              name: focused ? 'home-sharp' : 'home-outline',
              color,
            }),
        }}
      />

      <Tabs.Screen
        name="films"
        options={{
          title: 'My Library',
          tabBarIcon: ({ color, focused }) =>
            TabBarIcon({
              name: focused ? 'film-sharp' : 'film-outline',
              color,
            }),
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          title: 'About',
          tabBarIcon: ({ color, focused }) =>
            TabBarIcon({
              name: focused ? 'person-circle-sharp' : 'person-circle-outline',
              color,
            }),
        }}
      />
      <Tabs.Screen
        name="developers"
        options={{
          title: 'Local Developers',
          tabBarIcon: ({ color, focused }) =>
            TabBarIcon({
              name: focused ? 'location-sharp' : 'location-outline',
              color,
            }),
        }}
      />
    </Tabs>
  );
}
