import React from 'react';
import { View, Text, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

export default function AboutScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <TouchableWithoutFeedback onPress={() => router.back()}>
      <View style={styles.overlay}>
        {/* Tap inside sheet won't dismiss */}
        <TouchableWithoutFeedback>
          <View style={[styles.sheet, { paddingBottom: 32 + insets.bottom }]}>
            {/* Grabber */}
            <View style={styles.grabber} />

            {/* Content */}
            <View style={styles.content}>
              <Text style={styles.title}>About</Text>
              <Text style={styles.description}>
                Filmrush is a movie tracking app built for Oscar season. Watch nominated films and earn points as you go. The more you watch, the higher you climb. Compete with friends and see who really has the best taste in cinema.
              </Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  sheet: {
    backgroundColor: '#1d1d20',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  grabber: {
    width: 36,
    height: 5,
    backgroundColor: '#52525b',
    borderRadius: 144,
    marginBottom: 16,
  },
  content: {
    width: '100%',
    gap: 16,
  },
  title: {
    fontSize: 18,
    fontFamily: 'Gabarito_600SemiBold',
    color: '#ffffff',
    lineHeight: 18 * 1.35,
  },
  description: {
    fontSize: 16,
    fontFamily: 'Gabarito_400Regular',
    color: '#a1a1aa',
    lineHeight: 16 * 1.5,
  },
});
