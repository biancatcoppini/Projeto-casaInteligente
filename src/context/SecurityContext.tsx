import React, {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useDevices } from '@/context/DeviceContext';
import { useSensors } from '@/context/SensorContext';

type SecurityContextValue = {
  securityEnabled: boolean;
  alarmActive: boolean;
  doorWarning: boolean;
  setSecurityEnabled: (enabled: boolean) => void;
  activateSecurity: () => void;
  deactivateSecurity: () => void;
};

const SecurityContext = createContext<SecurityContextValue | null>(null);

export function SecurityProvider({ children }: PropsWithChildren) {
  const { setAllActive, setDeviceActive } = useDevices();
  const { mainDoorOpen, motionDetected, setMainDoorOpen } = useSensors();
  const [securityEnabled, setSecurityEnabledState] = useState(false);
  const [alarmActive, setAlarmActive] = useState(false);

  const activateSecurity = useCallback(() => {
    setMainDoorOpen(false);
    setAllActive('lights', false);
    setDeviceActive('garage-gate', false);
    setAlarmActive(false);
    setSecurityEnabledState(true);
  }, [setMainDoorOpen, setAllActive, setDeviceActive]);

  const deactivateSecurity = useCallback(() => {
    setSecurityEnabledState(false);
    setAlarmActive(false);
    setDeviceActive('light-sala', true);
  }, [setDeviceActive]);

  const setSecurityEnabled = useCallback(
    (enabled: boolean) => {
      if (enabled) activateSecurity();
      else deactivateSecurity();
    },
    [activateSecurity, deactivateSecurity],
  );

  useEffect(() => {
    if (securityEnabled && motionDetected) {
      setAlarmActive(true);
    }

    if (!securityEnabled) {
      setAlarmActive(false);
    }
  }, [securityEnabled, motionDetected]);

  const doorWarning = securityEnabled && mainDoorOpen;
  const value = useMemo(
    () => ({
      securityEnabled,
      alarmActive,
      doorWarning,
      setSecurityEnabled,
      activateSecurity,
      deactivateSecurity,
    }),
    [
      securityEnabled,
      alarmActive,
      doorWarning,
      setSecurityEnabled,
      activateSecurity,
      deactivateSecurity,
    ],
  );

  return <SecurityContext.Provider value={value}>{children}</SecurityContext.Provider>;
}

export function useSecurity() {
  const context = useContext(SecurityContext);
  if (!context) throw new Error('useSecurity deve ser usado dentro de SecurityProvider.');
  return context;
}
