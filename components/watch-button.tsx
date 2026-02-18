import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { Feather } from '@expo/vector-icons';

type WatchButtonProps = {
  watched: boolean;
  onPress: () => void;
};

export function WatchButton({ watched, onPress }: WatchButtonProps) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress} activeOpacity={0.8}>
      <Feather
        name={watched ? 'check' : 'plus'}
        size={24}
        color={watched ? '#00ff87' : '#ffffff'}
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
