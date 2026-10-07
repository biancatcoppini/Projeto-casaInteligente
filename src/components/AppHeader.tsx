import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { useTheme } from '@/context/ThemeContext';

type Props = {
  showBack?: boolean;
  title?: string;
  subtitle?: string;
  showSettings?: boolean;
};

export function AppHeader({
  showBack = false,
  title = 'NexHome',
  subtitle = 'Sua casa, mais inteligente.',
  showSettings = true,
}: Props) {
  const { isDark, toggleMode, colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.header }]}>
      <View style={styles.brandRow}>
        {showBack ? (
          <Pressable
            onPress={() => router.back()}
            style={styles.sideButton}
            accessibilityRole="button"
            accessibilityLabel="Voltar"
          >
            <MaterialCommunityIcons name="arrow-left" size={29} color={colors.icon} />
          </Pressable>
        ) : (
          <MaterialCommunityIcons name="home-outline" size={42} color={colors.icon} />
        )}

        <View style={styles.brandText}>
          <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
          <Text style={[styles.subtitle, { color: colors.secondary }]}>{subtitle}</Text>
        </View>
      </View>

      <View style={styles.actions}>
        {showSettings ? (
          <Pressable
            onPress={() => router.push('/configuracoes')}
            style={styles.modeButton}
            accessibilityRole="button"
            accessibilityLabel="Abrir configurações"
          >
            <MaterialCommunityIcons name="cog-outline" size={27} color={colors.icon} />
          </Pressable>
        ) : null}

        <Pressable
          onPress={toggleMode}
          style={styles.modeButton}
          accessibilityRole="button"
          accessibilityLabel={isDark ? 'Ativar modo claro' : 'Ativar modo escuro'}
        >
          <MaterialCommunityIcons
            name={isDark ? 'white-balance-sunny' : 'moon-waning-crescent'}
            size={28}
            color={colors.icon}
          />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: 108,
    borderRadius: 28,
    paddingHorizontal: 20,
    paddingVertical: 17,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  sideButton: {
    width: 42,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  brandText: {
    marginLeft: 14,
    flexShrink: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
  },
  subtitle: {
    marginTop: 2,
    fontSize: 13,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  modeButton: {
    width: 46,
    height: 46,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 23,
  },
});
