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
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const POSTER_HEIGHT = SCREEN_HEIGHT * 0.58;

// Figma asset URL (temporary — replace with real asset)
const MOVIE_POSTER_URL = 'https://www.figma.com/api/mcp/asset/12cc8765-1d63-4ef2-b75d-79074c293545';

export default function MovieScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      {/* Scrollable content */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 80 + insets.bottom }}
      >
        {/* Movie Poster */}
        <Image
          source={{ uri: MOVIE_POSTER_URL }}
          style={[styles.poster, { height: POSTER_HEIGHT }]}
          resizeMode="cover"
        />

        {/* Movie Info */}
        <View style={styles.infoContainer}>
          {/* Title */}
          <Text style={styles.title}>The Secret Agent</Text>

          {/* Nominations + Genre + Director */}
          <View style={styles.detailsSection}>
            <View style={styles.nominationsGenreRow}>
              <View style={styles.inlineRow}>
                <Text style={styles.valueText}>5 </Text>
                <Text style={styles.labelText}>Nominations</Text>
              </View>
              <View style={styles.inlineRow}>
                <Text style={styles.labelText}>Genre: </Text>
                <Text style={styles.valueText}>{'Thriller'}</Text>
              </View>
            </View>
            <View style={styles.inlineRow}>
              <Text style={styles.labelText}>Directed by: </Text>
              <Text style={styles.valueText}>{'Alfred Hitchcock'}</Text>
            </View>
          </View>

          {/* Where to Watch */}
          <View style={styles.inlineRow}>
            <Text style={styles.labelText}>Where to Watch: </Text>
            <Text style={styles.valueText}>{'Netflix'}</Text>
          </View>

          {/* Synopsis */}
          <View style={styles.synopsisSection}>
            <Text style={styles.synopsisLabel}>Synopsis:</Text>
            <Text style={styles.synopsisText}>
              {`Lorem ipsum dolor sit amet consectetur. Sapien sodales eu a ornare sagittis. Pulvinar tortor nec fermentum tristique molestie duis risus morbi. Integer eget vitae arcu posuere convallis nibh faucibus. Aliquam lectus faucibus volutpat vestibulum eget rutrum. Mattis leo amet elementum porttitor amet est in tellus. Cursus volutpat convallis est at. Turpis sed amet purus tincidunt nisi arcu quis vitae eleifend.`}
            </Text>
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
        <TouchableOpacity style={styles.watchedButton} activeOpacity={0.8}>
          <Feather name="plus" size={24} color="white" />
          <Text style={styles.watchedButtonText}>Mark as Watched</Text>
        </TouchableOpacity>
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
  watchedButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: '#3f3f46',
    borderRadius: 144,
    paddingVertical: 12,
    paddingRight: 16,
  },
  watchedButtonText: {
    fontSize: 14,
    fontFamily: 'Gabarito_600SemiBold',
    color: '#ffffff',
    lineHeight: 14 * 1.15,
  },
});
