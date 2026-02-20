import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { MOTION_DURATION_FAST, MOTION_DURATION_SLOW, MOTION_EASING_STANDARD } from '@/constants/motion';

export default function PrivacyScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [closing, setClosing] = useState(false);
  const overlayOpacity = useSharedValue(0);
  const sheetTranslateY = useSharedValue(24);

  useEffect(() => {
    overlayOpacity.value = withTiming(1, { duration: MOTION_DURATION_SLOW, easing: MOTION_EASING_STANDARD });
    sheetTranslateY.value = withTiming(0, { duration: MOTION_DURATION_SLOW, easing: MOTION_EASING_STANDARD });
  }, [overlayOpacity, sheetTranslateY]);

  const overlayAnimatedStyle = useAnimatedStyle(() => ({
    opacity: overlayOpacity.value,
  }));

  const sheetAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: sheetTranslateY.value }],
  }));

  const closeModal = useCallback(() => {
    if (closing) return;
    setClosing(true);
    overlayOpacity.value = withTiming(0, { duration: MOTION_DURATION_FAST, easing: MOTION_EASING_STANDARD });
    sheetTranslateY.value = withTiming(24, { duration: MOTION_DURATION_FAST, easing: MOTION_EASING_STANDARD }, (finished) => {
      if (finished) runOnJS(router.back)();
    });
  }, [closing, overlayOpacity, router, sheetTranslateY]);

  return (
    <TouchableWithoutFeedback onPress={closeModal}>
      <Animated.View style={[styles.overlay, overlayAnimatedStyle]}>
        <TouchableWithoutFeedback>
          <Animated.View style={[styles.sheet, sheetAnimatedStyle, { paddingBottom: 32 + insets.bottom }]}>
            <View style={styles.grabber} />
            <View style={styles.content}>
              <Text style={styles.title}>Privacy Policy</Text>
              <Text style={styles.description}>
                Filmrush does not collect or share personal data with third parties. All your watch history is stored locally on your device. We do not use tracking, analytics, or advertising SDKs. Your data is yours — always.
              </Text>
            </View>
          </Animated.View>
        </TouchableWithoutFeedback>
      </Animated.View>
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
    lineHeight: 24,
  },
});
