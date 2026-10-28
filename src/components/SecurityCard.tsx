import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { useSecurity } from '@/context/SecurityContext';

export function SecurityCard() {
  const { colors } = useTheme();
  const { securityEnabled, alarmActive, doorWarning, setSecurityEnabled } = useSecurity();
  const danger = securityEnabled;
  const accent = danger ? '#FF4D4D' : '#00E5FF';
  const background = alarmActive || doorWarning ? colors.cardDanger : danger ? colors.cardActive : colors.surface;

  return (
    <Pressable
      onPress={() => setSecurityEnabled(!securityEnabled)}
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
        <View style={[styles.icon, { borderColor: accent }]}>
          <MaterialCommunityIcons
            name={alarmActive ? 'alarm-light-outline' : securityEnabled ? 'shield-lock' : 'shield-off-outline'}
            size={26}
            color={accent}
          />
        </View>
        <MaterialCommunityIcons name="chevron-right" size={28} color={colors.secondary} />
      </View>

      <View>
        <Text style={[styles.title, { color: colors.text }]}>Segurança</Text>
        <Text style={[styles.description, { color: colors.secondary }]}>PIR, alarme e fechamento da garagem.</Text>
        <Text style={[styles.status, { color: accent }]}> 
          {alarmActive ? 'ALARME DISPARADO' : doorWarning ? 'Porta principal aberta' : securityEnabled ? 'Ativada' : 'Desativada'}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    minHeight: 166,
    borderRadius: 20,
    borderWidth: 1,
    padding: 17,
    justifyContent: 'space-between',
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
  title: {
    fontSize: 19,
    fontWeight: '800',
  },
  description: {
    marginTop: 5,
    fontSize: 12,
    lineHeight: 17,
  },
  status: {
    marginTop: 7,
    fontSize: 13,
    fontWeight: '800',
  },
});
