import { Stack } from 'expo-router';
import { Alert } from 'react-native';
import { useEffect, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider, useTheme } from '@/context/ThemeContext';
import { DeviceProvider } from '@/context/DeviceContext';
import { SensorProvider } from '@/context/SensorContext';
import { SecurityProvider, useSecurity } from '@/context/SecurityContext';

function Navigation() {
  const { isDark } = useTheme();
  const { alarmActive } = useSecurity();
  const previousAlarm = useRef(false);

  useEffect(() => {
    if (alarmActive && !previousAlarm.current) {
      Alert.alert(
        'Alarme disparado',
        'Movimento detectado enquanto o sistema de segurança estava ativado.',
      );
    }

    previousAlarm.current = alarmActive;
  }, [alarmActive]);

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
