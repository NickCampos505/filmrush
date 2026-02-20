import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { Image } from 'expo-image';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { WatchButton } from '@/components/watch-button';
import { FILMS } from '@/data/films';
import { useFilmStore } from '@/context/film-store';
import { AnimatedPressable } from '@/components/animated-pressable';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const POSTER_HEIGHT = SCREEN_HEIGHT * 0.58;
const CHEVRON_LEFT_ICON = require('@/assets/images/chevron-left.svg');

export default function MovieScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id: string }>();
  const film = FILMS.find((f) => f.id === id);
  const { watchedIds, toggleWatched } = useFilmStore();
  const watched = !!film && watchedIds.has(film.id);

  if (!film) return null;

  return (
    <View style={styles.container}>
      {/* Scrollable content */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 80 + insets.bottom }}
      >
        {/* Movie Poster */}
        <Image
          source={film.poster}
          style={[styles.poster, { height: POSTER_HEIGHT }]}
          contentFit="cover"
        />

        {/* Movie Info */}
        <View style={styles.infoContainer}>
          {/* Title */}
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{film.title}</Text>
          </View>

          {/* Details */}
          <View style={styles.detailsContainer}>
            <View style={styles.nominationsRow}>
              <Text style={styles.valueText}>{film.nominations}</Text>
              <Text style={styles.labelText}>Nominations</Text>
            </View>

            <View style={styles.directorGenreRow}>
              <View style={styles.directorContainer}>
                <Text style={styles.labelText}>Directed by:</Text>
                <Text style={styles.valueText}>{film.director}</Text>
              </View>
              <View style={styles.genreContainer}>
                <Text style={styles.labelText}>Genre:</Text>
                <Text style={styles.valueText}>{film.genre}</Text>
              </View>
            </View>

            <View style={styles.streamingContainer}>
              <View style={styles.streamingRow}>
                <Text style={styles.labelText}>Where to Watch:</Text>
                <Text style={styles.valueText}>{film.streamingOn}</Text>
              </View>
            </View>
          </View>

          {/* Synopsis */}
          <View style={styles.synopsisSection}>
            <Text style={styles.synopsisLabel}>Synopsis:</Text>
            <Text style={styles.synopsisText}>{film.synopsis}</Text>
          </View>
        </View>
      </ScrollView>

      {/* Back Button */}
      <AnimatedPressable
        style={[styles.backButton, { top: insets.top + 12 }]}
        onPress={() => router.back()}
        pressedScale={0.9}
        accessibilityRole="button"
        accessibilityLabel="Go back"
      >
        <View style={styles.controlBlurOverlay} />
        <Image source={CHEVRON_LEFT_ICON} style={styles.backIcon} contentFit="contain" />
      </AnimatedPressable>

      {watched && (
        <View style={[styles.watchedPointsTag, { top: insets.top + 12 }]}>
          <View style={styles.controlBlurOverlay} />
          <Text style={styles.watchedPointsText}>+{film.points} Pts.</Text>
        </View>
      )}

      {/* Mark as Watched Button */}
      <View style={[styles.bottomBar, { paddingBottom: insets.bottom + 8 }]}>
        <WatchButton watched={watched} onPress={() => toggleWatched(film.id)} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#131316',
  },

  // Poster
  poster: {
    width: SCREEN_WIDTH,
  },

  // Info section
  infoContainer: {
    paddingVertical: 24,
    gap: 16,
  },
  titleContainer: {
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    lineHeight: 24,
    fontFamily: 'Gabarito_600SemiBold',
    color: '#ffffff',
  },

  // Details
  detailsContainer: {
    paddingHorizontal: 16,
    gap: 16,
  },
  nominationsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  directorGenreRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  directorContainer: {
    flex: 1,
    gap: 2,
    alignItems: 'flex-start',
  },
  genreContainer: {
    flex: 1,
    gap: 2,
    alignItems: 'flex-end',
  },
  streamingContainer: {
    gap: 4,
  },
  streamingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  labelText: {
    fontSize: 16,
    fontFamily: 'Gabarito_400Regular',
    color: '#d4d4d8',
    lineHeight: 24,
  },
  valueText: {
    fontSize: 16,
    fontFamily: 'Gabarito_600SemiBold',
    color: '#f4f4f5',
    lineHeight: 24,
  },

  // Synopsis
  synopsisSection: {
    paddingHorizontal: 16,
    gap: 4,
  },
  synopsisLabel: {
    fontSize: 16,
    fontFamily: 'Gabarito_600SemiBold',
    color: '#f4f4f5',
    lineHeight: 24,
  },
  synopsisText: {
    fontSize: 16,
    fontFamily: 'Gabarito_400Regular',
    color: '#a1a1aa',
    lineHeight: 24,
  },

  // Back button
  backButton: {
    position: 'absolute',
    left: 16,
    width: 48,
    height: 48,
    borderRadius: 144,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlBlurOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  backIcon: {
    width: 28,
    height: 28,
  },
  watchedPointsTag: {
    position: 'absolute',
    right: 16,
    minHeight: 48,
    paddingHorizontal: 12,
    borderRadius: 144,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  watchedPointsText: {
    fontSize: 16,
    lineHeight: 16,
    fontFamily: 'Gabarito_600SemiBold',
    color: '#00ff87',
  },

  // Bottom bar
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#131316',
    paddingHorizontal: 16,
    paddingTop: 12,
  },
});
