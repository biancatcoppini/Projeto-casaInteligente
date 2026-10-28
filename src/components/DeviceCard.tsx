import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { Device, DeviceType } from '@/types';

function getIcon(type: DeviceType, active: boolean) {
  if (type === 'garage') return active ? 'garage-open-variant' : 'garage-variant';
  return active ? 'lightbulb-on-outline' : 'lightbulb-outline';
}

type Props = {
  device: Device;
  statusText: string;
  onPress: () => void;
};

export function DeviceCard({ device, statusText, onPress }: Props) {
  const { colors } = useTheme();
  const accent = device.active ? '#00E5FF' : '#FF4D4D';

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        {
          backgroundColor: device.active ? colors.cardActive : colors.cardDanger,
          borderColor: device.active ? '#00CFEF55' : '#FF4D4D55',
          opacity: pressed ? 0.9 : 1,
        },
      ]}
    >
      <View style={styles.iconRow}>
        <MaterialCommunityIcons name={getIcon(device.type, device.active)} size={42} color={accent} />
        <MaterialCommunityIcons name="chevron-right" size={27} color={colors.secondary} />
      </View>

      <View>
        <Text numberOfLines={1} style={[styles.name, { color: colors.text }]}>
          {device.name}
        </Text>
        <Text style={[styles.room, { color: colors.secondary }]}>{device.room}</Text>
        <Text style={[styles.status, { color: accent }]}>{statusText}</Text>
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
  name: {
    fontSize: 15,
    fontWeight: '700',
  },
  room: {
    marginTop: 3,
    fontSize: 12,
  },
  status: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '800',
  },
});
