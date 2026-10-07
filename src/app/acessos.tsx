import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { AppHeader } from '@/components/AppHeader';
import { Screen } from '@/components/Screen';
import { useDevices } from '@/context/DeviceContext';
import { useSensors } from '@/context/SensorContext';
import { useTheme } from '@/context/ThemeContext';

export default function AcessosScreen() {
  const { colors } = useTheme();
  const { devices, toggleDevice } = useDevices();
  const { mainDoorOpen } = useSensors();

  const garage = devices.find((device) => device.id === 'garage-gate');

  return (
    <Screen>
      <AppHeader showBack title="Acessos" subtitle="Porta principal e garagem." />

      <View style={styles.grid}>
        <View
          style={[
            styles.card,
            {
              backgroundColor: mainDoorOpen ? colors.cardDanger : colors.surface,
              borderColor: mainDoorOpen ? '#FF4D4D' : colors.border,
            },
          ]}
        >
          <View style={styles.topRow}>
            <View
              style={[
                styles.iconBox,
                { borderColor: mainDoorOpen ? '#FF4D4D' : '#00E5FF' },
              ]}
            >
              <MaterialCommunityIcons
                name={mainDoorOpen ? 'door-open' : 'door-closed'}
                size={28}
                color={mainDoorOpen ? '#FF4D4D' : '#00E5FF'}
              />
            </View>

            <View
              style={[
                styles.statusDot,
                { backgroundColor: mainDoorOpen ? '#FF4D4D' : '#00E5FF' },
              ]}
            />
          </View>

          <Text style={[styles.title, { color: colors.text }]}>Porta principal</Text>
          <Text
            style={[
              styles.status,
              { color: mainDoorOpen ? '#FF4D4D' : '#00E5FF' },
            ]}
          >
            {mainDoorOpen ? 'Aberta' : 'Fechada'}
          </Text>
          <Text style={[styles.detail, { color: colors.secondary }]}>Reed switch + ímã</Text>
        </View>

        <Pressable
          onPress={() => garage && toggleDevice(garage.id)}
          style={({ pressed }) => [
            styles.card,
            {
              backgroundColor: garage?.active ? colors.surface : colors.cardDanger,
              borderColor: garage?.active ? colors.border : '#FF4D4D',
              opacity: pressed ? 0.88 : 1,
            },
          ]}
        >
          <View style={styles.topRow}>
            <View
              style={[
                styles.iconBox,
                { borderColor: garage?.active ? '#00E5FF' : '#FF4D4D' },
              ]}
            >
              <MaterialCommunityIcons
                name="garage-variant"
                size={28}
                color={garage?.active ? '#00E5FF' : '#FF4D4D'}
              />
            </View>
            <MaterialCommunityIcons
              name="chevron-right"
              size={28}
              color={colors.secondary}
            />
          </View>

          <Text style={[styles.title, { color: colors.text }]}>Garagem</Text>
          <Text
            style={[
              styles.status,
              { color: garage?.active ? '#00E5FF' : '#FF4D4D' },
            ]}
          >
            {garage?.active ? 'Aberto' : 'Fechado'}
          </Text>
          <Text style={[styles.detail, { color: colors.secondary }]}>Toque para {garage?.active ? 'fechar' : 'abrir'}</Text>
        </Pressable>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  grid: {
    marginTop: 18,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  card: {
    width: '48%',
    minHeight: 175,
    borderRadius: 20,
    borderWidth: 1,
    padding: 17,
    justifyContent: 'space-between',
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconBox: {
    width: 52,
    height: 52,
    borderRadius: 16,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  title: {
    marginTop: 18,
    fontSize: 18,
    fontWeight: '800',
  },
  status: {
    marginTop: 4,
    fontSize: 15,
    fontWeight: '900',
  },
  detail: {
    marginTop: 5,
    fontSize: 11,
    lineHeight: 16,
  },
});
