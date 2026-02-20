import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  FlatList,
  Dimensions,
} from 'react-native';
import { Image } from 'expo-image';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Tag } from '@/components/tag';
import { CATEGORY_FILTERS, CategoryKey, Film, FILMS } from '@/data/films';
import { useFilmStore } from '@/context/film-store';
import { AnimatedPressable } from '@/components/animated-pressable';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { MOTION_DURATION_SLOW, MOTION_EASING_STANDARD } from '@/constants/motion';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const H_PAD = 16;
const CARD_GAP = 16;
const CARD_WIDTH = (SCREEN_WIDTH - H_PAD * 2 - CARD_GAP) / 2;
const CARD_HEIGHT = CARD_WIDTH * (266 / 177);

const LOGO = require('@/assets/images/logo.svg');
const EYE_ICON = require('@/assets/images/eye.svg');
const CHECK_CIRCLE_ICON = require('@/assets/images/check-circle.svg');
const PROFILE_ICON = require('@/assets/images/user.svg');
const EMPTY_STATE_ICON = require('@/assets/images/info.svg');

type MovieCardProps = {
  item: Film;
  watched: boolean;
  onOpenMovie: (id: string) => void;
  onToggleWatched: (id: string) => void;
};

const MovieCard = memo(function MovieCard({
  item,
  watched,
  onOpenMovie,
  onToggleWatched,
}: MovieCardProps) {
  const watchedProgress = useSharedValue(watched ? 1 : 0);

  useEffect(() => {
    watchedProgress.value = withTiming(watched ? 1 : 0, {
      duration: MOTION_DURATION_SLOW,
      easing: MOTION_EASING_STANDARD,
    });
  }, [watched, watchedProgress]);

  const overlayAnimatedStyle = useAnimatedStyle(() => ({
    opacity: watchedProgress.value,
  }));

  const pointsTagAnimatedStyle = useAnimatedStyle(() => ({
    opacity: watchedProgress.value,
    transform: [
      { translateY: (1 - watchedProgress.value) * 8 },
      { scale: 0.94 + watchedProgress.value * 0.06 },
    ],
  }));

  return (
    <AnimatedPressable
      style={styles.card}
      onPress={() => onOpenMovie(item.id)}
      pressedScale={0.98}
      accessibilityRole="button"
      accessibilityLabel={`Open details for ${item.title}`}
    >
      <View style={styles.cardImageWrap}>
        <Image source={item.poster} style={styles.cardImage} contentFit="cover" />

        <Animated.View style={[styles.cardOverlay, overlayAnimatedStyle]} pointerEvents="none" />

        <AnimatedPressable
          style={styles.cardIconBtn}
          onPress={(event) => {
            event.stopPropagation();
            onToggleWatched(item.id);
          }}
          pressedScale={0.9}
          hitSlop={4}
          accessibilityRole="button"
          accessibilityLabel={watched ? `Unmark ${item.title} as watched` : `Mark ${item.title} as watched`}
          accessibilityState={{ checked: watched }}
        >
          <Image
            source={watched ? CHECK_CIRCLE_ICON : EYE_ICON}
            style={styles.cardIcon}
            contentFit="contain"
          />
        </AnimatedPressable>

        <Animated.View style={[styles.pointsTag, pointsTagAnimatedStyle]} pointerEvents="none">
            <Text style={styles.pointsTagText}>+{item.points} Pts.</Text>
        </Animated.View>
      </View>

      <View style={styles.cardInfo}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardNominations}>{item.nominations} Nominations</Text>
      </View>
    </AnimatedPressable>
  );
});

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState<'all' | CategoryKey>('all');
  const { totalPoints, watchedIds, toggleWatched } = useFilmStore();
  const progressTrackWidth = useSharedValue(0);
  const progressFillWidth = useSharedValue(0);

  const filteredFilms = useMemo(
    () =>
      activeCategory === 'all'
        ? FILMS
        : FILMS.filter((f) => f.categories.includes(activeCategory)),
    [activeCategory]
  );

  const watchedInCategory = filteredFilms.filter((film) => watchedIds.has(film.id)).length;
  const totalInCategory = filteredFilms.length;
  const watchedRatio = totalInCategory > 0 ? watchedInCategory / totalInCategory : 0;
  const watchedPercent = Math.round(watchedRatio * 100);
  const handleOpenMovie = useCallback(
    (id: string) => router.push({ pathname: '/movie', params: { id } }),
    [router]
  );
  const handleToggleWatched = useCallback((id: string) => toggleWatched(id), [toggleWatched]);
  const keyExtractor = useCallback((item: Film) => item.id, []);
  const renderMovieCard = useCallback(
    ({ item }: { item: Film }) => (
      <MovieCard
        item={item}
        watched={watchedIds.has(item.id)}
        onOpenMovie={handleOpenMovie}
        onToggleWatched={handleToggleWatched}
      />
    ),
    [handleOpenMovie, handleToggleWatched, watchedIds]
  );

  useEffect(() => {
    if (progressTrackWidth.value === 0) return;
    progressFillWidth.value = withTiming(progressTrackWidth.value * watchedRatio, {
      duration: MOTION_DURATION_SLOW,
      easing: MOTION_EASING_STANDARD,
    });
  }, [watchedRatio, progressFillWidth, progressTrackWidth]);

  const progressFillAnimatedStyle = useAnimatedStyle(() => ({
    width: progressFillWidth.value,
  }));

  const ListEmpty = (
    <View style={styles.emptyState}>
      <Image source={EMPTY_STATE_ICON} style={styles.emptyStateIcon} contentFit="contain" />
      <Text style={styles.emptyStateTitle}>No movies in this category yet</Text>
      <Text style={styles.emptyStateDescription}>
        Try another category or go back to all nominated films.
      </Text>
      {activeCategory !== 'all' && (
        <AnimatedPressable
          style={styles.emptyStateButton}
          onPress={() => setActiveCategory('all')}
          pressedScale={0.97}
          accessibilityRole="button"
          accessibilityLabel="Show all categories"
        >
          <Text style={styles.emptyStateButtonText}>Show All Categories</Text>
        </AnimatedPressable>
      )}
    </View>
  );

  const ListHeader = (
    <View style={[styles.header, { paddingTop: insets.top }]}>
      {/* Logo + Points */}
      <View style={styles.headerRow}>
        <View style={styles.logoContainer}>
          <Image source={LOGO} style={styles.logoImage} contentFit="contain" />
        </View>
        <View style={styles.pointsRow}>
          <View style={styles.pointsBadge}>
            <Text style={styles.pointsText}>{totalPoints} Pts.</Text>
          </View>
          <AnimatedPressable
            style={styles.userBtn}
            onPress={() => router.push('/profile')}
            pressedScale={0.9}
            accessibilityRole="button"
            accessibilityLabel="Open profile"
          >
            <Image source={PROFILE_ICON} style={styles.userIcon} contentFit="contain" />
          </AnimatedPressable>
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
        <View style={styles.progressLeftBlock}>
          <Text style={styles.progressLabel}>{watchedPercent}% Watched</Text>
        </View>
        <View style={styles.progressCenterBlock}>
          <View
            style={styles.progressTrack}
            onLayout={(event) => {
              const width = event.nativeEvent.layout.width;
              progressTrackWidth.value = width;
              progressFillWidth.value = withTiming(width * watchedRatio, {
                duration: MOTION_DURATION_SLOW,
                easing: MOTION_EASING_STANDARD,
              });
            }}
          >
            <Animated.View style={[styles.progressFill, progressFillAnimatedStyle]} />
          </View>
        </View>
        <View style={styles.progressRightBlock}>
          <View style={styles.moviesCount}>
            <Text style={styles.moviesCountBold}>{watchedInCategory}</Text>
            <Text style={styles.moviesCountLight}>/{totalInCategory} Movies</Text>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredFilms}
        keyExtractor={keyExtractor}
        numColumns={2}
        ListHeaderComponent={ListHeader}
        ListEmptyComponent={ListEmpty}
        stickyHeaderIndices={[0]}
        columnWrapperStyle={filteredFilms.length > 0 ? styles.row : undefined}
        contentContainerStyle={[
          styles.listContent,
          { paddingBottom: insets.bottom + 24 },
          filteredFilms.length === 0 && styles.listContentEmpty,
        ]}
        showsVerticalScrollIndicator={false}
        initialNumToRender={6}
        maxToRenderPerBatch={6}
        windowSize={7}
        removeClippedSubviews
        renderItem={renderMovieCard}
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
    paddingHorizontal: 0,
    marginBottom: 16,
    backgroundColor: '#131316',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 56,
    paddingVertical: 8,
    marginBottom: 4,
  },
  logoContainer: {
    width: 160,
    height: 28,
  },
  logoImage: {
    width: '100%',
    height: '100%',
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
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userIcon: {
    width: 24,
    height: 24,
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
    width: '100%',
    gap: 4,
    paddingVertical: 16,
  },
  progressLeftBlock: {
    flex: 1,
  },
  progressCenterBlock: {
    flex: 1,
  },
  progressRightBlock: {
    flex: 1,
    alignItems: 'flex-end',
  },
  progressLabel: {
    fontSize: 16,
    lineHeight: 16,
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
    backgroundColor: '#00ff87',
    borderRadius: 144,
  },
  moviesCount: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  moviesCountBold: {
    fontSize: 16,
    lineHeight: 16,
    color: '#ffffff',
    fontFamily: 'Gabarito_600SemiBold',
  },
  moviesCountLight: {
    fontSize: 16,
    lineHeight: 16,
    color: '#d4d4d8',
    fontFamily: 'Gabarito_400Regular',
  },

  // List
  listContent: {
    paddingHorizontal: H_PAD,
  },
  listContentEmpty: {
    flexGrow: 1,
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
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 12,
  },
  cardIconBtn: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  cardIcon: {
    width: 24,
    height: 24,
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
    gap: 2,
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
  emptyState: {
    flex: 1,
    minHeight: 260,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    gap: 12,
  },
  emptyStateIcon: {
    width: 24,
    height: 24,
    opacity: 0.8,
  },
  emptyStateTitle: {
    fontSize: 18,
    lineHeight: 22,
    color: '#ffffff',
    fontFamily: 'Gabarito_600SemiBold',
    textAlign: 'center',
  },
  emptyStateDescription: {
    fontSize: 14,
    lineHeight: 20,
    color: '#a1a1aa',
    fontFamily: 'Gabarito_400Regular',
    textAlign: 'center',
  },
  emptyStateButton: {
    marginTop: 4,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#3f3f46',
    backgroundColor: '#1d1d20',
  },
  emptyStateButtonText: {
    fontSize: 14,
    lineHeight: 14,
    color: '#f4f4f5',
    fontFamily: 'Gabarito_600SemiBold',
  },
});
