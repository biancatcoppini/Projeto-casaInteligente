import { StyleSheet, Text, View } from 'react-native';
import { AppHeader } from '@/components/AppHeader';
import { Screen } from '@/components/Screen';
import { SensorCard } from '@/components/SensorCard';
import { AlertBanner } from '@/components/AlertBanner';
import { useSensors } from '@/context/SensorContext';
import { useSecurity } from '@/context/SecurityContext';
import { useTheme } from '@/context/ThemeContext';

const GAP = 12;

export default function SensorsScreen() {
  const { colors } = useTheme();
  const { securityEnabled } = useSecurity();
  const { mainDoorOpen, ambientDark, motionDetected, temperature } = useSensors();

  return (
    <Screen>
      <AppHeader showBack title="Sensores" subtitle="Monitoramento em tempo real da casa." />
      <AlertBanner />

      <View style={styles.statusRow}>
        <Text style={[styles.statusLabel, { color: colors.secondary }]}>Segurança</Text>
        <Text style={[styles.statusValue, { color: securityEnabled ? '#FF4D4D' : '#00E5FF' }]}>
          {securityEnabled ? 'Ativada' : 'Desativada'}
        </Text>
      </View>

      <View style={styles.list}>
        <SensorCard
          icon="door-open"
          title="Porta principal"
          value={mainDoorOpen ? 'Aberta' : 'Fechada'}
          detail="Reed switch + ímã"
          alert={mainDoorOpen && securityEnabled}
        />
        <SensorCard
          icon="weather-sunny"
          title="Luminosidade ambiente"
          value={ambientDark ? 'Escuro' : 'Claro'}
          detail="LDR"
        />
        <SensorCard
          icon="motion-sensor"
          title="Movimento"
          value={motionDetected ? 'Detectado' : 'Nenhum movimento'}
          detail="PIR HC-SR501"
          alert={motionDetected && securityEnabled}
        />
        <SensorCard
          icon="thermometer"
          title="Temperatura"
          value={`${temperature} °C`}
          detail="DHT11 / DHT22 — somente monitoramento"
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  statusRow: {
    marginTop: 18,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusLabel: { fontSize: 13, fontWeight: '700' },
  statusValue: { fontSize: 13, fontWeight: '900' },
  list: { gap: GAP },
});
