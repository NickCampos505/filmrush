import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';

const PLUS_ICON = require('@/assets/images/plus.svg');
const CHECK_ICON = require('@/assets/images/check.svg');

type WatchButtonProps = {
  watched: boolean;
  onPress: () => void;
};

export function WatchButton({ watched, onPress }: WatchButtonProps) {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
      activeOpacity={0.85}
      accessibilityRole="button"
      accessibilityLabel={watched ? 'Unmark movie as watched' : 'Mark movie as watched'}
      accessibilityState={{ checked: watched }}
      hitSlop={6}
    >
      <Image
        source={watched ? CHECK_ICON : PLUS_ICON}
        style={styles.icon}
        contentFit="contain"
      />
      <Text style={[styles.label, watched && styles.labelWatched]}>
        {watched ? 'Watched' : 'Mark as Watched'}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: '#3f3f46',
    borderRadius: 144,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  icon: {
    width: 24,
    height: 24,
  },
  label: {
    fontSize: 14,
    fontFamily: 'Gabarito_600SemiBold',
    color: '#ffffff',
    lineHeight: 14 * 1.15,
  },
  labelWatched: {
    color: '#00ff87',
  },
});
