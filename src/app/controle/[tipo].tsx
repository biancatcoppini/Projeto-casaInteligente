import { useMemo } from 'react';
import { StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { AppHeader } from '@/components/AppHeader';
import { Screen } from '@/components/Screen';
import { DeviceCard } from '@/components/DeviceCard';
import { AllDevicesCard } from '@/components/AllDevicesCard';
import { useDevices } from '@/context/DeviceContext';
import { useTheme } from '@/context/ThemeContext';
import { useControlStatus } from '@/hooks/useControlStatus';
import { getControlCopy } from '@/utils/control';
import { DeviceType } from '@/types';

const GAP = 12;
const HORIZONTAL_PADDING = 16;

export default function ControlScreen() {
  const { tipo } = useLocalSearchParams<{ tipo: string }>();
  const type = (tipo === 'garage' ? 'garage' : 'lights') as DeviceType;
  const { colors } = useTheme();
  const { width } = useWindowDimensions();
  const { devices, devicesByType, toggleDevice, toggleAll } = useDevices();
  const selected = useMemo(() => devicesByType(type), [devices, type]);
  const copy = getControlCopy(type);
  const status = useControlStatus(devices, type);
  const cardWidth = Math.max(140, (width - HORIZONTAL_PADDING * 2 - GAP) / 2);

  return (
    <Screen>
      <AppHeader showBack title={copy.title} subtitle={copy.subtitle} />

      <View style={styles.content}>
        <Text style={[styles.helper, { color: colors.secondary }]}>Toque em um card para alterar o estado.</Text>

        <View style={styles.grid}>
          <View style={[styles.gridItem, { width: cardWidth }]}>
            <AllDevicesCard
              type={type}
              state={status.allState}
              onPress={() => toggleAll(type)}
              actionText={status.allActionText}
            />
          </View>

          {selected.map((device) => (
            <View key={device.id} style={[styles.gridItem, { width: cardWidth }]}>
              <DeviceCard
                device={device}
                statusText={device.active ? copy.active : copy.inactive}
                onPress={() => toggleDevice(device.id)}
              />
            </View>
          ))}
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { marginTop: 18 },
  helper: { fontSize: 13, marginBottom: 14 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: GAP },
  gridItem: { flexGrow: 0, flexShrink: 0 },
});
