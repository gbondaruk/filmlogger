import { Link, Tabs } from 'expo-router';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { TabBarIcon } from '../../components/TabBarIcons';
import { colors } from '../../constants/Colors';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.text,
        tabBarInactiveTintColor: colors.textSecondary,
        headerShown: true,
        headerStyle: {
          backgroundColor: colors.background,
        },
        headerTintColor: colors.text,
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopColor: colors.text,
          borderTopWidth: 1,
        },
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
