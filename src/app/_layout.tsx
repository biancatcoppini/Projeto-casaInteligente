import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider, useTheme } from '@/context/ThemeContext';
import { DeviceProvider } from '@/context/DeviceContext';
import { SensorProvider } from '@/context/SensorContext';
import { SecurityProvider } from '@/context/SecurityContext';

function Navigation() {
  const { isDark } = useTheme();

  return (
    <>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <Stack screenOptions={{ headerShown: false, animation: 'slide_from_right' }} />
    </>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <DeviceProvider>
        <SensorProvider>
          <SecurityProvider>
            <Navigation />
          </SecurityProvider>
        </SensorProvider>
      </DeviceProvider>
    </ThemeProvider>
  );
}
