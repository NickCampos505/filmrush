import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Image } from 'expo-image';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AnimatedPressable } from '@/components/animated-pressable';
import { ExperienceMode, useExperienceMode } from '@/context/experience-mode';

const TROPHY_ICON = require('@/assets/images/icons/trophy.svg');
const FILM_BOARD_ICON = require('@/assets/images/icons/film-board.svg');
const INFO_ICON = require('@/assets/images/icons/info.svg');

type ExperienceModeScreenProps = {
  context: 'onboarding' | 'settings';
};

type ModeCardProps = {
  mode: ExperienceMode;
  title: string;
  description: string;
  iconSource: number;
  selected: boolean;
  onPress: () => void;
};

function ModeCard({
  mode,
  title,
  description,
  iconSource,
  selected,
  onPress,
}: ModeCardProps) {
  return (
    <AnimatedPressable
      style={[styles.modeCard, selected ? styles.modeCardSelected : styles.modeCardDefault]}
      onPress={onPress}
      pressedScale={0.99}
      accessibilityRole="button"
      accessibilityLabel={`Choose ${mode} mode`}
      accessibilityState={{ selected }}
    >
      <View style={styles.modeIconWrap}>
        <Image
          source={iconSource}
          style={[styles.modeIcon, selected ? styles.modeIconSelected : styles.modeIconDefault]}
          contentFit="contain"
        />
      </View>
      <View style={styles.modeTextBlock}>
        <Text style={[styles.modeTitle, selected ? styles.modeTitleSelected : styles.modeTitleDefault]}>
          {title}
        </Text>
        <Text
          style={[
            styles.modeDescription,
            selected ? styles.modeDescriptionSelected : styles.modeDescriptionDefault,
          ]}
        >
          {description}
        </Text>
      </View>
    </AnimatedPressable>
  );
}

export function ExperienceModeScreen({ context }: ExperienceModeScreenProps) {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { mode, setMode } = useExperienceMode();
  const [selectedMode, setSelectedMode] = useState<ExperienceMode>(mode ?? 'competitive');

  const ctaLabel = context === 'onboarding' ? 'Start' : 'Continue';

  async function handleContinue() {
    await setMode(selectedMode);
    if (context === 'onboarding') {
      router.replace('/(tabs)');
      return;
    }
    router.back();
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Choose your experience</Text>

        <View style={styles.cardsRow}>
          <ModeCard
            mode="competitive"
            title="Competitive"
            description="Track every nominee and earn points."
            iconSource={TROPHY_ICON}
            selected={selectedMode === 'competitive'}
            onPress={() => setSelectedMode('competitive')}
          />
          <ModeCard
            mode="casual"
            title="Casual"
            description="Track only the movies you care about."
            iconSource={FILM_BOARD_ICON}
            selected={selectedMode === 'casual'}
            onPress={() => setSelectedMode('casual')}
          />
        </View>

        <View style={styles.infoBox}>
          <Image source={INFO_ICON} style={styles.infoIcon} contentFit="contain" />
          <Text style={styles.infoText}>Competitive shows overall progress and scoring.</Text>
        </View>

        <Text style={styles.helperText}>You can change this anytime.</Text>
      </View>

      <View style={[styles.bottomCtaContainer, { paddingBottom: insets.bottom + 8 }]}>
        <AnimatedPressable
          style={styles.ctaButton}
          onPress={handleContinue}
          pressedScale={0.99}
          accessibilityRole="button"
          accessibilityLabel={ctaLabel}
        >
          <Text style={styles.ctaLabel}>{ctaLabel}</Text>
        </AnimatedPressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#131316',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    gap: 16,
    paddingHorizontal: 16,
    paddingBottom: 48,
  },
  title: {
    fontSize: 18,
    lineHeight: 18 * 1.35,
    fontFamily: 'Gabarito_600SemiBold',
    color: '#ffffff',
    textAlign: 'center',
  },
  cardsRow: {
    flexDirection: 'row',
    gap: 16,
  },
  modeCard: {
    flex: 1,
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    gap: 16,
    minHeight: 136,
  },
  modeCardDefault: {
    borderColor: '#3f3f46',
    backgroundColor: '#131316',
  },
  modeCardSelected: {
    borderColor: '#00ff87',
    borderWidth: 2,
    backgroundColor: '#1d1d20',
  },
  modeIconWrap: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#52525b',
    padding: 8,
    alignSelf: 'flex-start',
  },
  modeIcon: {
    width: 24,
    height: 24,
    opacity: 1,
  },
  modeIconDefault: {
    tintColor: '#a1a1aa',
  },
  modeIconSelected: {
    tintColor: '#00ff87',
  },
  modeTextBlock: {
    gap: 4,
  },
  modeTitle: {
    fontSize: 14,
    lineHeight: 16,
    fontFamily: 'Gabarito_600SemiBold',
  },
  modeTitleDefault: {
    color: '#a1a1aa',
  },
  modeTitleSelected: {
    color: '#ffffff',
  },
  modeDescription: {
    fontSize: 14,
    lineHeight: 14 * 1.15,
    fontFamily: 'Gabarito_400Regular',
  },
  modeDescriptionDefault: {
    color: '#a1a1aa',
  },
  modeDescriptionSelected: {
    color: '#d4d4d8',
  },
  infoBox: {
    backgroundColor: '#1d1d20',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  infoIcon: {
    width: 24,
    height: 24,
    opacity: 0.8,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 14 * 1.15,
    color: '#d4d4d8',
    fontFamily: 'Gabarito_400Regular',
  },
  helperText: {
    fontSize: 14,
    lineHeight: 14 * 1.15,
    color: '#a1a1aa',
    fontFamily: 'Gabarito_400Regular',
    textAlign: 'center',
  },
  bottomCtaContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 16,
    paddingTop: 12,
    backgroundColor: '#131316',
  },
  ctaButton: {
    backgroundColor: '#ffffff',
    borderRadius: 144,
    minHeight: 48,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  ctaLabel: {
    fontSize: 14,
    lineHeight: 16,
    fontFamily: 'Gabarito_600SemiBold',
    color: '#131316',
  },
});
