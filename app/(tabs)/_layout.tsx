import { Link, Tabs } from 'expo-router';
import { StyleSheet, TouchableOpacity, useColorScheme } from 'react-native';
import { TabBarIcon } from '../../components/TabBarIcons';
import { colors } from '../../constants/Colors';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.text, // Primary text color
        tabBarInactiveTintColor: colors.textSecondary, // Subtle muted color
        headerShown: true,
        headerStyle: {
          backgroundColor: colors.background, // Warm beige or deep gray
          borderBottomColor: colors.border, // Soft taupe or teal border
          borderBottomWidth: 1,
        },
        headerTintColor: colors.text,
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopColor: colors.border, // Border matches the theme
          borderTopWidth: 1,
          shadowColor: colors.shadow, // Subtle shadow
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
