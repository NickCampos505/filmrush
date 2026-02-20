import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { AnimatedPressable } from '@/components/animated-pressable';

type TagProps = {
  label: string;
  active?: boolean;
  onPress?: () => void;
};

export function Tag({ label, active = false, onPress }: TagProps) {
  return (
    <AnimatedPressable
      style={[styles.tag, active ? styles.tagActive : styles.tagDefault]}
      onPress={onPress}
      pressedScale={0.96}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ selected: active }}
    >
      <Text style={[styles.label, active ? styles.labelActive : styles.labelDefault]}>
        {label}
      </Text>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  tag: {
    borderRadius: 144,
    minHeight: 44,
    paddingHorizontal: 12,
    paddingVertical: 0,
    borderWidth: 1,
    justifyContent: 'center',
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
    includeFontPadding: false,
    textAlignVertical: 'center',
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
