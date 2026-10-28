import { StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Screen } from '@/components/Screen';
import { AppHeader } from '@/components/AppHeader';
import { useTheme } from '@/context/ThemeContext';
import { rooms } from '@/data/devices';
import { useDevices } from '@/context/DeviceContext';

const GAP = 12;
const HORIZONTAL_PADDING = 16;
const MAX_CONTENT_WIDTH = 960;

export default function RoomsScreen() {
  const { colors } = useTheme();
  const { width } = useWindowDimensions();
  const { devices } = useDevices();
  const layoutWidth = Math.min(width, MAX_CONTENT_WIDTH);
  const cardWidth = width < 360
    ? width - HORIZONTAL_PADDING * 2
    : (layoutWidth - HORIZONTAL_PADDING * 2 - GAP) / 2;

  return (
    <Screen>
      <AppHeader title="Cômodos" subtitle="Veja rapidamente o estado da casa." />

      <View style={styles.grid}>
        {rooms.map((room) => {
          const roomDevices = devices.filter((device) => device.room === room);
          const active = roomDevices.filter((device) => device.active).length;
          const hasDevices = roomDevices.length > 0;
          const allActive = hasDevices && active === roomDevices.length;
          const allInactive = hasDevices && active === 0;
          const accent = !hasDevices ? colors.secondary : allActive ? '#00E5FF' : allInactive ? '#FF4D4D' : colors.secondary;
          const status = !hasDevices
            ? room === 'Entrada' ? 'Monitorada por sensor' : 'Sem automação'
            : allActive ? 'Tudo ativo' : allInactive ? 'Tudo inativo' : 'Estado misto';
          const backgroundColor = !hasDevices
            ? colors.surface
            : allInactive
              ? colors.cardDanger
              : allActive
                ? colors.cardActive
                : colors.surface;

          return (
            <View
              key={room}
              style={[
                styles.card,
                {
                  width: cardWidth,
                  backgroundColor,
                  borderColor: accent + '55',
                },
              ]}
            >
              <View style={styles.iconRow}>
                <View style={[styles.icon, { borderColor: accent }]}>
                  <MaterialCommunityIcons name="home-outline" size={25} color={accent} />
                </View>
                <Text style={[styles.count, { color: colors.secondary }]}>
                  {hasDevices ? `${active}/${roomDevices.length}` : room === 'Entrada' ? '1 sensor' : '—'}
                </Text>
              </View>

              <View>
                <Text style={[styles.roomName, { color: colors.text }]}>{room}</Text>
                <Text style={[styles.status, { color: accent }]}>{status}</Text>
              </View>
            </View>
          );
        })}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  grid: {
    marginTop: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: GAP,
  },
  card: {
    minHeight: 140,
    borderWidth: 1,
    borderRadius: 20,
    padding: 17,
    justifyContent: 'space-between',
    flexGrow: 0,
    flexShrink: 0,
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  icon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  count: {
    fontSize: 12,
    fontWeight: '700',
  },
  roomName: {
    fontSize: 17,
    fontWeight: '800',
  },
  status: {
    marginTop: 6,
    fontSize: 12,
    fontWeight: '800',
  },
});
