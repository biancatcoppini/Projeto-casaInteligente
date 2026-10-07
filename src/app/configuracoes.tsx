import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { AppHeader } from '@/components/AppHeader';
import { Screen } from '@/components/Screen';
import { useTheme } from '@/context/ThemeContext';
import { useSecurity } from '@/context/SecurityContext';

export default function SettingsScreen() {
  const { isDark, toggleMode, colors } = useTheme();
  const { securityEnabled } = useSecurity();

  return (
    <Screen>
      <AppHeader showBack title="Configurações" subtitle="Preferências do aplicativo." showSettings={false} />

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Aparência</Text>

        <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <View style={[styles.icon, { backgroundColor: colors.cardActive }]}>
            <MaterialCommunityIcons
              name={isDark ? 'weather-sunny' : 'moon-waning-crescent'}
              size={23}
              color="#00E5FF"
            />
          </View>

          <View style={styles.textArea}>
            <Text style={[styles.title, { color: colors.text }]}>Modo escuro</Text>
            <Text style={[styles.description, { color: colors.secondary }]}>Altere a aparência do aplicativo.</Text>
          </View>

          <Pressable
            onPress={toggleMode}
            style={[styles.toggle, { backgroundColor: isDark ? '#00CFEF' : colors.border }]}
          >
            <View style={[styles.thumb, { transform: [{ translateX: isDark ? 20 : 0 }] }]} />
          </Pressable>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Estado da casa</Text>
        <View style={[styles.infoCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <MaterialCommunityIcons
            name="shield-check-outline"
            size={22}
            color={securityEnabled ? '#FF4D4D' : '#00E5FF'}
          />
          <View style={styles.textArea}>
            <Text style={[styles.title, { color: colors.text }]}>Segurança</Text>
            <Text style={[styles.description, { color: colors.secondary }]}>
              {securityEnabled
                ? 'Ativada. As luzes foram apagadas e a garagem foi fechada.'
                : 'Desativada.'}
            </Text>
          </View>
        </View>
      </View>

      <Pressable
        onPress={() => router.back()}
        style={({ pressed }) => [
          styles.doneButton,
          { backgroundColor: '#00CFEF', opacity: pressed ? 0.85 : 1 },
        ]}
      >
        <Text style={styles.doneText}>Concluir</Text>
      </Pressable>
    </Screen>
  );
}

const styles = StyleSheet.create({
  section: { marginTop: 20 },
  sectionTitle: { fontSize: 17, fontWeight: '800', marginBottom: 10 },
  card: { borderWidth: 1, borderRadius: 20, padding: 16, flexDirection: 'row', alignItems: 'center' },
  icon: { width: 44, height: 44, borderRadius: 14, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  textArea: { flex: 1 },
  title: { fontSize: 15, fontWeight: '800' },
  description: { marginTop: 3, fontSize: 12, lineHeight: 17 },
  toggle: { width: 48, height: 28, borderRadius: 14, padding: 4, justifyContent: 'center' },
  thumb: { width: 20, height: 20, borderRadius: 10, backgroundColor: '#FFFFFF' },
  infoCard: { borderWidth: 1, borderRadius: 20, padding: 16, flexDirection: 'row', alignItems: 'center', gap: 12 },
  doneButton: { height: 48, borderRadius: 16, alignItems: 'center', justifyContent: 'center', marginTop: 22, marginBottom: 8 },
  doneText: { color: '#061117', fontSize: 15, fontWeight: '900' },
});
