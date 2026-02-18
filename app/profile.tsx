import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';

const WATCHED_COUNT = 7;
const TOTAL_MOVIES = 20;
const WATCHED_PERCENT = Math.round((WATCHED_COUNT / TOTAL_MOVIES) * 100);

type OptionRowProps = {
  icon: React.ComponentProps<typeof Feather>['name'];
  label: string;
  dimmed?: boolean;
  badge?: string;
  onPress?: () => void;
};

function OptionRow({ icon, label, dimmed = false, badge, onPress }: OptionRowProps) {
  return (
    <TouchableOpacity style={styles.optionRow} onPress={onPress} activeOpacity={0.7}>
      <Feather name={icon} size={24} color={dimmed ? '#a1a1aa' : '#ffffff'} />
      <View style={styles.optionContent}>
        <Text style={[styles.optionLabel, dimmed && styles.optionLabelDim]}>{label}</Text>
        {badge && (
          <View style={styles.soonBadge}>
            <Text style={styles.soonText}>{badge}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

export default function ProfileScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()} activeOpacity={0.8}>
          <Feather name="chevron-left" size={28} color="white" />
        </TouchableOpacity>
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
            <Feather name="award" size={24} color="#ffffff" />
            <Text style={styles.progressTitle}>Progress</Text>
            <View style={styles.pointsBadge}>
              <Text style={styles.pointsText}>10 Pts.</Text>
            </View>
          </View>

          {/* Progress Bar */}
          <View style={styles.progressBarWrap}>
            <View style={styles.progressTrack}>
              <View
                style={[
                  styles.progressFill,
                  { width: `${(WATCHED_COUNT / TOTAL_MOVIES) * 100}%` as any },
                ]}
              />
            </View>
          </View>

          {/* Stats */}
          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{WATCHED_PERCENT}%</Text>
              <Text style={styles.statLabel}>Watched</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{WATCHED_COUNT}</Text>
              <Text style={styles.statLabel}>/20 Movies</Text>
            </View>
          </View>
        </View>

        {/* Options Section */}
        <View style={styles.optionsSection}>
          <OptionRow icon="award" label="Badges" dimmed badge="Soon" />
          <OptionRow icon="upload" label="Share With Friends" />
          <OptionRow icon="info" label="About" onPress={() => router.push('/about')} />
          <OptionRow icon="file-text" label="Privacy Policy" />
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
    gap: 16,
  },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  backButton: {
    width: 48,
    height: 48,
    borderRadius: 144,
    borderWidth: 1.2,
    borderColor: '#3f3f46',
    alignItems: 'center',
    justifyContent: 'center',
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
    paddingTop: 16,
    paddingBottom: 24,
  },
  progressHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    padding: 16,
  },
  progressTitle: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Gabarito_600SemiBold',
    color: '#ffffff',
    lineHeight: 16 * 1.5,
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
    backgroundColor: 'white',
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
