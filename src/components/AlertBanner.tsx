import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { useSecurity } from '@/context/SecurityContext';

export function AlertBanner() {
  const { colors } = useTheme();
  const { alarmActive, doorWarning } = useSecurity();

  if (!alarmActive && !doorWarning) return null;

  const alarm = alarmActive;

  return (
    <View style={[styles.container, { backgroundColor: colors.cardDanger, borderColor: '#FF4D4D55' }]}>
      <MaterialCommunityIcons
        name={alarm ? 'alarm-light' : 'door-open'}
        size={23}
        color="#FF4D4D"
      />
      <View style={styles.textArea}>
        <Text style={[styles.title, { color: colors.text }]}>
          {alarm ? 'Alarme disparado' : 'Atenção com a porta principal'}
        </Text>
        <Text style={[styles.description, { color: colors.secondary }]}>
          {alarm ? 'Movimento detectado enquanto a segurança estava ativada.' : 'A porta principal está aberta enquanto a segurança está ativada.'}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    borderWidth: 1,
    borderRadius: 18,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textArea: {
    flex: 1,
    marginLeft: 10,
  },
  title: {
    fontSize: 14,
    fontWeight: '800',
  },
  description: {
    marginTop: 2,
    fontSize: 12,
    lineHeight: 17,
  },
});
