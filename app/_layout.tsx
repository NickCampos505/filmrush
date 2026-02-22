import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import {
  Gabarito_400Regular,
  Gabarito_500Medium,
  Gabarito_600SemiBold,
  Gabarito_700Bold,
  useFonts,
} from '@expo-google-fonts/gabarito';
import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as SystemUI from 'expo-system-ui';
import { useEffect } from 'react';
import { Platform } from 'react-native';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { FilmStoreProvider } from '@/context/film-store';
import { ExperienceModeProvider, useExperienceMode } from '@/context/experience-mode';

export const unstable_settings = {
  anchor: '(tabs)',
};

function RootNavigator() {
  const { mode, isReady } = useExperienceMode();
  const segments = useSegments();
  const router = useRouter();
  const pushAnimation = Platform.OS === 'ios' ? 'slide_from_right' : 'fade_from_bottom';

  useEffect(() => {
    if (!isReady) return;

    const topSegment = segments[0];
    const isOnboardingRoute = topSegment === 'onboarding-experience';

    if (!mode && !isOnboardingRoute) {
      router.replace('/onboarding-experience');
      return;
    }

    if (mode && isOnboardingRoute) {
      router.replace('/(tabs)');
    }
  }, [isReady, mode, router, segments]);

  if (!isReady) return null;

  return (
    <Stack screenOptions={{ contentStyle: { backgroundColor: '#131316' } }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="onboarding-experience" options={{ headerShown: false, animation: 'fade' }} />
      <Stack.Screen name="experience" options={{ headerShown: false, animation: pushAnimation }} />
      <Stack.Screen name="movie" options={{ headerShown: false, animation: pushAnimation }} />
      <Stack.Screen name="profile" options={{ headerShown: false, animation: pushAnimation }} />
      <Stack.Screen name="about" options={{ headerShown: false, presentation: 'transparentModal', animation: 'none' }} />
      <Stack.Screen name="privacy" options={{ headerShown: false, presentation: 'transparentModal', animation: 'none' }} />
      <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
    </Stack>
  );
}

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [fontsLoaded] = useFonts({
    Gabarito_400Regular,
    Gabarito_500Medium,
    Gabarito_600SemiBold,
    Gabarito_700Bold,
  });

  useEffect(() => {
    SystemUI.setBackgroundColorAsync('#131316');
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  const baseTheme = colorScheme === 'dark' ? DarkTheme : DefaultTheme;
  const navTheme = {
    ...baseTheme,
    colors: {
      ...baseTheme.colors,
      background: '#131316',
    },
  };

  return (
    <ThemeProvider value={navTheme}>
      <ExperienceModeProvider>
        <FilmStoreProvider>
          <RootNavigator />
          <StatusBar style="light" backgroundColor="#131316" />
        </FilmStoreProvider>
      </ExperienceModeProvider>
    </ThemeProvider>
  );
}
