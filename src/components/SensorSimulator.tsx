import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSensors } from '@/context/SensorContext';
import { useTheme } from '@/context/ThemeContext';

type SimulationRowProps = {
  icon: 'door-open' | 'weather-sunny' | 'motion-sensor';
  title: string;
  value: string;
  action: string;
  alert?: boolean;
  onPress: () => void;
};

function SimulationRow({ icon, title, value, action, alert = false, onPress }: SimulationRowProps) {
  const { colors } = useTheme();
  const accent = alert ? '#FF4D4D' : '#00CFEF';

  return (
    <View style={[styles.row, { borderBottomColor: colors.border }]}>
      <MaterialCommunityIcons name={icon} size={23} color={accent} />
      <View style={styles.rowText}>
        <Text style={[styles.rowTitle, { color: colors.text }]}>{title}</Text>
        <Text style={[styles.rowValue, { color: accent }]}>{value}</Text>
      </View>
      <Pressable
        onPress={onPress}
        accessibilityRole="button"
        accessibilityLabel={`Simular ${title.toLowerCase()}: ${action.toLowerCase()}`}
        hitSlop={6}
        style={({ pressed }) => [styles.action, { borderColor: colors.border, opacity: pressed ? 0.7 : 1 }]}
      >
        <Text style={[styles.actionText, { color: colors.text }]}>{action}</Text>
      </Pressable>
    </View>
  );
}

export function SensorSimulator() {
  const { colors } = useTheme();
  const {
    mainDoorOpen,
    ambientDark,
    motionDetected,
    temperature,
    setMainDoorOpen,
    setAmbientDark,
    setMotionDetected,
    setTemperature,
  } = useSensors();

  return (
    <View style={[styles.panel, { backgroundColor: colors.surface, borderColor: colors.border }]}>
      <View style={styles.header}>
        <MaterialCommunityIcons name="flask-outline" size={22} color="#00CFEF" />
        <Text style={[styles.title, { color: colors.text }]}>Simulação local</Text>
      </View>
      <Text style={[styles.description, { color: colors.secondary }]}>
        Estes comandos servem para testar os avisos enquanto o ESP32 ainda não está conectado. Não são leituras físicas.
      </Text>

      <SimulationRow
        icon="door-open"
        title="Porta principal"
        value={mainDoorOpen ? 'Aberta' : 'Fechada'}
        action="Alterar"
        alert={mainDoorOpen}
        onPress={() => setMainDoorOpen(!mainDoorOpen)}
      />
      <SimulationRow
        icon="weather-sunny"
        title="Luminosidade"
        value={ambientDark ? 'Escuro' : 'Claro'}
        action="Alterar"
        onPress={() => setAmbientDark(!ambientDark)}
      />
      <SimulationRow
        icon="motion-sensor"
        title="Movimento"
        value={motionDetected ? 'Detectado' : 'Normal'}
        action="Alterar"
        alert={motionDetected}
        onPress={() => setMotionDetected(!motionDetected)}
      />

      <View style={[styles.temperatureRow, { borderTopColor: colors.border }]}>
        <View style={styles.temperatureText}>
          <Text style={[styles.rowTitle, { color: colors.text }]}>Temperatura</Text>
          <Text style={[styles.rowValue, { color: '#00CFEF' }]}>{temperature} °C</Text>
        </View>
        <View style={styles.temperatureActions}>
          <Pressable
            onPress={() => setTemperature(Math.max(0, temperature - 1))}
            accessibilityRole="button"
            accessibilityLabel="Diminuir temperatura simulada"
            style={[styles.temperatureButton, { borderColor: colors.border }]}
          >
            <MaterialCommunityIcons name="minus" size={20} color={colors.text} />
          </Pressable>
          <Pressable
            onPress={() => setTemperature(Math.min(60, temperature + 1))}
            accessibilityRole="button"
            accessibilityLabel="Aumentar temperatura simulada"
            style={[styles.temperatureButton, { borderColor: colors.border }]}
          >
            <MaterialCommunityIcons name="plus" size={20} color={colors.text} />
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  panel: { marginTop: 24, borderWidth: 1, borderRadius: 20, paddingHorizontal: 15, paddingTop: 15, paddingBottom: 4 },
  header: { flexDirection: 'row', alignItems: 'center', gap: 9 },
  title: { fontSize: 16, fontWeight: '800' },
  description: { marginTop: 7, marginBottom: 8, fontSize: 12, lineHeight: 17 },
  row: { minHeight: 66, flexDirection: 'row', alignItems: 'center', gap: 12, borderBottomWidth: StyleSheet.hairlineWidth },
  rowText: { flex: 1 },
  rowTitle: { fontSize: 13, fontWeight: '700' },
  rowValue: { marginTop: 3, fontSize: 13, fontWeight: '800' },
  action: { minHeight: 34, minWidth: 70, paddingHorizontal: 10, borderWidth: 1, borderRadius: 11, alignItems: 'center', justifyContent: 'center' },
  actionText: { fontSize: 12, fontWeight: '700' },
  temperatureRow: { minHeight: 68, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderTopWidth: StyleSheet.hairlineWidth, marginTop: 1 },
  temperatureText: { flex: 1 },
  temperatureActions: { flexDirection: 'row', gap: 8 },
  temperatureButton: { width: 38, height: 38, borderRadius: 12, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
});
