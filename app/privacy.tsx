import React from 'react';
import { View, Text, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

export default function PrivacyScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <TouchableWithoutFeedback onPress={() => router.back()}>
      <View style={styles.overlay}>
        <TouchableWithoutFeedback>
          <View style={[styles.sheet, { paddingBottom: 32 + insets.bottom }]}>
            <View style={styles.grabber} />
            <View style={styles.content}>
              <Text style={styles.title}>Privacy Policy</Text>
              <Text style={styles.description}>
                Filmrush does not collect or share personal data with third parties. All your watch history is stored locally on your device. We do not use tracking, analytics, or advertising SDKs. Your data is yours — always.
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
    fontSize: 14,
    fontFamily: 'Gabarito_400Regular',
    color: '#a1a1aa',
    lineHeight: 14 * 1.7,
  },
});
