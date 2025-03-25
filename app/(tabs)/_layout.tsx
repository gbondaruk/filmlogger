import { Link, Tabs } from 'expo-router';
import { StyleSheet, TouchableOpacity, useColorScheme } from 'react-native';
import { TabBarIcon } from '../../components/TabBarIcons';
import { colors } from '../../constants/Colors';

export default function TabLayout() {
  const theme = useColorScheme(); // Detect system theme

  const themeColors = theme === 'dark' ? colors.dark : colors.light; // Select colors based on theme

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: themeColors.text, // Primary text color
        tabBarInactiveTintColor: themeColors.textSecondary, // Subtle muted color
        headerShown: true,
        headerStyle: {
          backgroundColor: themeColors.background, // Warm beige or deep gray
          borderBottomColor: themeColors.border, // Soft taupe or teal border
          borderBottomWidth: 1,
        },
        headerTintColor: themeColors.text,
        tabBarStyle: {
          backgroundColor: themeColors.background,
          borderTopColor: themeColors.border, // Border matches the theme
          borderTopWidth: 1,
          shadowColor: themeColors.shadow, // Subtle shadow
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
