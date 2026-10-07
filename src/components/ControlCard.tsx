import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { useTheme } from '@/context/ThemeContext';
import { ControlCard as ControlCardType } from '@/types';

function getIcon(name: string) {
  switch (name) {
    case 'garage':
      return 'garage-variant';
    case 'lights':
      return 'lightbulb-on-outline';
    case 'access':
      return 'door-open';
    default:
      return 'home-outline';
  }
}

type Props = ControlCardType;

export function ControlCard({ id, title, subtitle, icon }: Props) {
  const { colors } = useTheme();

  return (
    <Pressable
      onPress={() => {
        if (id === 'access') {
          router.push('/acessos');
          return;
        }

        router.push(`/controle/${id}`);
      }}
      style={({ pressed }) => [
        styles.card,
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
          opacity: pressed ? 0.9 : 1,
        },
      ]}
    >
      <View style={styles.iconRow}>
        <MaterialCommunityIcons name={getIcon(icon) as any} size={46} color="#00E5FF" />
        <MaterialCommunityIcons name="chevron-right" size={29} color={colors.secondary} />
      </View>

      <View style={styles.textArea}>
        <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
        <Text style={[styles.subtitle, { color: colors.secondary }]}>{subtitle}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    minHeight: 166,
    borderRadius: 20,
    borderWidth: 1,
    padding: 17,
    justifyContent: 'space-between',
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textArea: {
    marginTop: 18,
  },
  title: {
    fontSize: 19,
    fontWeight: '800',
  },
  subtitle: {
    marginTop: 5,
    fontSize: 12,
    lineHeight: 17,
  },
});
