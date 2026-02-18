import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

type TagProps = {
  label: string;
  active?: boolean;
  onPress?: () => void;
};

export function Tag({ label, active = false, onPress }: TagProps) {
  return (
    <TouchableOpacity
      style={[styles.tag, active ? styles.tagActive : styles.tagDefault]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={[styles.label, active ? styles.labelActive : styles.labelDefault]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  tag: {
    borderRadius: 144,
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderWidth: 1,
  },
  tagDefault: {
    backgroundColor: 'transparent',
    borderColor: '#3f3f46',
  },
  tagActive: {
    backgroundColor: 'white',
    borderColor: '#1d1d20',
  },
  label: {
    fontSize: 16,
    lineHeight: 16,
  },
  labelDefault: {
    color: '#d4d4d8',
    fontFamily: 'Gabarito_400Regular',
  },
  labelActive: {
    color: '#000000',
    fontFamily: 'Gabarito_600SemiBold',
  },
});
