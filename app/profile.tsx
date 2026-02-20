import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Share,
  Alert,
} from 'react-native';
import { Image } from 'expo-image';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { FILMS } from '@/data/films';
import { useFilmStore } from '@/context/film-store';
import { AnimatedPressable } from '@/components/animated-pressable';

const CHEVRON_LEFT_ICON = require('@/assets/images/chevron-left.svg');
const AWARD_ICON = require('@/assets/images/award.svg');
const TROPHY_ICON = require('@/assets/images/trophy.svg');
const EXPORT_ICON = require('@/assets/images/export.svg');
const INFO_ICON = require('@/assets/images/info.svg');
const FILE_ICON = require('@/assets/images/file.svg');

type OptionRowProps = {
  iconSource: number;
  label: string;
  dimmed?: boolean;
  badge?: string;
  onPress?: () => void;
};

function OptionRow({ iconSource, label, dimmed = false, badge, onPress }: OptionRowProps) {
  return (
    <AnimatedPressable
      style={styles.optionRow}
      onPress={onPress}
      pressedScale={0.98}
      disabled={!onPress}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled: !onPress }}
    >
      <Image
        source={iconSource}
        style={[styles.optionIcon, dimmed && styles.optionIconDim]}
        contentFit="contain"
      />
      <View style={styles.optionContent}>
        <Text style={[styles.optionLabel, dimmed && styles.optionLabelDim]}>{label}</Text>
        {badge && (
          <View style={styles.soonBadge}>
            <Text style={styles.soonText}>{badge}</Text>
          </View>
        )}
      </View>
    </AnimatedPressable>
  );
}

export default function ProfileScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { totalPoints, watchedCount } = useFilmStore();
  const watchedPercent = Math.round((watchedCount / FILMS.length) * 100);

  async function handleShareWithFriends() {
    try {
      await Share.share({
        message:
          "I'm tracking this year's Oscar nominees on FilmRush. Join me and let's see who watches the most!",
      });
    } catch {
      Alert.alert('Share unavailable', 'Could not open the share sheet right now. Please try again.');
    }
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <AnimatedPressable
          style={styles.backButton}
          onPress={() => router.back()}
          pressedScale={0.9}
          accessibilityRole="button"
          accessibilityLabel="Go back"
        >
          <Image source={CHEVRON_LEFT_ICON} style={styles.backIcon} contentFit="contain" />
        </AnimatedPressable>
        <Text style={styles.headerTitle}>My Profile</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 48 }]}
      >
        {/* Progress Section */}
        <View style={styles.progressSection}>
          {/* Progress Header */}
          <View style={styles.progressHeader}>
            <Image source={TROPHY_ICON} style={styles.progressIcon} contentFit="contain" />
            <Text style={styles.progressTitle}>Achievements</Text>
            <View style={styles.pointsBadge}>
              <Text style={styles.pointsText}>{totalPoints} Pts.</Text>
            </View>
          </View>

          {/* Progress Bar */}
          <View style={styles.progressBarWrap}>
            <View style={styles.progressTrack}>
              <View
                style={[
                  styles.progressFill,
                  { width: `${(watchedCount / FILMS.length) * 100}%` as any },
                ]}
              />
            </View>
          </View>

          {/* Stats */}
          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{watchedPercent}%</Text>
              <Text style={styles.statLabel}>Watched</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{watchedCount}</Text>
              <Text style={styles.statLabel}>/{FILMS.length} Movies</Text>
            </View>
          </View>
        </View>

        {/* Options Section */}
        <View style={styles.optionsSection}>
          <OptionRow iconSource={AWARD_ICON} label="Badges" dimmed badge="Soon" />
          <OptionRow iconSource={EXPORT_ICON} label="Share With Friends" onPress={handleShareWithFriends} />
          <OptionRow iconSource={INFO_ICON} label="About" onPress={() => router.push('/about')} />
          <OptionRow iconSource={FILE_ICON} label="Privacy Policy" onPress={() => router.push('/privacy')} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#131316',
  },
  scrollContent: {
    paddingTop: 16,
    gap: 16,
  },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
    minHeight: 56,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 144,
    borderWidth: 1.2,
    borderColor: '#3f3f46',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    width: 24,
    height: 24,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: 'Gabarito_600SemiBold',
    color: '#ffffff',
    lineHeight: 18 * 1.35,
  },

  // Progress Section
  progressSection: {
    backgroundColor: '#1d1d20',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 24,
  },
  progressHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    padding: 16,
  },
  progressIcon: {
    width: 24,
    height: 24,
  },
  progressTitle: {
    flex: 1,
    fontSize: 18,
    fontFamily: 'Gabarito_600SemiBold',
    color: '#ffffff',
    lineHeight: 18 * 1.35,
  },
  pointsBadge: {
    backgroundColor: 'rgba(0, 255, 135, 0.1)',
    borderRadius: 144,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  pointsText: {
    color: '#00ff87',
    fontSize: 16,
    fontFamily: 'Gabarito_500Medium',
  },

  // Progress bar
  progressBarWrap: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  progressTrack: {
    height: 14,
    backgroundColor: '#1d1d20',
    borderRadius: 144,
    borderWidth: 1,
    borderColor: '#71717a',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#00ff87',
    borderRadius: 144,
  },

  // Stats
  statsRow: {
    flexDirection: 'row',
    gap: 16,
    paddingHorizontal: 16,
  },
  statCard: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#3f3f46',
    borderRadius: 16,
    padding: 16,
    gap: 4,
  },
  statValue: {
    fontSize: 40,
    fontFamily: 'Gabarito_600SemiBold',
    color: '#ffffff',
    lineHeight: 40 * 1.15,
  },
  statLabel: {
    fontSize: 14,
    fontFamily: 'Gabarito_600SemiBold',
    color: '#d4d4d8',
    lineHeight: 14 * 1.15,
  },

  // Options
  optionsSection: {
    paddingTop: 8,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  optionIcon: {
    width: 24,
    height: 24,
  },
  optionIconDim: {
    opacity: 0.65,
  },
  optionContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  optionLabel: {
    fontSize: 16,
    fontFamily: 'Gabarito_600SemiBold',
    color: '#ffffff',
    lineHeight: 16 * 1.5,
  },
  optionLabelDim: {
    color: '#a1a1aa',
  },
  soonBadge: {
    backgroundColor: '#1d1d20',
    borderWidth: 1,
    borderColor: '#3f3f46',
    borderRadius: 4,
    paddingHorizontal: 4,
    paddingVertical: 2,
  },
  soonText: {
    fontSize: 14,
    fontFamily: 'Gabarito_600SemiBold',
    color: '#a1a1aa',
    lineHeight: 14 * 1.15,
  },
});
