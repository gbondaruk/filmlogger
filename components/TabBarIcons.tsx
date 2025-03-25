import { type IconProps } from '@expo/vector-icons/build/createIconSet';
import Ionicons from '@expo/vector-icons/Ionicons';
import { type ComponentProps } from 'react';

export function TabBarIcon({
  style,
  color,
  name,
}: IconProps<ComponentProps<typeof Ionicons>['name']>) {
  return (
    <Ionicons
      size={25}
      style={[{ marginBottom: 1, fontFamily: '' }, style]}
      color={color}
      name={name}
    />
  );
}
