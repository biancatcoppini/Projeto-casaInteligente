import { Tabs } from 'expo-router';
import { useTheme } from '@/context/ThemeContext';
import { BottomNav } from '@/components/BottomNav';

export default function TabsLayout() {
  const { colors } = useTheme();

  return (
    <Tabs
      tabBar={() => <BottomNav />}
      screenOptions={{
        headerShown: false,
        sceneStyle: { backgroundColor: colors.background },
      }}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="comodos" />
    </Tabs>
  );
}
