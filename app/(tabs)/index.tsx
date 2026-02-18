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
import { Tag } from '@/components/tag';
import { CATEGORY_FILTERS, CategoryKey, Film, FILMS } from '@/data/films';
import { useFilmStore } from '@/context/film-store';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const H_PAD = 16;
const CARD_GAP = 16;
const CARD_WIDTH = (SCREEN_WIDTH - H_PAD * 2 - CARD_GAP) / 2;
const CARD_HEIGHT = CARD_WIDTH * (266 / 177);

const LOGO = require('@/assets/images/splash.png');
const LOGO_IMG_H = Math.round(200 * (2778 / 1284));
const LOGO_CROP_TOP = -(Math.round(LOGO_IMG_H * 0.55) - 22);

function MovieCard({ item, onPress }: { item: Film; onPress: () => void }) {
  const { watchedIds } = useFilmStore();
  const watched = watchedIds.has(item.id);

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.9}>
      <View style={styles.cardImageWrap}>
        <Image source={{ uri: item.poster }} style={styles.cardImage} resizeMode="cover" />

        {watched && <View style={styles.cardOverlay} />}

        <View style={styles.cardIconBtn}>
          <Feather name={watched ? 'check-circle' : 'eye'} size={20} color="white" />
        </View>

        {watched && (
          <View style={styles.pointsTag}>
            <Text style={styles.pointsTagText}>+{item.points} Pts.</Text>
          </View>
        )}
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
  const [activeCategory, setActiveCategory] = useState<'all' | CategoryKey>('all');
  const { totalPoints, watchedCount } = useFilmStore();

  const filteredFilms =
    activeCategory === 'all'
      ? FILMS
      : FILMS.filter((f) => f.categories.includes(activeCategory));

  const watchedPercent = Math.round((watchedCount / FILMS.length) * 100);

  const ListHeader = (
    <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
      {/* Logo + Points */}
      <View style={styles.headerRow}>
        <View style={styles.logoContainer}>
          <Image source={LOGO} style={styles.logoImage} />
        </View>
        <View style={styles.pointsRow}>
          <View style={styles.pointsBadge}>
            <Text style={styles.pointsText}>{totalPoints} Pts.</Text>
          </View>
          <TouchableOpacity
            style={styles.userBtn}
            activeOpacity={0.7}
            onPress={() => router.push('/profile')}
          >
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
        {CATEGORY_FILTERS.map(({ key, label }) => (
          <Tag
            key={key}
            label={label}
            active={key === activeCategory}
            onPress={() => setActiveCategory(key)}
          />
        ))}
      </ScrollView>

      {/* Progress */}
      <View style={styles.progressRow}>
        <Text style={styles.progressLabel}>{watchedPercent}% Watched</Text>
        <View style={styles.progressTrack}>
          <View
            style={[
              styles.progressFill,
              { width: `${(watchedCount / FILMS.length) * 100}%` as any },
            ]}
          />
        </View>
        <View style={styles.moviesCount}>
          <Text style={styles.moviesCountBold}>{watchedCount}</Text>
          <Text style={styles.moviesCountLight}>/{FILMS.length} Movies</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredFilms}
        keyExtractor={(item) => item.id}
        numColumns={2}
        ListHeaderComponent={() => ListHeader}
        columnWrapperStyle={styles.row}
        contentContainerStyle={[styles.listContent, { paddingBottom: insets.bottom + 24 }]}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <MovieCard
            item={item}
            onPress={() => router.push({ pathname: '/movie', params: { id: item.id } })}
          />
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
  cardOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderRadius: 12,
  },
  cardIconBtn: {
    position: 'absolute',
    top: 4,
    right: 4,
    padding: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  pointsTag: {
    position: 'absolute',
    top: 12,
    left: 12,
    paddingHorizontal: 4,
    paddingVertical: 4,
    borderRadius: 144,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  pointsTagText: {
    fontSize: 16,
    fontFamily: 'Gabarito_600SemiBold',
    color: '#00ff87',
    lineHeight: 16,
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
