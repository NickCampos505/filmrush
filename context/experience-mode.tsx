import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

const EXPERIENCE_MODE_KEY = 'filmrush:experience-mode';

export type ExperienceMode = 'competitive' | 'casual';

type ExperienceModeContextType = {
  mode: ExperienceMode | null;
  isReady: boolean;
  setMode: (mode: ExperienceMode) => Promise<void>;
};

const ExperienceModeContext = createContext<ExperienceModeContextType | null>(null);

export function ExperienceModeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setModeState] = useState<ExperienceMode | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let mounted = true;
    AsyncStorage.getItem(EXPERIENCE_MODE_KEY)
      .then((value) => {
        if (!mounted) return;
        if (value === 'competitive' || value === 'casual') {
          setModeState(value);
        }
      })
      .finally(() => {
        if (mounted) setIsReady(true);
      });
    return () => {
      mounted = false;
    };
  }, []);

  async function setMode(modeValue: ExperienceMode) {
    setModeState(modeValue);
    await AsyncStorage.setItem(EXPERIENCE_MODE_KEY, modeValue);
  }

  const value = useMemo(
    () => ({
      mode,
      isReady,
      setMode,
    }),
    [isReady, mode]
  );

  return (
    <ExperienceModeContext.Provider value={value}>
      {children}
    </ExperienceModeContext.Provider>
  );
}

export function useExperienceMode() {
  const ctx = useContext(ExperienceModeContext);
  if (!ctx) throw new Error('useExperienceMode must be used within ExperienceModeProvider');
  return ctx;
}

