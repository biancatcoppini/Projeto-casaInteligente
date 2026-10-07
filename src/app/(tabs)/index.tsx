import { Alert, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { useEffect } from 'react';
import { router } from 'expo-router';
import { AppHeader } from '@/components/AppHeader';
import { ControlCard } from '@/components/ControlCard';
import { AlertBanner } from '@/components/AlertBanner';
import { SensorCard } from '@/components/SensorCard';
import { Screen } from '@/components/Screen';
import { useSecurity } from '@/context/SecurityContext';
import { useSensors } from '@/context/SensorContext';
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

export default function HomeScreen() {
  const { width } = useWindowDimensions();
  const { colors } = useTheme();
  const { alarmActive } = useSecurity();
  const { mainDoorOpen, ambientDark, motionDetected, temperature } = useSensors();
  const cardWidth = Math.max(140, (width - HORIZONTAL_PADDING * 2 - GAP) / 2);

  useEffect(() => {
    if (alarmActive) {
      Alert.alert(
        'Alarme disparado',
        'Movimento detectado enquanto o sistema de segurança estava ativado.',
      );
    }
  }, [alarmActive]);

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
            alert={motionDetected && alarmActive}
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

      <Text style={[styles.sensorLink, { color: '#00CFEF' }]} onPress={() => router.push('/sensores')}>
        Ver monitoramento completo
      </Text>
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
  sensorLink: {
    marginTop: 15,
    marginBottom: 6,
    fontSize: 13,
    fontWeight: '800',
  },
});
