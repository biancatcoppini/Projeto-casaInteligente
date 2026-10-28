import { useMemo } from 'react';
import { StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { AppHeader } from '@/components/AppHeader';
import { Screen } from '@/components/Screen';
import { DeviceCard } from '@/components/DeviceCard';
import { AllDevicesCard } from '@/components/AllDevicesCard';
import { useDevices } from '@/context/DeviceContext';
import { useTheme } from '@/context/ThemeContext';
import { useSecurity } from '@/context/SecurityContext';
import { useControlStatus } from '@/hooks/useControlStatus';
import { getControlCopy } from '@/utils/control';
import { DeviceType } from '@/types';

const GAP = 12;
const HORIZONTAL_PADDING = 16;
const MAX_CONTENT_WIDTH = 960;

export default function ControlScreen() {
  const { tipo } = useLocalSearchParams<{ tipo?: string | string[] }>();
  const rawType = Array.isArray(tipo) ? tipo[0] : tipo;
  const isValidType = rawType === 'garage' || rawType === 'lights';
  const type = (rawType === 'garage' ? 'garage' : 'lights') as DeviceType;
  const { colors } = useTheme();
  const { securityEnabled } = useSecurity();
  const { width } = useWindowDimensions();
  const { devices, devicesByType, toggleDevice, toggleAll } = useDevices();
  const selected = useMemo(() => devicesByType(type), [devices, type]);
  const copy = getControlCopy(type);
  const status = useControlStatus(devices, type);
  const layoutWidth = Math.min(width, MAX_CONTENT_WIDTH);
  const cardWidth = width < 360
    ? width - HORIZONTAL_PADDING * 2
    : (layoutWidth - HORIZONTAL_PADDING * 2 - GAP) / 2;

  if (!isValidType) {
    return (
      <Screen>
        <AppHeader showBack title="Controle indisponível" subtitle="Este controle não existe." />
        <Text style={[styles.helper, { color: colors.secondary, marginTop: 20 }]}>Volte para o início e escolha uma opção válida.</Text>
      </Screen>
    );
  }

  return (
    <Screen>
      <AppHeader showBack title={copy.title} subtitle={copy.subtitle} />

      <View style={styles.content}>
        <Text style={[styles.helper, { color: colors.secondary }]}>
          {securityEnabled
            ? 'Segurança ativada: os controles manuais estão bloqueados.'
            : 'Toque em um card para alterar o estado.'}
        </Text>

        <View style={styles.grid}>
          <View style={[styles.gridItem, { width: cardWidth, opacity: securityEnabled ? 0.55 : 1 }]}>
            <AllDevicesCard
              type={type}
              state={status.allState}
              onPress={() => {
                if (!securityEnabled) toggleAll(type);
              }}
              actionText={status.allActionText}
            />
          </View>

          {selected.map((device) => (
            <View key={device.id} style={[styles.gridItem, { width: cardWidth, opacity: securityEnabled ? 0.55 : 1 }]}>
              <DeviceCard
                device={device}
                statusText={device.active ? copy.active : copy.inactive}
                onPress={() => {
                  if (!securityEnabled) toggleDevice(device.id);
                }}
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
