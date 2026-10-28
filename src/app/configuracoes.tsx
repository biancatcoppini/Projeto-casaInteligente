import { MaterialCommunityIcons } from '@expo/vector-icons';
import type { ComponentProps } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { AppHeader } from '@/components/AppHeader';
import { Screen } from '@/components/Screen';
import { useSecurity } from '@/context/SecurityContext';
import { useTheme } from '@/context/ThemeContext';

export default function SettingsScreen() {
  const { colors } = useTheme();
  const { securityEnabled, alarmActive, doorWarning, setSecurityEnabled } = useSecurity();
  const hasWarning = alarmActive || doorWarning;
  const accent = hasWarning ? '#FF4D4D' : securityEnabled ? '#00E5FF' : colors.secondary;

  const securityDescription = alarmActive
    ? 'Alarme disparado. Movimento detectado com a segurança ativada.'
    : doorWarning
      ? 'Ativada, mas a porta principal está aberta.'
      : securityEnabled
        ? 'Ativada. As luzes foram apagadas e a garagem foi fechada.'
        : 'Ative para apagar as luzes, fechar a garagem e monitorar movimento.';

  return (
    <Screen>
      <AppHeader
        showBack
        title="Configurações"
        subtitle="Preferências e segurança da casa."
        showSettings={false}
      />

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Segurança da casa</Text>

        <View
          style={[
            styles.securityCard,
            {
              backgroundColor: hasWarning ? colors.cardDanger : colors.surface,
              borderColor: hasWarning ? '#FF4D4D66' : colors.border,
            },
          ]}
        >
          <View style={[styles.iconBox, { borderColor: accent, backgroundColor: colors.cardActive }]}>
            <MaterialCommunityIcons
              name={alarmActive ? 'alarm-light' : securityEnabled ? 'shield-lock' : 'shield-outline'}
              size={26}
              color={accent}
            />
          </View>

          <View style={styles.textArea}>
            <Text style={[styles.title, { color: colors.text }]}>Sistema de segurança</Text>
            <Text style={[styles.description, { color: colors.secondary }]}>
              {securityDescription}
            </Text>
            <Text style={[styles.status, { color: accent }]}>
              {alarmActive ? 'ALARME DISPARADO' : doorWarning ? 'VERIFIQUE A PORTA' : securityEnabled ? 'ATIVADA' : 'DESATIVADA'}
            </Text>
          </View>

          <Pressable
            onPress={() => setSecurityEnabled(!securityEnabled)}
            accessibilityRole="switch"
            accessibilityLabel="Segurança da casa"
            accessibilityHint={securityEnabled ? 'Desativa a segurança e liga a luz da sala.' : 'Apaga as luzes, fecha a garagem e ativa o monitoramento.'}
            accessibilityState={{ checked: securityEnabled }}
            hitSlop={8}
            style={({ pressed }) => [
              styles.toggle,
              {
                backgroundColor: securityEnabled ? (hasWarning ? '#FF4D4D' : '#00CFEF') : colors.border,
                opacity: pressed ? 0.82 : 1,
              },
            ]}
          >
            <View
              style={[
                styles.thumb,
                { transform: [{ translateX: securityEnabled ? 20 : 0 }] },
              ]}
            />
          </Pressable>
        </View>

        {doorWarning ? (
          <View style={[styles.warning, { backgroundColor: colors.cardDanger, borderColor: '#FF4D4D66' }]}>
            <MaterialCommunityIcons name="door-open" size={21} color="#FF4D4D" />
            <Text style={[styles.warningText, { color: colors.text }]}>
              A porta principal não é trancada pelo aplicativo. Feche-a manualmente; o sensor apenas informa se está aberta ou fechada.
            </Text>
          </View>
        ) : null}
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>O que a segurança controla</Text>
        <View style={[styles.infoCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <InfoRow icon="lightbulb-off-outline" text="Apaga as luzes da casa ao ativar." />
          <InfoRow icon="garage" text="Fecha o portão da garagem ao ativar." />
          <InfoRow icon="motion-sensor" text="Dispara o alarme quando detecta movimento com o sistema ativado." />
          <InfoRow icon="door-open" text="Monitora a porta principal e avisa se ela estiver aberta." last />
        </View>
      </View>
    </Screen>
  );
}

type InfoRowProps = {
  icon: ComponentProps<typeof MaterialCommunityIcons>['name'];
  text: string;
  last?: boolean;
};

function InfoRow({ icon, text, last = false }: InfoRowProps) {
  const { colors } = useTheme();

  return (
    <View style={[styles.infoRow, !last && { borderBottomColor: colors.border, borderBottomWidth: StyleSheet.hairlineWidth }]}>
      <MaterialCommunityIcons name={icon} size={21} color="#00CFEF" />
      <Text style={[styles.infoText, { color: colors.secondary }]}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  section: { marginTop: 22 },
  sectionTitle: { fontSize: 17, fontWeight: '800', marginBottom: 11 },
  securityCard: {
    borderWidth: 1,
    borderRadius: 20,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconBox: {
    width: 46,
    height: 46,
    borderWidth: 1.5,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textArea: { flex: 1, minWidth: 0 },
  title: { fontSize: 15, fontWeight: '800' },
  description: { marginTop: 4, fontSize: 12, lineHeight: 17 },
  status: { marginTop: 7, fontSize: 11, fontWeight: '900', letterSpacing: 0.5 },
  toggle: {
    width: 48,
    height: 28,
    borderRadius: 14,
    padding: 4,
    justifyContent: 'center',
  },
  thumb: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    elevation: 2,
    shadowColor: '#000000',
    shadowOpacity: 0.15,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
  },
  warning: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 9,
    padding: 13,
    borderRadius: 15,
    borderWidth: 1,
    marginTop: 10,
  },
  warningText: { flex: 1, fontSize: 12, lineHeight: 18, fontWeight: '600' },
  infoCard: { borderWidth: 1, borderRadius: 20, paddingHorizontal: 15 },
  infoRow: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 14 },
  infoText: { flex: 1, fontSize: 12, lineHeight: 17 },
});
