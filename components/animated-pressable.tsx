import React from 'react';
import { Pressable, PressableProps, StyleProp, ViewStyle } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { MOTION_DURATION_SLOW, MOTION_EASING_STANDARD } from '@/constants/motion';

type AnimatedPressableProps = PressableProps & {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  pressedScale?: number;
  duration?: number;
};

const AnimatedPressableComponent = Animated.createAnimatedComponent(Pressable);

export function AnimatedPressable({
  children,
  style,
  pressedScale = 0.96,
  duration = MOTION_DURATION_SLOW,
  onPressIn,
  onPressOut,
  ...pressableProps
}: AnimatedPressableProps) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <AnimatedPressableComponent
      {...pressableProps}
      style={[style, animatedStyle]}
      onPressIn={(event) => {
        scale.value = withTiming(pressedScale, {
          duration,
          easing: MOTION_EASING_STANDARD,
        });
        onPressIn?.(event);
      }}
      onPressOut={(event) => {
        scale.value = withTiming(1, {
          duration,
          easing: MOTION_EASING_STANDARD,
        });
        onPressOut?.(event);
      }}
    >
      {children}
    </AnimatedPressableComponent>
  );
}
