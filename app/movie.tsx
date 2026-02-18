import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { WatchButton } from '@/components/watch-button';
import { FILMS } from '@/data/films';
import { useFilmStore } from '@/context/film-store';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const POSTER_HEIGHT = SCREEN_HEIGHT * 0.58;

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
          source={{ uri: film.poster }}
          style={[styles.poster, { height: POSTER_HEIGHT }]}
          resizeMode="cover"
        />

        {/* Movie Info */}
        <View style={styles.infoContainer}>
          {/* Title */}
          <Text style={styles.title}>{film.title}</Text>

          {/* Nominations + Genre + Director */}
          <View style={styles.detailsSection}>
            <View style={styles.nominationsGenreRow}>
              <View style={styles.inlineRow}>
                <Text style={styles.valueText}>{film.nominations} </Text>
                <Text style={styles.labelText}>Nominations</Text>
              </View>
              <View style={styles.inlineRow}>
                <Text style={styles.labelText}>Genre: </Text>
                <Text style={styles.valueText}>{film.genre}</Text>
              </View>
            </View>
            <View style={styles.inlineRow}>
              <Text style={styles.labelText}>Directed by: </Text>
              <Text style={styles.valueText}>{film.director}</Text>
            </View>
          </View>

          {/* Where to Watch */}
          <View style={styles.inlineRow}>
            <Text style={styles.labelText}>Where to Watch: </Text>
            <Text style={styles.valueText}>{film.streamingOn}</Text>
          </View>

          {/* Synopsis */}
          <View style={styles.synopsisSection}>
            <Text style={styles.synopsisLabel}>Synopsis:</Text>
            <Text style={styles.synopsisText}>{film.synopsis}</Text>
          </View>
        </View>
      </ScrollView>

      {/* Back Button */}
      <TouchableOpacity
        style={[styles.backButton, { top: insets.top + 12 }]}
        onPress={() => router.back()}
        activeOpacity={0.8}
      >
        <Feather name="chevron-left" size={28} color="white" />
      </TouchableOpacity>

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
    paddingHorizontal: 16,
    paddingVertical: 24,
    gap: 16,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Gabarito_600SemiBold',
    color: '#ffffff',
  },

  // Details
  detailsSection: {
    gap: 8,
  },
  nominationsGenreRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inlineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  labelText: {
    fontSize: 14,
    fontFamily: 'Gabarito_400Regular',
    color: '#d4d4d8',
    lineHeight: 14 * 1.15,
  },
  valueText: {
    fontSize: 14,
    fontFamily: 'Gabarito_600SemiBold',
    color: '#f4f4f5',
    lineHeight: 14 * 1.15,
  },

  // Synopsis
  synopsisSection: {
    gap: 4,
  },
  synopsisLabel: {
    fontSize: 14,
    fontFamily: 'Gabarito_600SemiBold',
    color: '#f4f4f5',
    lineHeight: 14 * 1.15,
  },
  synopsisText: {
    fontSize: 14,
    fontFamily: 'Gabarito_400Regular',
    color: '#a1a1aa',
    lineHeight: 14 * 1.7,
  },

  // Back button
  backButton: {
    position: 'absolute',
    left: 16,
    width: 48,
    height: 48,
    borderRadius: 144,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    alignItems: 'center',
    justifyContent: 'center',
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
