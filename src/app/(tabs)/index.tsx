import { Pressable, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { router } from 'expo-router';
import { AppHeader } from '@/components/AppHeader';
import { ControlCard } from '@/components/ControlCard';
import { AlertBanner } from '@/components/AlertBanner';
import { SensorCard } from '@/components/SensorCard';
import { Screen } from '@/components/Screen';
import { useSensors } from '@/context/SensorContext';
import { useSecurity } from '@/context/SecurityContext';
import { useTheme } from '@/context/ThemeContext';
import { ControlCard as ControlCardType } from '@/types';

const controls: ControlCardType[] = [
  {
    id: 'lights',
    title: 'Luzes',
    subtitle: 'Iluminação da sala, quarto e área externa.',
    icon: 'lights',
  },
  {
    id: 'access',
    title: 'Acessos',
    subtitle: 'Porta principal e garagem.',
    icon: 'access',
  },
];

const GAP = 12;
const HORIZONTAL_PADDING = 16;
const MAX_CONTENT_WIDTH = 960;

export default function HomeScreen() {
  const { width } = useWindowDimensions();
  const { colors } = useTheme();
  const { securityEnabled } = useSecurity();
  const { mainDoorOpen, ambientDark, motionDetected, temperature } = useSensors();
  const layoutWidth = Math.min(width, MAX_CONTENT_WIDTH);
  const cardWidth = width < 360
    ? width - HORIZONTAL_PADDING * 2
    : (layoutWidth - HORIZONTAL_PADDING * 2 - GAP) / 2;

  return (
    <Screen>
      <AppHeader />
      <AlertBanner />

      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Controles</Text>
      </View>

      <View style={styles.grid}>
        {controls.map((control) => (
          <View key={control.id} style={[styles.gridItem, { width: cardWidth }]}>
            <ControlCard {...control} />
          </View>
        ))}

      </View>

      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Monitoramento</Text>
      </View>

      <View style={styles.grid}>
        <View style={[styles.gridItem, { width: cardWidth }]}>
          <SensorCard
            icon="door-open"
            title="Porta principal"
            value={mainDoorOpen ? 'Aberta' : 'Fechada'}
            detail="Reed switch + ímã"
            alert={mainDoorOpen}
          />
        </View>

        <View style={[styles.gridItem, { width: cardWidth }]}>
          <SensorCard
            icon="weather-sunny"
            title="Luminosidade"
            value={ambientDark ? 'Escuro' : 'Claro'}
            detail="LDR"
          />
        </View>

        <View style={[styles.gridItem, { width: cardWidth }]}>
          <SensorCard
            icon="motion-sensor"
            title="Movimento"
            value={motionDetected ? 'Detectado' : 'Normal'}
            detail="PIR HC-SR501"
            alert={motionDetected && securityEnabled}
          />
        </View>

        <View style={[styles.gridItem, { width: cardWidth }]}>
          <SensorCard
            icon="thermometer"
            title="Temperatura"
            value={`${temperature} °C`}
            detail="DHT11 / DHT22"
          />
        </View>
      </View>

      <Pressable
        onPress={() => router.push('/sensores')}
        accessibilityRole="button"
        accessibilityLabel="Ver monitoramento completo dos sensores"
        style={({ pressed }) => [styles.sensorLinkButton, { opacity: pressed ? 0.75 : 1 }]}
      >
        <Text style={[styles.sensorLink, { color: '#00CFEF' }]}>Ver monitoramento completo</Text>
        <Text style={[styles.sensorLinkArrow, { color: '#00CFEF' }]}>›</Text>
      </Pressable>
    </Screen>
  );
}

const styles = StyleSheet.create({
  sectionHeader: {
    marginTop: 20,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '900',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: GAP,
  },
  gridItem: {
    flexGrow: 0,
    flexShrink: 0,
  },
  sensorLinkButton: {
    marginTop: 15,
    marginBottom: 6,
    minHeight: 42,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 6,
  },
  sensorLink: { fontSize: 13, fontWeight: '800' },
  sensorLinkArrow: { fontSize: 24, fontWeight: '700', marginTop: -2 },
});
