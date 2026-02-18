import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
  Dimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const H_PAD = 16;
const CARD_GAP = 16;
const CARD_WIDTH = (SCREEN_WIDTH - H_PAD * 2 - CARD_GAP) / 2;
const CARD_HEIGHT = CARD_WIDTH * (266 / 177);

// Assets
const LOGO = require('@/assets/images/splash.png');
// splash.png: 1284×2778 — logo centered at ~55% height
// Scaled to container width 200: height = 200 * (2778/1284) ≈ 433px, logo at ≈238px
const LOGO_IMG_H = Math.round(200 * (2778 / 1284));
const LOGO_CROP_TOP = -(Math.round(LOGO_IMG_H * 0.55) - 22);

const CARD_IMAGE_URL = 'https://www.figma.com/api/mcp/asset/033e71b8-cf4d-46e1-813e-334afe8f1e73';

const CATEGORIES = [
  'All Categories',
  'Best Movie',
  'Best Director',
  'Best Actor',
  'Best Screenplay',
  'Best Photography',
];

type Movie = {
  id: string;
  title: string;
  nominations: number;
};

const MOVIES: Movie[] = [
  { id: '1', title: 'The Secret Agent', nominations: 5 },
  { id: '2', title: 'The Secret Agent', nominations: 3 },
  { id: '3', title: 'The Secret Agent', nominations: 7 },
  { id: '4', title: 'The Secret Agent', nominations: 4 },
  { id: '5', title: 'The Secret Agent', nominations: 2 },
  { id: '6', title: 'The Secret Agent', nominations: 6 },
  { id: '7', title: 'The Secret Agent', nominations: 8 },
];

const WATCHED_COUNT = 7;
const TOTAL_MOVIES = 20;
const WATCHED_PERCENT = Math.round((WATCHED_COUNT / TOTAL_MOVIES) * 100);

function MovieCard({ item, onPress }: { item: Movie; onPress: () => void }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.9}>
      <View style={styles.cardImageWrap}>
        <Image source={{ uri: CARD_IMAGE_URL }} style={styles.cardImage} resizeMode="cover" />
        <TouchableOpacity style={styles.eyeBtn} activeOpacity={0.8}>
          <Feather name="eye" size={20} color="white" />
        </TouchableOpacity>
      </View>
      <View style={styles.cardInfo}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardNominations}>{item.nominations} Nominations</Text>
      </View>
    </TouchableOpacity>
  );
}

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState('All Categories');

  const ListHeader = (
    <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
      {/* Logo + Points */}
      <View style={styles.headerRow}>
        <View style={styles.logoContainer}>
          <Image source={LOGO} style={styles.logoImage} />
        </View>
        <View style={styles.pointsRow}>
          <View style={styles.pointsBadge}>
            <Text style={styles.pointsText}>10 Pts.</Text>
          </View>
          <TouchableOpacity style={styles.userBtn} activeOpacity={0.7} onPress={() => router.push('/profile')}>
            <Feather name="user" size={24} color="#d4d4d8" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Categories */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesContent}
      >
        {CATEGORIES.map((cat) => (
          <TouchableOpacity
            key={cat}
            onPress={() => setActiveCategory(cat)}
            style={[styles.tag, cat === activeCategory ? styles.tagActive : styles.tagDefault]}
            activeOpacity={0.8}
          >
            <Text
              style={[
                styles.tagLabel,
                cat === activeCategory ? styles.tagLabelActive : styles.tagLabelDefault,
              ]}
            >
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Progress */}
      <View style={styles.progressRow}>
        <Text style={styles.progressLabel}>{WATCHED_PERCENT}% Watched</Text>
        <View style={styles.progressTrack}>
          <View
            style={[
              styles.progressFill,
              { width: `${(WATCHED_COUNT / TOTAL_MOVIES) * 100}%` as any },
            ]}
          />
        </View>
        <View style={styles.moviesCount}>
          <Text style={styles.moviesCountBold}>{WATCHED_COUNT}</Text>
          <Text style={styles.moviesCountLight}>/20 Movies</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={MOVIES}
        keyExtractor={(item) => item.id}
        numColumns={2}
        ListHeaderComponent={() => ListHeader}
        columnWrapperStyle={styles.row}
        contentContainerStyle={[styles.listContent, { paddingBottom: insets.bottom + 24 }]}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <MovieCard item={item} onPress={() => router.push('/movie')} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#131316',
  },

  // Header
  header: {
    paddingHorizontal: H_PAD,
    marginBottom: 16,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  logoContainer: {
    width: 200,
    height: 44,
    overflow: 'hidden',
  },
  logoImage: {
    width: 200,
    height: LOGO_IMG_H,
    position: 'absolute',
    top: LOGO_CROP_TOP,
    left: 0,
  },
  pointsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
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
  userBtn: {
    padding: 8,
  },

  // Categories
  categoriesContent: {
    flexDirection: 'row',
    gap: 8,
    paddingTop: 16,
    paddingBottom: 8,
    paddingRight: H_PAD,
  },
  tag: {
    borderRadius: 144,
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderWidth: 1,
  },
  tagActive: {
    backgroundColor: 'white',
    borderColor: '#1d1d20',
  },
  tagDefault: {
    backgroundColor: 'transparent',
    borderColor: '#3f3f46',
  },
  tagLabel: {
    fontSize: 16,
  },
  tagLabelActive: {
    color: '#000',
    fontFamily: 'Gabarito_600SemiBold',
  },
  tagLabelDefault: {
    color: '#d4d4d8',
    fontFamily: 'Gabarito_400Regular',
  },

  // Progress
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    paddingVertical: 16,
  },
  progressLabel: {
    fontSize: 14,
    color: '#d4d4d8',
    fontFamily: 'Gabarito_600SemiBold',
  },
  progressTrack: {
    flex: 1,
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
  moviesCount: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  moviesCountBold: {
    fontSize: 14,
    color: '#ffffff',
    fontFamily: 'Gabarito_600SemiBold',
  },
  moviesCountLight: {
    fontSize: 14,
    color: '#d4d4d8',
    fontFamily: 'Gabarito_400Regular',
  },

  // List
  listContent: {
    paddingHorizontal: H_PAD,
  },
  row: {
    gap: CARD_GAP,
    marginBottom: CARD_GAP,
  },

  // Card
  card: {
    width: CARD_WIDTH,
  },
  cardImageWrap: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 8,
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  eyeBtn: {
    position: 'absolute',
    top: 4,
    right: 4,
    padding: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  cardInfo: {
    gap: 4,
  },
  cardTitle: {
    fontSize: 14,
    fontFamily: 'Gabarito_600SemiBold',
    color: '#ffffff',
  },
  cardNominations: {
    fontSize: 14,
    fontFamily: 'Gabarito_400Regular',
    color: '#d4d4d8',
  },
});
