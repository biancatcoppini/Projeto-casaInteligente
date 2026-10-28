import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { usePathname, router } from 'expo-router';
import type { Href } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@/context/ThemeContext';

const items = [
  { label: 'Início', icon: 'home-outline', route: '/' },
  { label: 'Cômodos', icon: 'format-list-bulleted', route: '/(tabs)/comodos' },
] as const;

export function BottomNav() {
  const pathname = usePathname();
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.outer, { backgroundColor: colors.background, paddingBottom: insets.bottom }]}>
      <View style={[styles.container, { backgroundColor: colors.header, borderColor: colors.border }]}>
        {items.map((item) => {
          const selected = item.route === '/' ? pathname === '/' : pathname.includes('/comodos');

          return (
            <Pressable
              key={item.label}
              onPress={() => router.navigate(item.route as Href)}
              style={({ pressed }) => [styles.item, { opacity: pressed ? 0.75 : 1 }]}
              accessibilityRole="tab"
              accessibilityLabel={item.label}
              accessibilityState={{ selected }}
            >
              <MaterialCommunityIcons
                name={item.icon as any}
                size={26}
                color={selected ? '#00E5FF' : colors.secondary}
              />
              <Text style={[styles.label, { color: selected ? '#00E5FF' : colors.secondary }]}>
                {item.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outer: {
    paddingHorizontal: 10,
    paddingTop: 8,
  },
  container: {
    minHeight: 72,
    borderRadius: 24,
    borderWidth: 1,
    paddingHorizontal: 18,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  item: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  label: {
    fontSize: 11,
    fontWeight: '700',
  },
});
