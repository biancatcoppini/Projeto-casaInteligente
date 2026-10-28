import { MaterialCommunityIcons } from '@expo/vector-icons';
import type { ComponentProps } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '@/context/ThemeContext';

type Props = {
  icon: ComponentProps<typeof MaterialCommunityIcons>['name'];
  title: string;
  value: string;
  detail?: string;
  alert?: boolean;
};

export function SensorCard({ icon, title, value, detail, alert = false }: Props) {
  const { colors } = useTheme();
  const accent = alert ? '#FF4D4D' : '#00E5FF';

  return (
    <View style={[styles.card, { backgroundColor: alert ? colors.cardDanger : colors.surface, borderColor: accent + '55' }]}>
      <View style={[styles.icon, { borderColor: accent }]}>
        <MaterialCommunityIcons name={icon} size={23} color={accent} />
      </View>
      <View style={styles.textArea}>
        <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
        <Text style={[styles.value, { color: accent }]}>{value}</Text>
        {detail ? <Text style={[styles.detail, { color: colors.secondary }]}>{detail}</Text> : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    minHeight: 126,
    borderWidth: 1,
    borderRadius: 18,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  textArea: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: '800',
  },
  value: {
    marginTop: 4,
    fontSize: 15,
    fontWeight: '900',
  },
  detail: {
    marginTop: 4,
    fontSize: 11,
    lineHeight: 16,
  },
});
