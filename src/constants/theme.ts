export const colors = {
  cyan: '#00E5FF',
  cyanActive: '#00CFEF',
  cyanHover: '#33F0FF',
  red: '#FF4D4D',
  redHover: '#FF7676',
  light: {
    background: '#F5F7FA',
    surface: '#FFFFFF',
    header: '#E8F1FA',
    cardActive: '#E9F9FD',
    cardDanger: '#FFF0F1',
    text: '#1E293B',
    secondary: '#64748B',
    border: '#D9E4EE',
    icon: '#304A63',
  },
  dark: {
    background: '#0B0F14',
    surface: '#101820',
    header: '#1A2A33',
    cardActive: '#082833',
    cardDanger: '#1C171B',
    text: '#E6F1FF',
    secondary: '#94A3B8',
    border: '#2A3B47',
    icon: '#B8D5E8',
  },
} as const;

export type ThemeMode = 'light' | 'dark';
