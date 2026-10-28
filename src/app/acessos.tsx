import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";

import { AppHeader } from "@/components/AppHeader";
import { Screen } from "@/components/Screen";
import { useDevices } from "@/context/DeviceContext";
import { useSensors } from "@/context/SensorContext";
import { useTheme } from "@/context/ThemeContext";
import { useSecurity } from "@/context/SecurityContext";

const CYAN = "#00E5FF";
const RED = "#FF4D4D";

export default function AcessosScreen() {
  const { colors } = useTheme();
  const { width } = useWindowDimensions();
  const { devices, toggleDevice } = useDevices();
  const { mainDoorOpen, setMainDoorOpen } = useSensors();
  const { securityEnabled } = useSecurity();

  const garage = devices.find((device) => device.id === "garage-gate");

  const anyAccessOpen = mainDoorOpen || Boolean(garage?.active);
  const accessColor = anyAccessOpen ? CYAN : RED;

  const contentWidth = Math.min(width, 960);
  const cardWidth = width < 360 ? width - 32 : (contentWidth - 32 - 12) / 2;

  function toggleAllAccesses() {
    if (securityEnabled) {
      setMainDoorOpen(false);

      if (garage?.active) {
        toggleDevice("garage-gate");
      }

      return;
    }

    const shouldOpenAll = !anyAccessOpen;

    setMainDoorOpen(shouldOpenAll);

    if (garage && garage.active !== shouldOpenAll) {
      toggleDevice("garage-gate");
    }
  }

  return (
    <Screen>
      <AppHeader
        showBack
        title="Acessos"
        subtitle="Porta principal e garagem."
      />

      <View style={styles.grid}>
        {/* Controle geral */}
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={
            anyAccessOpen ? "Fechar todos os acessos" : "Abrir todos os acessos"
          }
          accessibilityHint="Alterna a porta principal e o portão da garagem."
          disabled={securityEnabled && !anyAccessOpen}
          onPress={toggleAllAccesses}
          style={({ pressed }) => [
            styles.card,
            { width: cardWidth },
            {
              backgroundColor: anyAccessOpen
                ? colors.surface
                : colors.cardDanger,
              borderColor: accessColor,
              opacity:
                securityEnabled && !anyAccessOpen ? 0.6 : pressed ? 0.88 : 1,
            },
          ]}
        >
          <View style={styles.topRow}>
            <View style={[styles.iconBox, { borderColor: accessColor }]}>
              <MaterialCommunityIcons
                name={anyAccessOpen ? "lock-open-variant" : "lock-outline"}
                size={28}
                color={accessColor}
              />
            </View>

            <MaterialCommunityIcons
              name="chevron-right"
              size={28}
              color={colors.secondary}
            />
          </View>

          <Text style={[styles.title, { color: colors.text }]}>
            Todos os acessos
          </Text>

          <Text style={[styles.status, { color: accessColor }]}>
            {anyAccessOpen ? "Há acessos abertos" : "Todos fechados"}
          </Text>

          <Text style={[styles.detail, { color: colors.secondary }]}>
            {securityEnabled
              ? "Segurança ativada"
              : `Toque para ${anyAccessOpen ? "fechar todos" : "abrir todos"}`}
          </Text>
        </Pressable>

        {/* Porta principal */}
        <Pressable
          onPress={() => {
            if (!securityEnabled) {
              setMainDoorOpen(!mainDoorOpen);
            }
          }}
          disabled={securityEnabled}
          accessibilityRole="button"
          accessibilityLabel={
            mainDoorOpen ? "Fechar porta principal" : "Abrir porta principal"
          }
          accessibilityHint="Alterna o estado simulado da porta principal."
          style={({ pressed }) => [
            styles.card,
            { width: cardWidth },
            {
              backgroundColor: mainDoorOpen
                ? colors.surface
                : colors.cardDanger,
              borderColor: mainDoorOpen ? CYAN : RED,
              opacity: securityEnabled ? 0.6 : pressed ? 0.88 : 1,
            },
          ]}
        >
          <View style={styles.topRow}>
            <View
              style={[
                styles.iconBox,
                { borderColor: mainDoorOpen ? CYAN : RED },
              ]}
            >
              <MaterialCommunityIcons
                name={mainDoorOpen ? "door-open" : "door-closed"}
                size={28}
                color={mainDoorOpen ? CYAN : RED}
              />
            </View>

            <MaterialCommunityIcons
              name="chevron-right"
              size={28}
              color={colors.secondary}
            />
          </View>

          <Text style={[styles.title, { color: colors.text }]}>
            Porta principal
          </Text>

          <Text style={[styles.status, { color: mainDoorOpen ? CYAN : RED }]}>
            {mainDoorOpen ? "Aberta" : "Fechada"}
          </Text>

          <Text style={[styles.detail, { color: colors.secondary }]}>
            {securityEnabled
              ? "Bloqueada pela segurança"
              : `Toque para ${mainDoorOpen ? "fechar" : "abrir"}`}
          </Text>
        </Pressable>

        {/* Portão da garagem */}
        <Pressable
          onPress={() => {
            if (!securityEnabled && garage) {
              toggleDevice(garage.id);
            }
          }}
          disabled={securityEnabled || !garage}
          accessibilityRole="button"
          accessibilityLabel={
            garage?.active
              ? "Fechar portão da garagem"
              : "Abrir portão da garagem"
          }
          accessibilityHint="Altera o estado simulado do portão."
          style={({ pressed }) => [
            styles.card,
            { width: cardWidth },
            {
              backgroundColor: garage?.active
                ? colors.surface
                : colors.cardDanger,
              borderColor: garage?.active ? CYAN : RED,
              opacity: securityEnabled ? 0.6 : pressed ? 0.88 : 1,
            },
          ]}
        >
          <View style={styles.topRow}>
            <View
              style={[
                styles.iconBox,
                { borderColor: garage?.active ? CYAN : RED },
              ]}
            >
              <MaterialCommunityIcons
                name="garage-variant"
                size={28}
                color={garage?.active ? CYAN : RED}
              />
            </View>

            <MaterialCommunityIcons
              name="chevron-right"
              size={28}
              color={colors.secondary}
            />
          </View>

          <Text style={[styles.title, { color: colors.text }]}>Garagem</Text>

          <Text style={[styles.status, { color: garage?.active ? CYAN : RED }]}>
            {garage?.active ? "Aberto" : "Fechado"}
          </Text>

          <Text style={[styles.detail, { color: colors.secondary }]}>
            {securityEnabled
              ? "Bloqueada pela segurança"
              : `Toque para ${garage?.active ? "fechar" : "abrir"}`}
          </Text>
        </Pressable>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  grid: {
    marginTop: 18,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  card: {
    minHeight: 180,
    borderRadius: 20,
    borderWidth: 1,
    padding: 17,
    justifyContent: "space-between",
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  iconBox: {
    width: 52,
    height: 52,
    borderRadius: 16,
    borderWidth: 1.5,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    marginTop: 18,
    fontSize: 18,
    fontWeight: "800",
  },
  status: {
    marginTop: 4,
    fontSize: 15,
    fontWeight: "900",
  },
  detail: {
    marginTop: 5,
    fontSize: 11,
    lineHeight: 16,
  },
});
