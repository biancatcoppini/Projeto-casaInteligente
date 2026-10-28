import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { AllDevicesState } from '@/hooks/useControlStatus';
import { DeviceType } from '@/types';

type Props = {
  type: DeviceType;
  state: AllDevicesState;
  onPress: () => void;
  actionText: string;
};

export function AllDevicesCard({ type, state, onPress, actionText }: Props) {
  const { colors } = useTheme();
  const isGarage = type === 'garage';

  const accent = state === 'all' ? '#00E5FF' : state === 'none' ? '#FF4D4D' : colors.secondary;
  const currentText =
    state === 'all'
      ? isGarage
        ? 'Garagem aberta'
        : 'Todas ligadas'
      : state === 'none'
        ? isGarage
          ? 'Garagem fechada'
          : 'Todas apagadas'
        : 'Estado misto';

  const background =
    state === 'all'
      ? colors.cardActive
      : state === 'none'
        ? colors.cardDanger
        : colors.surface;

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        {
          backgroundColor: background,
          borderColor: accent + '55',
          opacity: pressed ? 0.9 : 1,
        },
      ]}
    >
      <View style={styles.iconRow}>
        <View style={[styles.allIcon, { borderColor: accent }]}>
          <MaterialCommunityIcons
            name={isGarage ? 'garage-open-variant' : 'lightbulb-multiple-outline'}
            size={27}
            color={accent}
          />
        </View>
        <MaterialCommunityIcons name="chevron-right" size={28} color={colors.secondary} />
      </View>

      <View>
        <Text style={[styles.title, { color: colors.text }]}>Todos</Text>
        <Text style={[styles.action, { color: colors.secondary }]}>{actionText}</Text>
        <Text style={[styles.status, { color: accent }]}>{currentText}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    minHeight: 166,
    borderWidth: 1,
    borderRadius: 20,
    padding: 17,
    justifyContent: 'space-between',
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  allIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
  },
  action: {
    marginTop: 4,
    fontSize: 12,
  },
  status: {
    marginTop: 7,
    fontSize: 13,
    fontWeight: '800',
  },
});
