import React, { createContext, PropsWithChildren, useContext, useMemo, useState } from 'react';
import { colors, ThemeMode } from '@/constants/theme';

const ThemeContext = createContext<{
  mode: ThemeMode;
  isDark: boolean;
  toggleMode: () => void;
  colors: typeof colors.light;
} | null>(null);

export function ThemeProvider({ children }: PropsWithChildren) {
  const [mode, setMode] = useState<ThemeMode>('light');
  const isDark = mode === 'dark';

  const value = useMemo(
    () => ({
      mode,
      isDark,
      toggleMode: () => setMode((current) => (current === 'light' ? 'dark' : 'light')),
      colors: isDark ? colors.dark : colors.light,
    }),
    [mode, isDark],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme deve ser usado dentro de ThemeProvider.');
  return context;
}
